import { sendTemplateEmail } from './send-email.ts'

interface SendBody {
  templateName: string
  recipientEmail: string
  idempotencyKey?: string
  templateData?: Record<string, any>
}

// Sends a registered template and records the outcome in email_send_log.
// Returns { error } so callers keep their existing error handling shape.
export async function sendEmailAndLog(
  supabase: any,
  { body }: { body: SendBody },
): Promise<{ error: Error | null; suppressed?: boolean }> {
  const { templateName, recipientEmail, idempotencyKey, templateData } = body
  const log = async (status: string, error_message?: string) => {
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: templateName,
      recipient_email: recipientEmail,
      status,
      ...(error_message ? { error_message } : {}),
    })
    if (error) console.error('Failed to write email_send_log', { code: error.code, message: error.message })
  }
  try {
    const result = await sendTemplateEmail(templateName, recipientEmail, {
      templateData: templateData ?? {},
      idempotencyKey,
    })
    if (result.sent) {
      await log('sent')
      return { error: null }
    }
    await log('suppressed')
    return { error: null, suppressed: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await log('failed', message)
    return { error: err instanceof Error ? err : new Error(message) }
  }
}
