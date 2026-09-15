# Follow-up email when a payment fails

When someone's card fails at checkout, wait about 5 minutes, then email them the "your order didn't go through" message. If they retry within those 5 minutes and succeed, no email is sent.

## How it works

1. Stripe tells the site whenever a payment fails. The site records the person's email and a "send after" time 5 minutes later.
2. If a payment from the same email succeeds before that time, the pending follow-up is cancelled.
3. A small recurring check looks for pending follow-ups whose time has come and sends the email once per person. Repeat failures from the same email reuse the same pending row, so nobody gets two emails for one bad card.
4. If Stripe gives us no email address for the failed attempt (it sometimes only has a name), nothing is sent — there is nowhere to send it.

## Email copy (exactly as provided)

Subject: Your Detach order didn't go through

Hi,

It looks like your payment didn't go through, so your Detach order wasn't completed.

If you still want one, you can try again here: https://getdetach.app/

Sometimes payments fail because of a temporary bank or card issue, so trying again usually fixes it.

If you have any trouble placing your order, just reply to this email and I'll help you out.

Thanks,
Detach

## Timing trade-off (please read)

To honor the 5-minute delay, the site has to check for due follow-ups every few minutes rather than hourly. That means a short recurring check runs 288 times a day even when there are no failed payments, which keeps the database awake and slightly increases Cloud usage cost. The simpler alternative is checking every 15 minutes, which costs less but means the email can arrive up to ~20 minutes after the failure instead of ~5. I will use a 5-minute check unless you prefer the cheaper 15-minute one.

## Technical details

- New table `failed_payment_followups`: `id`, `email` (unique), `first_failed_at`, `send_after`, `sent_at`, `cancelled_at`, `stripe_payment_intent_id`. RLS on, service_role only (no client access).
- `stripe-webhook`: handle `payment_intent.payment_failed` -> upsert pending row with `send_after = now() + 5 min` (do not push the time forward on repeat failures). On `checkout.session.completed`, mark any pending row for that email `cancelled_at = now()`.
- Stripe endpoint must have `payment_intent.payment_failed` enabled; I will add it if missing.
- New template `payment-failed-followup.tsx` in `_shared/transactional-email-templates/`, registered in `registry.ts`, styled like the existing order emails, greeting "Hi," per house style, no shipping/tracking blocks.
- New edge function `process-failed-payment-followups`: service-role only, claims due rows (`sent_at is null and cancelled_at is null and send_after <= now()`, small batch limit), sends via `send-transactional-email` with idempotency key `payment-failed-<payment_intent_id>`, stamps `sent_at`.
- pg_cron job every 5 minutes calling that function; also skips work when no rows are due.
- Deploy `stripe-webhook`, `send-transactional-email`, `preview-transactional-email`, `process-email-queue`, and the new function.
