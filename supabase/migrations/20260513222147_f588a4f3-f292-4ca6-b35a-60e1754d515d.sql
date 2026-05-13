
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT,
  us_commission_cents INTEGER NOT NULL DEFAULT 0,
  intl_commission_cents INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage affiliates"
ON public.affiliates FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE TABLE public.affiliate_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_code TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT,
  country TEXT,
  is_us BOOLEAN NOT NULL DEFAULT false,
  quantity INTEGER NOT NULL DEFAULT 1,
  amount_total_cents INTEGER NOT NULL DEFAULT 0,
  commission_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage affiliate orders"
ON public.affiliate_orders FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_affiliate_orders_code ON public.affiliate_orders(affiliate_code);
CREATE INDEX idx_affiliate_orders_created ON public.affiliate_orders(created_at DESC);

INSERT INTO public.affiliates (code, name, us_commission_cents, intl_commission_cents)
VALUES ('avapumpelly', 'Ava Pumpelly', 780, 608);
