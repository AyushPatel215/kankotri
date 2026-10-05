import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Countdown } from './Countdown';
import { Ganesh, Mandala, Ornament, Toran, Heart } from './Decorations';
import { Rise, RiseText } from './RiseText';

/** First view after the scratch card — words rise in one after another */
export const HeroSection = memo(function HeroSection({
  target,
  started,
}: {
  target: string;
  started: boolean;
}) {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center text-center safe-x pb-16 overflow-hidden"
      style={{ minHeight: '100svh', paddingTop: 'calc(var(--safe-top) + 80px)' }}
    >
      <div className="absolute inset-x-0 top-0 z-10" style={{ paddingTop: 'var(--safe-top)' }}>
        <Toran />
      </div>

      <Mandala
        size={560}
        className="spin-slow absolute left-1/2 top-[34%] -ml-[280px] -mt-[280px] pointer-events-none"
        opacity={0.14}
      />

      <div className="relative w-full max-w-md flex flex-col items-center">
        <Rise when={started} delay={100}>
          <Ganesh size={88} />
        </Rise>

        <RiseText
          when={started}
          delay={300}
          text="શ્રી ગણેશાય નમઃ"
          className="mt-3 font-gu font-semibold text-bronze text-lg"
        />

        <RiseText
          as="h1"
          when={started}
          delay={500}
          step={160}
          text="શુભ વિવાહ"
          className="mt-2 font-gu font-bold leading-tight"
          wordClassName="gold-text shimmer"
          style={{ fontSize: 'clamp(3rem, 15vw, 4.8rem)' }}
        />

        <Rise when={started} delay={850}>
          <Ornament />
        </Rise>

        <div className="mt-5 flex flex-col items-center font-script text-cocoa leading-none" style={{ fontSize: 'clamp(2.4rem, 11.5vw, 3.4rem)' }}>
          <Rise when={started} delay={1000} className="flex items-center gap-3 py-1">
            Kishan <Heart size={20} /> Riya
          </Rise>
          <Rise when={started} delay={1150} className="font-serif italic text-bronze text-2xl my-1">
            &amp;
          </Rise>
          <Rise when={started} delay={1300} className="flex items-center gap-3 py-1">
            Hina <Heart size={20} /> Parth
          </Rise>
        </div>

        <RiseText
          when={started}
          delay={1500}
          text="ગુરુવાર, ૨૫ નવેમ્બર ૨૦૨૬"
          className="mt-8 font-gu font-bold text-bronze text-xl"
        />
        <RiseText
          when={started}
          delay={1650}
          step={50}
          text="Thrusday, 25 November 2026 at 08:00 AM"
          className="font-serif italic text-cocoa/80 text-lg"
        />

        <Rise when={started} delay={1850} className="mt-9 w-full">
          <p className="font-gu text-cocoa/85 text-base mb-4">લગ્નોત્સવની શરૂઆતને બાકી</p>
          <Countdown target={target} />
        </Rise>

        <Rise when={started} delay={2100} className="mt-10">
          <a href="#couples" aria-label="નીચે જુઓ" className="bob inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-bronze">
            <ChevronDown className="w-5 h-5" />
          </a>
        </Rise>
      </div>
    </section>
  );
});
