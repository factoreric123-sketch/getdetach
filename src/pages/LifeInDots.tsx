import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LifeInDots from "@/components/LifeInDots";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const LifeInDotsPage = () => {
  useEffect(() => {
    setCanonical("/life-in-dots");
    setSocialMeta({
      title: "Life in Dots | Detach – Visualize the Time You Have Left",
      description:
        "See your life mapped out in dots and rethink how you spend your screen time. A reminder to stay present, with Detach.",
      path: "/life-in-dots",
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
      <main className="pt-24">
        <LifeInDots />
      </main>
      <Footer />
    </div>
  );
};

export default LifeInDotsPage;
