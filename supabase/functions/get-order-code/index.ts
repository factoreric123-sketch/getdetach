import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { sessionId } = await req.json().catch(() => ({}));
    if (typeof sessionId !== "string" || !/^cs_[A-Za-z0-9_]{10,200}$/.test(sessionId)) {
      return json({ error: "Invalid session" }, 400);
    }
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status !== "complete" || !["paid", "no_payment_required"].includes(session.payment_status)) {
      return json({ error: "Order not complete" }, 404);
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    // Same idempotent allocator as the webhook, so page and email always show the same code.
    const { data: code, error } = await supabase.rpc("assign_order_qr_code", { _session_id: sessionId });
    if (error || typeof code !== "string") throw error || new Error("No code");
    const { data: img } = supabase.storage.from("email-assets").getPublicUrl("detach-unlock-qr.png");
    return json({ code, qrImageUrl: img.publicUrl });
  } catch (e) {
    console.error("get-order-code error:", e);
    return json({ error: "Could not load code" }, 500);
  }
});
