CREATE TABLE public.qr_code_pool (
  code text PRIMARY KEY CHECK (code ~ '^[0-9]{6}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.qr_code_pool TO service_role;
ALTER TABLE public.qr_code_pool ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only service role reads QR code pool" ON public.qr_code_pool FOR SELECT TO service_role USING (true);
CREATE TRIGGER update_qr_code_pool_updated_at BEFORE UPDATE ON public.qr_code_pool FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.assign_order_qr_code(_session_id text) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE _code text;
BEGIN
  IF _session_id IS NULL OR _session_id !~ '^cs_[A-Za-z0-9_]{10,200}$' THEN
    RAISE EXCEPTION 'Invalid checkout session';
  END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(_session_id, 0));
  SELECT code INTO _code FROM public.order_qr_codes WHERE stripe_session_id = _session_id;
  IF _code IS NOT NULL THEN RETURN _code; END IF;
  SELECT p.code INTO _code FROM public.qr_code_pool p
    WHERE NOT EXISTS (SELECT 1 FROM public.order_qr_codes o WHERE o.code = p.code)
    ORDER BY p.code FOR UPDATE OF p SKIP LOCKED LIMIT 1;
  IF _code IS NULL THEN RAISE EXCEPTION 'No unused QR codes available'; END IF;
  INSERT INTO public.order_qr_codes (stripe_session_id, code) VALUES (_session_id, _code);
  RETURN _code;
END;
$$;
REVOKE ALL ON FUNCTION public.assign_order_qr_code(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.assign_order_qr_code(text) TO service_role;