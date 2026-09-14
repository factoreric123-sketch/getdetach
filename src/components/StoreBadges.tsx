import appStoreBadgeAsset from "@/assets/app-store-badge.png.asset.json";
import googlePlayBadgeAsset from "@/assets/google-play-badge.png.asset.json";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/schema";

type StoreBadgesProps = {
  className?: string;
  compact?: boolean;
};

const StoreBadges = ({ className = "", compact = false }: StoreBadgesProps) => {
  const badgeHeight = compact ? "h-10" : "h-[52px]";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Detach on the Apple App Store"
        className="inline-flex shrink-0 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <img
          src={appStoreBadgeAsset.url}
          alt="Download on the App Store"
          className={`${badgeHeight} w-auto`}
        />
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