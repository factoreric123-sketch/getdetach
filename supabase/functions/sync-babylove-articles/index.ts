import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE = "https://api.babylovegrowth.ai/api/integrations/v1";
const REQUEST_DELAY_MS = 1500;
const RETRY_DELAY_MS = 6000;

interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  hero_image_url?: string;
  languageCode?: string;
  meta_description?: string;
  excerpt?: string;
  created_at?: string;
  seedKeyword?: string;
  keywords?: string[];
}

interface ArticleFull extends ArticleSummary {
  content_html?: string;
  content_markdown?: string;
  jsonLd?: unknown;
  faqJsonLd?: unknown;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchArticle(id: number, apiKey: string): Promise<ArticleFull | { error: string }> {
  const doFetch = () =>
    fetch(`${BASE}/articles/${id}`, {
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    });
  let res = await doFetch();
  if (res.status === 429) {
    await sleep(RETRY_DELAY_MS);
    res = await doFetch();
  }
  if (!res.ok) return { error: `${res.status}` };
  return await res.json();
}

async function upsertArticle(supabase: SupabaseClient, article: ArticleFull): Promise<string | null> {
  const { error } = await supabase.from("blog_posts_cms").upsert(
    {
      external_id: article.id,
      slug: article.slug,
      title: article.title,
      meta_description: article.meta_description ?? null,
      excerpt: article.excerpt ?? null,
      content_html: article.content_html ?? null,
      content_markdown: article.content_markdown ?? null,
      hero_image_url: article.hero_image_url ?? null,
      json_ld: article.jsonLd ?? null,
      faq_json_ld: article.faqJsonLd ?? null,
      language_code: article.languageCode ?? null,
      keywords: article.keywords ?? null,
      seed_keyword: article.seedKeyword ?? null,
      published_at: article.created_at ?? new Date().toISOString(),
      synced_at: new Date().toISOString(),
    },
    { onConflict: "external_id" },
  );
  return error?.message ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("BABYLOVE_API_KEY");
  if (!apiKey) return json({ error: "BABYLOVE_API_KEY not configured" }, 500);

  const url = new URL(req.url);
  const full = url.searchParams.get("full") === "1";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: existing, error: existingErr } = await supabase
    .from("blog_posts_cms")
    .select("external_id");
  if (existingErr) return json({ error: existingErr.message }, 500);
  const existingIds = new Set((existing ?? []).map((r) => Number(r.external_id)));

  const limit = 50;
  let offset = 0;
  let synced = 0;
  let skipped = 0;
  const errors: string[] = [];
  const syncedUrls: string[] = [];

  outer: while (true) {
    const listRes = await fetch(`${BASE}/articles?limit=${limit}&offset=${offset}`, {
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    });
    if (listRes.status === 429) {
      await sleep(RETRY_DELAY_MS);
      continue;
    }
    if (!listRes.ok) {
      const body = await listRes.text();
      return json({ error: `List failed: ${listRes.status} ${body}` }, 500);
    }
    const articles: ArticleSummary[] = await listRes.json();
    if (!Array.isArray(articles) || articles.length === 0) break;

    for (const summary of articles) {
      if (existingIds.has(summary.id) && !full) {
        skipped++;
        break outer; // incremental: stop at first known
      }
      if (existingIds.has(summary.id)) {
        skipped++;
      }

      await sleep(REQUEST_DELAY_MS);
      const result = await fetchArticle(summary.id, apiKey);
      if ("error" in result) {
        errors.push(`Article ${summary.id}: ${result.error}`);
        continue;
      }
      const err = await upsertArticle(supabase, result);
      if (err) {
        errors.push(`Upsert ${result.id}: ${err}`);
      } else {
        synced++;
        syncedUrls.push(`https://getdetach.app/blog/${result.slug}`);
      }
    }

    if (articles.length < limit) break;
    offset += limit;
  }

  // Fire-and-forget IndexNow ping for newly synced posts.
  if (syncedUrls.length > 0) {
    try {
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/indexnow-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: syncedUrls }),
      });
    } catch (e) {
      errors.push(`IndexNow ping: ${(e as Error).message}`);
    }
  }

  return json({ synced, skipped, errors, full, syncedUrls });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
