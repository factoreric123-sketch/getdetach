

# SEO Optimization Plan for Detach

## Problem
Searching "detach app" on Google shows competitors first. Your site (getdetach.lovable.app) needs better SEO signals to rank higher.

## Changes

### 1. Fix `index.html` meta tags
- **Title**: "Detach — Block Distracting Apps & Focus | iOS App"
- **Description**: "Detach blocks distracting apps and websites during focus sessions. Tap an NFC tag to start. Free to download on iOS 17+. No account required."
- **Remove** "Lovable Generated Project" references and `meta author="Lovable"`
- **Add** `og:url`, `og:site_name`, canonical link
- **Update** og:description and twitter:description to match
- **Add** keywords meta tag: "detach app, focus app, block apps, NFC tag, screen time, digital detox, iOS"

### 2. Add structured data (JSON-LD)
Add `SoftwareApplication` and `WebSite` schema markup in `index.html` so Google shows rich results (app name, rating, price, platform).

### 3. Add `sitemap.xml` to `public/`
List all pages: `/`, `/privacy-policy`, `/terms`, `/contact`

### 4. Update `robots.txt`
Add sitemap reference: `Sitemap: https://getdetach.lovable.app/sitemap.xml`

### 5. Improve semantic HTML
- Add proper `<h1>` usage confirmation across pages
- Ensure all images have descriptive alt text
- Add `aria-label` to key navigation links

### 6. Add page-level SEO to sub-pages
Update Privacy Policy, Terms, and Contact pages with proper `<title>` via `document.title` and meta descriptions using `react-helmet-async` or a simple `useEffect`.

## Technical Details
- All changes are frontend-only, no backend needed
- JSON-LD schema goes in `index.html` `<head>`
- Sitemap is a static XML file in `public/`
- Sub-page titles set via `useEffect` in each page component

