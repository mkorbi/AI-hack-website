import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { EVENT_CONFIG } from '@/lib/event-config';

export const alt = `${EVENT_CONFIG.upcoming.name}, ${EVENT_CONFIG.upcoming.dateLabel}: No sales, just tech`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/brand/ai-hack-fest-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#14171a',
          color: '#e3e6e4',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 72px 58px',
          }}
        >
          <img src={logoSrc} alt="" width={166} height={120} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 84, lineHeight: 1.02, letterSpacing: '-3px' }}>
              No sales,
            </div>
            <div
              style={{
                display: 'flex',
                color: '#a3aaae',
                fontSize: 84,
                lineHeight: 1.02,
                letterSpacing: '-3px',
              }}
            >
              just tech<span style={{ color: '#3ddc84' }}>.</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 27 }}>
            <span>{EVENT_CONFIG.upcoming.dateLabel}</span>
            <span style={{ color: '#3ddc84' }}>·</span>
            <span>{EVENT_CONFIG.upcoming.location}</span>
            <span style={{ color: '#3ddc84' }}>·</span>
            <span>AI engineering and AI platforms</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
