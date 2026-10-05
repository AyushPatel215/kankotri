import { createElement, Fragment, type CSSProperties, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

/**
 * Text whose words rise up one after another when scrolled into view.
 * Wrap a word in *asterisks* to highlight it. Pass `when` to trigger manually.
 */
export function RiseText({
  text,
  as = 'p',
  className = '',
  wordClassName = '',
  highlightClassName = 'text-bronze font-semibold',
  when,
  delay = 0,
  step = 70,
  style,
}: {
  text: string;
  as?: Tag;
  className?: string;
  wordClassName?: string;
  highlightClassName?: string;
  when?: boolean;
  delay?: number;
  step?: number;
  style?: CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const show = when ?? visible;
  const words = text.split(/\s+/).filter(Boolean);
  const plain = text.replace(/\*/g, '');

  return createElement(
    as,
    {
      ref,
      className: `rise-words ${show ? 'is-visible' : ''} ${className}`,
      style: { ...style, ['--base' as string]: `${delay}ms`, ['--step' as string]: `${step}ms` },
    },
    <span className="sr-only">{plain}</span>,
    words.map((word, i) => {
      const hl = word.startsWith('*') && word.endsWith('*');
      return (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className={`w ${wordClassName} ${hl ? highlightClassName : ''}`}
            style={{ ['--i' as string]: i } as CSSProperties}
          >
            {hl ? word.slice(1, -1) : word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      );
    })
  );
}

/** A whole block that rises into view */
export function Rise({
  children,
  className = '',
  delay = 0,
  when,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  when?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const show = when ?? visible;
  return (
    <div
      ref={ref}
      className={`rise-block ${show ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
