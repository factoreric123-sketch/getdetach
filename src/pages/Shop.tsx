import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Truck, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import nfcDevice from "@/assets/nfc-device.jpg";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Shop – Buy the Detach Card | App Blocker Device";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Order the Detach card, the physical device that locks distracting apps and websites. $9.99, one-time purchase, free shipping in the USA.");
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { quantity },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-black mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your Detach card is on its way. You'll receive a shipping confirmation email soon.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl overflow-hidden border border-border/40 bg-card">
                <img
                  src={nfcDevice}
                  alt="Detach card — app blocker device"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="pt-2"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Detach Card
              </p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                The Card That Locks{" "}
                <span className="text-gradient">Distracting Apps</span>
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A small NFC card that pairs with the Detach app. Place it on your desk — tap it to end a focus session. No battery, no charging, works forever.
              </p>

              <div className="mb-8">
                <span className="text-5xl font-black tracking-tight">$9.99</span>
                <p className="text-sm text-muted-foreground mt-1">One-time purchase · Free shipping (USA only)</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  "Soft-touch matte finish",
                  "No battery, no charging, ever",
                  "Works with iPhone (iOS 17+)",
                  "Pairs with the app instantly",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-foreground/40 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2 border border-border rounded-full px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-white/90 transition-all duration-150 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {loading ? "Redirecting…" : `Buy Now · $${(9.99 * quantity).toFixed(2)}`}
              </button>

              <p className="text-xs text-muted-foreground/50 mt-3 text-center">
                Secure checkout powered by Stripe
              </p>

              {/* Trust signals */}
              <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-border/30">
                {[
                  { icon: Truck, label: "Free Shipping (USA)" },
                  { icon: Shield, label: "Secure Payment" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="w-4 h-4 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground/60">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
