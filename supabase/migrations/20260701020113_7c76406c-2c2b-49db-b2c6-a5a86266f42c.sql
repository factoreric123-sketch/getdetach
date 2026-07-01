
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.blog_posts_cms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id bigint NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  meta_description text,
  excerpt text,
  content_html text,
  content_markdown text,
  hero_image_url text,
  json_ld jsonb,
  faq_json_ld jsonb,
  language_code text,
  keywords text[],
  seed_keyword text,
  published_at timestamptz NOT NULL DEFAULT now(),
  synced_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blog_posts_cms_published_at_idx ON public.blog_posts_cms (published_at DESC);

GRANT SELECT ON public.blog_posts_cms TO anon, authenticated;
GRANT ALL ON public.blog_posts_cms TO service_role;

ALTER TABLE public.blog_posts_cms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog posts"
  ON public.blog_posts_cms FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_blog_posts_cms_updated_at
  BEFORE UPDATE ON public.blog_posts_cms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
