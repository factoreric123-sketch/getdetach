import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const WhatIsDetach = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What is <span className="text-gradient">Detach</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            Detach is an app blocker for iPhone. You pick which apps to block — Instagram, TikTok, whatever pulls you in — and they go dark until you decide to stop.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            The difference: you can't just tap your way out. A small physical card sits somewhere in your home. To end a session, you have to get up and go tap it. That's the whole trick — making it just inconvenient enough to actually work.
          </p>
          <Link
            to="/detach-app"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
          >
            Learn more about Detach
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsDetach;
