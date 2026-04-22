import { motion } from "framer-motion";

const Reality = () => {
  return (
    <section className="py-16 md:py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">The reality</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8">
            You're not wasting time.{" "}
            <span className="text-gradient">You're spending years.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
            It's not a bad habit. It's the biggest trade you're making without realizing it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-xl overflow-hidden text-left">
            {[
              { stat: "13.3 yrs", label: "lost at 4 hrs/day" },
              { stat: "16.7 yrs", label: "lost at 5 hrs/day" },
              { stat: "23.3 yrs", label: "lost at 7 hrs/day" },
              { stat: "33.3 yrs", label: "lost at 10 hrs/day" },
            ].map((item) => (
              <div key={item.stat} className="bg-background p-6 md:p-8">
                <p className="text-2xl md:text-4xl font-black text-foreground mb-2">{item.stat}</p>
                <p className="text-sm md:text-lg text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="text-gradient">1 life.</span>
            </p>
            <p className="text-lg md:text-2xl text-muted-foreground mt-3">
              You only get one, and it's about 73 years.
            </p>
          </div>

          <p className="text-muted-foreground text-base md:text-lg mt-12">
            You don't need more discipline. You need friction.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Reality;
