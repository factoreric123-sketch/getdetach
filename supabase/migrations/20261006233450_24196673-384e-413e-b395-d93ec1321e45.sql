CREATE TABLE public.shipping_confirmation_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  recipient_email text NOT NULL,
  customer_name text,
  send_after timestamptz NOT NULL,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.shipping_confirmation_sends TO authenticated;
GRANT ALL ON public.shipping_confirmation_sends TO service_role;

ALTER TABLE public.shipping_confirmation_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages shipping confirmations"
ON public.shipping_confirmation_sends
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');