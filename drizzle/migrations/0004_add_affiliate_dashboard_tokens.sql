ALTER TABLE public.affiliates ADD COLUMN dashboard_token TEXT;
UPDATE public.affiliates SET dashboard_token = replace(gen_random_uuid()::text, '-', '') WHERE dashboard_token IS NULL;
ALTER TABLE public.affiliates ALTER COLUMN dashboard_token SET NOT NULL;
CREATE UNIQUE INDEX idx_affiliates_dashboard_token ON public.affiliates(dashboard_token);