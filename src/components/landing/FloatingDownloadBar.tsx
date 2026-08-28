import { Apple, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const FloatingDownloadBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-4 pb-4 pt-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl px-3 sm:px-4 py-3 shadow-2xl">
          <img
            src={logo}
            alt="Detach"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-tight truncate">Detach</p>
            <p className="text-xs text-muted-foreground truncate">
              Free on iOS
            </p>
          </div>
          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 shrink-0 bg-primary text-primary-foreground px-3 sm:px-4 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Apple className="w-4 h-4 hidden sm:block" />
            Download Free
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss download bar"
            className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingDownloadBar;
