export const SITE = "https://getdetach.app";
export const APP_STORE_URL = "https://apps.apple.com/us/app/detach-screen-break/id6759267252";

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

export const softwareApplicationSchema = (path: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Detach",
  operatingSystem: "iOS 17",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "App Blocker",
  description:
    "Detach is an iPhone app blocker that uses NFC taps to unlock distracting apps, creating physical friction that reduces impulsive phone use.",
  url: abs(path),
  downloadUrl: APP_STORE_URL,
  brand: { "@type": "Brand", name: "Detach" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: APP_STORE_URL,
  },
});

export const cardProductSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Detach Card",
  description:
    "Physical NFC card that ends focus sessions in the Detach iOS app. One time purchase, no subscription, free worldwide shipping.",
  brand: { "@type": "Brand", name: "Detach" },
  category: "App Blocker",
  url: `${SITE}/shop`,
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE}/shop`,
    priceValidUntil: "2027-12-31",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
      shippingDestination: { "@type": "DefinedRegion", name: "Worldwide" },
    },
  },
});

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const faqPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const howToSchema = ({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  totalTime: "PT5M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "9.99" },
  supply: [{ "@type": "HowToSupply", name: "Detach card" }],
  tool: [{ "@type": "HowToTool", name: "iPhone running iOS 17 or later" }],
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});
