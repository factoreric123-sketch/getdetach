import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const Privacy = () => {
  return (
    <section id="privacy" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your data stays <span className="text-accent">yours</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Detach doesn't require an account. There are no servers, no analytics, no tracking.
            Everything happens on your device, and that's exactly how it should be.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["No account needed", "No data collection", "No cloud sync"].map((item) => (
              <div key={item} className="glass-card py-4 px-6">
                <p className="font-semibold text-accent">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
