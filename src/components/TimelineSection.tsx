import { memo } from 'react';
import {
  Crown,
  Flame,
  Flower2,
  Gift,
  HandHeart,
  HeartHandshake,
  Sparkles,
  Sun,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { SCHEDULE } from '@/data/wedding';
import { splitTime } from '@/lib/gujarati';
import { SectionTitle } from './SectionTitle';
import { useReveal } from '@/hooks/useReveal';

const ICONS: [RegExp, LucideIcon][] = [
  [/Ganesh/i, Sparkles],
  [/Grah/i, Flame],
  [/Jamanvar/i, UtensilsCrossed],
  [/Mameru/i, Gift],
  [/Haldi/i, Sun],
  [/Jan|Baraat/i, Crown],
  [/Hasta/i, HeartHandshake],
  [/Viday/i, HandHeart],
];
const iconFor = (nameEn: string) => ICONS.find(([re]) => re.test(nameEn))?.[1] ?? Flower2;

function DayBlock({ day }: { day: (typeof SCHEDULE)[number] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [dayNum, month] = day.dateGu.split(' ');

  return (
    <div ref={ref} className={visible ? 'is-visible' : ''}>
      {/* Date medallion */}
      <div className="flex items-center gap-4 mb-6">
        <div className="medallion relative w-[88px] h-[88px] shrink-0 flex flex-col items-center justify-center">
          <span className="spin-med absolute inset-0 rounded-full border border-dashed border-gold/60" />
          <span className="absolute inset-[6px] rounded-full glass" />
          <span className="relative gold-text font-gu font-bold leading-none text-[2.1rem]">{dayNum}</span>
          <span className="relative font-gu text-bronze text-sm leading-none mt-1">{month}</span>
        </div>
        <div className={`rise-block text-left ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <p className="font-gu font-bold text-cocoa text-2xl leading-tight">{day.weekdayGu}</p>
          <p className="font-serif italic text-bronze/85 text-lg leading-tight">
            {day.weekday}, {day.date.replace(' 2026', '')}
          </p>
        </div>
      </div>

      {/* Events */}
      <ol className="relative ml-[43px] pl-7">
        <span
          className="timeline-line absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent"
          aria-hidden="true"
        />
        {day.events.map((event, i) => {
          const Icon = iconFor(event.nameEn);
          const t = splitTime(event.time);
          return (
            <li key={event.nameEn} className="relative pb-4 last:pb-0" style={{ ['--i' as string]: i }}>
              <span
                className="event-dot absolute -left-[34px] top-[26px] w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,106,0.8)]"
                aria-hidden="true"
              />
              <div className="event-item glass rounded-2xl p-3.5 flex items-center gap-3">
                <span className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center border border-gold/50 bg-sand-100/80 text-bronze">
                  <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-gu font-bold text-cocoa text-[1.12rem] leading-snug">{event.name}</p>
                  <p className="font-serif italic text-bronze/75 text-[0.98rem] leading-snug truncate">{event.nameEn}</p>
                </div>
                <div className="shrink-0 text-right pl-1">
                  <p className="font-gu text-bronze/80 text-xs leading-none">{t.periodGu}</p>
                  <p className="gold-text font-serif font-bold text-[1.55rem] leading-none mt-1 tabular-nums">{t.clock}</p>
                  <p className="font-serif text-cocoa/60 text-xs leading-none mt-0.5">{t.meridiem}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const TimelineSection = memo(function TimelineSection() {
  return (
    <section id="timeline" className="section section-glow safe-x">
      <SectionTitle title="શુભ પ્રસંગો" subtitle="Wedding functions" />
      <div className="relative max-w-md mx-auto flex flex-col gap-14">
        {SCHEDULE.map((day) => (
          <DayBlock key={day.date} day={day} />
        ))}
      </div>
    </section>
  );
});
