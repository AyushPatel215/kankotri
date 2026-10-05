import { memo, type CSSProperties } from 'react';
import { Ganesh, Toran, Ornament, Heart, Mandala } from './Decorations';

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/** Cover — two nude-toned doors under a toran that swing open on tap */
export const OpeningScreen = memo(function OpeningScreen({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 doors overflow-hidden ${opening ? 'is-opening pointer-events-none' : ''}`}
      style={{ height: '100svh' }}
      role="dialog"
      aria-label="શુભ વિવાહ કંકોત્રી"
    >
      {/* Each door carries half of one mandala, so it splits down the seam */}
      <div className="door door-left">
        <div className="door-frame" />
        <Mandala size={520} opacity={0.22} className="absolute top-1/2 -right-[260px] -mt-[260px]" />
      </div>
      <div className="door door-right">
        <div className="door-frame" />
        <Mandala size={520} opacity={0.22} className="absolute top-1/2 -left-[260px] -mt-[260px]" />
      </div>

      <div className="cover-toran absolute inset-x-0 top-0 z-20" style={{ paddingTop: 'var(--safe-top)' }}>
        <Toran />
      </div>

      <div
        className="cover-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center safe-x"
        style={{
          paddingTop: 'calc(var(--safe-top) + 64px)',
          paddingBottom: 'calc(var(--safe-bottom) + 24px)',
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(251,243,234,0.9), rgba(251,243,234,0.35) 70%, transparent)',
        }}
      >
        <div className="cover-in" style={d(100)}>
          <Ganesh size={74} className="mx-auto" />
        </div>

        <p className="cover-in mt-2 font-gu font-semibold text-bronze text-[1.05rem]" style={d(250)}>
          શ્રી ગણેશાય નમઃ
        </p>

        <h1
          className="cover-in gold-text shimmer font-gu font-bold leading-tight mt-2"
          style={{ ...d(400), fontSize: 'clamp(2.8rem, 14vw, 4.4rem)' }}
        >
          શુભ વિવાહ
        </h1>

        <div className="cover-in" style={d(550)}>
          <Ornament />
        </div>

        <div
          className="cover-in mt-4 flex flex-col items-center font-script text-cocoa leading-none"
          style={{ ...d(700), fontSize: 'clamp(2.2rem, 10.5vw, 3rem)' }}
        >
          <span className="flex items-center gap-3 py-1">
            Kishan <Heart size={18} /> Riya
          </span>
          <span className="font-serif italic text-bronze text-xl my-1">&amp;</span>
          <span className="flex items-center gap-3 py-1">
            Hina <Heart size={18} /> Parth
          </span>
        </div>

        <div className="cover-in mt-9" style={d(900)}>
          <button
            type="button"
            onClick={onOpen}
            className="glow-btn min-h-[54px] min-w-[220px] px-8 rounded-full
                       bg-gradient-to-r from-gold-600 via-gold-200 to-gold-600
                       text-night font-gu font-bold text-[1.2rem]
                       border border-gold-100/70
                       transition-transform duration-200 active:scale-95 hover:scale-[1.03]"
          >
            કંકોત્રી ખોલો
          </button>
        </div>
      </div>
    </div>
  );
});
