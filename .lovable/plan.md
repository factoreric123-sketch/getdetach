## Goal

Add 50 new SEO-optimized blog posts targeting high-intent, low-competition long-tail keywords around app blockers, screen time, phone addiction, and competitor comparisons. Each post will be substantial (1200-2000 words), include FAQ schema, internal links, and follow the existing `BlogPost` interface.

## Approach

The site already has ~103 posts split across 4 data files. I'll add a new file `src/data/blogPostsExpansion50.ts` and wire it into `src/data/blogPosts.ts`, then add all 50 URLs to `public/sitemap-blog.xml`.

To produce 50 high-quality posts efficiently, I'll use the Lovable AI gateway (Gemini 3 Flash) via the ai-gateway skill script to generate each post's content from a structured prompt that enforces our SEO and brand rules (no em-dashes, "card" terminology, $9.99 price, internal links to `/`, `/detach-app`, `/shop`, App Store CTA, FAQ section). Each post will be returned as JSON matching the `BlogPost` interface, then assembled into the TS file.

## 50 New Blog Topics

Targeted across 5 SEO clusters:

**Competitor & alternative (12)**
1. brick-vs-jomo
2. opal-app-review-2026
3. one-sec-app-review-2026
4. freedom-app-review-2026
5. jomo-app-review
6. unpluq-review-2026
7. screenzen-review-2026
8. best-alternatives-to-opal
9. best-alternatives-to-one-sec
10. best-alternatives-to-freedom
11. detach-vs-jomo
12. detach-vs-unpluq

**How-to / iPhone tutorials (12)**
13. how-to-block-snapchat-on-iphone
14. how-to-block-twitter-x-on-iphone
15. how-to-block-facebook-on-iphone
16. how-to-block-news-apps-on-iphone
17. how-to-block-shopping-apps-on-iphone
18. how-to-block-dating-apps-on-iphone
19. how-to-block-games-on-iphone
20. how-to-set-app-time-limits-that-actually-work
21. how-to-grayscale-iphone-to-reduce-screen-time
22. how-to-set-up-focus-mode-on-iphone
23. how-to-block-apps-on-ipad
24. how-to-use-downtime-on-iphone-effectively

**Habit / behavior (10)**
25. how-to-stop-scrolling-before-bed
26. how-to-build-a-no-phone-morning-routine
27. how-to-take-a-week-off-social-media
28. signs-you-need-to-quit-instagram
29. signs-you-need-to-quit-tiktok
30. how-to-be-present-without-deleting-your-phone
31. why-you-pick-up-your-phone-without-thinking
32. how-to-stop-watching-tiktok-for-hours
33. how-to-read-more-and-scroll-less
34. how-to-replace-screen-time-with-real-hobbies

**Listicles / "best of" (8)**
35. best-app-blockers-for-couples-2026
36. best-app-blockers-for-parents-2026
37. best-app-blockers-for-remote-workers-2026
38. best-app-blockers-for-writers-2026
39. best-one-time-purchase-app-blockers-2026
40. best-app-blockers-no-subscription-2026
41. best-app-blockers-with-strict-mode-2026
42. best-nfc-products-for-focus-2026

**Brand / Detach-focused (8)**
43. how-detach-strict-mode-works
44. detach-card-vs-app-only-blockers
45. is-detach-worth-it
46. how-much-does-detach-cost
47. how-to-set-up-detach-in-5-minutes
48. detach-for-students
49. detach-for-adhd
50. detach-faq-everything-you-need-to-know

## Technical Plan

1. **Generate content** using `/tmp/lovable_ai.py` (copied from the ai-gateway skill). For each of the 50 slugs, call the model with a strict prompt that returns JSON: `{title, metaTitle, metaDescription, excerpt, content}`. The prompt enforces:
   - 1200-2000 word markdown body using `##`/`###` headings, bullet lists, one comparison table where relevant
   - Natural keyword usage in H1, first paragraph, and 2-3 H2s
   - At least 3 internal markdown links (`/`, `/detach-app`, `/shop`, plus 1-2 related blog slugs from the existing list)
   - App Store link in conclusion
   - "Card" terminology only (never NFC tag/chip)
   - No em-dashes
   - $9.99 price for Detach card
2. **Write `src/data/blogPostsExpansion50.ts`** exporting `expansion50Posts: BlogPost[]` with all 50 entries. Add a hand-written 4-question `faqSchema` for each post (script-generated, then included in the file).
3. **Wire it up** in `src/data/blogPosts.ts`:
   ```ts
   import { expansion50Posts } from "@/data/blogPostsExpansion50";
   export const blogPosts = [...expansion50Posts, ...comparisonExpansionPosts, ...];
   ```
4. **Sitemap**: append 50 `<url>` entries to `public/sitemap-blog.xml` with `lastmod` 2026-04-30.
5. **Verify** no slug collisions with existing posts and that the file builds.

## Files Changed

- Create: `src/data/blogPostsExpansion50.ts`
- Edit: `src/data/blogPosts.ts` (add import + spread)
- Edit: `public/sitemap-blog.xml` (append 50 URLs)

## Notes

- Generation will take a few minutes (50 sequential AI calls with a small delay).
- Posts already use BlogPosting + FAQPage JSON-LD via `BlogPost.tsx`, so SEO schema is automatic once `faqSchema` is provided.
- No design, route, or component changes needed; the existing `/blog/:slug` route handles new posts automatically.
