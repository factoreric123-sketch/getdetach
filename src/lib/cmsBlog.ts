import { supabase } from "@/integrations/supabase/client";

export interface CmsBlogPost {
  id: string;
  external_id: number;
  slug: string;
  title: string;
  meta_description: string | null;
  excerpt: string | null;
  content_html: string | null;
  content_markdown: string | null;
  hero_image_url: string | null;
  json_ld: unknown;
  faq_json_ld: unknown;
  language_code: string | null;
  keywords: string[] | null;
  seed_keyword: string | null;
  published_at: string;
}

export const fetchCmsBlogPosts = async (): Promise<CmsBlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts_cms")
    .select(
      "id, external_id, slug, title, meta_description, excerpt, content_html, content_markdown, hero_image_url, json_ld, faq_json_ld, language_code, keywords, seed_keyword, published_at",
    )
    .order("published_at", { ascending: false });
  if (error) {
    console.error("fetchCmsBlogPosts", error);
    return [];
  }
  return (data as CmsBlogPost[]) ?? [];
};

export const fetchCmsBlogPostBySlug = async (slug: string): Promise<CmsBlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts_cms")
    .select(
      "id, external_id, slug, title, meta_description, excerpt, content_html, content_markdown, hero_image_url, json_ld, faq_json_ld, language_code, keywords, seed_keyword, published_at",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("fetchCmsBlogPostBySlug", error);
    return null;
  }
  return (data as CmsBlogPost) ?? null;
};

export const formatCmsDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};
