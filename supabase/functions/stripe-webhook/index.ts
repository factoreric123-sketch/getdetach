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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== "paid") {
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
      const customerName = fullSession.customer_details?.name || "there";
      const shippingAddress = fullSession.shipping_details?.address;
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
            shippingAddress.line1,
            shippingAddress.line2,
            `${shippingAddress.city}, ${shippingAddress.state || ""} ${shippingAddress.postal_code || ""}`.trim(),
            shippingAddress.country,
          ]
            .filter(Boolean)
            .join(", ")
        : "N/A";

      // Send order confirmation via Lovable's transactional email system
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

      // Send the same order confirmation email to both the customer and the Detach team
      const recipients = [customerEmail, "getdetach@gmail.com"];
      for (const recipient of recipients) {
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
