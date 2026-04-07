import { motion } from "framer-motion";

const practices = [
  {
    number: "1",
    title: "Own your morning",
    description:
      "Schedule Detach to start before you wake up. Don't end the session for 1–2 hours after you wake up. It sets the tone for your entire day. You don't want to spike your dopamine first thing in the morning.",
  },
  {
    number: "2",
    title: "No way out",
    description:
      "Leaving the house? Activate Detach and leave the card at home. No card means no way out.",
  },
  {
    number: "3",
    title: "Shut it down at night",
    description:
      "Activate Detach before bed and leave the card outside your room. No scrolling. No easy way out.",
  },
];

const BestPractices = () => {
  return (
    <section className="py-10 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="section-label mb-3">Best practices</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
            Get the most{" "}
            <span className="text-gradient">out of it.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border/20 rounded-xl overflow-hidden">
          {practices.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-6 hover:bg-card transition-colors duration-200 group cursor-default"
            >
              <span className="text-[2.5rem] font-black text-white/40 leading-none block mb-3 group-hover:text-white/60 transition-colors duration-200">
                {p.number}
              </span>
              <h3 className="text-base font-semibold mb-2 text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestPractices;
