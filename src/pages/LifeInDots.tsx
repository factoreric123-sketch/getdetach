import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LifeInDots from "@/components/LifeInDots";
import { setCanonical } from "@/lib/canonical";

const LifeInDotsPage = () => {
  useEffect(() => {
    document.title = "Life in Dots | Detach";
    setCanonical("/life-in-dots");
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
