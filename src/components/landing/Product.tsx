import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import nfcDevice from "@/assets/nfc-device.jpg";

const Product = () => {
  return (
    <section id="product" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent text-sm font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            Available Now
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Detach <span className="text-gradient">NFC Tag</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A beautifully minimal physical tag that starts your focus session with a single tap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-4 rounded-3xl overflow-hidden">
              <img
                src={nfcDevice}
                alt="Detach NFC Tag — a minimal, curved physical tag"
                className="w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Price + rating */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">$9.99</span>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">5.0</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                "Soft-touch matte finish",
                "Requires iOS 17 or later",
                "No battery or charging needed",
                "Pairs instantly with the Detach app",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-foreground/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="glass-card p-6 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold">Get Your Detach Tag</h3>
                <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded-full">
                  Free shipping
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Order your NFC tag and start focus sessions with a single tap.
              </p>
              <a
                href="https://buy.stripe.com/eVq5kEcTqbLRf8la6sfw400"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                Buy Now — $9.99
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;
