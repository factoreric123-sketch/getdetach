import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReviewsSection from "@/components/landing/Reviews";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const ReviewsPage = () => {
  useEffect(() => {
    setCanonical("/reviews");
    setSocialMeta({
      title: "Reviews | Detach – What Users Say About the App Blocker",
      description:
        "Read real reviews from people using Detach to block social media, reduce screen time, and stay focused with a single tap.",
      path: "/reviews",
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
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
