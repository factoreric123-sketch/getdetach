## Goal
Make Detach easy for AI systems (ChatGPT search, Google AI Overviews, Perplexity, Bing) to interpret by publishing one canonical "facts" page, tightening structured data, opening the site to AI search crawlers, and auto-notifying search engines when key pages change.

## 1. New canonical facts page — `/detach-app-blocker-facts`

New route `src/pages/FactsPage.tsx`, wired into `src/App.tsx`.

Contents (all as regular page text, not images):
- H1: "Detach app blocker — facts"
- Short 1–2 sentence intro naming Detach and what it is.
- **Facts table** near the top (semantic `<table>` with `<th scope="row">`):

  | Detail | Detach |
  | --- | --- |
  | Product category | Physical app blocker card + iOS app |
  | Platform | iPhone |
  | Minimum system | iOS 17 |
  | App price | Free |
  | Optional Detach card | $9.99 one time |
  | Subscription | None |
  | Account required | No |
  | App Store | Direct listing (link) |
  | Shipping | Free worldwide |
  | Last verified | July 2026 |

  Per project memory the product is always called a "card" (not "tag/chip/NFC"), and copy uses no em dashes. The user's "Detach Inc." reference will be rendered as "Detach" unless you confirm the legal entity name.

- Short factual sections beneath the table: How it works, What it blocks, Who it's for, Pricing, Links (Home, Shop, App Store, Reviews, Blog, Contact).
- Per-route `<title>`, meta description, canonical, and og:* via existing `setCanonical` / `setSocialMeta` helpers.
- JSON-LD on this page: `SoftwareApplication` + `Product`/`Offer` for the card + `BreadcrumbList` + `Organization` (with `sameAs` linking getdetach.app, the App Store listing, and any social profiles you provide).

Add to sitemap:
- Append `/detach-app-blocker-facts` to `public/sitemap-pages.xml` and `public/sitemap.xml`.
- Add a link to `public/llms.txt` under Pages.

Cross-link the page from:
- Homepage (`src/components/landing/Footer.tsx` "Company" column, and one contextual link inside `WhatIsDetach` or `Product` section).
- Shop page (`src/pages/Shop.tsx`) — "Product facts" link near the product summary.
- Blog index (`src/pages/Blog.tsx`) — link in the header/intro.
- Since there is no dedicated press page, we'll skip that link (or add it to `Contact` — confirm if you want that).

## 2. Structured data upgrades

- **`/detach-app`** (`src/pages/DetachApp.tsx`): keep FAQPage; add per-route `SoftwareApplication` JSON-LD (currently only in `index.html`) so the app page has its own explicit block with `operatingSystem: iOS 17`, `applicationCategory: HealthApplication`, `offers` (price 0 USD), `aggregateRating`, and `downloadUrl` to the App Store.
- **`/shop`** (`src/pages/Shop.tsx`): add `Product` JSON-LD with nested `Offer` — name "Detach Card", price 9.99 USD, availability InStock, priceValidUntil, url, image, brand Detach, and `aggregateRating` if we want to reuse the app rating (safer to omit unless the card itself is rated — will omit).
- **`index.html`**: extend the existing `Organization` block with a `sameAs` array including the App Store URL and social profiles. Will ask you for the social handles before writing them in (see Open questions).
- **`/detach-app-blocker-facts`**: `Organization` + `SoftwareApplication` + `Product`/`Offer` + `BreadcrumbList` as noted above.

## 3. `public/robots.txt` — AI crawler rules

Replace the current file with a version that:
- Keeps `Googlebot`, `Bingbot`, `Twitterbot`, `facebookexternalhit`, and `*` allowed.
- Explicitly allows `OAI-SearchBot` and `ChatGPT-User` (so ChatGPT search can cite pages).
- Explicitly allows `PerplexityBot` and `Google-Extended` too (same intent, adjacent AI search surfaces).
- **`GPTBot` (training) decision needed** — see Open questions. Default in the plan: leave `GPTBot` allowed (silent, same as today). Will switch to `Disallow: /` for `GPTBot` only if you say so.
- Keep all four current sitemap URLs and the `LLMS:` line.

## 4. IndexNow — auto-ping on updates

- Generate a static IndexNow key file at `public/<key>.txt` containing just the key string, and store the key in a shared constant.
- New Supabase Edge Function `indexnow-submit` (`verify_jwt = false`) that accepts a list of URLs and POSTs them to `https://api.indexnow.org/indexnow` with the key. Bing forwards to participating engines.
- Trigger it from:
  - `sync-babylove-articles` after each successful upsert (submit the new/updated blog URL).
  - A one-time seed call for `/`, `/shop`, `/detach-app`, `/detach-app-blocker-facts`, `/reviews`, `/blog`.
  - Manual re-ping is possible by curling the function; no admin UI.
- No client-side IndexNow calls (would leak nothing sensitive, but there's no reason to fire from browsers).

## 5. Google Search Console + Bing Webmaster

These are dashboard actions the code can't do for you, but I'll:
- Confirm `https://getdetach.app/` is verified in Search Console via the Site Verification API and list the current sitemaps it knows about; if `sitemap-index.xml` isn't submitted, I'll submit it.
- For Bing Webmaster Tools, provide short step-by-step instructions in the reply (import from GSC is one click). No API available through connectors here.

## 6. SEO findings + rescan

After the code changes ship, mark relevant SEO findings as fixed via `seo_chat--update_findings` and trigger a rescan so the SEO panel re-verifies.

## Files touched

- New: `src/pages/FactsPage.tsx`, `supabase/functions/indexnow-submit/index.ts`, `public/<indexnow-key>.txt`
- Edited: `src/App.tsx`, `src/components/landing/Footer.tsx`, `src/components/landing/WhatIsDetach.tsx` (or `Product.tsx`) for a single homepage link, `src/pages/Shop.tsx`, `src/pages/DetachApp.tsx`, `src/pages/Blog.tsx`, `public/robots.txt`, `public/sitemap-pages.xml`, `public/sitemap.xml`, `public/llms.txt`, `index.html`, `supabase/functions/sync-babylove-articles/index.ts`, `supabase/config.toml`

## Out of scope (say the word to add)

- A dedicated `/press` page with press assets.
- Product rating on the physical card (needs separate review data).
- Dynamic sitemap generator including CMS posts (still on static file today).
- Auto-updating "Last verified" via a build script.

## Open questions

1. **GPTBot (model training)** — allow (default) or block? Blocking still lets ChatGPT search cite you.
2. **Legal entity name** — is it "Detach" or "Detach Inc."? Affects `Organization.legalName`.
3. **Social profiles for `Organization.sameAs`** — please share the URLs (Instagram, X/Twitter, TikTok, YouTube, LinkedIn, etc.) so I don't invent them.
