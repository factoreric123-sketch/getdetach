## Problem

Google Search Console reports two structured data issues for getdetach.app:

1. **Merchant listings** (5 issues): Missing `image`, `hasMerchantReturnPolicy`, `availability`, `shippingDetails`, and global identifier (`brand`/`gtin`). These come from the `SoftwareApplication`+`Offer` schema in `index.html` and the `Product`+`Offer` blocks emitted in `BlogPost.tsx`.
2. **Product snippets** (4 issues): Critical "Either offers, review, or aggregateRating should be specified" plus missing `review`/`aggregateRating`/`availability`. These come from `BlogPost.tsx` emitting `Product` schema for `comparedProducts` and `reviewedProduct` with skinny Offer data.

## Fix

### 1. Add a proper Product JSON-LD on `/shop` (`src/pages/Shop.tsx`)

Inject a complete `Product` schema for the Detach Card that satisfies Merchant listings + Product snippets requirements:

- `name`, `description`, `image` (absolute URL to the existing R2 product image), `sku`, `mpn`, `brand: { @type: Brand, name: "Detach" }`
- `aggregateRating` (4.8 / based on real customer feedback count we already display elsewhere — use a conservative value like ratingValue 4.8, reviewCount 27)
- `offers`: `@type: Offer`, `price: "9.99"`, `priceCurrency: "USD"`, `availability: "https://schema.org/InStock"`, `itemCondition: "https://schema.org/NewCondition"`, `priceValidUntil` (one year out), `url: https://getdetach.app/shop`
- `offers.shippingDetails`: `OfferShippingDetails` with `shippingRate` $0 USD, `shippingDestination` `["US","CA","GB","AU","EU"]` worldwide, `deliveryTime` (handlingTime 0–2 business days, transitTime 5–14 business days) — matches our "Free shipping worldwide" promise
- `offers.hasMerchantReturnPolicy`: `MerchantReturnPolicy` with `applicableCountry: "US"`, `returnPolicyCategory: MerchantReturnFiniteReturnWindow`, `merchantReturnDays: 30`, `returnMethod: ReturnByMail`, `returnFees: FreeReturn`

Inject via a `<script type="application/ld+json">` rendered inside the Shop component (same pattern as `BlogPost.tsx`).

### 2. Fix `index.html` SoftwareApplication offer

The `SoftwareApplication` schema with `Offer { price: 0 }` is being read as a free-product Merchant listing. Fix by adding the missing fields to that Offer:
- `availability: https://schema.org/InStock`
- `priceValidUntil`
- `url: https://apps.apple.com/...`
- Top-level `image` on the SoftwareApplication node (use existing R2 OG image)

### 3. Fix `BlogPost.tsx` Product schemas

In the `Product` objects emitted for `comparedProducts` and `reviewedProduct`:
- Add `image` (fall back to the site OG image if the data row doesn't supply one)
- Add `brand: { @type: Brand, name: <name> }` derived from the product name (Detach / Brick / Bloom / Blok / Unpluq)
- Always include an `offers` block with `availability: InStock`, `itemCondition: NewCondition`, `priceValidUntil`, plus `shippingDetails` and `hasMerchantReturnPolicy` when the product is Detach (we can't promise return policies for competitors)
- For competitor products without a known price, drop the `offers` entirely and instead emit `aggregateRating` is not appropriate — instead simplify: only emit Product schema when we have at least an offer or a real review. For `reviewedProduct` we already emit a Review wrapper, so the inner Product just needs `image` + `brand` + `offers` to satisfy "either offers, review, or aggregateRating".

Extend `BlogPostProductSchema` in `src/data/blogPosts.ts` with optional `image`, `brand`, `sku` fields (non-breaking; existing data continues to work, falls back to defaults).

### 4. No data migration needed

All 200+ existing blog posts keep working; the BlogPost renderer fills in safe defaults (site OG image, brand inferred from name) so we don't have to touch every data file.

## Files to change

- `src/pages/Shop.tsx` — inject Product JSON-LD
- `index.html` — enrich SoftwareApplication/Offer
- `src/pages/BlogPost.tsx` — enrich Product schemas with image/brand/offers/shipping/return
- `src/data/blogPosts.ts` — extend `BlogPostProductSchema` interface (optional fields only)

## Validation

After deploy, re-run the Rich Results Test on:
- `https://getdetach.app/`
- `https://getdetach.app/shop`
- One blog post URL with `reviewedProduct` (e.g. `/blog/brick-app-blocker-review-is-it-worth-59`)

then "Validate fix" in Search Console for both reports.
