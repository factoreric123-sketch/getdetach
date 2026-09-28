CREATE TABLE public.order_qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  code text NOT NULL UNIQUE CHECK (code ~ '^[0-9]{6}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.order_qr_codes TO service_role;
ALTER TABLE public.order_qr_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only service role manages order QR codes" ON public.order_qr_codes FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE TRIGGER update_order_qr_codes_updated_at BEFORE UPDATE ON public.order_qr_codes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();