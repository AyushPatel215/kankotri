import { memo, useState, type CSSProperties } from 'react';

const COLORS = ['#E2A9A3', '#C98B86', '#D4AF6A', '#B88A4A', '#EBC3BD'];

function petalCount() {
  if (typeof window === 'undefined') return 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3;
  return lowEnd ? 7 : 12;
}

/**
 * Rose and gold petals drifting behind the content (they sit under <main>,
 * so they never cover text). CSS-only, max 12 elements.
 */
export const PetalEffect = memo(function PetalEffect({ active }: { active: boolean }) {
  const [petals] = useState(() =>
    Array.from({ length: petalCount() }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 9 + Math.random() * 7,
      duration: 9 + Math.random() * 7,
      delay: -Math.random() * 12,
      drift: (Math.random() - 0.5) * 140,
      color: COLORS[i % COLORS.length],
    }))
  );

  if (!active || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden print:hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.7,
              background: p.color,
              opacity: 0.7,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});
