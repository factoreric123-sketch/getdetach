import { motion } from "framer-motion";
import { ShieldCheck, UserX, WifiOff } from "lucide-react";

const pillars = [
  {
    icon: UserX,
    title: "No account",
    description: "Download it, open it, use it. No email, no sign-up, no onboarding flow.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing collected",
    description: "Your blocking sessions, your habits, your screen time. All of it stays on your phone.",
  },
  {
    icon: WifiOff,
    title: "No internet required",
    description: "The app works entirely offline. There's no server to send data to because there is no server.",
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
            Your data stays <span className="text-accent">on your phone</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most apps want your data. Detach doesn't have a use for it. There are no servers, no analytics dashboard, no way for us to see anything you do.
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
