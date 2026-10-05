import { Ornament } from './Decorations';
import { RiseText } from './RiseText';

/** Gold section heading whose words rise in, with an ornament below */
export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <RiseText
        as="h2"
        text={title}
        className="font-gu font-bold leading-tight"
        wordClassName="gold-text"
        style={{ fontSize: 'clamp(2rem, 9vw, 2.8rem)' }}
      />
      {subtitle && (
        <RiseText
          text={subtitle}
          className="font-serif italic text-bronze/90 text-lg mt-1"
          delay={200}
        />
      )}
      <Ornament className="mt-3" />
    </div>
  );
}
