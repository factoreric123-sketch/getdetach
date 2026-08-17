import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Apple, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";
import { JsonLd, Breadcrumbs } from "@/components/geo/GeoBlocks";
import { APP_STORE_URL, breadcrumbSchema, faqPageSchema, softwareApplicationSchema } from "@/lib/schema";

const PATH = "/detach-faq";

const faqs = [
  {
    question: "How is Detach different from Apple Screen Time or Android Digital Wellbeing?",
    answer:
      "Screen Time and Digital Wellbeing limits are easy to bypass. A tap on 'ignore limit' or a passcode you already know and you are back in. Detach creates physical separation. Blocked apps stay blocked until you tap the Detach card, which you keep somewhere outside easy reach. That physical step is what makes the habit stick.",
  },
  {
    question: "Can’t I just delete the app or find a workaround?",
    answer:
      "We built Detach with Strict Mode for exactly this. In Strict Mode, deleting the app does not lift the block. You cannot change settings to bypass it. The session holds until you tap the card or use a configured emergency unlock.",
  },
  {
    question: "What’s included with a Detach purchase?",
    answer:
      "Your purchase includes the physical Detach card and full access to the Detach iPhone app. No subscriptions, no extra fees. Buy once, use forever.",
  },
  {
    question: "Does Detach ship internationally?",
    answer: "Yes. We ship worldwide and shipping is free.",
  },
  {
    question: "Is my phone compatible with Detach?",
    answer:
      "Detach currently works with iPhones running iOS 17.0 or later. An Android version is coming soon.",
  },
  {
    question: "Is Detach available on Android?",
    answer:
      "Not yet. Detach is currently iPhone only. An Android version is in development and will be released soon.",
  },
  {
    question: "What can I block with Detach?",
    answer:
      "You can block iPhone apps and selected websites in Safari and supported browsers. Use scheduled sessions, manual sessions, or strict mode to match your routine.",
  },
  {
    question: "What happens if I lose my Detach card?",
    answer:
      "Accidents happen. You can configure a limited number of emergency unlocks in the app so you are not permanently locked out.",
  },
  {
    question: "Do you track which apps I block?",
    answer:
      "No. All blocking information and session history are stored locally on your phone. We cannot see or access your block lists.",
  },
  {
    question: "How do I set up Detach with my iPhone?",
    answer:
      "1. Download the free Detach app from the App Store. 2. Grant Screen Time permission so the app can block apps at the system level. 3. Tap your Detach card to verify it. 4. Choose the apps and websites to block. 5. Start a session. If you get stuck, reach out to us through the contact page.",
  },
  {
    question: "Can I block apps without my card?",
    answer: "Yes. You can start a focus session manually from the app without the card.",
  },
  {
    question: "Can I block websites?",
    answer:
      "Yes. You can block selected websites in Safari and supported browsers. On iOS, blocking a supported app can also restrict its corresponding website.",
  },
  {
    question: "Is the app free?",
    answer:
      "Yes. The Detach app is free to download and use. There are no hidden fees or subscriptions. The only purchase is the Detach card, which is $9.99 one time.",
  },
];

const DetachFaq = () => {
  useEffect(() => {
    setCanonical(PATH);
    setSocialMeta({
      title: "Detach FAQ – Pricing, Compatibility, Blocking, and Setup",
      description:
        "Answers to the most common Detach questions: how it beats Screen Time, strict mode, what you can block, iPhone requirements, Android plans, shipping, and setup.",
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
            { name: "FAQ", path: PATH },
          ]),
        ]}
      />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs current="FAQ" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Detach FAQ</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Quick answers about how Detach works, what it costs, and what makes it different from
            software-only app blockers.
          </p>

          <section className="mb-12">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Visit the product facts page for a one-page technical reference, or reach out directly.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
              <li>
                <Link to="/detach-app-blocker-facts" className="text-primary underline underline-offset-2">
                  Detach product facts
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary underline underline-offset-2">
                  Compare app blockers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary underline underline-offset-2">
                  Contact support
                </Link>
              </li>
            </ul>
          </section>

          <section className="text-center glass-card p-10">
            <h2 className="text-2xl font-bold mb-3">Ready to try Detach?</h2>
            <p className="text-muted-foreground mb-6">
              Download the free app and buy the $9.99 card when you are ready.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                <Apple className="w-5 h-5" />
                Download Free
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Buy the card
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetachFaq;
