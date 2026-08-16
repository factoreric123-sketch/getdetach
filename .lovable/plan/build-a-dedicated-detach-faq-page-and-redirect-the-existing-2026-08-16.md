Build a dedicated Detach FAQ page and redirect the existing FAQ section there.

Scope
- Create a new route `/detach-faq` that answers the most common questions in Brick/Bloom style, but written for Detach.
- Replace the FAQ accordion on `/detach-app` with a short CTA block linking to `/detach-faq`.
- Register the route in `src/App.tsx`, footer, sitemaps, and `llms.txt`.
- Keep SEO consistent with the rest of the site: FAQ schema, breadcrumb schema, canonical, dynamic OpenGraph tags, and internal links.

Page content (/detach-faq)
- Hero: H1 "Detach FAQ" + short summary of what Detach is.
- FAQ sections modeled on Brick/Bloom, but Detach-specific:
  - How is Detach different from Apple Screen Time or Android Digital Wellbeing?
  - Can’t I just delete the app or find a workaround? (strict mode)
  - What’s included with a Detach purchase? (free app + $9.99 card, no subscription)
  - Does Detach ship internationally? (free worldwide shipping)
  - Is my phone compatible? (iPhone iOS 17+; Android coming soon)
  - Is Detach available on Android? (not yet, coming soon)
  - What can I block with Detach? (any iPhone app except Phone per Apple policy, plus selected websites)
  - What happens if I lose my Detach card? (emergency unlocks + replacement)
  - Do you track which apps I block? (no, local storage only)
  - How do I set up Detach with my iPhone? (App Store download + Screen Time permission + pairing card)
  - Can I block apps without my card? (yes, manual session start in the app)
  - Can I block websites? (yes, Safari and supported browsers)
  - Is the app free? (yes, no hidden fees or subscriptions)
- Use the existing `Accordion` component for collapsible Q&A.
- Add related links at the bottom: `/detach-app`, `/detach-app-blocker-facts`, `/compare`, `/shop`, `/contact`, App Store.
- Add a bottom CTA section.

SEO
- `FAQPage` JSON-LD with all questions.
- `SoftwareApplication` schema and `BreadcrumbList` schema.
- Canonical `/detach-faq` and unique OpenGraph title/description via `setSocialMeta`.

Updates to other pages
- `src/App.tsx`: add `<Route path="/detach-faq" element={<DetachFaq />} />`.
- `src/pages/DetachApp.tsx`: remove the FAQ accordion and replace with a compact "Have questions?" block linking to `/detach-faq`.
- `src/components/landing/Footer.tsx`: add "FAQ" link under Company.
- `public/sitemap-pages.xml` and `public/sitemap.xml`: add `/detach-faq` with current date.
- `public/llms.txt`: add `/detach-faq` to the Pages list and include a short FAQ section.
- Cross-link from `/nfc-app-blocker`, `/how-nfc-focus-apps-work`, `/compare`, and `/brick-alternative` where relevant.

Design
- Follow the existing geo page pattern: `max-w-3xl`, `pt-24 pb-16 px-6`, dark minimal Apple aesthetic, `Breadcrumbs`, `JsonLd` from `src/components/geo/GeoBlocks`.
- No new dependencies.
