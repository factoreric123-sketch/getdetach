import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object as Stripe.PaymentIntent;

      // Find an email for the failed attempt: receipt email, the failing payment
      // method's billing details, or the attached customer record.
      let failedEmail: string | null =
        pi.receipt_email ||
        (pi.last_payment_error?.payment_method as any)?.billing_details?.email ||
        null;

      if (!failedEmail && pi.customer) {
        try {
          const customerId = typeof pi.customer === "string" ? pi.customer : pi.customer.id;
          const customer = await stripe.customers.retrieve(customerId);
          failedEmail = (customer as Stripe.Customer).email ?? null;
        } catch (e) {
          console.error("Could not retrieve customer for failed payment:", e);
        }
      }

      if (!failedEmail) {
        console.log("Payment failed with no email available, nothing to follow up:", pi.id);
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const email = failedEmail.toLowerCase().trim();
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      const now = new Date();
      const nowIso = now.toISOString();

      const { data: existing } = await supabase
        .from("failed_payment_followups")
        .select("id, sent_at")
        .eq("email", email)
        .maybeSingle();

      // Guard against back-to-back retries producing several emails: only one
      // follow-up per email per 30 minutes.
      if (existing?.sent_at && now.getTime() - new Date(existing.sent_at).getTime() < 30 * 60 * 1000) {
        console.log("Follow-up already sent recently for:", email);
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const record = {
        email,
        stripe_payment_intent_id: pi.id,
        first_failed_at: nowIso,
        send_after: nowIso,
        sent_at: nowIso,
        cancelled_at: null,
      };
      const { error: claimError } = existing
        ? await supabase.from("failed_payment_followups").update(record).eq("id", existing.id)
        : await supabase.from("failed_payment_followups").insert(record);

      if (claimError) {
        console.error("Failed to record failed payment follow-up:", claimError);
      } else {
        const { error: sendError } = await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "payment-failed-followup",
            recipientEmail: email,
            idempotencyKey: `payment-failed-${pi.id}`,
            templateData: {},
          },
        });
        if (sendError) console.error("Failed to send payment follow-up email:", sendError);
        else console.log("Payment failed follow-up email queued for:", email);
      }

      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
        console.log("Payment not yet completed, skipping email");
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Retrieve full session with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      const customerEmail = fullSession.customer_details?.email;
      const customerName = fullSession.customer_details?.name || "";
      // Stripe moved shipping details to collected_information on newer API versions;
      // fall back to the legacy field and finally to the billing address.
      const shippingDetails =
        (fullSession as any).collected_information?.shipping_details ||
        (fullSession as any).shipping_details ||
        null;
      const shippingAddress = shippingDetails?.address || fullSession.customer_details?.address;
      const shippingName = shippingDetails?.name || customerName;
      const quantity = fullSession.line_items?.data?.[0]?.quantity || 1;
      const total = fullSession.amount_total ? (fullSession.amount_total / 100).toFixed(2) : "9.99";

      if (!customerEmail) {
        console.error("No customer email found for session:", session.id);
        return new Response(JSON.stringify({ received: true, warning: "No email" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const addressLines = shippingAddress
        ? [
            shippingName,
            shippingAddress.line1,
            shippingAddress.line2,
            `${shippingAddress.city || ""}${shippingAddress.city ? ", " : ""}${shippingAddress.state || ""} ${shippingAddress.postal_code || ""}`.trim(),
            shippingAddress.country,
          ]
            .filter(Boolean)
            .join("\n")
        : "";

      // Send order confirmation via Lovable's transactional email system
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // A successful order cancels any pending "payment failed" follow-up for this email.
      {
        const { error: cancelError } = await supabase
          .from("failed_payment_followups")
          .update({ cancelled_at: new Date().toISOString() })
          .eq("email", customerEmail.toLowerCase().trim())
          .is("sent_at", null)
          .is("cancelled_at", null);
        if (cancelError) console.error("Failed to cancel payment follow-up:", cancelError);
      }


      // Record affiliate order if there's a referral code
      const affiliateCode = (fullSession.metadata?.affiliate_code || "").toLowerCase().trim();
      if (affiliateCode) {
        try {
          const country = shippingAddress?.country || null;
          const isUs = country === "US";
          const { data: aff } = await supabase
            .from("affiliates")
            .select("us_commission_cents, intl_commission_cents, active")
            .eq("code", affiliateCode)
            .maybeSingle();

          if (aff && aff.active) {
            const commission = isUs ? aff.us_commission_cents : aff.intl_commission_cents;
            const { error: affErr } = await supabase.from("affiliate_orders").insert({
              affiliate_code: affiliateCode,
              stripe_session_id: fullSession.id,
              customer_email: customerEmail,
              country,
              is_us: isUs,
              quantity,
              amount_total_cents: fullSession.amount_total ?? 0,
              commission_cents: commission,
              currency: fullSession.currency,
            });
            if (affErr) console.error("Failed to record affiliate order:", affErr);
            else console.log(`Affiliate order recorded for ${affiliateCode} (${isUs ? "US" : "INTL"}, $${(commission / 100).toFixed(2)})`);
          } else {
            console.warn(`Affiliate code "${affiliateCode}" not found or inactive`);
          }
        } catch (e) {
          console.error("Affiliate tracking error:", e);
        }
      }

      // Send the same order confirmation email to both the customer and the Detach team.
      // Dedupe via unique (stripe_session_id, recipient_email) so Stripe webhook retries
      // never produce a second confirmation for the same order/recipient.
      const recipients = [customerEmail, "getdetach@gmail.com"];
      for (const recipient of recipients) {
        const { error: claimError } = await supabase
          .from("order_confirmation_sends")
          .insert({ stripe_session_id: fullSession.id, recipient_email: recipient });
        if (claimError) {
          if ((claimError as any).code === "23505") {
            console.log(`Order confirmation already sent to ${recipient} for session ${fullSession.id}, skipping.`);
            continue;
          }
          console.error(`Failed to claim send slot for ${recipient}:`, claimError);
          continue;
        }
        const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "order-confirmation",
            recipientEmail: recipient,
            idempotencyKey: `order-confirm-${session.id}-${recipient}`,
            templateData: {
              customerName,
              customerEmail,
              quantity,
              total,
              addressLines,
            },
          },
        });
        if (emailError) {
          console.error(`Failed to send order confirmation to ${recipient}:`, emailError);
        } else {
          console.log("Order confirmation email queued for:", recipient);
        }
      }

      // Second email to the customer only: how to start using Detach right away
      const { error: startClaimError } = await supabase
        .from("order_confirmation_sends")
        .insert({ stripe_session_id: fullSession.id, recipient_email: `start-using:${customerEmail}` });
      if (startClaimError) {
        if ((startClaimError as any).code === "23505") {
          console.log(`Start-using email already sent for session ${fullSession.id}, skipping.`);
        } else {
          console.error("Failed to claim start-using send slot:", startClaimError);
        }
      } else {
        const { error: startEmailError } = await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "start-using-detach",
            recipientEmail: customerEmail,
            idempotencyKey: `start-using-${session.id}-${customerEmail}`,
            templateData: {},
          },
        });
        if (startEmailError) {
          console.error("Failed to send start-using email:", startEmailError);
        } else {
          console.log("Start-using email queued for:", customerEmail);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
