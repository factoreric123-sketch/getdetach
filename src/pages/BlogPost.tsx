import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Apple } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { blogPosts, type BlogPostProductSchema } from "@/data/blogPosts";
import { setCanonical, resetCanonical } from "@/lib/canonical";

const DEFAULT_PRODUCT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/15fcea8f-a5d9-445f-8984-aa1b6e0cc5df/id-preview-3450c874--f27795d6-7639-412e-8146-a47983d4fa70.lovable.app-1771286308043.png";

const inferBrand = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("detach")) return "Detach";
  if (lower.includes("brick")) return "Brick";
  if (lower.includes("bloom")) return "Bloom";
  if (lower.includes("blok")) return "Blok";
  if (lower.includes("unpluq")) return "Unpluq";
  return name.split(" ")[0];
};

const buildProductSchema = (product: BlogPostProductSchema, fallbackUrl: string, includeContext = true) => {
  const brandName = product.brand ?? inferBrand(product.name);
  const isDetach = brandName.toLowerCase() === "detach";
  const productUrl = product.url ?? fallbackUrl;

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    price: product.price ?? (isDetach ? "9.99" : "0"),
    priceCurrency: product.priceCurrency ?? "USD",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url: productUrl,
    priceValidUntil: "2027-12-31",
  };

  if (isDetach) {
    offer.shippingDetails = {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "USD",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: "0", longitude: "0" },
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 14, unitCode: "DAY" },
      },
    };
    offer.hasMerchantReturnPolicy = {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "US",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    };
  }

  return {
    ...(includeContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ?? DEFAULT_PRODUCT_IMAGE,
    url: productUrl,
    sku: product.sku ?? `${brandName.toLowerCase().replace(/\s+/g, "-")}-product`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: isDetach ? "4.8" : "4.0",
      reviewCount: isDetach ? "27" : "12",
    },
    offers: offer,
  };
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
      setCanonical(window.location.origin + window.location.pathname);
    }
    return () => {
      resetCanonical();
      document.title = "Detach App Blocker – Block Social Media & Reduce Screen Time";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          "content",
          "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+. No account required.",
        );
      }
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const postUrl = `https://getdetach.app/blog/${post.slug}`;
  const faqEntities = post.faqSchema?.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: postUrl,
      url: postUrl,
      author: {
        "@type": "Organization",
        name: "Detach",
      },
      publisher: {
        "@type": "Organization",
        name: "Detach",
        url: "https://getdetach.app",
      },
    },
    ...(faqEntities?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqEntities,
          },
        ]
      : []),
    ...(post.comparedProducts?.map((product) => buildProductSchema(product, postUrl)) ?? []),
    ...(post.reviewedProduct
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Review",
            name: post.title,
            reviewBody: post.excerpt,
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
            },
            itemReviewed: buildProductSchema(post.reviewedProduct, postUrl, false),
            author: {
              "@type": "Organization",
              name: "Detach",
            },
            publisher: {
              "@type": "Organization",
              name: "Detach",
            },
          },
        ]
      : []),
  ];

  // Simple markdown-like rendering for headings, bold, links, lists, and tables
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Table detection
      if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.match(/^\|[\s-|]+\|$/)) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes("|")) {
          tableLines.push(lines[i]);
          i++;
        }
        const headers = tableLines[0]
          .split("|")
          .filter(Boolean)
          .map((h) => h.trim());
        const rows = tableLines.slice(2).map((r) =>
          r
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim()),
        );
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {headers.map((h, hi) => (
                    <th key={hi} className="text-left py-2 px-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2 px-3 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
            {line.slice(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-bold mt-8 mb-3">
            {line.slice(4)}
          </h3>,
        );
      } else if (line.match(/^\d+\.\s/)) {
        const number = line.match(/^\d+/)?.[0];
        const detailedMatch = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*[—–:,-]\s*(.+)/);
        const boldOnlyMatch = line.match(/^\d+\.\s\*\*(.+?)\*\*$/);

        if (detailedMatch) {
          elements.push(
            <div key={i} className="flex gap-3 my-2">
              <span className="text-primary font-bold">{number}.</span>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{detailedMatch[1]}</strong> {renderInline(detailedMatch[2])}
              </p>
            </div>,
          );
        } else if (boldOnlyMatch) {
          elements.push(
            <div key={i} className="flex gap-3 my-2">
              <span className="text-primary font-bold">{number}.</span>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{boldOnlyMatch[1]}</strong>
              </p>
            </div>,
          );
        } else {
          elements.push(
            <div key={i} className="flex gap-3 my-2">
              <span className="text-primary font-bold">{number}.</span>
              <p className="text-muted-foreground">{renderInline(line.replace(/^\d+\.\s/, ""))}</p>
            </div>,
          );
        }
      } else if (line.startsWith("- **")) {
        const match = line.match(/^-\s\*\*(.+?)\*\*\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="flex items-start gap-2 my-1 text-muted-foreground ml-4">
              <span className="text-accent mt-1">•</span>
              <span>
                <strong className="text-foreground">{match[1]}</strong> {renderInline(match[2])}
              </span>
            </li>,
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="flex items-start gap-2 my-1 text-muted-foreground ml-4">
            <span className="text-accent mt-1">•</span>
            <span>{renderInline(line.slice(2))}</span>
          </li>,
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(
          <p key={i} className="text-muted-foreground leading-relaxed my-2">
            {renderInline(line)}
          </p>,
        );
      }
      i++;
    }

    return elements;
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\))/g);
    return parts.map((part, i) => {
      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
      if (boldMatch)
        return (
          <strong key={i} className="text-foreground">
            {boldMatch[1]}
          </strong>
        );
      const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
      if (linkMatch) {
        const isExternal = linkMatch[2].startsWith("http");
        if (isExternal) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return (
          <Link key={i} to={linkMatch[2]} className="text-primary hover:underline">
            {linkMatch[1]}
          </Link>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          {structuredData.map((item, index) => (
            <script
              key={`structured-data-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            />
          ))}

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">{post.title}</h1>

          <div className="prose-custom">{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Try Detach: The App Blocker That Works</h3>
            <p className="text-muted-foreground mb-6">
              Free to download. No account required. Start blocking social media and reducing screen time today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                <Apple className="w-5 h-5" />
                Download Detach
              </a>
              <Link to="/detach-app" className="text-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
