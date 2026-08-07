## Goal

Make Detach the canonical, quotable source for "NFC app blocker" across AI answer engines, without touching the homepage. The site already has ~300 blog posts (including most Brick/Bloom/Blok/Unpluq comparisons) and a facts page, so the gap is dedicated evergreen landing pages, a comparison hub, HowTo/schema coverage, and quotable fact blocks.

## 1. New evergreen landing routes (not blog posts)

These are standalone pages under their own URLs so they read as reference material, not blog chatter. Each uses the existing Navbar/Footer, `setCanonical` + `setSocialMeta`, one H1, a short quotable definition sentence at the top, a facts table, and JSON-LD.

| Route | Purpose |
| --- | --- |
| `/nfc-app-blocker` | Category-defining page. Owns the phrase. |
| `/brick-alternative` | Broad discovery intent ("brick app alternatives"). |
| `/detach-vs-brick` | Highest-intent head-to-head. |
| `/how-nfc-focus-apps-work` | Explainer, carries HowTo schema for setup. |
| `/compare` | Comparison hub linking every vs page and vs post. |

Each page opens with a one-sentence definition designed to be quoted verbatim, for example: "Detach is an iPhone app blocker that uses NFC taps to intentionally unlock distracting apps, creating physical friction that reduces impulsive phone use."

Existing blog posts on the same topics stay live and get linked from the new pages (and the new pages linked from them where the slug is an obvious match, e.g. `brick-vs-detach`, `all-nfc-phone-blockers-compared-2026`, `nfc-phone-blocker-how-it-works`). No redirects, no deletions.

## 2. Comparison hub `/compare`

A single table of Detach vs Brick, Bloom, Blok, Unpluq, Opal, one sec, ScreenZen, Freedom, Apple Screen Time with columns: price, subscription, physical unlock, platform, bypass difficulty. Every row links to the deeper page or post. Comparisons stay factual and name where each competitor is genuinely stronger (Brick's build quality and Android support, Opal's analytics, Freedom's cross-platform reach) so the pages read as credible rather than promotional.

Competitor prices and specs will be taken from the values already used across the existing posts and facts page, kept consistent everywhere, with a "last verified" date on the hub.

## 3. Fact-rich blocks and structured data

- `SoftwareApplication` JSON-LD on `/nfc-app-blocker` and `/detach-vs-brick`.
- `FAQPage` on `/nfc-app-blocker`, `/brick-alternative`, `/detach-vs-brick` (3 to 6 real questions each, matching the phrasing people actually search).
- `HowTo` on `/how-nfc-focus-apps-work` for the setup flow (download, pick apps, place card, start session, tap to end).
- `BreadcrumbList` on all new pages.
- `Product` + `Offer` reused from the shop/facts pattern on `/brick-alternative` and `/detach-vs-brick`.
- Each page carries a short bulleted spec list (iPhone only, iOS 17+, one-time $9.99, no subscription, built on Apple's Screen Time APIs, emergency unlocks, scheduled sessions, free worldwide shipping) so assistants have concrete facts to lift.

## 4. Blog additions

New posts targeting the exact question phrasings not yet covered by the existing 300:

- "What is an NFC app blocker?"
- "Apps that require an NFC tap to unlock"
- "How to lock apps until I tap an NFC card"
- "Best NFC app blockers in 2026"
- "Why NFC beats timers and passcodes"
- "Detach vs Jomo"
- "Detach vs Opal" already exists and will be linked, not duplicated.

Each new post follows the existing `blogPosts` data shape, in a new `src/data/blogPostsGeo.ts` file registered the same way as the other expansion files.

## 5. Discovery plumbing

- Add the five new routes to `public/sitemap-pages.xml`, `public/sitemap.xml`, and `public/llms.txt` (under Pages), plus the new blog slugs to `public/sitemap-blog.xml` and the llms.txt Blog list.
- Ping the new URLs through the existing `indexnow-submit` function once shipped.
- Extend the existing `Organization` JSON-LD in `index.html` only if you give social profile URLs; otherwise left as is.

## Out of scope

- Homepage stays untouched, as requested.
- Original research page ("analysis of N focus sessions", "average screen-time reduction after 30 days"): worth doing and high value for citations, but it needs real aggregate data. The app stores usage locally and the backend has no session analytics, so there is nothing to compute from today. I will not invent numbers. Say the word and I can scope an opt-in anonymous aggregate later.
- Reddit, Product Hunt, and press outreach are off-platform work I cannot do from here. I can draft a Product Hunt listing and a press one-pager if you want.

## Technical notes

- New: `src/pages/NfcAppBlocker.tsx`, `src/pages/BrickAlternative.tsx`, `src/pages/DetachVsBrick.tsx`, `src/pages/HowNfcFocusAppsWork.tsx`, `src/pages/Compare.tsx`, `src/data/blogPostsGeo.ts`, plus a small shared `src/components/geo/FactsTable.tsx` and `src/lib/schema.ts` helper for JSON-LD.
- Edited: `src/App.tsx` (routes), `src/components/landing/Footer.tsx` (a "Compare" column), `src/pages/Blog.tsx` (registers the new data file), the three sitemaps, `public/llms.txt`.
- Client-side JSON-LD and meta tags are visible to Googlebot and AI crawlers that execute JS, but social-preview crawlers only see `index.html`. If you want per-page previews and server-rendered content for stricter crawlers, the app can move to SSR via Lovable's latest template ([what the upgrade gives you](https://lovable.dev/blog/building-apps-using-tanstack-start)).

## Open question

Project memory says copy always says "card" and never "NFC", "tag", or "chip". Your strategy depends on owning the phrase "NFC app blocker". My default: use "NFC" freely in titles, headings, meta, and schema on these new pages, and keep "card" as the word for the product itself in body copy. Confirm or tell me to keep NFC out of visible copy entirely.
