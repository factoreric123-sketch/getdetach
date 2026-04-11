import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing sessionId" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session to get customer details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "there";
    const shippingAddress = session.shipping_details?.address;
    const quantity = session.line_items?.data?.[0]?.quantity || 1;
    const total = session.amount_total ? (session.amount_total / 100).toFixed(2) : "9.99";

    if (!customerEmail) {
      return new Response(JSON.stringify({ error: "No customer email found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
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
        subject: "Order Confirmed – Your Detach Card is on its way!",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:24px;font-weight:800;color:#000;margin:0 0 8px;">Order Confirmed ✓</h1>
    <p style="font-size:15px;color:#555;margin:0 0 28px;line-height:1.5;">
      Hey ${customerName}, thanks for ordering the Detach card! Your order has been received and will ship soon.
    </p>

    <div style="background:#f9f9f9;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
      <p style="font-size:13px;color:#999;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Order Summary</p>
      <table style="width:100%;font-size:14px;color:#333;">
        <tr>
          <td style="padding:6px 0;">Detach Card × ${quantity}</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">$${total}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;">Shipping</td>
          <td style="padding:6px 0;text-align:right;font-weight:600;">Free</td>
        </tr>
        <tr style="border-top:1px solid #e5e5e5;">
          <td style="padding:12px 0 0;font-weight:700;">Total</td>
          <td style="padding:12px 0 0;text-align:right;font-weight:700;">$${total}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom:28px;">
      <p style="font-size:13px;color:#999;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Shipping To</p>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">${addressLines}</p>
    </div>

    <p style="font-size:14px;color:#555;line-height:1.5;margin:0 0 8px;">
      You'll receive a shipping confirmation with tracking info once your card ships.
    </p>

    <p style="font-size:13px;color:#999;margin:32px 0 0;">
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
      return new Response(JSON.stringify({ error: err }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Order confirmation error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
