import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Product from "@/components/landing/Product";
import Reviews from "@/components/landing/Reviews";
import AppScreenshots from "@/components/shop/AppScreenshots";
import Comparison from "@/components/landing/Comparison";
import WhyDetach from "@/components/landing/WhyDetach";
import BestPractices from "@/components/landing/BestPractices";
import Privacy from "@/components/landing/Privacy";
import Reality from "@/components/landing/Reality";
import Footer from "@/components/landing/Footer";
import { setCanonical } from "@/lib/canonical";

const Index = () => {
  const { hash } = useLocation();
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Detach",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS 17 or later",
    description:
      "Detach is an iPhone app blocker that uses a physical NFC card to block distracting apps until you tap to end the session.",
    url: "https://getdetach.app/",
    downloadUrl: "https://apps.apple.com/us/app/detach-screen-break/id6759267252",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "10",
      priceCurrency: "USD",
      url: "https://getdetach.app/shop",
      availability: "https://schema.org/InStock",
    },
  };

  useEffect(() => {
    setCanonical("/");
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Navbar />
      <Hero />
      <Comparison />
      <Reality />
      <WhyDetach />
      <Product />
      <AppScreenshots />
      <BestPractices />
      <Features />
      <HowItWorks />

      <Reviews />
      <Footer />
    </div>
  );
};

export default Index;
