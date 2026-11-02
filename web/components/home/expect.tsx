import { Ban, Laptop, Mic2, Users } from "lucide-react";

import { Ruler } from "@/components/layout/calibrated";
import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { SECTION_TONE_CLASS, type SectionTone } from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const tracks = [
  {
    label: "Track 01 · Talks",
    icon: Mic2,
    title: "Deep technical talks",
    description:
      "Engineers walk through systems they run in production: the architecture, the failure modes, the numbers, and the trade-offs behind every decision.",
  },
  {
    label: "Track 02 · Hands-on",
    icon: Laptop,
    title: "Hands-on sessions",
    description:
      "Labs at the keyboard where you build alongside the people who wrote the code. Depending on the proposals we receive, this track can also become a second talk track.",
  },
] as const;

const principles = [
  {
    icon: Ban,
    title: "No sales pitches",
    description:
      "Sessions are selected for technical depth. Product demos and vendor pitches do not make the cut.",
  },
  {
    icon: Laptop,
    title: "Come ready to build",
    description:
      "Bring your laptop and your questions. Expect real code, real models, and real infrastructure.",
  },
  {
    icon: Users,
    title: "Community-run",
    description:
      "Organized by volunteers from the Munich tech community, for engineers at every level.",
  },
] as const;

type ExpectProps = {
  tone?: SectionTone;
};

/** The event format: one day, two parallel tracks, laid out on the Calibrated ruler. */
export function Expect({ tone = "default" }: ExpectProps) {
  return (
    <Section id="format" className={cn("scroll-mt-20", SECTION_TONE_CLASS[tone])}>
      <div className="max-w-3xl">
        <MotionReveal>
          <Eyebrow className="mb-5">Format</Eyebrow>
          <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-primary sm:text-4xl lg:text-5xl">
            One day,
            {" "}
            <br />
            <span className="text-signal-ink">two tracks</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            No keynote theatre, no booth crawl. Pick a track, open your laptop, and spend the day
            with people who build AI systems for a living.
          </p>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.08} className="mt-14">
        <div className="hidden text-graphite md:block">
          <Ruler markers={[0, 50]} />
        </div>
        <div className="grid gap-10 md:mt-8 md:grid-cols-2 md:gap-8">
          {tracks.map(({ label, icon: Icon, title, description }) => (
            <div key={label} className="border-t-2 border-signal pt-6 md:border-t-0 md:pt-0">
              <p className="annotation text-signal-ink">{label}</p>
              <div className="mt-4 flex items-center gap-3">
                <Icon className="size-6 text-graphite" aria-hidden />
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-primary sm:text-3xl">
                  {title}
                </h3>
              </div>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </MotionReveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:gap-5">
        {principles.map(({ icon: Icon, title, description }, i) => (
          <MotionReveal key={title} delay={0.12 + i * 0.06}>
            <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <span aria-hidden className="h-1.5 w-12 bg-signal" />
                <Icon className="size-5 text-steel" aria-hidden />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
