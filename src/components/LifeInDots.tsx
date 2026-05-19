import { motion } from "framer-motion";
import lifeInWeeks from "@/assets/life-in-weeks.png";

const LifeInDots = () => {
  return (
    <section className="py-10 px-6 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Each dot is one <span className="text-gradient">week</span>. All of them together, that's the average human lifetime.
          </h2>
        </motion.div>

        <img
          src={lifeInWeeks}
          alt="A grid of dots, each representing one week of an average human life"
          className="mx-auto w-full max-w-md h-auto"
        />

        <p className="mt-10 text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          This is supposed to be scary. Life is not as long as you expected. You blink and it's over. Don't waste it on your phone.
        </p>
      </div>
    </section>
  );
};

export default LifeInDots;
