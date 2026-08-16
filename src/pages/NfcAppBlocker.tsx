import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import {
  JsonLd,
  FactsTable,
  ComparisonTable,
  SpecList,
  Breadcrumbs,
  Quotable,
  FaqSection,
} from "@/components/geo/GeoBlocks";
import {
  APP_STORE_URL,
  breadcrumbSchema,
  faqPageSchema,
  softwareApplicationSchema,
} from "@/lib/schema";

const PATH = "/nfc-app-blocker";

const faqs = [
  {
    question: "What is an NFC app blocker?",
    answer:
      "An NFC app blocker is an app that blocks distracting apps on your phone and only unblocks them when you physically tap an NFC card or tag. The tap replaces a passcode or a timer, so ending a block requires walking to a physical object instead of tapping a button.",
  },
  {
    question: "Which NFC app blockers exist for iPhone?",
    answer:
      "Detach ($9.99 card), Brick ($59 to $71 device), Bloom ($47 plus subscription), Blok ($59) and Unpluq (about $59 plus subscription) all use a physical tap to unblock apps. Detach is the lowest cost option and has no subscription.",
  },
  {
    question: "Does an NFC app blocker work without internet?",
    answer:
      "Yes. Blocking runs locally through Apple's Screen Time APIs and the NFC tap is a local hardware read, so sessions hold with no connection.",
  },
  {
    question: "Can you bypass an NFC app blocker?",
    answer:
      "It depends on the product. In Detach's strict mode, deleting the app does not lift the block, so the session holds until the card is tapped or a configured emergency unlock is used.",
  },
  {
    question: "Is an NFC app blocker better than Screen Time limits?",
    answer:
      "For most people yes, because Screen Time limits can be dismissed with a passcode you already know. An NFC blocker requires physical access to the card, which interrupts the automatic habit loop rather than asking you to resist it.",
  },
];

const facts = [
  { label: "Category", value: "NFC app blocker (physical unlock app blocker)" },
  { label: "How unlocking works", value: "Tap an NFC card with your iPhone" },
  { label: "Detach card price", value: "$9.99 one time" },
  { label: "Detach app price", value: "Free" },
  { label: "Platform", value: "iPhone, iOS 17 or later" },
  { label: "Subscription", value: "None" },
  { label: "Blocking technology", value: "Apple Screen Time APIs" },
  { label: "Shipping", value: "Free worldwide" },
  { label: "Last verified", value: "August 2026" },
];

const NfcAppBlocker = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "NFC App Blocker: How They Work and Which One to Buy (2026)",
      description:
        "An NFC app blocker unblocks distracting apps only when you tap a physical card. Compare Detach, Brick, Bloom, Blok and Unpluq on price, platform and bypass difficulty.",
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
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "NFC app blocker", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs current="NFC app blocker" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">NFC app blocker</h1>

          <Quotable>
            An NFC app blocker is an app that blocks distracting apps on your phone and unblocks them
            only when you physically tap an NFC card. Detach is an iPhone NFC app blocker: the app is
            free, the card is $9.99 one time, and the tap creates physical friction that reduces
            impulsive phone use.
          </Quotable>

          <FactsTable caption="NFC app blocker facts" rows={facts} />

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">How an NFC app blocker works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You pick the apps and websites to block inside the app, then start a session. Blocking
              happens at the operating system level, so blocked apps cannot be opened through the home
              screen, notifications, links or search. To end the session early, you hold your phone
              against the NFC card. The card holds no personal data. It is only a trigger.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The behavioral point is distance. A passcode-based blocker is defeated in one second
              because the escape hatch is in your hand. A card kept in another room turns "unblock
              Instagram" into a decision that takes 30 seconds of walking, which is usually enough for
              the impulse to pass.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Detach specifications</h2>
            <SpecList />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">NFC app blockers compared</h2>
            <ComparisonTable
              caption="NFC app blockers compared by price, platform and subscription"
              columns={["Price", "Subscription", "Platform", "Notable strength"]}
              rows={[
                {
                  name: "Detach",
                  cells: ["$9.99 card", "None", "iPhone (iOS 17+)", "Lowest cost, strict mode"],
                },
                {
                  name: "Brick",
                  cells: ["$59 to $71", "None", "iPhone and Android", "Polished hardware, Android support"],
                },
                {
                  name: "Bloom",
                  cells: ["$47 device", "Yes", "iPhone and Android", "Coaching content"],
                },
                { name: "Blok", cells: ["$59", "None", "iPhone and Android", "Multi-tag setups"] },
                {
                  name: "Unpluq",
                  cells: ["About $59", "Yes", "iPhone and Android", "Multiple unlock challenges"] ,
                },
              ]}
            />
            <p className="text-sm text-muted-foreground">
              Prices last verified August 2026. Competitor pricing changes, so check their sites before
              buying. Full breakdown on the{" "}
              <Link to="/compare" className="text-primary underline underline-offset-2">
                comparison hub
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Who an NFC app blocker is for</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>People who open social apps automatically after unlocking their phone.</li>
              <li>Anyone who has set Screen Time limits and tapped straight through them.</li>
              <li>Students and knowledge workers who need multi hour focus blocks.</li>
              <li>People who want their phone unusable for scrolling in the first hour after waking.</li>
              <li>Anyone who wants a hardware solution without a subscription.</li>
            </ul>
          </section>

          <FaqSection faqs={faqs} />

          <section>
            <h2 className="text-2xl font-semibold mb-3">Related reading</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/how-nfc-focus-apps-work" className="text-primary underline underline-offset-2">
                  How NFC focus apps work, step by step
                </Link>
              </li>
              <li>
                <Link to="/detach-faq" className="text-primary underline underline-offset-2">
                  Detach FAQ
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary underline underline-offset-2">
                  Compare every physical app blocker
                </Link>
              </li>
              <li>
                <Link to="/detach-app-blocker-facts" className="text-primary underline underline-offset-2">
                  Detach product facts
                </Link>
              </li>
              <li>
                <Link to="/blog/all-nfc-phone-blockers-compared-2026" className="text-primary underline underline-offset-2">
                  All NFC phone blockers compared
                </Link>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Detach on the App Store
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NfcAppBlocker;
