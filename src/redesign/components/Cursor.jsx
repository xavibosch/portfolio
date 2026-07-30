import { useEffect, useRef, useState } from "react";

/**
 * A custom cursor built from two layers:
 *  - a small blend-difference dot that inverts whatever is underneath
 *  - a lagging ring that grows and shows a contextual label on interactive elements
 * Elements opt in via data-cursor="label text".
 */
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const el = e.target?.closest("[data-cursor]");
      const isLink = e.target?.closest("a, button");
      if (el) {
        setLabel(el.dataset.cursor || "");
        setActive(true);
      } else {
        setLabel("");
        setActive(!!isLink);
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            transform: active ? "scale(0.4)" : "scale(1)",
            transition: "transform 0.25s ease",
          }}
        />
      </div>

      <div ref={ringRef} className="fixed top-0 left-0 z-[9998] pointer-events-none">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: label ? 96 : active ? 54 : 34,
            height: label ? 96 : active ? 54 : 34,
            marginLeft: label ? -48 : active ? -27 : -17,
            marginTop: label ? -48 : active ? -27 : -17,
            border: label ? "none" : "1px solid rgba(245,244,239,0.55)",
            background: label ? "#D63022" : "transparent",
            transition:
              "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), margin 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F5F4EF",
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
