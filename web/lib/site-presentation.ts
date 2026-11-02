import type { EventConfig, EventEdition } from './event-config';
import type {
  EventControls,
  EventStage,
  HomepageSectionId,
  ProgramMode,
  SiteAction,
  SponsorshipPhase,
  TicketingMode,
} from './site-state-types';

export type SitePresentation = {
  event: {
    isLive: boolean;
    isRecap: boolean;
    stage: EventStage;
  };
  hero: {
    description: string;
    eyebrow: string;
    primaryAction: SiteAction;
    secondaryAction: SiteAction | null;
    showStats: boolean;
    titleAccent: string;
    titleLead: string;
  };
  homepage: {
    sections: readonly HomepageSectionId[];
  };
  metadata: {
    description: string;
    title: string;
  };
  navigation: {
    scheduleLabel: string;
    showCfp: boolean;
    showSchedule: boolean;
    showSpeakers: boolean;
    speakersLabel: string;
  };
  program: {
    announcedSpeakerIds: readonly string[];
    isArchive: boolean;
    mode: ProgramMode;
    noIndex: boolean;
    scheduleDescription: string;
    scheduleEyebrow: string;
    scheduleTitle: string;
    speakerDescription: string;
    speakerEyebrow: string;
    speakerTitleAccent: string;
    speakerTitleLead: string;
  };
  sponsorship: {
    isRecruiting: boolean;
    phase: SponsorshipPhase;
  };
  ticketing: {
    mode: TicketingMode;
    showPurchaseActions: boolean;
  };
};

const action = (
  label: string,
  href: string,
  icon: SiteAction['icon'],
  external = false,
  prominent = false
): SiteAction => ({ external, href, icon, label, ...(prominent ? { prominent } : {}) });

const requireUrl = (value: string | null, message: string): string => {
  if (!value) throw new Error(message);
  return value;
};

const commonProgramCopy = (
  edition: EventEdition,
  announcedSpeakerIds: readonly string[]
) => ({
  announcedSpeakerIds,
  isArchive: false,
  scheduleDescription: `Browse every talk and hands-on session of one engineering day in ${edition.location}.`,
  scheduleEyebrow: `${edition.edition} Program`,
  scheduleTitle: 'Explore the program',
  speakerDescription:
    'Engineers who build AI systems and platforms in production. Browse the lineup and their sessions.',
  speakerEyebrow: 'Speakers',
  speakerTitleAccent: 'speakers',
  speakerTitleLead: 'Meet our',
});

const earlyAnnouncementProgramCopy = (
  edition: EventEdition,
  announcedSpeakerIds: readonly string[]
) => ({
  ...commonProgramCopy(edition, announcedSpeakerIds),
  speakerEyebrow: 'Early announcements',
  speakerTitleLead: 'Meet the builders',
  speakerTitleAccent: 'on our first stage',
  speakerDescription: 'Early speaker announcements. More names follow soon.',
});

const archiveProgramCopy = (
  archive: EventConfig['archive'],
  announcedSpeakerIds: readonly string[]
) => ({
  announcedSpeakerIds,
  isArchive: true,
  scheduleDescription: `Browse every talk and hands-on session from ${archive.shortName} ${archive.edition} in ${archive.location}.`,
  scheduleEyebrow: `${archive.edition} Archive`,
  scheduleTitle: `Revisit the ${archive.edition} program`,
  speakerDescription: 'Revisit the practitioners who shared what they built and what they learned.',
  speakerEyebrow: `${archive.edition} Speaker Archive`,
  speakerTitleAccent: `${archive.shortName} ${archive.edition}`,
  speakerTitleLead: 'The voices of',
});

const HERO_TITLE = { titleLead: 'AI Hack Fest', titleAccent: 'No sales, just tech' } as const;

