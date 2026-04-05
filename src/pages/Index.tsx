import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhatIsDetach from "@/components/landing/WhatIsDetach";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Product from "@/components/landing/Product";
import WhyDetach from "@/components/landing/WhyDetach";
import Privacy from "@/components/landing/Privacy";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatIsDetach />
      <Features />
      <HowItWorks />
      <Product />
      <WhyDetach />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Index;
