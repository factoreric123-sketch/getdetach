import { motion } from "framer-motion";
import { Check } from "lucide-react";
import nfcDevice from "@/assets/nfc-device.jpg";

const Product = () => {
  return (
    <section id="product" className="py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">The card</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
            The <span className="text-gradient">Detach Card</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden border border-border/40 bg-card"
          >
            <img
              src={nfcDevice}
              alt="Detach card"
              className="w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <span className="text-5xl font-black tracking-tight">$9.99</span>
              <p className="text-muted-foreground text-sm mt-2">One-time. No subscription. Free shipping (USA only).</p>
            </div>

            <div className="space-y-3 mb-10">
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

            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/90 transition-colors duration-150 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.12)]"
            >
              Order Now
            </a>

            <p className="text-xs text-muted-foreground/40 mt-4">
              Other brands charge $50+ for the same chip. We don't.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;
