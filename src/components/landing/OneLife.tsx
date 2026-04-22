import { motion } from "framer-motion";

const OneLife = () => {
  return (
    <section className="py-14 px-6 border-t border-border/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-gradient">1 life.</span>
          </p>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl">
            You only get one and the average human life expectancy is about 73 years.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OneLife;
