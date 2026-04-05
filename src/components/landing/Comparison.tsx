import { motion } from "framer-motion";

const competitors = [
  {
    name: "Brick",
    price: "$59",
    subscription: "No",
    highlight: false,
  },
  {
    name: "Bloom",
    price: "$39",
    subscription: "Yes",
    highlight: false,
  },
  {
    name: "Blok",
    price: "$49",
    subscription: "Yes",
    highlight: false,
  },
  {
    name: "Detach",
    price: "$9.99",
    subscription: "No",
    highlight: true,
  },
];

const Comparison = () => {
  return (
    <section className="py-24 px-6 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="section-label mb-3">Compare</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Same chip.{" "}
            <span className="text-gradient">Different price.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Every NFC app blocker uses the same technology. The only difference is how much they charge you for it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-4 pr-4 text-muted-foreground font-medium w-1/3" />
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className={`py-4 px-3 text-center font-semibold ${
                      c.highlight ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className={c.highlight ? "text-gradient" : ""}>{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price row */}
              <tr className="border-b border-border/20">
                <td className="py-4 pr-4 text-muted-foreground">Card price</td>
                {competitors.map((c) => (
                  <td
                    key={c.name}
                    className={`py-4 px-3 text-center font-bold text-lg ${
                      c.highlight ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {c.price}
                  </td>
                ))}
              </tr>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-muted-foreground/40 text-center mt-6"
        >
          Prices as of April 2026. All products use the same NFC chip technology.
        </motion.p>
      </div>
    </section>
  );
};

export default Comparison;
