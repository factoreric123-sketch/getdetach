import { motion } from "framer-motion";
import { Shield, Smartphone, Layers, Calendar, Lock, AlertTriangle, BarChart3, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Block Apps & Websites",
    description: "Uses Apple Screen Time to block distracting apps and websites during your focus sessions.",
  },
  {
    icon: Smartphone,
    title: "NFC Tag Sessions",
    description: "Tap a physical NFC tag to start and end sessions. Real friction, real intention.",
  },
  {
    icon: Layers,
    title: "Custom Modes",
    description: "Create different blocking profiles for work, study, sleep, or anything else.",
  },
  {
    icon: Calendar,
    title: "Scheduled Sessions",
    description: "Set recurring focus sessions that activate automatically on your schedule.",
  },
  {
    icon: Lock,
    title: "Strict Mode",
    description: "Prevents ending a session by deleting the app. Commit to your focus fully.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Overrides",
    description: "For genuine emergencies only. Limited uses to keep you accountable.",
  },
  {
    icon: BarChart3,
    title: "Activity Tracking",
    description: "Weekly and daily stats to see how much time you've spent detached.",
  },
  {
    icon: Eye,
    title: "100% Private",
    description: "No account, no cloud, no tracking. All data stays on your device.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-gradient">stay focused</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Practical tools for people who want to be more present — not preachy, just effective.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="glass-card p-6 hover:border-primary/25 hover:bg-card/80 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground/30 font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
