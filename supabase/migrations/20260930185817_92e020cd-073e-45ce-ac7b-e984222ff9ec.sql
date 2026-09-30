ALTER TABLE public.qr_code_pool
  ADD COLUMN sent_out boolean NOT NULL DEFAULT false,
  ADD COLUMN customer_name text,
  ADD COLUMN customer_email text;

-- Mark codes that have already been assigned to orders as sent
UPDATE public.qr_code_pool p
SET sent_out = true
WHERE EXISTS (SELECT 1 FROM public.order_qr_codes o WHERE o.code = p.code);