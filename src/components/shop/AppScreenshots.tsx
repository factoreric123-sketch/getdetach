import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import home from "@/assets/01-home.png.asset.json";
import scan from "@/assets/02-scan.png.asset.json";
import hold from "@/assets/03-hold.png.asset.json";
import active from "@/assets/04-active.png.asset.json";
import unlock from "@/assets/05-unlock.png.asset.json";
import shield from "@/assets/06-shield-real.png.asset.json";
import sessionLength from "@/assets/07-session-length.png.asset.json";
import endsAt from "@/assets/08-ends-at.png.asset.json";
import modes from "@/assets/09-modes.png.asset.json";
import modeEditor from "@/assets/10-mode-editor.png.asset.json";
import schedules from "@/assets/12-schedules.png.asset.json";
import editSchedule from "@/assets/13-edit.png.asset.json";
import activity from "@/assets/14-activity-real.png.asset.json";
import settings from "@/assets/21-settings.png.asset.json";

const screenshots = [
  { src: home.url, alt: "Detach home screen with focus mode and session timer" },
  { src: scan.url, alt: "Scan your Detach card to start a focus session" },
  { src: hold.url, alt: "Hold to start a Detach focus session" },
  { src: active.url, alt: "Active Detach focus session" },
  { src: unlock.url, alt: "Unlock apps with your Detach card" },
  { src: shield.url, alt: "Detach blocked app reminder screen" },
  { src: sessionLength.url, alt: "Choose your Detach session length" },
  { src: endsAt.url, alt: "Set when your Detach focus session ends" },
  { src: modes.url, alt: "Detach blocking modes" },
  { src: modeEditor.url, alt: "Edit apps and websites in a Detach blocking mode" },
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
