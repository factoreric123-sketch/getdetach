import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Set up your mode",
    description: "Choose which apps and websites to block. Create different modes for different situations.",
  },
  {
    number: "02",
    title: "Tap your NFC tag",
    description: "Hold your phone to the NFC tag to start a focus session. It's that simple.",
  },
  {
    number: "03",
    title: "Stay present",
    description: "Blocked apps are inaccessible. Focus on what matters. No willpower required.",
  },
  {
    number: "04",
    title: "Tap again to end",
    description: "When you're ready, tap the tag again. Check your stats and see your progress.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
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
            Four steps to a more intentional relationship with your phone.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 flex items-start gap-6"
            >
              <span className="text-4xl font-bold text-primary/30 shrink-0">{step.number}</span>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
