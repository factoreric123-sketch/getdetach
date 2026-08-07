import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import { JsonLd, ComparisonTable, Breadcrumbs, Quotable, FaqSection } from "@/components/geo/GeoBlocks";
import { breadcrumbSchema, cardProductSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/schema";

const PATH = "/detach-vs-brick";

const faqs = [
  {
    question: "What is the difference between Detach and Brick?",
    answer:
      "Both block apps until you tap a physical object. Detach is an iPhone app with a $9.99 card and no subscription. Brick is a $59 to $71 hardware device that also supports Android.",
  },
  {
    question: "Is Detach cheaper than Brick?",
    answer:
      "Yes. Detach costs $9.99 for the card with a free app and free worldwide shipping. Brick costs roughly $59 to $71 depending on region and bundle.",
  },
  {
    question: "Does Detach work on Android?",
    answer: "No. Detach is iPhone only and requires iOS 17 or later. Brick supports both iPhone and Android.",
  },
  {
    question: "Which one is harder to bypass?",
    answer:
      "Detach's strict mode keeps the block in place even if the app is deleted, and emergency unlocks are limited to the number you set yourself. Brick relies on its device being out of reach.",
  },
];

const DetachVsBrick = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "Detach vs Brick: Price, Platform and Blocking Compared",
      description:
        "Detach vs Brick compared on price, platform, subscription, blocking method and bypass difficulty. Detach is $9.99 on iPhone; Brick is $59 to $71 cross platform.",
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
            { name: "Detach vs Brick", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs current="Detach vs Brick" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Detach vs Brick</h1>

          <Quotable>
            Detach and Brick both block phone apps until you tap a physical object. Detach is an iPhone
            only app with a $9.99 card and no subscription. Brick is a $59 to $71 hardware device that
            works on iPhone and Android.
          </Quotable>

          <ComparisonTable
            caption="Detach compared with Brick"
            columns={["Detach", "Brick"]}
            rows={[
              { name: "Price", cells: ["$9.99 card, free app", "$59 to $71 device"] },
              { name: "Subscription", cells: ["None", "None"] },
              { name: "Platform", cells: ["iPhone, iOS 17+", "iPhone and Android"] },
              { name: "Unlock method", cells: ["Tap the Detach card", "Tap the Brick device"] },
              { name: "Blocking technology", cells: ["Apple Screen Time APIs", "Apple Screen Time APIs"] },
              { name: "Account required", cells: ["No", "Account for app features"] },
              { name: "Strict mode", cells: ["Yes, survives app deletion", "Not equivalent"] },
              { name: "Emergency unlocks", cells: ["Configurable limit", "Emergency unbrick"] },
              { name: "Shipping", cells: ["Free worldwide", "Paid in some regions"] },
              { name: "Form factor", cells: ["Card, wallet sized", "Small plastic block"] },
            ]}
          />
          <p className="text-sm text-muted-foreground mb-10">
            Brick pricing and features last verified August 2026 from public sources. Check Brick's site
            for current details.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Choose Detach if</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>You use an iPhone on iOS 17 or later.</li>
              <li>You want the lowest cost way to add physical friction.</li>
              <li>You want a card you can leave in a drawer or another room.</li>
              <li>You want a block that holds even if you delete the app.</li>
              <li>You do not want to create an account.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Choose Brick if</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>You use Android, or share a setup across both platforms.</li>
              <li>You prefer a dedicated hardware device over a card.</li>
              <li>You want Brick's specific app ecosystem and modes.</li>
            </ul>
          </section>

          <FaqSection faqs={faqs} />

          <section>
            <h2 className="text-2xl font-semibold mb-3">Related pages</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/brick-alternative" className="text-primary underline underline-offset-2">
                  Brick alternatives at a glance
                </Link>
              </li>
              <li>
                <Link to="/blog/best-brick-alternatives-2026" className="text-primary underline underline-offset-2">
                  Best Brick alternatives in 2026
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary underline underline-offset-2">
                  Compare all physical app blockers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-primary underline underline-offset-2">
                  Buy the Detach card
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

export default DetachVsBrick;
