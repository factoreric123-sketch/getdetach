## Goal

Spread the publish dates of the 144 recently-bulk-generated blog posts across a realistic range so the blog doesn't look like it was all posted on one or two days.

## Current state

- 100 posts dated `2026-04-30` (in `blogPostsExpansion50v2.ts` and parts of `blogPostsExpansion50.ts`)
- 44 posts dated `2026-04-29`
- ~59 older posts already have natural, spread-out dates (2025-03 through 2026-04-28) — leave these alone.

## Approach

Redistribute the 144 bulk-dated posts across roughly the last 9 months (Aug 2025 → Apr 2026), with a realistic publishing cadence:

- Average ~2–4 posts per week, with some quiet weeks and some heavier weeks
- Keep the most recent ~10 posts in April 2026 so the blog still looks "freshly active"
- Use a deterministic pseudo-random distribution (seeded by slug) so the result is stable — re-running won't reshuffle dates each time
- Skip dates that older posts already occupy to avoid clustering
- Keep ISO format `YYYY-MM-DD` (matches existing schema)

## Files to update

1. `src/data/blogPostsExpansion50.ts` — reassign `date:` field for entries currently `2026-04-30` / `2026-04-29`
2. `src/data/blogPostsExpansion50v2.ts` — same
3. `public/sitemap-blog.xml` — update `<lastmod>` for the affected URLs to match new dates (so Google sees consistent signals)

## Technical details

- Run a one-off Node script that:
  1. Parses each expansion file, collects entries with target dates
  2. For each, hashes the slug → maps to a date in the window Aug 1 2025 → Apr 28 2026
  3. Weights distribution slightly toward more recent months (realistic growth curve)
  4. Rewrites the `date: "..."` line in place
  5. Updates matching `<lastmod>` entries in `sitemap-blog.xml`
- No content changes, no slug changes, no structural changes — only the date string.

## Out of scope

- Not touching the ~59 posts that already have unique/older dates
- Not changing post order in the array (the `Blog.tsx` listing renders in array order, not date order — if you want newest-first sorting, that's a separate small change I can add)

## Verification

After the script runs:
- Confirm no two posts share the exact same date unnecessarily (some collisions are fine and realistic)
- Spot-check 5 posts in the preview to confirm dates render correctly
- Confirm sitemap `<lastmod>` count still matches post count