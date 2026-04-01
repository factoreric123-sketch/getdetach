import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Pick what to block",
    description: "Choose your apps — Instagram, TikTok, games, whatever. Set up different modes for work, sleep, or just getting through your morning.",
  },
  {
    number: "2",
    title: "Place your tag somewhere",
    description: "Stick it on your desk, nightstand, or fridge. Somewhere you have to physically go. That's the point.",
  },
  {
    number: "3",
    title: "Your phone is yours again",
    description: "Blocked apps are gone. Not hidden — gone. You can't negotiate with it or talk yourself into five more minutes.",
  },
  {
    number: "4",
    title: "Tap to end, see how you did",
    description: "Go back to the tag when you're ready. Check your stats. Over time you'll actually see the difference.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
            Set up in{" "}
            <span className="text-gradient">one minute.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border/20 rounded-xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-8 hover:bg-card transition-colors duration-200 group cursor-default"
            >
              <span className="text-[3rem] font-black text-border/60 leading-none block mb-5 group-hover:text-border/80 transition-colors duration-200">
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
