import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import { JsonLd, ComparisonTable, Breadcrumbs, Quotable, FaqSection } from "@/components/geo/GeoBlocks";
import { breadcrumbSchema, cardProductSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/schema";

const PATH = "/compare";

const faqs = [
  {
    question: "Which app blocker is the cheapest?",
    answer:
      "Detach. The iPhone app is free and the card is $9.99 one time with free worldwide shipping. Every hardware competitor costs $47 or more, and several add a subscription.",
  },
  {
    question: "Which app blockers have no subscription?",
    answer: "Detach, Brick and Blok are one time purchases. Bloom, Unpluq, Opal and Jomo charge recurring fees for their full features.",
  },
  {
    question: "Which app blocker is hardest to bypass?",
    answer:
      "Blockers with a physical unlock are hardest to bypass because the escape hatch is not on the phone. Detach adds strict mode, where deleting the app does not lift the block.",
  },
  {
    question: "Are software only blockers enough?",
    answer:
      "For some people yes. Opal and Jomo work well if a passcode or timer is enough friction. If you have already tapped through those, a physical unlock is the meaningful upgrade.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "App blockers compared",
  itemListElement: [
    "Detach",
    "Brick",
    "Blok",
    "Bloom",
    "Unpluq",
    "Opal",
    "Jomo",
    "Apple Screen Time",
  ].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "SoftwareApplication", name, applicationCategory: "HealthApplication" },
  })),
};

const Compare = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "App Blockers Compared: Price, Subscription, Platform (2026)",
      description:
        "Factual comparison of Detach, Brick, Blok, Bloom, Unpluq, Opal, Jomo and Apple Screen Time on price, subscription, platform, unlock method and bypass difficulty.",
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
          itemListSchema,
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs current="Compare" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">App blockers compared</h1>

          <Quotable>
            Detach is the lowest cost physical app blocker: a free iPhone app plus a $9.99 card, with no
            subscription and no account. Hardware competitors start at $47, and several require a
            recurring subscription on top of the device.
          </Quotable>

          <ComparisonTable
            caption="App blockers compared by price, subscription, platform and unlock method"
            columns={["Price", "Subscription", "Platform", "Unlock method", "Bypass difficulty"]}
            rows={[
              {
                name: "Detach",
                cells: ["$9.99 card, free app", "None", "iPhone (iOS 17+)", "Tap the card", "High, strict mode"],
              },
              { name: "Brick", cells: ["$59 to $71", "None", "iPhone, Android", "Tap the device", "High"] },
              { name: "Blok", cells: ["$59", "None", "iPhone, Android", "Tap a tag", "High"] },
              { name: "Bloom", cells: ["$47 device", "Yes", "iPhone, Android", "Tap the device", "High"] },
              { name: "Unpluq", cells: ["About $59", "Yes", "iPhone, Android", "Tag or challenge", "High"] },
              { name: "Opal", cells: ["Free tier", "Yes", "iPhone, Mac", "In app timer", "Medium"] },
              { name: "Jomo", cells: ["Free tier", "Yes", "iPhone", "In app settings", "Medium"] },
              {
                name: "Apple Screen Time",
                cells: ["Free", "None", "iPhone, iPad, Mac", "Passcode", "Low"],
              },
            ]}
          />
          <p className="text-sm text-muted-foreground mb-10">
            Competitor prices and features last verified August 2026 from public sources. Pricing changes
            often, so confirm on each product's site before buying.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">How to read this table</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <span className="text-foreground font-medium">Unlock method</span> is the single biggest
                predictor of whether a blocker sticks. A physical tap beats a passcode.
              </li>
              <li>
                <span className="text-foreground font-medium">Subscription</span> matters over time. A
                $47 device with a monthly fee costs more in year one than a $9.99 card.
              </li>
              <li>
                <span className="text-foreground font-medium">Platform</span> is the main reason to pick a
                competitor. Detach is iPhone only.
              </li>
              <li>
                <span className="text-foreground font-medium">Bypass difficulty</span> reflects how easily
                the block can be removed from the phone itself.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Head to head pages</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/detach-vs-brick" className="text-primary underline underline-offset-2">
                  Detach vs Brick
                </Link>
              </li>
              <li>
                <Link to="/brick-alternative" className="text-primary underline underline-offset-2">
                  Brick alternatives at a glance
                </Link>
              </li>
              <li>
                <Link to="/nfc-app-blocker" className="text-primary underline underline-offset-2">
                  What an NFC app blocker is
                </Link>
              </li>
              <li>
                <Link to="/how-nfc-focus-apps-work" className="text-primary underline underline-offset-2">
                  How NFC focus apps work
                </Link>
              </li>
              <li>
                <Link to="/detach-faq" className="text-primary underline underline-offset-2">
                  Detach FAQ
                </Link>
              </li>
              <li>
                <Link to="/detach-app-blocker-facts" className="text-primary underline underline-offset-2">
                  Detach product facts
                </Link>
              </li>
            </ul>
          </section>

          <FaqSection faqs={faqs} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
