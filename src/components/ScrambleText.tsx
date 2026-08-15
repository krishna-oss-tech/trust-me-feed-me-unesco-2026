import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // ms before it starts
  speed?: number; // ms per tick
  as?: 'span' | 'h1';
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01アイウエオ';

/**
 * Decodes into the target word from random glyphs, left to right.
 * Thematically tied to the product: "resolving noise into truth."
 * Respects prefers-reduced-motion by resolving instantly (see effect below).
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  delay = 200,
  speed = 28,
  as = 'span',
}) => {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, GLYPHS[0]));
  const frame = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      const totalTicks = text.length * 3;
      intervalId = setInterval(() => {
        frame.current += 1;
        const revealCount = Math.floor((frame.current / totalTicks) * text.length);

        const next = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealCount) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');

        setDisplay(next);

        if (revealCount >= text.length) {
          clearInterval(intervalId);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const Tag = as;
  return <Tag className={className}>{display}</Tag>;
};
