import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Background music that only starts from a tap (play() is called inside the
 * click handler so iOS / WhatsApp browsers allow it). Pauses when the tab is hidden.
 */
export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'none';
      audio.volume = 0.5;
      audio.addEventListener('play', () => setPlaying(true));
      audio.addEventListener('pause', () => setPlaying(false));
      audio.addEventListener('error', () => {
        setAvailable(false);
        setPlaying(false);
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(() => {
    getAudio().play().catch(() => setPlaying(false));
  }, [getAudio]);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [getAudio]);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden) audioRef.current?.pause();
    };
    document.addEventListener('visibilitychange', onHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      audioRef.current?.pause();
    };
  }, []);

  return { playing, available, play, toggle };
}
