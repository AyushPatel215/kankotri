import { useEffect, useRef, useState } from 'react';

/** IntersectionObserver-based scroll reveal — adds `is-visible` class when in view */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support (some in-app browsers) → show content immediately
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const reveal = () => setVisible(true);
    // Printing / saving as PDF never scrolls, so reveal everything first
    window.addEventListener('beforeprint', reveal);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when in view, or if it is already above the viewport
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0 so tall sections still reveal on small screens
      { threshold: 0, rootMargin: '0px 0px -8% 0px', ...options }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener('beforeprint', reveal);
    };
  }, [options]);

  return { ref, visible };
}

/** Returns ref + visible boolean that resets when scrolling back up (for repeating animations) */
export function useRevealRepeat<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
