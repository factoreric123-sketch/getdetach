import { motion } from "framer-motion";

const Reality = () => {
  return (
    <section className="py-10 px-6 border-t border-border/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">The reality</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            You're not wasting time.{" "}
            <span className="text-gradient">You're spending years.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-10">
            4 to 5 hours a day adds up to 13 to 17 years of your life. Most people are doing more than that. It's not a bad habit. It's the biggest trade you're making without realizing it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-xl overflow-hidden text-left">
            {[
              { stat: "13.3 yrs", label: "lost at 4 hrs/day" },
              { stat: "16.7 yrs", label: "lost at 5 hrs/day" },
              { stat: "23.3 yrs", label: "lost at 7 hrs/day" },
              { stat: "33.3 yrs", label: "lost at 10 hrs/day" },
            ].map((item) => (
              <div key={item.stat} className="bg-background p-5 md:p-6">
                <p className="text-xl md:text-2xl font-black text-foreground mb-1">{item.stat}</p>
                <p className="text-sm md:text-base text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-base mt-10">
            You don't need more discipline. You need friction.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Reality;
