import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

// One-time helper: resend one order's confirmation + QR emails to a corrected address. Delete after use.
const SESSION = "cs_live_b1LWCw2A8GJnaQ3nq5qXOqMnMR902ChsNKaOBFB26Im2hrH74nBmtztoxW";
const TO = "katieimportant77@gmail.com";
const CODE = "017175";

Deno.serve(async () => {
  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const s: any = await stripe.checkout.sessions.retrieve(SESSION, { expand: ["line_items"] });
    const sd = s.collected_information?.shipping_details || s.shipping_details || null;
    const a = sd?.address || s.customer_details?.address;
    const name = s.customer_details?.name || "";
    const addressLines = a ? [sd?.name || name, a.line1, a.line2,
      `${a.city || ""}${a.city ? ", " : ""}${a.state || ""} ${a.postal_code || ""}`.trim(), a.country]
      .filter(Boolean).join("\n") : "";
    const { data: orderNumber, error: oe } = await supabase.rpc("get_or_create_order_number", { _session_id: SESSION });
    if (oe) throw oe;
    const r1 = await sendEmailAndLog(supabase, { body: {
      templateName: "order-confirmation", recipientEmail: TO,
      idempotencyKey: `order-confirm-${SESSION}-${TO}`,
      templateData: { orderNumber, customerName: name, customerEmail: TO,
        quantity: s.line_items?.data?.[0]?.quantity || 1,
        total: s.amount_total != null ? (s.amount_total / 100).toFixed(2) : "9.99", addressLines },
    }});
    if (r1.error) throw r1.error;
    const { data: img } = supabase.storage.from("email-assets").getPublicUrl("detach-unlock-qr.png");
    const r2 = await sendEmailAndLog(supabase, { body: {
      templateName: "start-using-detach", recipientEmail: TO,
      idempotencyKey: `qr-code-${TO}-${CODE}`,
      templateData: { qrCode: CODE, qrImageUrl: img.publicUrl },
    }});
    if (r2.error) throw r2.error;
    await supabase.from("qr_code_pool").update({ customer_email: TO }).eq("code", CODE);
    return new Response(JSON.stringify({ ok: true, orderNumber }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500 });
  }
});
