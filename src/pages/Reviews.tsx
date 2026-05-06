import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReviewsSection from "@/components/landing/Reviews";
import { setCanonical } from "@/lib/canonical";

const ReviewsPage = () => {
  useEffect(() => {
    document.title = "Reviews | Detach";
    setCanonical("/reviews");
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
