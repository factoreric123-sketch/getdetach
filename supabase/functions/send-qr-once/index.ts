import { sendEmailAndLog } from '../_shared/transactional-email-templates/send-and-log.ts'
import { createClient } from "npm:@supabase/supabase-js@2";

// One-time helper: send unique QR codes to specific people. Delete after use.
const SENDS = [
  { email: "odufaabalu@gmail.com", code: "022509" },
  { email: "josephesr@hotmail.com", code: "022824" },
];

Deno.serve(async () => {
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: img } = supabase.storage.from("email-assets").getPublicUrl("detach-unlock-qr.png");
  const results: any[] = [];
  for (const { email, code } of SENDS) {
    // Reserve the code only if still unused.
    const { data: claimed } = await supabase.from("qr_code_pool")
      .update({ sent_out: true, customer_email: email })
      .eq("code", code).eq("sent_out", false).is("customer_email", null).select("code");
    if (!claimed?.length) { results.push({ email, error: "code not available" }); continue; }
    const r = await sendEmailAndLog(supabase, { body: {
      templateName: "start-using-detach", recipientEmail: email,
      idempotencyKey: `qr-code-${email}-${code}`,
      templateData: { qrCode: code, qrImageUrl: img.publicUrl },
    }});
    results.push({ email, code, error: r.error?.message ?? null });
  }
  return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
});
