import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Camera,
  MapPin,
  Mic,
  Play,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { MUNICH_COORDINATES, Ruler, SignalDot } from '@/components/layout/calibrated';
import { Eyebrow } from '@/components/layout/eyebrow';
import { MotionReveal } from '@/components/layout/motion-reveal';
import { Button } from '@/components/ui/button';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { SitePresentation } from '@/lib/site-presentation';
import type { ActionIcon, SiteAction } from '@/lib/site-state-types';

const ACTION_ICONS: Record<ActionIcon, LucideIcon> = {
  arrow: ArrowRight,
  calendar: Calendar,
  camera: Camera,
  map: MapPin,
  mic: Mic,
  play: Play,
  ticket: Ticket,
  users: Users,
};

const stats = [
  { icon: Calendar, label: EVENT_CONFIG.upcoming.dateLabel },
  { icon: MapPin, label: EVENT_CONFIG.upcoming.venue },
  { icon: Users, label: 'Community-driven' },
];

const RULER_MARKERS = [0, 34, 67];

function ActionLink({ action }: { action: SiteAction }) {
  if (action.external) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" />;
  }

  return <Link href={action.href} />;
}

type HeroProps = {
  presentation: SitePresentation['hero'];
};

export function Hero({ presentation }: HeroProps) {
  const PrimaryIcon = ACTION_ICONS[presentation.primaryAction.icon];
  const SecondaryIcon = presentation.secondaryAction
    ? ACTION_ICONS[presentation.secondaryAction.icon]
    : null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-graphite text-on-dark">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
<Image
          src="/videos/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover opacity-60 grayscale contrast-110"
        />
        <div className="absolute inset-0 bg-linear-to-r from-graphite via-graphite/85 to-graphite/45" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-graphite to-transparent" />
        <div className="tech-grid absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <MotionReveal>
            <Eyebrow variant="light" className="mb-8">
              {presentation.eyebrow}
            </Eyebrow>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <h1 className="text-balance font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
              {presentation.titleLead}
              {' '}
              <br />
              <span className="text-on-dark-muted">{presentation.titleAccent}</span>
              <SignalDot />
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-dark-muted sm:text-xl">
              {presentation.description}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 rounded-md bg-signal px-7 text-base font-semibold text-graphite hover:bg-signal-hover"
                nativeButton={false}
                render={<ActionLink action={presentation.primaryAction} />}
              >
                <PrimaryIcon className="size-4" />
                {presentation.primaryAction.label}
              </Button>

              {presentation.secondaryAction && SecondaryIcon ? (
                <Button
                  size="lg"
                  variant={presentation.secondaryAction.prominent ? 'default' : 'outline'}
                  className={
                    presentation.secondaryAction.prominent
                      ? 'h-12 rounded-md bg-signal px-7 text-base font-semibold text-graphite hover:bg-signal-hover'
                      : 'h-12 rounded-md border-on-dark/35 bg-transparent px-7 text-base text-on-dark hover:border-on-dark hover:bg-on-dark/5 hover:text-on-dark'
                  }
                  nativeButton={false}
                  render={<ActionLink action={presentation.secondaryAction} />}
                >
                  <SecondaryIcon className="size-4" />
                  {presentation.secondaryAction.label}
                </Button>
              ) : null}
            </div>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.34} className="mt-20">
          <div className="text-on-dark/80">
            <Ruler markers={presentation.showStats ? RULER_MARKERS : [0]} />
          </div>
          {presentation.showStats ? (
            <ul className="relative mt-5 hidden h-5 sm:block">
              {stats.map(({ label }, index) => (
                <li
                  key={label}
                  className="annotation absolute top-0 text-on-dark"
                  style={{ left: `${RULER_MARKERS[index]}%` }}
                >
                  {label}
                </li>
              ))}
            </ul>
          ) : null}
          {presentation.showStats ? (
            <ul className="mt-5 flex flex-col gap-2 sm:hidden">
              {stats.map(({ icon: Icon, label }) => (
                <li key={label} className="annotation flex items-center gap-2 text-on-dark">
                  <Icon className="size-3.5 text-signal" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="annotation mt-6 flex flex-wrap justify-between gap-x-6 gap-y-1 text-steel">
            <span>{MUNICH_COORDINATES}</span>
            <span>{EVENT_CONFIG.upcoming.location}</span>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
