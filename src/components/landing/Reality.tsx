import { motion } from "framer-motion";

const Reality = () => {
  return (
    <section className="py-16 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-muted-foreground text-lg mb-3">
            You're not "wasting time."
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            You're trading <span className="text-gradient">years of your life.</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            The average person spends 15+ years on their phone.
            <br />
            Heavy users? 20 to 30+ years.
          </p>
        </motion.div>

        {/* The Reality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            📊 The Reality
          </p>
          <p className="text-foreground font-semibold text-lg mb-5">
            This isn't a bad habit. It's a life drain.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">4 to 5 hours/day</span>
              <span className="text-muted-foreground/40">→</span>
              <span className="font-semibold text-foreground">~15 years of your life</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">7 to 10 hours/day</span>
              <span className="text-muted-foreground/40">→</span>
              <span className="font-semibold text-foreground">20 to 30+ years</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4">That's not "scrolling." That's:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Years you don't remember</li>
            <li>Focus you never had</li>
            <li>Time you never get back</li>
          </ul>
        </motion.div>

        {/* The Part People Ignore */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            ⏳ The Part People Ignore
          </p>
          <p className="text-foreground font-semibold text-lg mb-5">
            You only get one life.
          </p>

          <p className="text-sm text-muted-foreground mb-3">Average lifespan (U.S.):</p>
          <div className="space-y-2 mb-5">
            <p className="text-sm"><span className="text-muted-foreground">Men:</span> <span className="font-semibold text-foreground">~75 to 76 years</span></p>
            <p className="text-sm"><span className="text-muted-foreground">Women:</span> <span className="font-semibold text-foreground">~81 to 82 years</span></p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Now do the math. Spending 20+ years on your phone isn't a small habit. It's a massive percentage of your entire life.
          </p>
        </motion.div>

        {/* The Punch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            ⚡ The Punch
          </p>
          <p className="text-foreground font-semibold text-lg mb-5">
            This isn't about screen time.
          </p>
          <p className="text-muted-foreground text-sm mb-2">It's about:</p>
          <div className="space-y-1 text-base font-semibold text-foreground mb-8">
            <p>Your attention</p>
            <p>Your mornings</p>
            <p>Your life trajectory</p>
          </div>
          <p className="text-muted-foreground text-base">
            You don't need more discipline.
          </p>
          <p className="text-xl md:text-2xl font-black text-foreground mt-2">
            You need <span className="text-gradient">friction.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Reality;
