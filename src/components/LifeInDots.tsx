import { motion } from "framer-motion";

const YEARS = 90;
const WEEKS_PER_YEAR = 52;
const TOTAL = YEARS * WEEKS_PER_YEAR;

const LifeInDots = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            This is your life in <span className="text-gradient">weeks</span>.
          </h2>
        </motion.div>

        <div
          className="grid mx-auto w-fit"
          style={{
            gridTemplateColumns: `repeat(${WEEKS_PER_YEAR}, 5px)`,
            gap: "2px",
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className="w-[5px] h-[5px] rounded-full bg-foreground/85"
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Each dot is one week. The average person spends{" "}
          <span className="text-foreground font-semibold">over 400 of them</span>{" "}
          staring at a phone. Detach helps you take some back.
        </p>
      </div>
    </section>
  );
};

export default LifeInDots;
