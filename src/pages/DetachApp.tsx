import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Apple, ArrowRight, Smartphone, Shield, Zap, Users } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Detach app?",
    a: "Detach is an app blocker for iPhone that helps you reduce screen time by blocking social media and distracting apps. It uses physical NFC tags to start and end focus sessions, creating real friction between you and your phone.",
  },
  {
    q: "How does Detach block apps?",
    a: "Detach uses Apple's Screen Time API to block apps at the system level. When an app is blocked during a Detach session, you cannot open it at all. Not through notifications, links, or search. To end the session, you must physically tap your NFC card.",
  },
  {
    q: "Is Detach free?",
    a: "Yes! The Detach app is free to download and use. There are no subscriptions or hidden fees. You just need an NFC card to start sessions, which you can buy for $9.99.",
  },
  {
    q: "Is Detach better than other app blockers?",
    a: "Detach is different because it uses physical NFC tags instead of software toggles. This physical friction makes it much harder to give in to temptation. Most other app blockers can be disabled with a few taps. Detach requires you to physically walk to your NFC tag.",
  },
  {
    q: "Does Detach work on Android?",
    a: "Currently, the Detach app is available only for iPhone (iOS 17+). An Android version is not available at this time. Detach uses Apple's Screen Time API for system-level blocking.",
  },
];

const steps = [
  {
    icon: Shield,
    title: "Choose What to Block",
    description: "Select which social media apps and websites you want blocked during focus sessions.",
  },
  {
    icon: Smartphone,
    title: "Tap Your NFC Tag",
    description: "When you're ready to focus, tap a physical NFC tag with your phone to start the session.",
  },
  {
    icon: Zap,
    title: "Stay Focused",
    description: "Blocked apps are completely inaccessible. Tap the tag again when your session is over.",
  },
];

const audiences = [
  "Students who need to focus during study sessions",
  "Professionals who want distraction-free work time",
  "Parents looking to manage their own screen time",
  "Anyone trying to reduce social media usage",
  "People who've tried other app blockers and failed",
];

const DetachApp = () => {
  useEffect(() => {
    document.title = "What is Detach App? The App Blocker That Reduces Screen Time";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Detach is an app blocker that blocks social media and reduces screen time using NFC tags. Learn how the Detach app works, who it's for, and why it's different.");
    }
    return () => {
      document.title = "Detach App Blocker – Block Social Media & Reduce Screen Time";
      if (meta) {
        meta.setAttribute("content", "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+. No account required.");
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What is <span className="text-gradient">Detach App</span>?{" "}
              <span className="block mt-2 text-2xl md:text-3xl text-muted-foreground font-semibold">
                The App Blocker That Reduces Screen Time
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps on your iPhone. Instead of relying on willpower, Detach uses physical NFC tags to create real friction between you and your screen.
            </p>
            <a
              href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all"
            >
              <Apple className="w-5 h-5" />
              Try Detach Free
            </a>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              How the Detach App Blocker Works
            </h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.title} className="glass-card p-6 flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      <span className="text-primary mr-2">{i + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Who It's For */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Who is the Detach App For?
            </h2>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">Detach is for:</span>
              </div>
              <ul className="space-y-3">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions About Detach
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="text-center glass-card p-10">
            <h2 className="text-2xl font-bold mb-3">Ready to Try Detach?</h2>
            <p className="text-muted-foreground mb-6">
              Download the Detach app blocker for free and start reducing your screen time today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                <Apple className="w-5 h-5" />
                Download Free
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Read the Blog
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

export default DetachApp;
