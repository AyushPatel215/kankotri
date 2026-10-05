import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Hand } from 'lucide-react';
import { Ornament, Toran } from './Decorations';

const REVEAL_AT = 0.45; // fraction of foil scratched away

function paintFoil(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#A8833F');
  g.addColorStop(0.28, '#F1DDA6');
  g.addColorStop(0.5, '#D4AF6A');
  g.addColorStop(0.68, '#FAF0D2');
  g.addColorStop(1, '#B8924C');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // brushed-metal lines
  ctx.strokeStyle = 'rgba(120, 90, 40, 0.1)';
  ctx.lineWidth = 1;
  for (let x = -h; x < w; x += 5) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h, h);
    ctx.stroke();
  }
  // sparkle
  for (let i = 0; i < 140; i++) {
    ctx.fillStyle = `rgba(255, 252, 240, ${Math.random() * 0.55})`;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.3, 0, Math.PI * 2);
    ctx.fill();
  }
  // inner hairline
  ctx.strokeStyle = 'rgba(90, 67, 32, 0.45)';
  ctx.strokeRect(10, 10, w - 20, h - 20);

  ctx.fillStyle = '#4d3818';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${Math.round(w / 11)}px Rasa, serif`;
  ctx.fillText('અહીં ઘસો', w / 2, h / 2 - 12);
  ctx.font = `italic 600 ${Math.round(w / 18)}px "Cormorant Garamond", serif`;
  ctx.fillText('Scratch to reveal', w / 2, h / 2 + 24);
}

function ScratchFoil({ done, onComplete }: { done: boolean; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    let drawing = false;
    let last = { x: 0, y: 0 };
    let moves = 0;
    let finished = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);
    paintFoil(ctx, width, height);
    // repaint once web fonts are ready so the label uses Rasa
    document.fonts?.ready.then(() => {
      if (!finished && moves === 0) paintFoil(ctx, width, height);
    });

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const scratch = (from: { x: number; y: number }, to: { x: number; y: number }) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = '#000'; // must be opaque to fully erase
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(34, width / 8);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x + 0.01, to.y);
      ctx.stroke();
    };
    const check = () => {
      if (finished) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 20) {
        total++;
        if (data[i] < 40) clear++;
      }
      if (clear / total >= REVEAL_AT) {
        finished = true;
        completeRef.current();
      }
    };

    const down = (e: PointerEvent) => {
      drawing = true;
      last = pos(e);
      canvas.setPointerCapture(e.pointerId);
      scratch(last, last);
    };
    const move = (e: PointerEvent) => {
      if (!drawing) return;
      const p = pos(e);
      scratch(last, p);
      last = p;
      if (++moves % 8 === 0) check();
    };
    const up = () => {
      drawing = false;
      check();
    };

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`scratch-canvas absolute inset-0 w-full h-full rounded-[18px] cursor-pointer ${done ? 'is-done' : ''}`}
      aria-label="સોનેરી પડ ઘસો"
    />
  );
}

/** Second step: scratch the gold foil to reveal the invitation; the app then moves on by itself */
export const ScratchScreen = memo(function ScratchScreen({
  active,
  leaving,
  onReveal,
}: {
  active: boolean;
  leaving: boolean;
  onReveal: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => {
    setRevealed((was) => {
      if (!was) onReveal();
      return true;
    });
  }, [onReveal]);

  return (
    <div
      className={`scratch-screen fixed inset-0 z-30 flex flex-col items-center justify-center text-center safe-x overflow-hidden bg-sand ${leaving ? 'is-leaving' : ''}`}
      style={{
        height: '100svh',
        paddingTop: 'calc(var(--safe-top) + 64px)',
        paddingBottom: 'calc(var(--safe-bottom) + 24px)',
        backgroundImage: 'radial-gradient(80% 50% at 50% 45%, rgba(255,250,244,0.95), transparent 75%)',
      }}
      role="dialog"
      aria-label="આમંત્રણ ઘસીને જુઓ"
    >
      <div className="absolute inset-x-0 top-0" style={{ paddingTop: 'var(--safe-top)' }}>
        <Toran />
      </div>

      <p className="font-gu text-bronze text-lg">તમારા માટે એક ખાસ સંદેશ</p>
      <Ornament className="mt-1 mb-6" />

      <div
        className={`scratch-card relative w-[min(86vw,360px)] aspect-[5/4] rounded-[18px] glass ${revealed ? 'is-done' : ''}`}
      >
        {/* Hidden message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 rounded-[18px] border border-gold/50">
          <p className="gold-text font-gu font-bold leading-tight" style={{ fontSize: 'clamp(1.7rem, 8vw, 2.2rem)' }}>
            આપ સાદર આમંત્રિત છો
          </p>
          <p className="font-script text-cocoa mt-1 leading-tight" style={{ fontSize: 'clamp(2rem, 10vw, 2.6rem)' }}>
            You are invited
          </p>
          <p className="font-serif italic text-bronze text-lg mt-2">In Our Marriage</p>
        </div>

        <ScratchFoil done={revealed} onComplete={reveal} />

        {!revealed && active && (
          <Hand
            className="swipe-hint absolute left-1/2 -ml-4 bottom-5 w-8 h-8 text-night/70 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="mt-8 min-h-[56px] flex items-center justify-center">
        {revealed ? (
          <p className="cover-in font-gu text-bronze text-lg" style={{ ['--d' as string]: '300ms' }}>
            કંકોત્રી ખુલી રહી છે…
          </p>
        ) : (
          <button
            type="button"
            onClick={reveal}
            className="min-h-[48px] px-5 rounded-full font-gu text-cocoa/75 text-base underline underline-offset-4 decoration-gold/50"
          >
            ઘસવું ન ફાવે? અહીં ટેપ કરો
          </button>
        )}
      </div>
    </div>
  );
});
