import { memo } from 'react';
import { Diya, Mandala, Temple } from './Decorations';
import { SectionTitle } from './SectionTitle';
import { Rise, RiseText } from './RiseText';

export const BlessingsSection = memo(function BlessingsSection() {
  const body = { fontSize: 'clamp(1.08rem, 4.6vw, 1.25rem)' };
  return (
    <section id="blessings" className="section safe-x overflow-hidden">
      <Mandala
        size={460}
        className="spin-slow absolute left-1/2 top-[22%] -ml-[230px] -mt-[230px] pointer-events-none"
        opacity={0.1}
      />
      <div className="relative max-w-md mx-auto text-center">
        <Rise className="flex items-end justify-center gap-4 mb-6">
          <Diya className="mb-1" />
          <Temple size={140} />
          <Diya className="mb-1" />
        </Rise>

        <SectionTitle title="શ્રી ઉમિયા માતાજી" subtitle="Blessings of our Kuldevi" />

        <RiseText
          text="અમારાં કુળદેવી શ્રી ઉમિયા માતાજીના આશીર્વાદથી આ પવિત્ર બંધન સુખ, શાંતિ અને સમૃદ્ધિથી ભર્યું રહે."
          className="font-gu text-cocoa/90 text-gu"
          step={55}
          style={body}
        />
        <RiseText text="જય ઉમિયા માં" className="mt-6 font-gu font-bold text-2xl" wordClassName="gold-text" delay={300} />
      </div>
    </section>
  );
});
