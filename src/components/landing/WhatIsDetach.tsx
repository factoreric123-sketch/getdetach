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
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What is <span className="text-gradient">Detach</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Detach is an app blocker that blocks social media and reduces screen time. It uses Apple's Screen Time API to block distracting apps and websites during focus sessions — so you can be present, not on your phone.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Unlike other app blockers, Detach uses physical NFC tags to start and end sessions. This creates real, tangible friction between you and your screen — making it harder to mindlessly scroll.
          </p>
          <Link
            to="/detach-app"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-all"
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
