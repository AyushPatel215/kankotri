import { memo, useId } from 'react';

const GOLD = '#D4AF6A';
const GOLD_LIGHT = '#F1DDA6';
const GOLD_DEEP = '#A8833F';
const NIGHT = '#4B2E22';
const BLUSH = '#E9B8B3';
const ROSE = '#B06A68';

/** Toran — mango leaves with jasmine and gold bunches */
export const Toran = memo(function Toran({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} width="100%" height="58" aria-hidden="true">
      <defs>
        <linearGradient id={`band-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={GOLD_DEEP} />
          <stop offset="0.5" stopColor={GOLD_LIGHT} />
          <stop offset="1" stopColor={GOLD_DEEP} />
        </linearGradient>
        <pattern id={`toran-${id}`} width="44" height="58" patternUnits="userSpaceOnUse">
          <path d="M11 6 C2 19 3 35 11 50 C19 35 20 19 11 6 Z" fill={GOLD} />
          <path d="M11 9 L11 46" stroke={GOLD_LIGHT} strokeWidth="1" />
          <line x1="33" y1="6" x2="33" y2="12" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="33" cy="17" r="5.6" fill={GOLD} />
          <circle cx="33" cy="17" r="2.6" fill={GOLD_LIGHT} />
          <circle cx="33" cy="28.5" r="4.8" fill={BLUSH} />
          <circle cx="33" cy="28.5" r="2" fill="#F7DCD8" />
          <circle cx="33" cy="37.5" r="2.8" fill="#FFFFFF" stroke={GOLD} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="58" fill={`url(#toran-${id})`} />
      <rect width="100%" height="5" fill={`url(#band-${id})`} />
    </svg>
  );
});

/** Stylised Ganesh in gold */
export const Ganesh = memo(function Ganesh({
  size = 80,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" className={className} aria-hidden="true">
      <circle cx="50" cy="52" r="46" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="52" r="41" fill="none" stroke={GOLD} strokeWidth="0.6" strokeDasharray="1 3" opacity="0.7" />
      <path d="M33 40 C14 30 6 52 13 67 C19 79 33 75 37 63 Z" fill={GOLD} />
      <path d="M67 40 C86 30 94 52 87 67 C81 79 67 75 63 63 Z" fill={GOLD} />
      <path d="M30 46 C20 42 16 56 20 64 C24 70 30 68 33 62" fill="none" stroke={GOLD_DEEP} strokeWidth="1.4" />
      <path d="M70 46 C80 42 84 56 80 64 C76 70 70 68 67 62" fill="none" stroke={GOLD_DEEP} strokeWidth="1.4" />
      <ellipse cx="50" cy="51" rx="19" ry="21" fill={GOLD_LIGHT} />
      <path d="M35 36 L39 22 L45 29 L50 15 L55 29 L61 22 L65 36 Z" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="50" cy="13" r="2.6" fill={ROSE} />
      <path d="M35 36 L65 36" stroke={GOLD_DEEP} strokeWidth="2" />
      <path d="M50 39 L50 47" stroke={ROSE} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 50 Q43 47.5 46 50" fill="none" stroke={NIGHT} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M54 50 Q57 47.5 60 50" fill="none" stroke={NIGHT} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M58 63 L65 68" stroke="#FBF6EC" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 58 C50 74 46 84 38 90 C31 95 27 86 34 83" fill="none" stroke={GOLD_LIGHT} strokeWidth="9" strokeLinecap="round" />
      <path d="M49 66 L53 66 M48 74 L52 75 M45 82 L49 84" stroke={GOLD_DEEP} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M64 92 C64 84 72 80 72 80 C72 80 80 84 80 92 Z" fill={BLUSH} />
      <path d="M72 80 L72 92 M68 83 L67 92 M76 83 L77 92" stroke={ROSE} strokeWidth="0.8" />
    </svg>
  );
});

/** Shree Umiya Mata mandir in gold */
export const Temple = memo(function Temple({
  size = 140,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden="true">
      <line x1="60" y1="4" x2="60" y2="24" stroke={GOLD} strokeWidth="1.4" />
      <path d="M60 4 L78 9 L60 15 Z" fill={BLUSH} className="temple-flag" />
      <path d="M32 50 C34 60 43 64 43 76 L21 76 C21 64 30 60 32 50 Z" fill={GOLD_DEEP} />
      <path d="M88 50 C90 60 99 64 99 76 L77 76 C77 64 86 60 88 50 Z" fill={GOLD_DEEP} />
      <path d="M60 22 C64 40 79 48 81 76 L39 76 C41 48 56 40 60 22 Z" fill={GOLD} />
      <circle cx="60" cy="24" r="3.2" fill={GOLD_LIGHT} />
      <path d="M50 46 L70 46 M45 58 L75 58 M42 68 L78 68" stroke={GOLD_DEEP} strokeWidth="1" />
      <rect x="18" y="76" width="84" height="26" fill={GOLD_LIGHT} />
      <rect x="18" y="76" width="84" height="4" fill={GOLD_DEEP} />
      <rect x="27" y="84" width="5" height="18" fill={GOLD} />
      <rect x="88" y="84" width="5" height="18" fill={GOLD} />
      <path d="M50 102 L50 89 A10 10 0 0 1 70 89 L70 102 Z" fill={NIGHT} />
      <circle cx="60" cy="93" r="2.4" fill={GOLD_LIGHT} />
      <rect x="12" y="102" width="96" height="6" fill={GOLD} />
      <rect x="6" y="108" width="108" height="6" fill={GOLD_DEEP} />
    </svg>
  );
});

/** Diya with a flickering flame */
export const Diya = memo(function Diya({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-11 h-12 ${className}`} aria-hidden="true">
      <span className="diya-flame" />
      <svg viewBox="0 0 44 24" className="absolute bottom-0 left-0 w-11 h-6">
        <path d="M2 6 C6 22 38 22 42 6 Z" fill={GOLD} />
        <path d="M2 6 L42 6" stroke={GOLD_LIGHT} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 11 Q22 17 34 11" fill="none" stroke={GOLD_DEEP} strokeWidth="1.2" />
      </svg>
    </div>
  );
});

/** Ornament under headings: line — lotus — line */
export const Ornament = memo(function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg width="168" height="18" viewBox="0 0 168 18" className={className} aria-hidden="true">
      <path d="M0 9 H62" stroke={GOLD} strokeWidth="1" opacity="0.55" />
      <path d="M106 9 H168" stroke={GOLD} strokeWidth="1" opacity="0.55" />
      <path d="M66 9 l3 -3 l3 3 l-3 3 Z M96 9 l3 -3 l3 3 l-3 3 Z" fill={GOLD} />
      <g transform="translate(84 9)">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} rx="2.6" ry="8" transform={`rotate(${r})`} fill={GOLD} opacity="0.85" />
        ))}
        <circle r="2.6" fill={BLUSH} />
      </g>
    </svg>
  );
});

/** Mandala line-art */
export const Mandala = memo(function Mandala({
  size = 400,
  className = '',
  opacity = 0.12,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} style={{ opacity }} aria-hidden="true">
      <g fill="none" stroke={GOLD_DEEP} strokeWidth="0.6">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="88" strokeDasharray="1 3" />
        <circle cx="100" cy="100" r="62" />
        <circle cx="100" cy="100" r="34" />
        <circle cx="100" cy="100" r="14" />
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`rotate(${15 * i} 100 100)`}>
            <path d="M100 12 C108 26 108 36 100 40 C92 36 92 26 100 12 Z" />
            <path d="M100 40 C112 52 112 60 100 66 C88 60 88 52 100 40 Z" />
            <path d="M100 66 C104 72 104 76 100 80 C96 76 96 72 100 66 Z" />
          </g>
        ))}
      </g>
    </svg>
  );
});

/** Jharokha arch outline (double gold rule) — unveils top to bottom when its parent becomes visible */
export const ArchFrame = memo(function ArchFrame({ className = '' }: { className?: string }) {
  return (
    <div className={`arch-frame ${className}`} aria-hidden="true">
      <span className="arch-line" />
      <span className="arch-line inner" />
    </div>
  );
});

export const Heart = memo(function Heart({
  size = 18,
  color = ROSE,
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21 C5 15.5 2 12 2 8.2 C2 5.3 4.3 3 7.1 3 C9 3 10.8 4 12 5.6 C13.2 4 15 3 16.9 3 C19.7 3 22 5.3 22 8.2 C22 12 19 15.5 12 21 Z"
        fill={color}
      />
    </svg>
  );
});
