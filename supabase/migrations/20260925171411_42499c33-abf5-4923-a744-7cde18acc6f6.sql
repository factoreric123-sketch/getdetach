CREATE TABLE public.review_offer_followups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL,
  email text NOT NULL,
  customer_name text,
  send_after timestamptz NOT NULL,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (stripe_session_id, email)
);

GRANT ALL ON public.review_offer_followups TO service_role;

ALTER TABLE public.review_offer_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages review offer followups"
ON public.review_offer_followups
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX review_offer_followups_due_idx
ON public.review_offer_followups (send_after)
WHERE sent_at IS NULL;

CREATE TRIGGER update_review_offer_followups_updated_at
BEFORE UPDATE ON public.review_offer_followups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();