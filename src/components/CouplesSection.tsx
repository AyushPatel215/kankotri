import { memo } from 'react';
import { COUPLES } from '@/data/wedding';
import { ArchFrame, Heart } from './Decorations';
import { SectionTitle } from './SectionTitle';
import { useReveal } from '@/hooks/useReveal';

function CoupleArch({ couple, index }: { couple: (typeof COUPLES)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const delay = (ms: number) => ({ transitionDelay: `${ms + index * 150}ms` });

  return (
    <div ref={ref} className={`relative w-full max-w-[340px] mx-auto ${visible ? 'is-visible' : ''}`}>
      <ArchFrame className="absolute inset-0 w-full h-full" />
      {/* finial */}
      <span
        className={`absolute left-1/2 -top-2 -ml-2 w-4 h-4 rotate-45 border border-gold bg-sand transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        style={delay(900)}
      />

      <div className="relative px-8 pt-20 pb-10 flex flex-col items-center text-center">
        <div className={`rise-block ${visible ? 'is-visible' : ''}`} style={delay(300)}>
          <p className="font-gu text-bronze/80 text-base">ચિ.</p>
          <p className="gold-text font-gu font-bold leading-tight" style={{ fontSize: 'clamp(2.1rem, 10vw, 2.6rem)' }}>
            {couple.groomGu}
          </p>
          <p className="font-gu text-cocoa/75 text-[0.95rem] text-gu mt-1">સુપુત્ર {couple.groomParentsGu}</p>
        </div>

        <div
          className={`my-4 flex items-center gap-3 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={delay(600)}
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
          <Heart size={22} />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        <div className={`rise-block ${visible ? 'is-visible' : ''}`} style={delay(750)}>
          <p className="font-gu text-bronze/80 text-base">ચિ. સૌ. કાં.</p>
          <p className="gold-text font-gu font-bold leading-tight" style={{ fontSize: 'clamp(2.1rem, 10vw, 2.6rem)' }}>
            {couple.brideGu}
          </p>
          <p className="font-gu text-cocoa/75 text-[0.95rem] text-gu mt-1">સુપુત્રી {couple.brideParentsGu}</p>
        </div>

        <p
          className={`rise-block mt-6 font-script text-blush-600 leading-none ${visible ? 'is-visible' : ''}`}
          style={{ ...delay(1000), fontSize: 'clamp(2rem, 9vw, 2.4rem)' }}
        >
          {couple.groom} &amp; {couple.bride}
        </p>
      </div>
    </div>
  );
}

export const CouplesSection = memo(function CouplesSection() {
  return (
    <section id="couples" className="section section-glow safe-x">
      <SectionTitle title="વર-વધૂ" subtitle="The couples" />
      <div className="relative grid gap-12 md:grid-cols-2 md:gap-8 max-w-3xl mx-auto">
        {COUPLES.map((couple, i) => (
          <CoupleArch key={couple.groom} couple={couple} index={i} />
        ))}
      </div>
    </section>
  );
});
