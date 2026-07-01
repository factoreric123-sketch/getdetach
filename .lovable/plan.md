## Goal
Every new article you publish in BabyLoveGrowth appears on `getdetach.app/blog` automatically — no code edits, no redeploy.

## Approach: API polling (as you requested)
We poll BabyLoveGrowth on a schedule, fetch new articles, store them in the backend. The blog reads from the table.

## What gets built

### 1. Secret
Store your API key `c869bfa6-413f-4d23-a4fd-5b70d9f1d912` as `BABYLOVE_API_KEY` (server-side only, never exposed to browser).

### 2. Database table `blog_posts_cms`
Stores synced articles. Kept separate from your existing static `src/data/blogPosts.ts` so nothing breaks.

Columns: `external_id` (unique, from BabyLoveGrowth), `slug` (unique), `title`, `meta_description`, `excerpt`, `content_html`, `content_markdown`, `hero_image_url`, `json_ld`, `faq_json_ld`, `language_code`, `keywords`, `seed_keyword`, `published_at`, `synced_at`.

RLS: public `SELECT` (blog is public). No public writes — only the edge function (service role) writes.

### 3. Edge function `sync-babylove-articles`
- Public URL, no JWT required
- Reads `BABYLOVE_API_KEY` from env, calls `X-API-Key` header
- Paginates `GET https://api.babylovegrowth.ai/api/integrations/v1/articles?limit=50&offset=…`, stops early once it hits an already-synced `external_id` (fast incremental sync)
- For each new article, fetches full content: `GET .../articles/{id}`
- Upserts into `blog_posts_cms` by `external_id` (re-syncs handle content updates too)
- Returns `{ synced, skipped, errors }`
- Supports `?full=1` for a full re-sync (used once for backfill)

### 4. Scheduled sync (pg_cron + pg_net)
Runs every **30 minutes** so new articles appear within half an hour of publishing. Also usable as a manual trigger by hitting the URL.

### 5. Blog rendering updates
- **`/blog`** — fetches CMS posts, merges with static posts from `src/data/blogPosts.ts`, sorted newest first, deduped by slug (static wins on collision).
- **`/blog/:slug`** — first checks static posts, then falls back to a CMS post. CMS posts render sanitized `content_html` (via `isomorphic-dompurify`) inside the same Navbar/Footer shell with canonical + social meta + JSON-LD (from `jsonLd` / `faqJsonLd`).
- Loading skeleton while CMS posts fetch.

## Setup flow
1. Store the API key as `BABYLOVE_API_KEY`.
2. Migration: create `blog_posts_cms`, enable `pg_cron`/`pg_net`.
3. Deploy edge function.
4. Schedule cron (every 30 min).
5. Update `/blog` and `/blog/:slug` to read from the table.
6. Trigger the first sync manually with `?full=1` to backfill all existing articles.

## Technical notes
- **Sanitization**: `isomorphic-dompurify` before rendering `content_html`.
- **Sitemap**: static `/sitemap-blog.xml` won't include CMS posts (not blocking for launch; dynamic sitemap can be added later via edge function).
- **Rate limits**: incremental runs normally hit BabyLoveGrowth once per cycle; backfill respects pagination.

## Out of scope (say the word to add)
- Dynamic `/sitemap-blog.xml` including CMS posts
- Admin page to edit/hide CMS posts
- Switch from polling to real-time webhook later (both can coexist)