CREATE TABLE public.order_confirmation_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL,
  recipient_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (stripe_session_id, recipient_email)
);
ALTER TABLE public.order_confirmation_sends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages order confirmation sends"
  ON public.order_confirmation_sends FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');