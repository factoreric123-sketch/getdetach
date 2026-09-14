import googlePlayBadgeAsset from "@/assets/google-play-badge.png.asset.json";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/schema";

type StoreBadgesProps = {
  className?: string;
  compact?: boolean;
};

const StoreBadges = ({ className = "", compact = false }: StoreBadgesProps) => {
  const badgeHeight = compact ? "h-10" : "h-[52px]";
  const appStoreSize = compact
    ? "gap-2.5 rounded-lg px-3.5 py-2"
    : "w-full gap-4 rounded-[26px] px-7 py-4 sm:w-auto sm:min-w-[320px] sm:gap-5 sm:px-8";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Detach on the Apple App Store"
        className={`inline-flex shrink-0 items-center border border-border bg-secondary text-secondary-foreground no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${appStoreSize}`}
      >
        <svg
          className={compact ? "h-7 w-5 shrink-0" : "h-12 w-9 shrink-0"}
          viewBox="0 0 384 512"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <span className="flex flex-col gap-1 text-left leading-none">
          <span className={`font-normal uppercase text-muted-foreground ${compact ? "text-[9px]" : "text-xs"}`}>
            Download on the
          </span>
          <span className={`font-bold ${compact ? "text-lg" : "text-[28px]"}`}>
            App Store
          </span>
        </span>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Detach on Google Play"
        className="inline-flex shrink-0 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <img
          src={googlePlayBadgeAsset.url}
          alt="Get it on Google Play"
          className={`${badgeHeight} w-auto`}
        />
      </a>
    </div>
  );
};

export default StoreBadges;