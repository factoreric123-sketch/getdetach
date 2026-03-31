import { motion } from "framer-motion";
import { Settings2, Tag, Brain, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Settings2,
    title: "Pick what to block",
    description: "Choose your apps — Instagram, TikTok, games, whatever. Set up different modes for work, sleep, or just getting through your morning.",
  },
  {
    icon: Tag,
    title: "Place your tag somewhere",
    description: "Stick it on your desk, nightstand, or fridge. Somewhere you have to physically go. That's the point.",
  },
  {
    icon: Brain,
    title: "Your phone is yours again",
    description: "Blocked apps are gone. Not hidden — gone. You can't negotiate with it or talk yourself into five more minutes.",
  },
  {
    icon: BarChart3,
    title: "Tap to end, see how you did",
    description: "Go back to the tag when you're ready. Check your stats. Over time you'll actually see the difference.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple enough to set up in five minutes. Effective enough to actually change habits.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 flex items-start gap-5 hover:border-primary/20 transition-colors duration-300 group"
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold font-mono bg-background border border-border rounded-full w-5 h-5 flex items-center justify-center text-muted-foreground">
                    {index + 1}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-lg font-bold mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
