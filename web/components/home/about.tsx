import Link from 'next/link';
import { ArrowRight, Ban, Calendar, Clock } from 'lucide-react';

import { MotionReveal } from '@/components/layout/motion-reveal';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

type AboutProps = {
  recap?: boolean;
  tone?: SectionTone;
};

export function About({ recap = false, tone = 'default' }: AboutProps) {
  const edition = recap ? EVENT_CONFIG.archive : EVENT_CONFIG.upcoming;
  const highlights = [
    { value: edition.ordinalLabel, label: 'Edition in Munich', icon: Calendar },
    { value: '1', label: 'Day of talks and hands-on', icon: Clock },
    { value: '0', label: 'Sales pitches', icon: Ban },
  ];
  return (
    <Section id="about" className={cn(SECTION_TONE_CLASS[tone], 'py-20 md:py-28 lg:py-32')}>
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-20">
        <div>
          <MotionReveal>
            <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-primary sm:text-4xl lg:text-5xl">
              {recap ? 'A day shaped' : 'Built by engineers,'}
              {' '}
              <br />
              <span className="text-signal-ink">
                {recap ? 'by the community' : 'for engineers'}
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              {recap ? (
                <>
                  <p>
                    {edition.name} {edition.edition} brought engineers who build AI systems
                    together for one focused day in Munich.
                  </p>
                  <p>
                    Talks went deep, the hands-on sessions ran on real code, and the hallway
                    conversations kept going long after the last session.
                  </p>
                  <p>
                    Thank you to every attendee, speaker, and volunteer who shared their time,
                    experience, and curiosity with us.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    {EVENT_CONFIG.upcoming.name} is a new community event in Munich for the people
                    who build AI systems: AI engineers, platform engineers, ML engineers, and the
                    developers who wire it all together.
                  </p>
                  <p>
                    The idea is simple. One day, no sales, just tech. Speakers show what they
                    actually built, what broke, and what they would do differently. You leave with
                    code, patterns, and people worth calling.
                  </p>
                  <p>
                    {EVENT_CONFIG.upcoming.dateLabel} is our first edition. It is organized by
                    volunteers from the Munich tech community and open to engineers at every level.
                  </p>
                </>
              )}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <Button
              nativeButton={false}
              render={<Link href="/vision" />}
              size="lg"
              className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Our vision
              <ArrowRight className="size-4" />
            </Button>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1} className="w-full">
          <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center gap-4 lg:max-w-none lg:gap-5">
            {highlights.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/[0.03] px-5 py-7 ring-1 ring-primary/10 transition-shadow hover:shadow-md sm:px-6 sm:py-8"
              >
                <div className="flex size-12 items-center justify-center justify-self-center rounded-xl bg-background/80 ring-1 ring-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-3xl font-semibold leading-none text-primary">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
