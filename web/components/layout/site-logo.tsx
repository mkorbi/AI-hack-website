import Image from "next/image";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  /**
   * `hero` places the logo directly on a graphite background.
   * `default` and `legacy` are for light backgrounds and put it on a graphite tile,
   * because the logo is drawn in fog and phosphor for a dark stage.
   */
  variant?: "default" | "hero" | "legacy";
  className?: string;
  size?: "sm" | "md";
  /** Kept for API compatibility with the former text wordmark. */
  layout?: "stacked" | "inline";
  priority?: boolean;
};

export function SiteLogo({
  variant = "default",
  className,
  size = "md",
  priority = false,
}: SiteLogoProps) {
  const onDark = variant === "hero";

  return (
    <span
      className={cn(
        "inline-flex shrink-0",
        !onDark && "rounded-md bg-graphite p-2",
        className
      )}
    >
      <Image
        src="/images/brand/ai-hack-fest-logo.png"
        alt="AI Hack Fest"
        width={662}
        height={481}
        priority={priority}
        unoptimized
        className={cn("w-auto", size === "sm" ? "h-12" : "h-11 sm:h-12")}
      />
    </span>
  );
}
