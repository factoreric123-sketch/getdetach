import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import QRCode from "npm:qrcode@1.5.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

// --- Shipping confirmation scheduling (3:00 PM America/New_York, next business day) ---
const ET_TZ = "America/New_York";

function etOffsetMinutes(date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: ET_TZ, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return (asUtc - date.getTime()) / 60000;
}

function etWallToUtc(y: number, mo: number, d: number, h: number, mi: number): Date {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const off = etOffsetMinutes(new Date(guess));
  return new Date(guess - off * 60000);
}

// 3:00 PM ET the day after purchase; if that day is Saturday or Sunday, move to Monday.
function shippingSendAfter(now: Date): Date {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: ET_TZ, year: "numeric", month: "2-digit", day: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(now).map((p) => [p.type, p.value]));
  // Start from the ET calendar date of purchase, then add one day.
  let day = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day));
  day = new Date(day.getTime() + 86400000);
  // Skip weekend: Saturday (6) -> +2, Sunday (0) -> +1
  const dow = day.getUTCDay();
  if (dow === 6) day = new Date(day.getTime() + 2 * 86400000);
  else if (dow === 0) day = new Date(day.getTime() + 86400000);
  return etWallToUtc(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), 15, 0);
}

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

      // Never send duplicates: once this email has been sent to an address,
      // that address is permanently marked and never emailed again.
      if (existing?.sent_at) {
        console.log("Follow-up already sent for this email, never resending:", email);
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
        const { error: sendError } = await sendEmailAndLog(supabase, {
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
        const { error: emailError } = await sendEmailAndLog(supabase, {
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
      const startRecipient = `start-using:${customerEmail}`;
      const { data: priorStart, error: priorStartError } = await supabase
        .from("order_confirmation_sends")
        .select("id")
        .eq("stripe_session_id", fullSession.id)
        .eq("recipient_email", startRecipient)
        .maybeSingle();
      if (priorStartError) {
        console.error("Failed to check start-using send slot:", priorStartError);
      } else if (!priorStart) {
        try {
          // Reserve one code atomically per checkout; a replay gets the same code.
          const { data: qrCode, error: qrError } = await supabase.rpc("assign_order_qr_code", {
            _session_id: fullSession.id,
          });
          if (qrError || typeof qrCode !== "string" || !/^\d{6}$/.test(qrCode)) {
            throw qrError || new Error("Could not assign a QR code");
          }

          // Record who this code was sent to so the pool table shows it.
          const { error: poolUpdateError } = await supabase
            .from("qr_code_pool")
            .update({ sent_out: true, customer_name: customerName || null, customer_email: customerEmail || null })
            .eq("code", qrCode);
          if (poolUpdateError) console.error("Failed to mark QR code as sent:", poolUpdateError);


          // Everyone shares the same unlock QR image; only the iOS code is unique.
          const { data: imageData } = supabase.storage.from("email-assets").getPublicUrl("detach-unlock-qr.png");

          const { error: startClaimError } = await supabase
            .from("order_confirmation_sends")
            .insert({ stripe_session_id: fullSession.id, recipient_email: startRecipient });
          if (startClaimError) {
            if ((startClaimError as any).code !== "23505") console.error("Failed to claim start-using send slot:", startClaimError);
          } else {
            const { error: startEmailError } = await sendEmailAndLog(supabase, {
              body: {
                templateName: "start-using-detach",
                recipientEmail: customerEmail,
                idempotencyKey: `start-using-${session.id}-${customerEmail}`,
                templateData: { qrCode, qrImageUrl: imageData.publicUrl },
              },
            });
            if (startEmailError) console.error("Failed to send start-using email:", startEmailError);
            else console.log("Start-using email sent for session:", fullSession.id);
          }
        } catch (startError) {
          console.error("Could not prepare start-using email:", startError);
        }
      }

      // Third email to the customer only: review offer for a free extra card
      const { error: reviewClaimError } = await supabase
        .from("order_confirmation_sends")
        .insert({ stripe_session_id: fullSession.id, recipient_email: `review-offer:${customerEmail}` });
      if (reviewClaimError) {
        if ((reviewClaimError as any).code === "23505") {
          console.log(`Review-offer email already sent for session ${fullSession.id}, skipping.`);
        } else {
          console.error("Failed to claim review-offer send slot:", reviewClaimError);
        }
      } else {
        const { error: reviewEmailError } = await sendEmailAndLog(supabase, {
          body: {
            templateName: "review-offer",
            recipientEmail: customerEmail,
            idempotencyKey: `review-offer-${session.id}-${customerEmail}`,
            templateData: {
              customerName,
            },
          },
        });
        if (reviewEmailError) {
          console.error("Failed to send review-offer email:", reviewEmailError);
        } else {
          console.log("Review-offer email queued for:", customerEmail);
        }
      }

      // Schedule the shipping confirmation for 3:00 PM ET the next business day
      // (never Saturday or Sunday). Unique stripe_session_id makes this idempotent.
      {
        const sendAfter = shippingSendAfter(new Date());
        const { error: shipError } = await supabase
          .from("shipping_confirmation_sends")
          .insert({
            stripe_session_id: fullSession.id,
            recipient_email: customerEmail.toLowerCase().trim(),
            customer_name: customerName || null,
            send_after: sendAfter.toISOString(),
          });
        if (shipError) {
          if ((shipError as any).code === "23505") {
            console.log("Shipping confirmation already scheduled for session:", fullSession.id);
          } else {
            console.error("Failed to schedule shipping confirmation:", shipError);
          }
        } else {
          console.log("Shipping confirmation scheduled for", sendAfter.toISOString(), "->", customerEmail);
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
