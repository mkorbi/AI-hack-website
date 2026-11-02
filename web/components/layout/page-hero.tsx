import { MUNICH_COORDINATES, Ruler } from "@/components/layout/calibrated";
import { Eyebrow } from "@/components/layout/eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: React.ReactNode;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({
  title,
  description,
  eyebrow,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "hero-mesh relative w-full overflow-hidden text-on-dark",
        className
      )}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        {eyebrow ? (
          <Eyebrow variant="light" className="mb-5">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl lg:leading-[1.04]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg text-on-dark-muted sm:text-xl">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
        <div className="mt-14 text-on-dark/70">
          <Ruler markers={[0]} />
          <p className="annotation mt-4 text-steel">{MUNICH_COORDINATES}</p>
        </div>
      </div>
    </section>
  );
}
