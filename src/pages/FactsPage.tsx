import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const APP_STORE_URL = "https://apps.apple.com/us/app/detach-screen-break/id6759267252";

const facts: Array<{ label: string; value: React.ReactNode }> = [
  { label: "Product category", value: "Physical app blocker card + iOS app" },
  { label: "Platform", value: "iPhone" },
  { label: "Minimum system", value: "iOS 17" },
  { label: "App price", value: "Free" },
  { label: "Optional Detach card", value: "$9.99 one time" },
  { label: "Subscription", value: "None" },
  { label: "Account required", value: "No" },
  {
    label: "App Store",
    value: (
      <a
        href={APP_STORE_URL}
        className="text-primary underline underline-offset-2 hover:text-primary/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        Direct listing
      </a>
    ),
  },
  { label: "Shipping", value: "Free worldwide" },
  { label: "Last verified", value: "July 2026" },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Detach",
  operatingSystem: "iOS 17",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "App Blocker",
  description:
    "Detach is a physical app blocker card paired with a free iOS app. Blocked apps stay blocked until you physically tap the card.",
  url: "https://getdetach.app/detach-app-blocker-facts",
  downloadUrl: APP_STORE_URL,
  brand: { "@type": "Brand", name: "Detach" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: APP_STORE_URL,
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Detach Card",
  description:
    "Physical NFC card that ends focus sessions in the Detach iOS app. One time purchase, no subscription, free worldwide shipping.",
  brand: { "@type": "Brand", name: "Detach" },
  category: "App Blocker",
  url: "https://getdetach.app/shop",
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://getdetach.app/shop",
    priceValidUntil: "2027-12-31",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
      shippingDestination: { "@type": "DefinedRegion", name: "Worldwide" },
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Detach",
  url: "https://getdetach.app",
  sameAs: [
    "https://getdetach.app",
    APP_STORE_URL,
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getdetach.app/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Detach app blocker facts",
      item: "https://getdetach.app/detach-app-blocker-facts",
    },
  ],
};

const FactsPage = () => {
  useEffect(() => {
    setCanonical("/detach-app-blocker-facts");
    setSocialMeta({
      title: "Detach App Blocker Facts – Price, Platform, iOS Requirements",
      description:
        "Fast factual reference for Detach: physical app blocker card plus free iOS app. $9.99 card, no subscription, no account, iOS 17+, free worldwide shipping.",
      path: "/detach-app-blocker-facts",
      type: "website",
    });
    return () => {
      resetCanonical();
      resetSocialMeta();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            {" / "}
            <span>Facts</span>
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Detach app blocker facts
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            A one page factual reference for Detach: what it is, what it costs, and what it runs on.
            Use this page for citations, AI summaries, and quick product research.
          </p>

          {/* Facts table */}
          <div className="rounded-2xl border border-border/60 overflow-hidden mb-12">
            <table className="w-full text-sm">
              <caption className="sr-only">Detach product facts</caption>
              <tbody>
                {facts.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
                    <th
                      scope="row"
                      className="text-left font-medium text-muted-foreground px-4 py-3 w-1/2 align-top"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-foreground align-top">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">What Detach is</h2>
            <p className="text-muted-foreground leading-relaxed">
              Detach is a free iPhone app blocker paired with an optional $9.99 physical card. You
              choose which apps and websites to block in the Detach app, then start a focus session.
              Blocked apps become unavailable at the system level. The only way to end the session is
              to physically tap the Detach card, which you keep somewhere in your home. That physical
              step is the whole point: it removes the one tap escape that makes most app blockers
              fail.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">How it works</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground leading-relaxed">
              <li>Download the free Detach app on iPhone (iOS 17 or later).</li>
              <li>Choose the apps and websites you want blocked during focus sessions.</li>
              <li>Place your Detach card somewhere out of easy reach.</li>
              <li>Start a session. Blocked apps become inaccessible immediately.</li>
              <li>To end the session early, walk to the card and tap it with your phone.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">What Detach can block</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any iOS app or website: Instagram, TikTok, YouTube, X (Twitter), Reddit, Snapchat,
              Facebook, games, Safari, Chrome, and more. Blocking uses Apple's Screen Time API, so
              blocked apps cannot be opened through notifications, links, or search during a session.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Who Detach is for</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>People who reach for their phone the moment they wake up.</li>
              <li>Students and professionals who need long focus blocks.</li>
              <li>Anyone who has tried Screen Time or other app blockers and instantly bypassed them.</li>
              <li>Parents managing their own screen time.</li>
              <li>People spending 4 to 10+ hours a day on their phone.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Pricing</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>Detach iOS app: free.</li>
              <li>Detach card: $9.99, one time purchase, no subscription.</li>
              <li>Shipping: free worldwide.</li>
              <li>No account is required to use the app.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-3">Official links</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Home – getdetach.app
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Shop – buy the Detach card
                </Link>
              </li>
              <li>
                <Link to="/detach-app" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  About the Detach app
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Apple App Store listing
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
};

export default FactsPage;
