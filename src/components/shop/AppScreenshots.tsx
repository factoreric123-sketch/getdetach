import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import screenshot1 from "@/assets/app-screenshot-1.jpg";
import screenshot2 from "@/assets/app-screenshot-2.jpg";
import screenshot3 from "@/assets/app-screenshot-3.jpg";
import screenshot4 from "@/assets/app-screenshot-4.jpg";
import screenshot5 from "@/assets/app-screenshot-5.jpg";
import screenshot6 from "@/assets/app-screenshot-6.jpg";
import screenshot7 from "@/assets/app-screenshot-7.jpg";
import screenshot8 from "@/assets/app-screenshot-8.jpg";

const screenshots = [
  { src: screenshot1, alt: "Detach app home screen – tap or hold to start a focus session" },
  { src: screenshot2, alt: "Ready to scan – hold the NFC card to your phone" },
  { src: screenshot3, alt: "Active Detach session with timer counting up" },
  { src: screenshot4, alt: "Modes screen – create Focus and Bedtime blocking modes" },
  { src: screenshot5, alt: "Schedules screen – set automatic daily blocking schedules" },
  { src: screenshot6, alt: "Edit schedule – configure start time, days, and mode" },
  { src: screenshot7, alt: "Activity analytics – track your detach time by week" },
  { src: screenshot8, alt: "Settings – strict mode, emergency overrides, manual detach" },
];

const AppScreenshots = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-6 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {screenshots.map((shot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="shrink-0 snap-start"
              >
                <div className="w-[180px] md:w-[200px] rounded-2xl overflow-hidden border border-border/40 bg-card shadow-sm">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppScreenshots;
