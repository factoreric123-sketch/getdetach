import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Product from "@/components/landing/Product";
import Comparison from "@/components/landing/Comparison";
import WhyDetach from "@/components/landing/WhyDetach";
import BestPractices from "@/components/landing/BestPractices";
import Privacy from "@/components/landing/Privacy";
import Reality from "@/components/landing/Reality";
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
      <Reality />
      <Comparison />
      <WhyDetach />
      <Product />
      <BestPractices />
      <Features />
      <HowItWorks />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Index;
