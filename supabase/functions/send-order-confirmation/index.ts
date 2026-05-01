import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

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
        idempotencyKey: `order-confirm-${sessionId}`,
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
      return new Response(JSON.stringify({ error: emailError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Internal notification to Detach team
    const { error: internalEmailError } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "order-notification-internal",
        recipientEmail: "getdetach@gmail.com",
        idempotencyKey: `order-internal-${sessionId}`,
        templateData: {
          customerName,
          customerEmail,
          quantity,
          total,
          addressLines,
          sessionId,
        },
      },
    });

    if (internalEmailError) {
      console.error("Failed to send internal order notification:", internalEmailError);
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
