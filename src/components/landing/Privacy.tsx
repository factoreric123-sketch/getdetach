import { motion } from "framer-motion";
import { ShieldCheck, UserX, WifiOff } from "lucide-react";

const pillars = [
  {
    icon: UserX,
    title: "No account needed",
    description: "Download and use immediately. No sign-up, no email.",
  },
  {
    icon: ShieldCheck,
    title: "No data collection",
    description: "We collect nothing. Your usage stays entirely on-device.",
  },
  {
    icon: WifiOff,
    title: "No cloud sync",
    description: "Nothing leaves your phone. Ever. That's a promise.",
  },
];

const Privacy = () => {
  return (
    <section id="privacy" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
            <ShieldCheck className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your data stays <span className="text-accent">yours</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Detach doesn't require an account. No servers, no analytics, no tracking.
            Everything happens on your device — exactly how it should be.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card p-6 text-center hover:border-accent/20 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors duration-300">
                <pillar.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="font-bold text-accent mb-1">{pillar.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
