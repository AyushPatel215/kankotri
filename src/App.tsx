import { useState, useEffect, useCallback } from 'react';
import { OpeningScreen } from '@/components/OpeningScreen';
import { ScratchScreen } from '@/components/ScratchScreen';
import { Celebration } from '@/components/Celebration';
import { HeroSection } from '@/components/HeroSection';
import { CouplesSection } from '@/components/CouplesSection';
import { FamilySection } from '@/components/FamilySection';
import { TimelineSection } from '@/components/TimelineSection';
import { BlessingsSection } from '@/components/BlessingsSection';
import { FinalSection } from '@/components/FinalSection';
import { PetalEffect } from '@/components/PetalEffect';
import { MusicButton } from '@/components/MusicButton';
import { useMusic } from '@/hooks/useMusic';
import { WEDDING_DATE } from '@/data/wedding';

/**
 * closed   → doors shut, waiting for "કંકોત્રી ખોલો"
 * opening  → doors swinging open over the scratch card
 * scratch  → scratch the gold foil; on reveal flowers and ribbons burst
 * entering → ~2s later the scratch screen fades out by itself, hero words rise
 * open     → free scrolling
 */
type Phase = 'closed' | 'opening' | 'scratch' | 'entering' | 'open';

// Put your song at public/music.mp3 — the music button hides itself if the file is missing
const MUSIC_SRC = '/music.mp3';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function App() {
  const [phase, setPhase] = useState<Phase>('closed');
  const music = useMusic(MUSIC_SRC);
  const { play } = music;

  const handleOpen = useCallback(() => {
    window.scrollTo(0, 0);
    setPhase('opening');
    play(); // inside the tap, so mobile browsers allow audio
    setTimeout(() => setPhase('scratch'), prefersReduced() ? 350 : 2300);
  }, [play]);

  const [celebrating, setCelebrating] = useState(false);

  // After the foil is scratched: burst, then move on automatically
  const handleReveal = useCallback(() => {
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 8500);
    setTimeout(() => {
      setPhase('entering');
      setTimeout(() => setPhase('open'), 1200);
    }, 2000);
  }, []);

  // Lock scroll until the invitation is fully open
  useEffect(() => {
    document.body.style.overflow = phase === 'open' ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const showScratch = phase === 'opening' || phase === 'scratch' || phase === 'entering';
  const heroStarted = phase === 'entering' || phase === 'open';

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <PetalEffect active={heroStarted} />

      {(phase === 'closed' || phase === 'opening') && (
        <div className="print:hidden">
          <OpeningScreen opening={phase === 'opening'} onOpen={handleOpen} />
        </div>
      )}

      {showScratch && (
        <div className="print:hidden">
          <ScratchScreen active={phase === 'scratch'} leaving={phase === 'entering'} onReveal={handleReveal} />
        </div>
      )}

      {celebrating && <Celebration />}

      <main className="relative z-[1]">
        <HeroSection target={WEDDING_DATE} started={heroStarted} />
        <CouplesSection />
        <FamilySection />
        <TimelineSection />
        <BlessingsSection />
        <FinalSection />
      </main>

      {phase !== 'closed' && music.available && (
        <MusicButton playing={music.playing} onToggle={music.toggle} />
      )}
    </div>
  );
}

export default App;
