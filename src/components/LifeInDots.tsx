import { motion } from "framer-motion";

const YEARS = 90;
const MONTHS_PER_ROW = 36; // 3 years per row
const TOTAL = YEARS * 12;

type Marker = {
  monthIndex: number;
  label: string;
  color: string; // tailwind class for fill + ring
  align: "left" | "right";
};

const markers: Marker[] = [
  { monthIndex: 0, label: "Birth", color: "bg-primary ring-primary/40", align: "left" },
  { monthIndex: 30 * 12, label: "30th Birthday", color: "bg-emerald-400 ring-emerald-400/40", align: "left" },
  { monthIndex: 60 * 12, label: "60th Birthday", color: "bg-rose-400 ring-rose-400/40", align: "left" },
  { monthIndex: TOTAL - 1, label: "Turning 90", color: "bg-purple-400 ring-purple-400/40", align: "right" },
];

const LifeInDots = () => {
  const rows: number[][] = [];
  for (let r = 0; r < TOTAL / MONTHS_PER_ROW; r++) {
    const row: number[] = [];
    for (let c = 0; c < MONTHS_PER_ROW; c++) row.push(r * MONTHS_PER_ROW + c);
    rows.push(row);
  }

  const markerByIndex = new Map(markers.map((m) => [m.monthIndex, m]));

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            A 90-year life in <span className="text-gradient">months</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Each row is 36 months. Each dot is one month you'll never get back.
          </p>
        </motion.div>

        <div className="p-2 md:p-4">
          <div className="space-y-3 md:space-y-1.5">
            {rows.map((row, rIdx) => {
              const leftMarker = markers.find(
                (m) => m.align === "left" && Math.floor(m.monthIndex / MONTHS_PER_ROW) === rIdx,
              );
              const rightMarker = markers.find(
                (m) => m.align === "right" && Math.floor(m.monthIndex / MONTHS_PER_ROW) === rIdx,
              );
              const marker = leftMarker || rightMarker;
              return (
                <div key={rIdx}>
                  {/* Mobile label above */}
                  {marker && (
                    <div className="md:hidden mb-1.5 text-[11px] font-semibold text-foreground/80">
                      {marker.label}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="hidden md:block w-24 text-right text-xs font-semibold leading-tight">
                      {leftMarker && <span className="text-foreground/80">{leftMarker.label}</span>}
                    </div>
                    <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${MONTHS_PER_ROW}, minmax(0, 1fr))`, gap: "3px" }}>
                      {row.map((m) => {
                        const cellMarker = markerByIndex.get(m);
                        if (cellMarker) {
                          return (
                            <div
                              key={m}
                              className={`aspect-square rounded-full ${cellMarker.color} ring-2`}
                            />
                          );
                        }
                        return (
                          <div
                            key={m}
                            className="aspect-square rounded-full border border-foreground/25"
                          />
                        );
                      })}
                    </div>
                    <div className="hidden md:block w-24 text-left text-xs font-semibold leading-tight">
                      {rightMarker && <span className="text-foreground/80">{rightMarker.label}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          The average person spends <span className="text-foreground font-semibold">over 100 of these dots</span> staring at a phone. Detach helps you take some back.
        </p>
      </div>
    </section>
  );
};

export default LifeInDots;
