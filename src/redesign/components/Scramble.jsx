import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*<>_";

/**
 * Decodes text with a scramble effect the first time it enters the viewport.
 * Fits the "scanning systems bus" aesthetic of the source material.
 */
export function Scramble({
  text,
  as: Tag = "span",
  className,
  style,
  duration = 2200,
  delay = 0,
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);

  // Duration-based (not per-character): a 20-char title and a 6-char one
  // both finish in `duration` ms, instead of the old per-char step making
  // longer titles take dramatically longer to decode.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let timer = 0;
    let disposed = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          const start = () => {
            const t0 = performance.now();
            const tick = (now) => {
              if (disposed) return;
              const p = Math.min((now - t0) / duration, 1);
              const revealCount = Math.floor(p * text.length);
              const out = text
                .split("")
                .map((ch, i) => {
                  if (ch === " ") return " ";
                  if (i < revealCount) return ch;
                  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                })
                .join("");
              setDisplay(out);
              if (p < 1) {
                raf = requestAnimationFrame(tick);
              } else {
                setDisplay(text);
              }
            };
            raf = requestAnimationFrame(tick);
          };
          if (delay) timer = window.setTimeout(start, delay);
          else start();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      disposed = true;
      obs.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, duration, delay]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {display}
    </Tag>
  );
}
