import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Pick what to block",
    description: "Choose your apps and websites. Instagram, TikTok, games, whatever.",
  },
  {
    number: "2",
    title: "Place your card somewhere",
    description: "Stick it on your desk, nightstand, or fridge. Somewhere you have to physically go. That's the point.",
  },
  {
    number: "3",
    title: "Your phone is yours again",
    description: "Blocked apps are gone. Not hidden. Gone.",
  },
  {
    number: "4",
    title: "Tap to end, see how you did",
    description: "Go back to the card when you're ready. Check your stats. Over time you'll actually see the difference.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-10 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="section-label mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
            Set up in{" "}
            <span className="text-gradient">one minute.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-xl">
            You don't need more discipline. You need friction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border/20 rounded-xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-6 hover:bg-card transition-colors duration-200 group cursor-default"
            >
              <span className="text-[2.5rem] font-black text-white/40 leading-none block mb-3 group-hover:text-white/60 transition-colors duration-200">
                {step.number}
              </span>
              <h3 className="text-base font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
