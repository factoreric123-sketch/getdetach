import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AppScreenshots from "@/components/shop/AppScreenshots";
import nfcDevice from "@/assets/nfc-device.jpg";
import { setCanonical, resetCanonical, setSocialMeta, resetSocialMeta } from "@/lib/canonical";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref && searchParams.get("success") !== "true") {
      navigate(`/?ref=${encodeURIComponent(ref)}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const [quantity, setQuantity] = useState(1);
  const [addMagnet, setAddMagnet] = useState(false);
  const [nfcOpen, setNfcOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      try {
        localStorage.setItem("detach_affiliate_ref", ref.toLowerCase().trim());
      } catch {}
    }
  }, [searchParams]);

  useEffect(() => {
    if (isSuccess && sessionId && !emailSent) {
      setEmailSent(true);
      supabase.functions.invoke("send-order-confirmation", {
        body: { sessionId },
      }).catch((err) => console.error("Order confirmation email error:", err));
    }
  }, [isSuccess, sessionId, emailSent]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCanonical("/shop");
    setSocialMeta({
      title: "Shop – Buy the Detach Card | App Blocker Device",
      description:
        "Order the Detach card, the physical device that locks distracting apps and websites. $9.99, one-time purchase, free shipping worldwide.",
      path: "/shop",
      type: "website",
    });
    return () => {
      resetCanonical();
      resetSocialMeta();
    };
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      let affiliateCode: string | null = null;
      try { affiliateCode = localStorage.getItem("detach_affiliate_ref"); } catch {}
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { quantity, magnetQuantity: addMagnet ? quantity : 0, affiliateCode },
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
            className="max-w-2xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-black mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your Detach card is on its way. You'll receive a shipping confirmation email soon.
            </p>
            <div className="w-full bg-card/50 border border-border/60 rounded-[2rem] px-8 py-8 md:px-10 md:py-9 mb-8 text-left shadow-2xl">
              <h2 className="text-xl font-semibold tracking-tight mb-3">
                Want an extra Detach card?
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                If you leave us a review, send an email to{" "}
                <a
                  href="mailto:getdetach@gmail.com"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
                >
                  getdetach@gmail.com
                </a>{" "}
                with a screenshot or confirmation of your review. We'll include an extra Detach card
                in your envelope as a thank you!
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
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

      <section className="pt-28 pb-10 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Detach Card",
              description:
                "An NFC card that works with the Detach app. Tap it to start or end a focus session that locks distracting apps on your iPhone. No battery, no charging, works forever.",
              image: [
                "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/15fcea8f-a5d9-445f-8984-aa1b6e0cc5df/id-preview-3450c874--f27795d6-7639-412e-8146-a47983d4fa70.lovable.app-1771286308043.png",
              ],
              sku: "detach-card-001",
              mpn: "DETACH-CARD-001",
              brand: { "@type": "Brand", name: "Detach" },
              category: "Productivity",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "27",
              },
              offers: {
                "@type": "Offer",
                price: "9.99",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
                url: "https://getdetach.app/shop",
                priceValidUntil: "2027-12-31",
                seller: { "@type": "Organization", name: "Detach" },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0",
                    currency: "USD",
                  },
                  shippingDestination: {
                    "@type": "DefinedRegion",
                    geoMidpoint: {
                      "@type": "GeoCoordinates",
                      latitude: "0",
                      longitude: "0",
                    },
                  },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                      "@type": "QuantitativeValue",
                      minValue: 0,
                      maxValue: 2,
                      unitCode: "DAY",
                    },
                    transitTime: {
                      "@type": "QuantitativeValue",
                      minValue: 5,
                      maxValue: 14,
                      unitCode: "DAY",
                    },
                  },
                },
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "US",
                  returnPolicyCategory:
                    "https://schema.org/MerchantReturnFiniteReturnWindow",
                  merchantReturnDays: 30,
                  returnMethod: "https://schema.org/ReturnByMail",
                  returnFees: "https://schema.org/FreeReturn",
                },
              },
            }),
          }}
        />
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
                  alt="Detach card app blocker device"
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
                Detach makes accessing distracting apps a physical action. Tap your card to block, then tap it again when you're ready to unlock. No subscription. No battery. No charging. Works forever.
              </p>

              <div className="mb-8">
                <span className="text-5xl font-black tracking-tight">$9.99</span>
                <p className="text-sm text-muted-foreground mt-1">One-time purchase · Free shipping worldwide</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-3">
                {[
                  "Soft-touch matte finish",
                  "No battery, no charging, ever",
                  "Works with iPhone (iOS 17+) and Android",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-foreground/40 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">
                  Using Android? The card needs a phone with an NFC reader.{" "}
                  <button
                    type="button"
                    onClick={() => setNfcOpen(true)}
                    className="text-foreground underline underline-offset-2 cursor-pointer"
                  >
                    See details
                  </button>
                </p>
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

              {/* Magnet add-on */}
              <button
                type="button"
                onClick={() => setAddMagnet(!addMagnet)}
                aria-pressed={addMagnet}
                className={`w-full flex items-center gap-3 text-left border border-foreground/40 rounded-2xl px-4 py-4 mb-6 cursor-pointer ${
                  addMagnet ? "bg-card" : "bg-transparent"
                }`}
              >
                <span
                  className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center ${
                    addMagnet ? "bg-foreground border-foreground" : "border-border"
                  }`}
                >
                  {addMagnet && <Check className="w-3.5 h-3.5 text-background" />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">Add a Magnet · $2</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    Put it on your fridge.
                  </span>
                </span>
              </button>

              {/* Buy Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-white/90 transition-all duration-150 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {loading
                  ? "Redirecting…"
                  : `Buy Now · $${((9.99 + (addMagnet ? 2 : 0)) * quantity).toFixed(2)}`}
              </button>


              <p className="text-xs text-muted-foreground/80 mt-3 text-center">
                Secure checkout powered by Stripe
              </p>

              {/* Android NFC details popup */}
              <Dialog open={nfcOpen} onOpenChange={setNfcOpen}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-left">Using an Android phone?</DialogTitle>
                    <DialogDescription className="text-left leading-relaxed">
                      The Detach card works with your phone's NFC reader. Most Android phones have
                      one, but some don't. If yours doesn't, the card won't work with it.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No NFC? You can still use Detach. Email us at{" "}
                    <a
                      href="mailto:getdetach@gmail.com"
                      className="text-foreground underline underline-offset-2"
                    >
                      getdetach@gmail.com
                    </a>{" "}
                    and we'll send you a QR code you can print and scan with your camera, the same
                    way you'd tap the card.
                  </p>
                </DialogContent>
              </Dialog>

            </motion.div>
          </div>
        </div>
      </section>

      <AppScreenshots />

      <Footer />
    </div>
  );
};

export default Shop;
