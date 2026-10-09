import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// One-time helper for manually sending a QR code email. Delete after use.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, code } = await req.json();
    if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: img } = supabase.storage.from("email-assets").getPublicUrl("detach-unlock-qr.png");

    const { error, suppressed } = await sendEmailAndLog(supabase, {
      body: {
        templateName: "start-using-detach",
        recipientEmail: email.toLowerCase().trim(),
        idempotencyKey: `qr-code-${email.toLowerCase().trim()}-${code}`,
        templateData: { qrCode: code, qrImageUrl: img.publicUrl },
      },
    });
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, suppressed: !!suppressed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("send-qr-once error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
