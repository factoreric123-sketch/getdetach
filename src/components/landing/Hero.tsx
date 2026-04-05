import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Detach app"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,hsl(217_91%_60%/0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6"
        >
          App Blocker for iPhone
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-[clamp(2.8rem,8vw,5.5rem)] font-black tracking-tight leading-[0.95] mb-7"
        >
          Put down{" "}
          <span className="text-gradient">the phone.</span>
          <br />
          For real this time.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Detach locks your apps and websites so you can't open them. A physical card that you leave at home is the only way to end a session, making it impossible to give in.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.05] text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/[0.08] hover:border-white/25 transition-all duration-150 cursor-pointer"
          >
            Download App
          </a>
          <a
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/90 transition-all duration-150 shadow-[0_0_25px_rgba(255,255,255,0.18)] cursor-pointer"
          >
            Order Now
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 text-xs text-muted-foreground/50 tracking-wide"
        >
          iOS 17+ · No account required
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
