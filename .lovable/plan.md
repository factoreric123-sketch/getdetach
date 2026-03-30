

# SEO Domination Plan for "Detach App"

## Overview

Restructure the site to rank #1 for "detach app", "detach app blocker", and "what is detach app" by adding keyword-rich pages, a blog system, and stronger on-page SEO signals — without redesigning anything.

---

## 1. Homepage SEO Rewrite

**File: `index.html`**
- Title tag: `Detach App Blocker – Block Social Media & Reduce Screen Time`
- Meta description: `Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+.`
- Update OG/Twitter tags to match

**File: `src/components/landing/Hero.tsx`**
- H1: `Detach – App Blocker for Social Media & Screen Time`
- First paragraph: "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Tap an NFC tag to start — creating real friction between you and your screen."

**File: `src/pages/Index.tsx`**
- Add a new `WhatIsDetach` section between Hero and Features
- Content: short explainer reinforcing "Detach is an app blocker that blocks social media and reduces screen time"
- Links to `/detach-app` for more detail

## 2. Brand Page: `/detach-app`

**New file: `src/pages/DetachApp.tsx`**

A dedicated SEO landing page targeting all brand searches. Includes:
- H1: "What is Detach App? The App Blocker That Reduces Screen Time"
- Clear explanation section
- How it works (reuse steps)
- Who it's for section
- FAQ accordion with questions:
  - "What is Detach app?"
  - "How does Detach block apps?"
  - "Is Detach free?"
  - "Is Detach better than other app blockers?"
  - "Does Detach work on Android?"
- CTAs linking to App Store and homepage
- Uses existing Navbar + Footer
- Page title & meta description set via useEffect

**Add route** `/detach-app` in `App.tsx`

## 3. Blog System

**New files:**
- `src/pages/Blog.tsx` — blog index page listing all posts
- `src/pages/BlogPost.tsx` — single post template
- `src/data/blogPosts.ts` — static blog post data (title, slug, content, meta)

**Routes:**
- `/blog` — index
- `/blog/:slug` — individual post

**Pre-created posts (stored as static data):**
1. `what-is-detach-app` — "What is Detach App and How Does It Work?"
2. `detach-app-review` — "Detach App Review: Does It Actually Reduce Screen Time?"
3. `how-detach-blocks-social-media` — "How Detach Blocks Social Media Without Willpower"
4. `detach-vs-other-app-blockers` — "Detach vs Other App Blockers: What's Different?"

Each post:
- Mentions "Detach app" and "app blocker" naturally throughout
- Links to `/` and `/detach-app`
- Ends with a CTA: "Try Detach" linking to App Store
- Has its own meta title + description via useEffect

## 4. Internal Linking

- Footer: add links to `/detach-app` and `/blog`
- Navbar: add "Blog" link
- Homepage WhatIsDetach section links to `/detach-app`
- Every blog post links to homepage and `/detach-app`
- `/detach-app` links to blog posts and homepage

## 5. Keyword Reinforcement Across Existing Sections

- **Features heading**: "App Blocker Features That Keep You Focused"
- **Features intro**: mention "Detach app blocker" naturally
- **Footer tagline**: "Detach — the app blocker for reducing screen time"

## 6. Structured Data & Technical SEO

**File: `index.html`**
- Add `Organization` schema (name: Detach, url, logo)
- Update existing `SoftwareApplication` schema — add "applicationSubCategory": "App Blocker"

**File: `public/sitemap.xml`**
- Add `/detach-app`, `/blog`, and all 4 blog post URLs

---

## Technical Details

- All blog content is static data in `src/data/blogPosts.ts` — no backend needed
- Blog posts rendered via a shared `BlogPost` component using route params to match slugs
- Each page sets `document.title` and meta description via `useEffect`
- Existing design system (glass-card, text-gradient, Nunito font) used throughout
- No new dependencies needed (accordion already exists for FAQ)

## Files to Create
- `src/components/landing/WhatIsDetach.tsx`
- `src/pages/DetachApp.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/data/blogPosts.ts`

## Files to Edit
- `index.html` — title, meta, structured data
- `src/App.tsx` — add 3 new routes
- `src/pages/Index.tsx` — add WhatIsDetach section
- `src/components/landing/Hero.tsx` — update H1 and first paragraph
- `src/components/landing/Features.tsx` — keyword-rich heading
- `src/components/landing/Footer.tsx` — add blog/brand page links, update tagline
- `src/components/landing/Navbar.tsx` — add Blog link
- `public/sitemap.xml` — add new URLs

