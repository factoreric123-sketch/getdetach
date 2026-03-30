import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Detach app — block distracting apps and focus with NFC tags" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Detach – <span className="text-gradient">App Blocker</span> for Social Media & Screen Time
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Tap an NFC tag to start — creating real friction between you and your screen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-muted-foreground/40 bg-muted/30 backdrop-blur-sm text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:border-muted-foreground/60 transition-all"
          >
            <Apple className="w-6 h-6" />
            Download App
          </a>
          <a
            href="https://buy.stripe.com/eVq5kEcTqbLRf8la6sfw400"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-[0_0_30px_8px_hsl(var(--accent)/0.3)]"
          >
            Shop Tag
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Free to download · iOS 16+ · No account required
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
