import { motion } from "framer-motion";
import { Shield, Layers, Calendar, Lock, AlertTriangle, BarChart3, Eye, Tag } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Block any app or website",
    description: "Instagram, TikTok, YouTube, Reddit — anything. Uses Apple Screen Time so the block is enforced at the OS level. No workarounds.",
    highlight: true,
  },
  {
    icon: Tag,
    title: "Tap a tag to start, tap to stop",
    description: "A small physical tag lives somewhere in your space. You have to go tap it to end a session. That's the friction that makes it work.",
    highlight: true,
  },
  {
    icon: Layers,
    title: "Different modes for different moments",
    description: "Work mode, sleep mode, deep focus. Each one can block different apps on a different schedule.",
    highlight: false,
  },
  {
    icon: Calendar,
    title: "Scheduled blocking",
    description: "Set it and forget it. Sessions can kick in automatically — no willpower needed to even start.",
    highlight: false,
  },
  {
    icon: Lock,
    title: "Strict mode",
    description: "When you really mean it. Deleting the app won't help. The block stays until you tap out.",
    highlight: false,
  },
  {
    icon: AlertTriangle,
    title: "Emergency override",
    description: "You get a few. Use them for real emergencies. They're limited on purpose.",
    highlight: false,
  },
  {
    icon: BarChart3,
    title: "See your progress",
    description: "Daily and weekly stats show how much time you've actually been away from your phone.",
    highlight: false,
  },
  {
    icon: Eye,
    title: "No account, no tracking",
    description: "Nothing leaves your phone. Ever. No email required to download.",
    highlight: false,
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
  const heroFeatures = features.filter((f) => f.highlight);
  const restFeatures = features.filter((f) => !f.highlight);

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
            Built to actually <span className="text-gradient">work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No streaks. No guilt trips. Just a tool that gets out of your way.
          </p>
        </motion.div>

        {/* Hero features — larger cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          {heroFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="glass-card p-8 hover:border-primary/25 hover:bg-card/80 transition-all duration-300 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary features — smaller cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {restFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="glass-card p-6 hover:border-primary/20 hover:bg-card/80 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground/25 font-bold">
                  {String(index + 3).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors duration-200">
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
