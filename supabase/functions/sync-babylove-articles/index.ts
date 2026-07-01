import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE = "https://api.babylovegrowth.ai/api/integrations/v1";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("BABYLOVE_API_KEY");
  if (!apiKey) {
    return json({ error: "BABYLOVE_API_KEY not configured" }, 500);
  }

  const url = new URL(req.url);
  const full = url.searchParams.get("full") === "1";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Load existing external_ids
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

  while (true) {
    const listRes = await fetch(`${BASE}/articles?limit=${limit}&offset=${offset}`, {
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    });
    if (!listRes.ok) {
      const body = await listRes.text();
      return json({ error: `List failed: ${listRes.status} ${body}` }, 500);
    }
    const articles: ArticleSummary[] = await listRes.json();
    if (!Array.isArray(articles) || articles.length === 0) break;

    let hitKnown = false;
    for (const summary of articles) {
      if (existingIds.has(summary.id)) {
        skipped++;
        if (!full) {
          hitKnown = true;
          continue;
        }
      }

      try {
        // Small delay to respect rate limits
        await new Promise((r) => setTimeout(r, 1200));
        const fullRes = await fetch(`${BASE}/articles/${summary.id}`, {
          headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
        });
        if (fullRes.status === 429) {
          // Back off and retry once
          await new Promise((r) => setTimeout(r, 5000));
          const retry = await fetch(`${BASE}/articles/${summary.id}`, {
            headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
          });
          if (!retry.ok) {
            errors.push(`Article ${summary.id}: ${retry.status} after retry`);
            continue;
          }
          const article: ArticleFull = await retry.json();
          await upsert(supabase, article, errors) && synced++;
          continue;
        }
        if (!fullRes.ok) {
          errors.push(`Article ${summary.id}: ${fullRes.status}`);
          continue;
        }
          errors.push(`Article ${summary.id}: ${fullRes.status}`);
          continue;
        }
        const article: ArticleFull = await fullRes.json();

        const { error: upsertErr } = await supabase
          .from("blog_posts_cms")
          .upsert(
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
        if (upsertErr) {
          errors.push(`Upsert ${article.id}: ${upsertErr.message}`);
        } else {
          synced++;
        }
      } catch (e) {
        errors.push(`Article ${summary.id}: ${(e as Error).message}`);
      }
    }

    if (!full && hitKnown) break;
    if (articles.length < limit) break;
    offset += limit;
  }

  return json({ synced, skipped, errors, full });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
