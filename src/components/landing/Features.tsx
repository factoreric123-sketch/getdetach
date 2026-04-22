import { motion } from "framer-motion";
import { Layers, Calendar, Lock, AlertTriangle, BarChart3 } from "lucide-react";

const secondary = [
  {
    icon: Layers,
    title: "Different modes",
    description: "Work, sleep, deep focus. Each blocks different apps on its own schedule.",
  },
  {
    icon: Calendar,
    title: "Scheduled blocking",
    description: "Sessions start automatically. No willpower needed to even begin.",
  },
  {
    icon: Lock,
    title: "Strict mode",
    description: "Deleting the app won't help. The block holds until you physically tap out.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency override",
    description: "You get a few. Limited on purpose.",
  },
  {
    icon: BarChart3,
    title: "Progress stats",
    description: "See how much time you've actually spent away from your phone.",
  },
  {
    icon: AlertTriangle,
    title: "No subscription",
    description: "Pay once. $9.99 and it's yours forever. No monthly fee, ever.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
            Built to actually{" "}
            <span className="text-gradient">work.</span>
          </h2>
        </motion.div>

        {/* Secondary features: compact 3-col grid, minimal cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 rounded-xl overflow-hidden"
        >
          {secondary.map((f) => (
            <div
              key={f.title}
              className="bg-background p-6 hover:bg-card transition-colors duration-200 cursor-default group"
            >
              <f.icon className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-200" />
              <h3 className="text-sm font-semibold mb-1.5 text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Features;
