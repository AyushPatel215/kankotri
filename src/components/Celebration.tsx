import { memo, useEffect, useRef } from 'react';

const COLORS = ['#C97C7F', '#E2A9A3', '#D4AF6A', '#B08440', '#A8605E', '#F1C9C3', '#FFFFFF'];
const DURATION = 5200;
const FADE_FROM = 4200;

type Kind = 'petal' | 'flower' | 'ribbon';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  kind: Kind;
  phase: number;
  len: number;
}

/** One-shot burst of flowers, petals and curling ribbons — canvas, stops itself */
export const Celebration = memo(function Celebration() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const nav = navigator as Navigator & { deviceMemory?: number };
    const scale = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3 ? 0.6 : 1;
    const particles: Particle[] = [];

    const shoot = (x: number, y: number, angle: number, spread: number, n: number, speed: number) => {
      for (let i = 0; i < Math.round(n * scale); i++) {
        const a = angle + (Math.random() - 0.5) * spread;
        const s = speed * (0.55 + Math.random() * 0.6);
        const r = Math.random();
        particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.25,
          size: 4 + Math.random() * 5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          kind: r < 0.45 ? 'petal' : r < 0.75 ? 'ribbon' : 'flower',
          phase: Math.random() * Math.PI * 2,
          len: 16 + Math.random() * 16,
        });
      }
    };

    const popper = Math.min(H * 0.022, 19);
    shoot(0, H, -Math.PI / 3, 0.7, 40, popper);
    shoot(W, H, (-2 * Math.PI) / 3, 0.7, 40, popper);
    shoot(W / 2, H * 0.42, -Math.PI / 2, Math.PI * 2, 30, 8);

    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = elapsed > FADE_FROM ? Math.max(0, 1 - (elapsed - FADE_FROM) / (DURATION - FADE_FROM)) : 1;

      for (const p of particles) {
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.2;
        const terminal = p.kind === 'ribbon' ? 3 : 2.1;
        if (p.vy > terminal) p.vy = terminal;
        p.x += p.vx + Math.sin(p.phase + t / 320) * 0.7;
        p.y += p.vy;
        p.rot += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.kind === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'flower') {
          for (let k = 0; k < 5; k++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.ellipse(p.size * 0.6, 0, p.size * 0.6, p.size * 0.32, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#D4AF6A';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.lineWidth = 2.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          for (let i = 0; i <= p.len; i += 2) {
            const y = Math.sin(i / 3 + p.phase + t / 110) * 3.2;
            if (i === 0) ctx.moveTo(-p.len / 2, y);
            else ctx.lineTo(i - p.len / 2, y);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      if (elapsed < DURATION) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-50" aria-hidden="true" />;
});
