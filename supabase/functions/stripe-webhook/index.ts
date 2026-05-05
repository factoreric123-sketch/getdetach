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

      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "order-confirmation",
          recipientEmail: customerEmail,
          idempotencyKey: `order-confirm-${session.id}`,
          templateData: {
            customerName,
            quantity,
            total,
            addressLines,
          },
        },
      });

      if (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
      } else {
        console.log("Order confirmation email queued for:", customerEmail);
      }

      // Internal notification to Detach team
      const { error: internalEmailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "order-notification-internal",
          recipientEmail: "getdetach@gmail.com",
          idempotencyKey: `order-internal-${session.id}`,
          templateData: {
            customerName,
            customerEmail,
            quantity,
            total,
            addressLines,
          },
        },
      });

      if (internalEmailError) {
        console.error("Failed to send internal order notification:", internalEmailError);
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
