import { motion } from "framer-motion";

import heroImage from "@/assets/hero-image.jpg";
import StoreBadges from "@/components/StoreBadges";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6 pt-14">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Detach app"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,hsl(217_91%_60%/0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">


        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-[clamp(2.8rem,8vw,5.5rem)] font-black tracking-tight leading-[0.95] mb-7"
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
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
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
          <StoreBadges className="justify-center" />
          <a
            href="/shop"
            className="inline-flex w-full items-center justify-center gap-2 border border-border bg-white px-5 py-3 rounded-2xl text-center font-semibold text-base text-black no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-muted-foreground hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:min-w-[220px] sm:px-6"
          >
            Order Now
          </a>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
