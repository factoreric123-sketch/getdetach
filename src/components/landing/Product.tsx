import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
            Available Now
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Detach <span className="text-gradient">NFC Tag</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A beautifully minimal physical tag that starts your focus session with a single tap.
          </p>
          <p className="text-2xl font-bold text-foreground mt-4">$9.99</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {[
                "Soft-touch matte finish",
                "Requires iOS 17 or later",
                "No battery or charging needed",
                "Pairs instantly with the Detach app",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 mt-8">
              <h3 className="text-lg font-bold mb-2">Get Your Detach Tag</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Order your NFC tag and start your focus sessions with a single tap.
              </p>
              <a
                href="https://buy.stripe.com/eVq5kEcTqbLRf8la6sfw400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
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
