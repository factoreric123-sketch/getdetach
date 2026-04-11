import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

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
            .join("<br/>")
        : "N/A";

      // Send confirmation email via Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        },
        body: JSON.stringify({
          from: "Detach <onboarding@resend.dev>",
          to: [customerEmail],
          bcc: ["getdetach@gmail.com"],
          subject: "Your Detach Order Confirmation",
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:15px;color:#222;margin:0 0 16px;line-height:1.6;">
      Hi ${customerName},
    </p>
    <p style="font-size:15px;color:#222;margin:0 0 24px;line-height:1.6;">
      Thank you for your order. This email confirms that we've received your request and it is now being processed.
    </p>

    <p style="font-size:15px;color:#222;margin:0 0 6px;line-height:1.6;"><strong>Order Details</strong></p>
    <p style="font-size:15px;color:#222;margin:0;line-height:1.6;">Items: Detach</p>
    <p style="font-size:15px;color:#222;margin:0;line-height:1.6;">Quantity: ${quantity}</p>
    <p style="font-size:15px;color:#222;margin:0 0 24px;line-height:1.6;">Status: Confirmed</p>

    <p style="font-size:15px;color:#222;margin:0 0 6px;line-height:1.6;"><strong>Shipping To</strong></p>
    <p style="font-size:15px;color:#222;margin:0 0 24px;line-height:1.6;">${addressLines}</p>

    <p style="font-size:15px;color:#222;margin:0 0 4px;line-height:1.6;"><strong>Total: $${total}</strong></p>
    <p style="font-size:14px;color:#666;margin:0 0 24px;line-height:1.6;">Free shipping</p>

    <p style="font-size:15px;color:#222;margin:0 0 24px;line-height:1.6;">
      You'll receive a shipping confirmation with tracking info once your card ships.
    </p>

    <p style="font-size:13px;color:#999;margin:24px 0 0;">
      Questions? Reply to this email or contact us at getdetach@gmail.com
    </p>
  </div>
</body>
</html>`,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
      } else {
        console.log("Order confirmation email sent to:", customerEmail);
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
