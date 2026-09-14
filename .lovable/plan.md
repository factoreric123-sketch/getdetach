# Update Detach for Android availability

## Goal
Make every non-blog source accurately state that Detach is now available on Android, using the supplied Google Play listing:

`https://play.google.com/store/apps/details?id=app.detach&pli=1`

Blog posts and blog data will remain unchanged.

## Changes

1. **Update customer-facing compatibility copy**
   - Change the FAQ’s Android answers from “not yet” and “coming soon” to currently available.
   - Update non-blog product, comparison, facts, shop, and explainer pages that call Detach “iPhone only” or list only iPhone as its platform.
   - Preserve the confirmed iPhone requirement of iOS 17+, while avoiding an unverified Android version requirement.

2. **Add the Android download destination**
   - Add Google Play links beside relevant Apple App Store links and download actions on non-blog pages.
   - Keep the Apple Smart App Banner unchanged because it is an Apple browser feature.

3. **Correct AI and search-readable information**
   - Update `llms.txt`, structured data, page metadata, shared fact/specification blocks, and MCP product/site-link responses.
   - Represent supported operating systems as iOS 17+ and Android, and include both official store URLs where the format supports them.
   - Update the facts page’s verification date to September 2026.

4. **Keep comparisons accurate**
   - Remove claims that Android support is a reason to choose a competitor.
   - Update Detach platform cells and Android-specific comparison answers without changing unrelated competitor claims.

5. **Verify**
   - Search the non-blog code and public AI-readable files again for outdated “iPhone only,” “not on Android,” and “Android coming soon” statements.
   - Run the relevant tests/build and check key pages at desktop and mobile sizes.

## Technical scope
Likely files include shared schema and GEO blocks, FAQ/facts/comparison/product pages, homepage metadata, `public/llms.txt`, and MCP product/site-link tools. Files containing blog content will be explicitly excluded.
