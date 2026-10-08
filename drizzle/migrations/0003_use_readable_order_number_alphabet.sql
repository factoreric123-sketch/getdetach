CREATE OR REPLACE FUNCTION public.get_or_create_order_number(_session_id text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  assigned_number text;
  candidate text;
  alphabet constant text := 'ACDEFHJKMNPQRTUVWXY34679';
  random_bytes bytea;
  i integer;
BEGIN
  IF _session_id IS NULL OR _session_id !~ '^cs_[A-Za-z0-9_]{10,200}$' THEN
    RAISE EXCEPTION 'Invalid checkout session';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(_session_id, 0));
  SELECT COALESCE(confirmation_code, 'DET-' || order_number::text)
  INTO assigned_number FROM public.order_numbers WHERE stripe_session_id = _session_id;
  IF assigned_number IS NOT NULL THEN
    RETURN assigned_number;
  END IF;
  LOOP
    candidate := '';
    random_bytes := uuid_send(gen_random_uuid());
    FOR i IN 0..5 LOOP
      candidate := candidate || substr(alphabet, (get_byte(random_bytes, i) % length(alphabet)) + 1, 1);
    END LOOP;
    IF candidate !~ '[A-Z]' OR candidate !~ '[34679]' THEN
      CONTINUE;
    END IF;
    INSERT INTO public.order_numbers (stripe_session_id, confirmation_code)
    VALUES (_session_id, candidate)
    ON CONFLICT (confirmation_code) DO NOTHING
    RETURNING confirmation_code INTO assigned_number;
    IF assigned_number IS NOT NULL THEN
      RETURN assigned_number;
    END IF;
  END LOOP;
END;
$function$;
REVOKE ALL ON FUNCTION public.get_or_create_order_number(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_or_create_order_number(text) TO service_role;