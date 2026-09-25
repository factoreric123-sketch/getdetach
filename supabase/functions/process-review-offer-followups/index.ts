import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
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
      .from("review_offer_followups")
      .select("id, stripe_session_id, email, customer_name")
      .is("sent_at", null)
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
      const { data: claimed, error: claimError } = await supabase
        .from("review_offer_followups")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", row.id)
        .is("sent_at", null)
        .select("id");

      if (claimError) {
        console.error("Failed to claim review offer follow-up", row.id, claimError);
        continue;
      }
      if (!claimed || claimed.length === 0) continue;

      const { error: emailError } = await sendEmailAndLog(supabase, {
        body: {
          templateName: "review-offer",
          recipientEmail: row.email,
          idempotencyKey: `review-offer-${row.stripe_session_id}-${row.email}`,
          templateData: {
            customerName: row.customer_name || "",
          },
        },
      });

      if (emailError) {
        console.error("Failed to send review offer follow-up to", row.email, emailError);
        await supabase
          .from("review_offer_followups")
          .update({ sent_at: null })
          .eq("id", row.id);
        continue;
      }

      processed++;
      console.log("Review offer email queued for:", row.email);
    }

    return new Response(JSON.stringify({ processed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("process-review-offer-followups error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
