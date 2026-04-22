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
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            You don't notice it.{" "}
            <span className="text-gradient">Until the years are gone.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-10">
            It's not a bad habit. It's the biggest trade you're making without realizing it. Hours feel small. Years aren't.
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

          <div className="mt-8 flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-gradient">1 life.</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground mt-2">
              You get one life. The average human life expectancy is about 73 years.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reality;
