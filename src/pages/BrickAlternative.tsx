import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import { JsonLd, ComparisonTable, Breadcrumbs, Quotable, FaqSection } from "@/components/geo/GeoBlocks";
import { breadcrumbSchema, cardProductSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/schema";

const PATH = "/brick-alternative";

const faqs = [
  {
    question: "What is the cheapest Brick alternative?",
    answer:
      "Detach. The app is free and the card costs $9.99 one time with free worldwide shipping, compared with $59 to $71 for a Brick.",
  },
  {
    question: "Is there a Brick alternative for Android?",
    answer:
      "Blok, Bloom and Unpluq all support Android. Detach is iPhone only and requires iOS 17 or later.",
  },
  {
    question: "Do Brick alternatives work the same way?",
    answer:
      "The core mechanism is the same: apps stay blocked until you tap a physical object. They differ on price, platform support, subscription model and how hard the block is to bypass.",
  },
];

const BrickAlternative = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "Brick Alternatives Compared: Price, Platform and Bypass",
      description:
        "A short reference for Brick alternatives. Compare Detach, Bloom, Blok and Unpluq on price, subscription and platform, then read the full guides.",
      path: PATH,
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
      <JsonLd
        data={[
          softwareApplicationSchema(PATH),
          cardProductSchema(),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Brick alternative", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs current="Brick alternative" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Brick alternatives at a glance</h1>

          <Quotable>
            A Brick alternative is any product that blocks phone apps until you tap a physical object.
            The main options are Detach ($9.99 card, iPhone, no subscription), Blok ($59), Bloom ($47
            plus subscription) and Unpluq (about $59 plus subscription).
          </Quotable>

          <ComparisonTable
            caption="Brick alternatives compared"
            columns={["Price", "Subscription", "Platform", "Best for"]}
            rows={[
              { name: "Detach", cells: ["$9.99 card", "None", "iPhone (iOS 17+)", "Cheapest effective option"] },
              { name: "Brick", cells: ["$59 to $71", "None", "iPhone and Android", "Cross platform hardware"] },
              { name: "Blok", cells: ["$59", "None", "iPhone and Android", "Multiple tag placements"] },
              { name: "Bloom", cells: ["$47 device", "Yes", "iPhone and Android", "Guided coaching"] },
              { name: "Unpluq", cells: ["About $59", "Yes", "iPhone and Android", "Layered unlock challenges"] },
            ]}
          />
          <p className="text-sm text-muted-foreground mb-10">Prices last verified August 2026.</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Read the full guides</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This page is a quick reference. These two guides go deeper on which option to pick and
              why:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <Link
                  to="/blog/best-brick-alternatives-2026"
                  className="text-primary underline underline-offset-2"
                >
                  Best Brick alternatives in 2026
                </Link>{" "}
                — full ranked comparison with pros and cons.
              </li>
              <li>
                <Link
                  to="/blog/brick-alternative-what-to-buy-instead-of-brick"
                  className="text-primary underline underline-offset-2"
                >
                  Brick alternative: what to buy instead of Brick
                </Link>{" "}
                — how to decide based on your phone and budget.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Where Detach fits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Detach keeps the mechanism that makes Brick work and removes the hardware cost. You get a
              free iPhone app, a $9.99 card, no subscription and no account. Brick remains the better
              pick if you need Android support or want a dedicated hardware device.
            </p>
          </section>

          <FaqSection faqs={faqs} />

          <section>
            <h2 className="text-2xl font-semibold mb-3">More references</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/detach-vs-brick" className="text-primary underline underline-offset-2">
                  Detach vs Brick, side by side
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary underline underline-offset-2">
                  Comparison hub
                </Link>
              </li>
              <li>
                <Link to="/nfc-app-blocker" className="text-primary underline underline-offset-2">
                  What an NFC app blocker is
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrickAlternative;
