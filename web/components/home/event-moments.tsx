import { ArrowRight } from 'lucide-react';

import { EventMomentsCollage } from '@/components/home/event-moments-collage';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ARCHIVE_GALLERY_URL, fetchArchiveGalleryPool } from '@/lib/event-gallery';
import { SECTION_TONE_CLASS, type SectionTone } from '@/lib/section-backgrounds';
import { cn } from '@/lib/utils';

type EventMomentsProps = {
  tone?: SectionTone;
};

export async function EventMoments({ tone = 'default' }: EventMomentsProps) {
  const pool = await fetchArchiveGalleryPool();

  return (
    <Section id="community" className={cn('scroll-mt-20 overflow-hidden', SECTION_TONE_CLASS[tone])}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-primary sm:text-4xl lg:text-5xl">
          More than talks,
          {' '}
          <br />
          <span className="text-signal-ink">a room full of builders</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Debugging side by side, sketching architectures on a whiteboard, and conversations that
          keep going after the last session. Moments from our Munich community events.
        </p>
        <Button
          nativeButton={false}
          render={<a href={ARCHIVE_GALLERY_URL} target="_blank" rel="noopener noreferrer" />}
          variant="outline"
          size="lg"
          className="mt-6 border-primary/20 text-primary hover:bg-primary/5"
        >
          View photos
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <EventMomentsCollage pool={pool} />
    </Section>
  );
}