export function createSitePresentation(
  stage: EventStage,
  sponsorshipPhase: SponsorshipPhase,
  config: EventConfig,
  controls: EventControls = { programPublished: false, ticketsSoldOut: false }
): SitePresentation {
  const sponsorship = {
    phase: sponsorshipPhase,
    isRecruiting: sponsorshipPhase === 'recruiting',
  } as const;
  const { archive, upcoming } = config;
  const programCopy = commonProgramCopy(upcoming, config.campaigns.announcedSpeakerIds);
  const archiveProgram = archiveProgramCopy(archive, config.campaigns.announcedSpeakerIds);
  const hasAnnouncedSpeakers = config.campaigns.announcedSpeakerIds.length > 0;
  const previewSpeakerSections: HomepageSectionId[] = hasAnnouncedSpeakers ? ['speakers'] : [];
  const previewSpeakerAction = hasAnnouncedSpeakers
    ? action('Meet the speakers', '/speakers', 'users')
    : null;

  switch (stage) {
    case 'teaser':
      return {
        event: { stage, isLive: false, isRecap: false },
        hero: {
          eyebrow: upcoming.dateLabel
            ? `${upcoming.dateLabel} · ${upcoming.location} · First edition`
            : `${upcoming.shortName} ${upcoming.edition} · ${upcoming.location}`,
          ...HERO_TITLE,
          description:
            'One day in Munich for engineers who build AI systems and the platforms they run on. Deep technical talks and hands-on sessions from practitioners, never vendor pitches.',
          primaryAction: action('Join the community', config.community.discordUrl, 'users', true),
          secondaryAction: action('See the format', '/#format', 'calendar'),
          showStats: false,
        },
        homepage: {
          sections: ['about', 'expect', 'topics', 'moments'],
        },
        metadata: {
          title: `${upcoming.name} ${upcoming.edition}: No sales, just tech`,
          description: `${upcoming.name} is one day on AI engineering and AI platforms in ${upcoming.location}. Talks and hands-on sessions by practitioners. First edition in ${upcoming.dateLabel}.`,
        },
        navigation: {
          showCfp: false,
          showSchedule: false,
          showSpeakers: false,
          scheduleLabel: 'Schedule',
          speakersLabel: 'Speakers',
        },
        program: {
          mode: 'archive',
          noIndex: true,
          ...archiveProgram,
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };

    case 'tickets': {
      const { programPublished, ticketsSoldOut } = controls;
      const showSpeakers = programPublished || hasAnnouncedSpeakers;
      const ticketDate = requireUrl(
        upcoming.dateLabel,
        'EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.dateLabel.'
      );
      const program = {
        mode: programPublished ? 'published' : 'preview',
        noIndex: !programPublished,
        ...(programPublished
          ? programCopy
          : earlyAnnouncementProgramCopy(upcoming, config.campaigns.announcedSpeakerIds)),
      } as const;

      if (ticketsSoldOut) {
        const hasPublishedProgram = programPublished;

        return {
          event: { stage, isLive: false, isRecap: false },
          hero: {
            eyebrow: `${ticketDate} · Sold out`,
            titleLead: 'Munich, you',
            titleAccent: 'filled the room',
            description: hasPublishedProgram
              ? `${upcoming.name} is sold out. Explore the full program and get ready for a day of building.`
              : `${upcoming.name} is sold out. Join the community for event updates.`,
            primaryAction: hasPublishedProgram
              ? action('Explore the schedule', '/schedule', 'calendar')
              : action('Join event updates', config.community.discordUrl, 'users', true),
            secondaryAction: hasPublishedProgram
              ? action('Join event updates', config.community.discordUrl, 'users', true)
              : previewSpeakerAction,
            showStats: true,
          },
          homepage: {
            sections: hasPublishedProgram
              ? ['schedule', 'speakers', 'ticketing', 'cfp', 'expect', 'topics', 'venue', 'hotels', 'moments']
              : [
                  'about',
                  'ticketing',
                  'cfp',
                  'expect',
                  'topics',
                  ...previewSpeakerSections,
                  'moments',
                  'venue',
                  'hotels',
                ],
          },
          metadata: {
            title: `${upcoming.name} ${upcoming.edition}: Sold out`,
            description: hasPublishedProgram
              ? `${upcoming.name} ${upcoming.edition} is sold out. Explore the schedule and speakers.`
              : `${upcoming.name} ${upcoming.edition} is sold out. Join the community for updates.`,
          },
          navigation: {
            showCfp: true,
            showSchedule: hasPublishedProgram,
            showSpeakers,
            scheduleLabel: 'Schedule',
            speakersLabel: hasPublishedProgram ? 'Speakers' : 'Speaker Preview',
          },
          program,
          sponsorship,
          ticketing: { mode: 'sold-out', showPurchaseActions: false },
        };
      }

      const ticketUrl = requireUrl(
        upcoming.ticketUrl,
        'EVENT_STAGE=tickets requires EVENT_CONFIG.upcoming.ticketUrl.'
      );

      return {
        event: { stage, isLive: false, isRecap: false },
        hero: {
          eyebrow: programPublished
            ? `${ticketDate} · Program live`
            : `${ticketDate} · ${upcoming.location}`,
          ...(programPublished
            ? { titleLead: 'Build your', titleAccent: 'day in Munich' }
            : HERO_TITLE),
          description: programPublished
            ? 'Explore the full program, pick your track, and meet the engineers behind the sessions.'
            : 'One day of deep technical talks and hands-on sessions on AI engineering and AI platforms. Built by practitioners, for practitioners.',
          primaryAction: programPublished
            ? action('Explore the schedule', '/schedule', 'calendar')
            : action('Get your ticket', ticketUrl, 'ticket', true),
          secondaryAction: programPublished
            ? action('Get your ticket', ticketUrl, 'ticket', true)
            : action('Submit a talk', '/#call-for-proposals', 'mic', false, true),
          showStats: true,
        },
        homepage: {
          sections: programPublished
            ? ['schedule', 'speakers', 'ticketing', 'cfp', 'about', 'expect', 'topics', 'venue', 'hotels', 'moments']
            : [
                'about',
                'ticketing',
                'cfp',
                'expect',
                'topics',
                ...previewSpeakerSections,
                'moments',
                'venue',
                'hotels',
              ],
        },
        metadata: {
          title: programPublished ? `${upcoming.name} ${upcoming.edition}` : upcoming.name,
          description: programPublished
            ? `Explore the ${upcoming.edition} program and get tickets for one day of AI engineering in ${upcoming.location}.`
            : `Get tickets for ${upcoming.name} ${upcoming.edition} in ${upcoming.location}. No sales, just tech.`,
        },
        navigation: {
          showCfp: true,
          showSchedule: programPublished,
          showSpeakers,
          scheduleLabel: 'Schedule',
          speakersLabel: programPublished ? 'Speakers' : 'Speaker Preview',
        },
        program,
        sponsorship,
        ticketing: { mode: 'open', showPurchaseActions: true },
      };
    }

    case 'live': {
      const liveVenue = requireUrl(
        upcoming.venue,
        'EVENT_STAGE=live requires EVENT_CONFIG.upcoming.venue.'
      );

      return {
        event: { stage, isLive: true, isRecap: false },
        hero: {
          eyebrow: `Happening now · ${liveVenue}`,
          titleLead: 'Welcome to',
          titleAccent: upcoming.shortName,
          description:
            'Your day of talks and hands-on sessions is underway. Keep the live schedule close.',
          primaryAction: action('Open live schedule', '/app/schedule', 'calendar'),
          secondaryAction: action('Venue information', '/#venue', 'map'),
          showStats: true,
        },
        homepage: {
          sections: ['schedule', 'venue', 'speakers', 'moments'],
        },
        metadata: {
          title: `${upcoming.name} ${upcoming.edition}: Live`,
          description: `${upcoming.name} ${upcoming.edition} is live at ${liveVenue}. Open the schedule and event information.`,
        },
        navigation: {
          showCfp: false,
          showSchedule: true,
          showSpeakers: true,
          scheduleLabel: 'Live Schedule',
          speakersLabel: 'Speakers',
        },
        program: {
          mode: 'published',
          noIndex: false,
          ...programCopy,
          scheduleEyebrow: 'Live now',
          scheduleTitle: 'Your event schedule',
          scheduleDescription: 'Find the next session, room, and speaker while you are on site.',
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };
    }

    case 'recap':
      return {
        event: { stage, isLive: false, isRecap: true },
        hero: {
          eyebrow: `${archive.dateLabel} · Thank you, Munich`,
          titleLead: 'Thank you,',
          titleAccent: 'builders',
          description: `A day of AI engineering, honest talks, and hands-on work. ${upcoming.name} ${upcoming.edition} is already taking shape.`,
          primaryAction: action(`View ${archive.edition} photos`, config.archive.galleryUrl, 'camera', true),
          secondaryAction: action(
            `Join ${upcoming.name} ${upcoming.edition}`,
            config.community.discordUrl,
            'users',
            true
          ),
          showStats: true,
        },
        homepage: {
          sections: ['moments', 'about', 'schedule', 'speakers', 'venue'],
        },
        metadata: {
          title: `${archive.name} ${archive.edition}`,
          description: `Relive ${archive.name} ${archive.edition} through photos, recordings, speakers, and the complete event archive.`,
        },
        navigation: {
          showCfp: false,
          showSchedule: true,
          showSpeakers: true,
          scheduleLabel: `${archive.edition} Schedule`,
          speakersLabel: `${archive.edition} Speakers`,
        },
        program: {
          mode: 'archive',
          noIndex: false,
          ...archiveProgram,
        },
        sponsorship,
        ticketing: { mode: 'closed', showPurchaseActions: false },
      };

    default: {
      const exhaustive: never = stage;
      throw new Error(`Unhandled event stage: ${exhaustive}`);
    }
  }
}
