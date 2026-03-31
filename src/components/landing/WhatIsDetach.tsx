import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "4h 37m", label: "avg. daily screen time" },
  { value: "96×", label: "phone checks per day" },
  { value: "23 min", label: "to refocus after distraction" },
];

const WhatIsDetach = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What is <span className="text-gradient">Detach</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            Detach is an app blocker that blocks social media and reduces screen time using Apple's Screen Time API — so you can be present, not on your phone.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Unlike other app blockers, Detach uses physical NFC tags to start and end sessions — creating real, tangible friction that makes mindless scrolling impossible.
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
