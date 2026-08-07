import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import { JsonLd, Breadcrumbs, Quotable, FaqSection, SpecList } from "@/components/geo/GeoBlocks";
import { breadcrumbSchema, faqPageSchema, howToSchema, softwareApplicationSchema } from "@/lib/schema";

const PATH = "/how-nfc-focus-apps-work";

const steps = [
  {
    name: "Install the app",
    text: "Download the Detach app on an iPhone running iOS 17 or later. No account is required.",
  },
  {
    name: "Grant Screen Time permission",
    text: "Approve the Screen Time permission so the app can block chosen apps at the operating system level.",
  },
  {
    name: "Pick what to block",
    text: "Select the apps and websites you want blocked during sessions, such as Instagram, TikTok, YouTube, X, Reddit or Safari.",
  },
  {
    name: "Place the card away from you",
    text: "Put the NFC card somewhere that takes effort to reach, like a kitchen drawer or another room.",
  },
  {
    name: "Start a session",
    text: "Start a manual session or let a scheduled session begin. Blocked apps become unavailable immediately.",
  },
  {
    name: "Tap the card to unblock",
    text: "To end a session early, hold the top of your iPhone against the card. The NFC read ends the block.",
  },
];

const faqs = [
  {
    question: "Do NFC focus apps need a battery or charging?",
    answer:
      "No. An NFC card is passive. It draws power from the phone's NFC reader during the tap, so there is nothing to charge or replace.",
  },
  {
    question: "Does the card store personal data?",
    answer:
      "No. The card holds a small identifier that the app recognizes. Your app selections and session history stay on your device.",
  },
  {
    question: "What happens if I lose the card?",
    answer:
      "Sessions still expire on their own, and you can use a configured emergency unlock. You can also pair a replacement card.",
  },
  {
    question: "Where is NFC on an iPhone?",
    answer:
      "The NFC antenna sits at the top back edge of the iPhone, so hold that part of the phone against the card for the tap to register.",
  },
  {
    question: "Can I use several cards?",
    answer:
      "Yes. Some people keep one card at home and one at the office so a session can end in either place.",
  },
];

const HowNfcFocusAppsWork = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "How NFC Focus Apps Work: Step by Step Explainer",
      description:
        "NFC focus apps block distracting apps until you tap a physical card. Here is the exact setup, what the tap does, and why physical friction beats a passcode.",
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
          howToSchema({
            name: "How to set up an NFC focus app on iPhone",
            description:
              "Set up an NFC app blocker so distracting apps stay blocked until you tap a physical card.",
            steps,
          }),
          softwareApplicationSchema(PATH),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How NFC focus apps work", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs current="How NFC focus apps work" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How NFC focus apps work</h1>

          <Quotable>
            An NFC focus app blocks selected apps through the phone's operating system and only lifts
            the block when the phone reads a physical NFC card. The tap is a hardware event, so ending
            a session requires being next to the card instead of remembering a passcode.
          </Quotable>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Setup in six steps</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground leading-relaxed">
              {steps.map((s) => (
                <li key={s.name}>
                  <span className="text-foreground font-medium">{s.name}.</span> {s.text}
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">What NFC actually does here</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              NFC is short range wireless communication that works over a couple of centimeters. The
              card is passive: it has no battery and does nothing until an iPhone's NFC reader powers
              it during the tap. The card sends a small identifier, the app recognizes it, and the
              block ends. Nothing is transmitted over the internet and no personal data is stored on
              the card.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the trigger is physical, the app can be strict without being fragile. A blocker
              that asks for a passcode is only as strong as your willpower in the moment. A blocker
              that asks you to stand up is strong by default.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why physical friction works</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>It breaks the automatic loop of unlocking and opening a feed without deciding to.</li>
              <li>It adds a delay long enough for the urge to fade on its own.</li>
              <li>It makes the choice conscious, which is the part willpower alone skips.</li>
              <li>It cannot be dismissed by a notification or a muscle memory tap.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Detach specifications</h2>
            <SpecList />
          </section>

          <FaqSection faqs={faqs} />

          <section>
            <h2 className="text-2xl font-semibold mb-3">Related pages</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/nfc-app-blocker" className="text-primary underline underline-offset-2">
                  NFC app blocker overview
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary underline underline-offset-2">
                  Comparison hub
                </Link>
              </li>
              <li>
                <Link to="/detach-app-blocker-facts" className="text-primary underline underline-offset-2">
                  Detach product facts
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

export default HowNfcFocusAppsWork;
