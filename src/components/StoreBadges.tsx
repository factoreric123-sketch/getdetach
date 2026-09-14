import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/schema";

// Temporarily hide the Android / Google Play badge. Set back to true to re-enable.
const SHOW_ANDROID = false;

type StoreBadgesProps = {
  className?: string;
  compact?: boolean;
};

const StoreBadges = ({ className = "", compact = false }: StoreBadgesProps) => {
  const appStoreSize = compact
    ? "gap-2 rounded-lg px-3 py-2"
    : "w-full gap-3 rounded-2xl px-5 py-3 sm:w-auto sm:min-w-[220px] sm:gap-3.5 sm:px-6";
  const storeButtonClass = `inline-flex shrink-0 items-center border border-border bg-secondary text-secondary-foreground no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${appStoreSize}`;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Detach on the Apple App Store"
        className={storeButtonClass}
      >
        <svg
          className={compact ? "h-6 w-4 shrink-0" : "h-8 w-6 shrink-0"}
          viewBox="0 0 384 512"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <span className="flex flex-col gap-0.5 text-left leading-none">
          <span className={`font-normal uppercase text-muted-foreground ${compact ? "text-[8px]" : "text-[10px]"}`}>
            Download on the
          </span>
          <span className={`font-bold ${compact ? "text-base" : "text-xl"}`}>
            App Store
          </span>
        </span>
      </a>
      {SHOW_ANDROID && (
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Detach on Google Play"
        className={storeButtonClass}
      >
        <svg
          className={compact ? "h-6 w-4 shrink-0" : "h-8 w-6 shrink-0"}
          viewBox="0 0 48 54"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 4.5 31.8 27 5 49.5V4.5Z" fill="currentColor" />
          <path d="m31.8 27 7.7-6.5c2.5-2.1 2.5-5.3-.1-7.1L9.4 1.1A8.2 8.2 0 0 0 5 0v4.5L31.8 27Z" fill="currentColor" opacity=".72" />
          <path d="m31.8 27 7.7 6.5c2.5 2.1 2.5 5.3-.1 7.1L9.4 52.9A8.2 8.2 0 0 1 5 54v-4.5L31.8 27Z" fill="currentColor" opacity=".48" />
        </svg>
        <span className="flex flex-col gap-0.5 text-left leading-none">
          <span className={`font-normal uppercase text-muted-foreground ${compact ? "text-[8px]" : "text-[10px]"}`}>
            Download on the
          </span>
          <span className={`font-bold ${compact ? "text-base" : "text-xl"}`}>
            Google Play
          </span>
        </span>
      </a>
      )}
    </div>
  );
};

export default StoreBadges;
