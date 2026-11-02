import { cn } from '@/lib/utils';

/** Munich city centre, used as the brand's recurring annotation. */
export const MUNICH_COORDINATES = '48.1351° N · 11.5820° E';

type RulerProps = {
  /** Marker positions in percent of the ruler width, drawn in phosphor. */
  markers?: number[];
  className?: string;
};

/**
 * The Calibrated ruler: a baseline with minor and major ticks.
 * Ink follows `currentColor`, so set the text color on the element or a parent.
 */
export function Ruler({ markers = [], className }: RulerProps) {
  return (
    <div aria-hidden="true" className={cn('ruler w-full', className)}>
      {markers.map((position) => (
        <span
          key={position}
          className="absolute top-0 h-[22px] w-[3px] bg-signal"
          style={{ left: `${position}%` }}
        />
      ))}
    </div>
  );
}

type SignalDotProps = {
  className?: string;
};

/** The phosphor full stop used after display headlines. */
export function SignalDot({ className }: SignalDotProps) {
  return <span className={cn('text-signal', className)}>.</span>;
}
