CREATE TABLE public.order_numbers (
  stripe_session_id text PRIMARY KEY,
  order_number bigint GENERATED ALWAYS AS IDENTITY (START WITH 1001) UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.order_numbers TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.order_numbers_order_number_seq TO service_role;
ALTER TABLE public.order_numbers ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.get_or_create_order_number(_session_id text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE assigned_number bigint;
BEGIN
  IF _session_id IS NULL OR _session_id !~ '^cs_[A-Za-z0-9_]{10,200}$' THEN
    RAISE EXCEPTION 'Invalid checkout session';
  END IF;
  SELECT order_number INTO assigned_number FROM public.order_numbers WHERE stripe_session_id = _session_id;
  IF assigned_number IS NULL THEN
    INSERT INTO public.order_numbers (stripe_session_id) VALUES (_session_id)
    ON CONFLICT (stripe_session_id) DO UPDATE SET stripe_session_id = EXCLUDED.stripe_session_id
    RETURNING order_number INTO assigned_number;
  END IF;
  RETURN 'DET-' || assigned_number::text;
END;
$$;
REVOKE ALL ON FUNCTION public.get_or_create_order_number(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_or_create_order_number(text) TO service_role;