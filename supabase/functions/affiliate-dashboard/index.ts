import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const maskEmail = (email: string | null): string | null => {
  if (!email) return null;
  const at = email.indexOf("@");
  if (at <= 0) return "***";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return `${local.slice(0, 2)}***@${domain}`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code.toLowerCase().trim() : "";
    const token = typeof body.token === "string" ? body.token.trim() : "";
    if (!/^[a-z0-9]{3,40}$/.test(code) || token.length < 16 || token.length > 128) {
      return json({ error: "Invalid request" }, 400);
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: affiliate, error: affErr } = await supabase
      .from("affiliates")
      .select("code, name, us_commission_cents, intl_commission_cents, us_commission_magnet_cents, intl_commission_magnet_cents, active, dashboard_token")
      .eq("code", code)
      .maybeSingle();

    if (affErr) throw affErr;
    // Constant-ish response: never reveal whether the code exists vs the token is wrong.
    if (!affiliate || !affiliate.active || !affiliate.dashboard_token || affiliate.dashboard_token !== token) {
      return json({ error: "Invalid link" }, 403);
    }

    const { data: orders, error: ordErr } = await supabase
      .from("affiliate_orders")
      .select("customer_email, country, is_us, quantity, amount_total_cents, commission_cents, currency, created_at")
      .eq("affiliate_code", code)
      .order("created_at", { ascending: false });

    if (ordErr) throw ordErr;

    const rows = (orders || []).map((o) => ({
      date: o.created_at,
      email: maskEmail(o.customer_email),
      country: o.country,
      isUs: o.is_us,
      quantity: o.quantity,
      amountCents: o.amount_total_cents,
      commissionCents: o.commission_cents,
      currency: o.currency || "usd",
    }));

    const totalCommissionCents = rows.reduce((sum, o) => sum + o.commissionCents, 0);
    const totalOrders = rows.length;
    const usOrders = rows.filter((o) => o.isUs).length;

    return json({
      name: affiliate.name,
      code: affiliate.code,
      usCommissionCents: affiliate.us_commission_cents,
      intlCommissionCents: affiliate.intl_commission_cents,
      totalOrders,
      usOrders,
      intlOrders: totalOrders - usOrders,
      totalCommissionCents,
      orders: rows,
    });
  } catch (e) {
    console.error("affiliate-dashboard error:", e);
    return json({ error: "Could not load dashboard" }, 500);
  }
});
