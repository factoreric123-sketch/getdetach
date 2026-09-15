CREATE TABLE public.failed_payment_followups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  first_failed_at timestamp with time zone NOT NULL DEFAULT now(),
  send_after timestamp with time zone NOT NULL DEFAULT (now() + interval '5 minutes'),
  sent_at timestamp with time zone,
  cancelled_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.failed_payment_followups TO service_role;

ALTER TABLE public.failed_payment_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages failed payment followups"
ON public.failed_payment_followups FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX failed_payment_followups_due_idx
ON public.failed_payment_followups (send_after)
WHERE sent_at IS NULL AND cancelled_at IS NULL;

CREATE TRIGGER update_failed_payment_followups_updated_at
BEFORE UPDATE ON public.failed_payment_followups
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();