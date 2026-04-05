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
    <section id="privacy" className="py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your data stays <span className="text-gradient">on your phone</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most apps want your data. Detach doesn't have a use for it.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Privacy;
