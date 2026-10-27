import { memo } from 'react';
import { CalendarHeart, MapPin } from 'lucide-react';
import { Heart, Mandala, Ornament } from './Decorations';
import { SectionTitle } from './SectionTitle';
import { Rise, RiseText } from './RiseText';

// Leuva Patidar Vadi, Palej, Mehsana, Gujarat
const VENUE_MAP_URL = 'https://goo.gl/maps/B9JnLerhrqN3fmDd6?g_st=aw';

export const FinalSection = memo(function FinalSection() {
  return (
    <>
      <section id="final" className="section section-glow safe-x overflow-hidden">
        <div className="relative max-w-md mx-auto text-center">
          <SectionTitle title="આપ જરૂર પધારજો" subtitle="We await your presence" />

          <RiseText
            text="આપના આગમનની રાહ જોઈશું."
            className="font-gu text-cocoa/90 text-gu"
            style={{ fontSize: 'clamp(1.08rem, 4.6vw, 1.25rem)' }}
          />
          <RiseText
            text="આપના આશીર્વાદ એ જ અમારી ભેટ."
            className="font-gu text-cocoa/90 text-gu"
            delay={250}
            style={{ fontSize: 'clamp(1.08rem, 4.6vw, 1.25rem)' }}
          />

          <Rise className="mt-10 glass rounded-3xl px-6 py-8">
            <CalendarHeart className="mx-auto w-7 h-7 text-bronze" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-3 font-gu text-cocoa/75 text-base">ભોજન સમારંભ</p>
            <p className="gold-text font-gu font-bold text-[1.7rem] leading-tight mt-1">શનિવાર, ૨૮ નવેમ્બર ૨૦૨૬</p>
            <p className="font-gu font-semibold text-cocoa text-lg mt-1">સવારે 10:30 કલાકે</p>

            <Ornament className="mx-auto my-6" />

            <MapPin className="mx-auto w-7 h-7 text-bronze" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-3 font-gu text-cocoa/75 text-base">સ્થળ</p>
            <p className="font-gu font-bold text-cocoa text-xl text-gu mt-1">
              લેઉવા પાટીદાર વાડી,
              <br />
              પાલજ, મહેસાણા
            </p>
            <p className="font-serif italic text-bronze text-base mt-1">Leuva Patidar Vadi, Palej, Mehsana</p>
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[50px] items-center gap-2 rounded-full px-7
                         bg-gradient-to-r from-gold-600 via-gold-200 to-gold-600
                         font-gu font-bold text-night text-base border border-gold-100/70
                         transition-transform active:scale-95 hover:scale-[1.03]"
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
              નકશામાં જુઓ
            </a>
          </Rise>

          <Rise className="mt-12">
            <p className="font-script text-blush-600 leading-none" style={{ fontSize: 'clamp(2.2rem, 10vw, 2.8rem)' }}>
              With love
            </p>
            <p className="mt-3 font-script text-cocoa leading-tight flex flex-wrap items-center justify-center gap-x-2" style={{ fontSize: 'clamp(1.8rem, 8vw, 2.3rem)' }}>
              Kishan <Heart size={16} /> Riya
            </p>
            <p className="font-script text-cocoa leading-tight flex flex-wrap items-center justify-center gap-x-2" style={{ fontSize: 'clamp(1.8rem, 8vw, 2.3rem)' }}>
              Heena <Heart size={16} /> Parth
            </p>
          </Rise>
        </div>
        <Mandala
          size={420}
          className="spin-slow absolute left-1/2 -bottom-[210px] -ml-[210px] pointer-events-none"
          opacity={0.12}
        />
      </section>

      <footer className="safe-x pt-2 text-center" style={{ paddingBottom: 'calc(var(--safe-bottom) + 96px)' }}>
        <p className="font-gu font-semibold text-bronze text-lg">જય શ્રી કૃષ્ણ</p>
      </footer>
    </>
  );
});
