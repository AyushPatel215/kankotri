import { memo } from 'react';
import { SectionTitle } from './SectionTitle';
import { RiseText, Rise } from './RiseText';

export const FamilySection = memo(function FamilySection() {
  const body = { fontSize: 'clamp(1.08rem, 4.6vw, 1.25rem)' };
  return (
    <section id="family" className="section safe-x">
      <div className="relative max-w-md mx-auto text-center">
        <SectionTitle title="સાદર નિમંત્રણ" subtitle="With joy, we invite you" />

        <RiseText
          text="પરમ કૃપાળુ પરમાત્માની અસીમ કૃપાથી,"
          className="font-gu font-semibold text-bronze text-gu"
          style={body}
        />
        <RiseText
          text="અમારા પરિવારના *ચિ.* *કિશન* સંગ *અ.* *સૌ.* *રિયા* તથા *ચિ.* *પાર્થ* સંગ *અ.* *સૌ.* *હિના* ના શુભ લગ્ન નિર્ધાર્યા છે."
          className="mt-4 font-gu text-cocoa/90 text-gu"
          step={45}
          style={body}
        />
        <RiseText
          text="આ મંગલ પ્રસંગે આપ સહપરિવાર પધારી નવદંપતીને આશીર્વાદ આપશો, એવી અમારી હાર્દિક વિનંતી છે."
          className="mt-4 font-gu text-cocoa/90 text-gu"
          step={45}
          style={body}
        />

        <Rise className="mt-10">
          <p className="font-gu text-cocoa/70 text-base">લિ.</p>
          <p className="gold-text font-gu font-bold text-3xl mt-1">સમગ્ર પરિવાર</p>
        </Rise>
      </div>
    </section>
  );
});
