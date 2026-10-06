import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Sends due shipping-confirmation emails. Called by a scheduled job; the
// apikey header must match the project's anon key. The function only sends
// emails that were already scheduled by the Stripe webhook, so calling it
// extra times is harmless and idempotent.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const auth = req.headers.get("apikey") || "";
  const expected = Deno.env.get("SUPABASE_ANON_KEY") || "";
  console.log("debug auth:", { gotLen: auth.length, gotPrefix: auth.slice(0, 10), expLen: expected.length, expPrefix: expected.slice(0, 10) });
  if (!expected || auth !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: due, error: fetchError } = await supabase
      .from("shipping_confirmation_sends")
      .select("id, stripe_session_id, recipient_email, customer_name")
      .is("sent_at", null)
      .lte("send_after", new Date().toISOString())
      .order("send_after", { ascending: true })
      .limit(20);

    if (fetchError) throw fetchError;

    let sent = 0;
    for (const row of due || []) {
      // Claim the row so a concurrent run cannot send it twice.
      const { data: claimed, error: claimError } = await supabase
        .from("shipping_confirmation_sends")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", row.id)
        .is("sent_at", null)
        .select("id");
      if (claimError || !claimed || claimed.length === 0) continue;

      const { error: emailError } = await sendEmailAndLog(supabase, {
        body: {
          templateName: "shipping-confirmation",
          recipientEmail: row.recipient_email,
          idempotencyKey: `shipping-confirm-${row.stripe_session_id}-${row.recipient_email}`,
          templateData: { customerName: row.customer_name || "" },
        },
      });
      if (emailError) {
        console.error("Failed to send shipping confirmation:", row.recipient_email, emailError);
        // Unclaim so it can be retried on the next run.
        await supabase.from("shipping_confirmation_sends").update({ sent_at: null }).eq("id", row.id);
      } else {
        sent++;
        console.log("Shipping confirmation sent to:", row.recipient_email);
      }
    }

    return new Response(JSON.stringify({ success: true, sent }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("process-shipping-confirmations error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
