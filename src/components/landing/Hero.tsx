import { motion } from "framer-motion";

import heroImage from "@/assets/hero-image.jpg";
import StoreBadges from "@/components/StoreBadges";

const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-background px-6 pb-12 pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Detach app"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-contain object-bottom opacity-[0.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">


        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mb-6 text-[clamp(2.65rem,8vw,5.25rem)] font-black leading-[0.98]"
        >
          Put down your{" "}
          <span className="text-gradient">phone.</span>
          <br />
          For real this time.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Detach locks your apps and websites so you can't open them. A physical card that you leave at home is the only way to end a session, making it impossible to give in.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <StoreBadges />
          <a
            href="/shop"
            className="inline-flex w-[224px] items-center justify-center gap-2 rounded-2xl border border-foreground bg-foreground px-5 py-3 font-semibold text-primary-foreground no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Order Now
          </a>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
