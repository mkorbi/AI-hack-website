import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

/**
 * Calibrated annotation label: mono, uppercase, led by a short signal tick.
 * `light` is for graphite backgrounds, `dark` for fog backgrounds.
 */
export function Eyebrow({
  children,
  className,
  variant = "dark",
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "annotation inline-flex items-center gap-2.5",
        variant === "light" ? "text-signal" : "text-signal-ink",
        className
      )}
    >
      <span aria-hidden className="h-[2px] w-5 shrink-0 bg-signal" />
      {children}
    </span>
  );
}
