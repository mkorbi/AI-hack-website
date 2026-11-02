import Image from 'next/image';
import Link from 'next/link';
import { DISCORD_URL, LINKS, MENUS } from '@/lib/constants';
import { SPONSOR_CONTACT_EMAIL } from '@/lib/sponsors-data';
import type { SitePresentation } from '@/lib/site-presentation';
import { cn } from '@/lib/utils';

import { BlueskyIcon, DiscordIcon } from './icons';
import { MUNICH_COORDINATES, Ruler } from './calibrated';
import { SiteLogo } from './site-logo';

const SOCIAL_LINKS = [
  {
    label: 'Discord',
    href: DISCORD_URL,
    icon: DiscordIcon,
    className: 'size-4',
  },
  {
    label: 'YouTube',
    href: LINKS.youtube.to,
    iconSrc: '/icons-src/youtube.inline.svg',
    className: 'h-4 w-5',
  },
  {
    label: 'LinkedIn',
    href: LINKS.linkedin.to,
    iconSrc: '/icons-src/linkedin-logo.inline.svg',
    className: 'size-4',
  },
  {
    label: 'X',
    href: LINKS.twitter.to,
    iconSrc: '/icons-src/twitter-logo.inline.svg',
    className: 'size-4',
  },
  {
    label: 'Bluesky',
    href: LINKS.bluesky.to,
    icon: BlueskyIcon,
    className: 'size-4',
  },
  {
    label: 'Google Maps',
    href: LINKS.googlemaps.to,
    iconSrc: '/icons-src/google-maps-icon.inline.svg',
    className: 'size-3.5',
  },
] as const;

const EXPLORE_LINKS = [
  { text: 'Schedule', ...LINKS.schedule },
  { text: 'Speakers', ...LINKS.speakers },
  { text: 'Format', to: '/#format' },
  { text: 'Topics', to: '/#topics' },
] as const;

const COMMUNITY_LINKS = MENUS.footer.filter((item) =>
  ['Team', 'Our Vision', 'Code of Conduct'].includes(item.text)
);

const LEGAL_LINKS = MENUS.footer.filter((item) =>
  ['Imprint', 'Privacy Policy'].includes(item.text)
);

function FooterLink({
  href,
  external,
  target,
  children,
}: {
  href: string;
  external?: boolean;
  target?: string;
  children: React.ReactNode;
}) {
  const className =
    'cursor-pointer text-sm text-on-dark-muted transition-colors hover:text-signal';

  if (external) {
    return (
      <a href={href} target={target ?? '_blank'} rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type FooterLinkItem = {
  text: string;
  to: string;
  external?: boolean;
  target?: string;
};

function FooterLinkList({ items }: { items: readonly FooterLinkItem[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.text}>
          <FooterLink href={item.to} external={item.external} target={item.target}>
            {item.text}
          </FooterLink>
        </li>
      ))}
    </ul>
  );
}

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="annotation mb-3 text-steel">
      {children}
    </p>
  );
}

export function SiteFooter({ navigation }: { navigation: SitePresentation['navigation'] }) {
  const currentYear = new Date().getFullYear();
  const exploreLinks = EXPLORE_LINKS.filter((item) => {
    if (item.text === 'Schedule') return navigation.showSchedule;
    if (item.text === 'Speakers') return navigation.showSpeakers;
    return true;
  }).map((item) => ({
    ...item,
    text:
      item.text === 'Schedule'
        ? navigation.scheduleLabel
        : item.text === 'Speakers'
          ? navigation.speakersLabel
          : item.text,
  }));

  return (
    <footer className="mt-auto bg-graphite text-on-dark">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-on-dark/60">
          <Ruler markers={[0]} />
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex shrink-0 flex-col items-start gap-3">
            <Link href="/" className="cursor-pointer">
              <SiteLogo variant="hero" size="sm" />
            </Link>
            <a
              href={`mailto:${SPONSOR_CONTACT_EMAIL}`}
              className="cursor-pointer text-sm leading-none text-on-dark-muted transition-colors hover:text-signal"
            >
              {SPONSOR_CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 sm:gap-x-10">
            <div>
              <FooterColumnTitle>Explore</FooterColumnTitle>
              <FooterLinkList items={exploreLinks} />
            </div>
            <div>
              <FooterColumnTitle>Community</FooterColumnTitle>
              <FooterLinkList items={COMMUNITY_LINKS} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <FooterColumnTitle>Legal</FooterColumnTitle>
              <FooterLinkList items={LEGAL_LINKS} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-on-dark/15 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="annotation text-steel">
            © {currentYear} AI Hack Fest Munich
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cn(
                  'flex size-8 cursor-pointer items-center justify-center rounded-md text-on-dark ring-1 ring-on-dark/20 transition-colors hover:bg-on-dark/10 hover:ring-signal'
                )}
              >
                {'iconSrc' in item ? (
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={item.label === 'YouTube' ? 20 : 16}
                    height={16}
                    className={cn(item.className, 'brightness-0 invert opacity-85')}
                  />
                ) : (
                  <item.icon className={item.className} />
                )}
              </a>
            ))}
          </div>

          <p className="annotation text-steel sm:text-right">{MUNICH_COORDINATES}</p>
        </div>
      </div>
    </footer>
  );
}
