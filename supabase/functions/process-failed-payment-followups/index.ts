import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, lovable-context",
};

const BATCH_SIZE = 20;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const token = (req.headers.get("Authorization") || "").replace("Bearer ", "").trim();
  if (!token || token !== serviceKey) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 403,
    });
  }

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);

  try {
    const { data: due, error } = await supabase
      .from("failed_payment_followups")
      .select("id, email, stripe_payment_intent_id")
      .is("sent_at", null)
      .is("cancelled_at", null)
      .lte("send_after", new Date().toISOString())
      .order("send_after", { ascending: true })
      .limit(BATCH_SIZE);

    if (error) throw error;

    if (!due || due.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    let processed = 0;
    for (const row of due) {
      // Claim the row first so a concurrent run cannot send twice.
      const { data: claimed, error: claimError } = await supabase
        .from("failed_payment_followups")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", row.id)
        .is("sent_at", null)
        .is("cancelled_at", null)
        .select("id");

      if (claimError) {
        console.error("Failed to claim followup", row.id, claimError);
        continue;
      }
      if (!claimed || claimed.length === 0) continue;

      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "payment-failed-followup",
          recipientEmail: row.email,
          idempotencyKey: `payment-failed-${row.stripe_payment_intent_id || row.id}`,
          templateData: {},
        },
      });

      if (emailError) {
        console.error("Failed to send payment-failed follow-up to", row.email, emailError);
        await supabase
          .from("failed_payment_followups")
          .update({ sent_at: null })
          .eq("id", row.id);
        continue;
      }

      processed++;
      console.log("Payment failed follow-up queued for:", row.email);
    }

    return new Response(JSON.stringify({ processed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("process-failed-payment-followups error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
