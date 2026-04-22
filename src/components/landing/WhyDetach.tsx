import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type CellValue = true | false | string;

const columns = ["Detach", "Apple Screen Time", "Flip Phone"];

const features: { label: string; values: [CellValue, CellValue, CellValue] }[] = [
  { label: "Physical barrier", values: [true, false, true] },
  { label: "No bypass", values: [true, false, true] },
  { label: "Custom modes", values: [true, true, false] },
  { label: "Keep essentials", values: [true, "Limited", false] },
  { label: "Track focus", values: [true, true, false] },
  { label: "No subscription", values: [true, true, false] },
];

const CellContent = ({ value }: { value: CellValue }) => {
  if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  return <span className="text-muted-foreground text-sm">{value}</span>;
};

const WhyDetach = () => {
  return (
    <section className="py-14 px-6 border-t border-border/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Why Detach{" "}
            <span className="text-gradient">works better</span>
          </h2>
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
                <th className="text-left py-4 pr-4 w-2/5" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={`py-4 px-3 text-center font-semibold ${
                      i === 0 ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className={i === 0 ? "text-gradient" : ""}>{col}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.label} className="border-b border-border/20">
                  <td className="py-5 pr-4 text-muted-foreground font-medium">{f.label}</td>
                  {f.values.map((v, i) => (
                    <td key={i} className="py-5 px-3 text-center">
                      <CellContent value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDetach;
