import { useEffect, useState } from "react";
import { projects } from "../data/projects";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ARTIFACT · the rotating object that fills the empty right-hand space
 * ─────────────────────────────────────────────────────────────────────────
 *  Every word in the readout has its OWN 3D solid, chosen to mean something:
 *
 *    DESIGN   → stacked layers   (surfaces, artboards)
 *    CODE     → wireframe cube   (blocks, structure)
 *    HARDWARE → octahedron       (a chip / cut crystal)
 *    AI       → three rings      (orbits, a neural gyroscope)
 *
 *  On the Work panel it becomes a single cube that spins fast and blows up
 *  behind the project rows as a texture.
 *
 *  All of it is CSS 3D transforms: no WebGL, no library, ~nothing to render.
 * ─────────────────────────────────────────────────────────────────────────
 */

const CUBE_FACES = [
  "translateZ(90px)",
  "rotateY(180deg) translateZ(90px)",
  "rotateY(90deg) translateZ(90px)",
  "rotateY(-90deg) translateZ(90px)",
  "rotateX(90deg) translateZ(90px)",
  "rotateX(-90deg) translateZ(90px)",
];

// Eight triangular faces, four up and four down, forming an octahedron.
const OCTA_FACES = [
  "rotateY(0deg)   rotateX(30deg) translateZ(52px)",
  "rotateY(90deg)  rotateX(30deg) translateZ(52px)",
  "rotateY(180deg) rotateX(30deg) translateZ(52px)",
  "rotateY(270deg) rotateX(30deg) translateZ(52px)",
  "rotateY(0deg)   rotateX(-30deg) rotateZ(180deg) translateZ(52px)",
  "rotateY(90deg)  rotateX(-30deg) rotateZ(180deg) translateZ(52px)",
  "rotateY(180deg) rotateX(-30deg) rotateZ(180deg) translateZ(52px)",
  "rotateY(270deg) rotateX(-30deg) rotateZ(180deg) translateZ(52px)",
];

const RING_FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateX(90deg)"];

const LAYER_OFFSETS = [-52, 0, 52];

/** Renders the faces for a given shape. */
function Shape({ shape, color, fill }) {
  const base = {
    border: `1px solid ${color}`,
    background: fill,
    transition: "border-color 0.7s ease, background 0.7s ease",
  };

  if (shape === "rings") {
    return RING_FACES.map((t, i) => (
      <div
        key={i}
        className="absolute"
        style={{ ...base, inset: "4%", borderRadius: "50%", transform: t, borderWidth: 1 }}
      />
    ));
  }

  if (shape === "layers") {
    // Three horizontal planes, tilted so you read them as stacked surfaces.
    return LAYER_OFFSETS.map((z, i) => (
      <div
        key={i}
        className="absolute"
        style={{ ...base, inset: "14%", transform: `rotateX(74deg) translateZ(${z}px)` }}
      />
    ));
  }

  if (shape === "octa") {
    return OCTA_FACES.map((t, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          ...base,
          inset: "8%",
          transform: t,
          // a triangle: the octahedron is eight of these
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />
    ));
  }

  // default: cube
  return CUBE_FACES.map((t, i) => (
    <div key={i} className="absolute inset-0" style={{ ...base, transform: t }} />
  ));
}

/**
 * Text that slides up on mount using a TRANSITION rather than a CSS
 * @keyframes animation, which can end up frozen on its first frame.
 */
function RiseText({ children, delay = 0, style }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <span
      className="block"
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(105%)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </span>
  );
}

const INTRO_ITEMS = [
  { label: "DESIGN", meta: "interaction · product", shape: "layers", spin: 18 },
  { label: "CODE", meta: "swift · python · java", shape: "cube", spin: 15 },
  { label: "HARDWARE", meta: "arduino · esp32 · nfc", shape: "octa", spin: 13 },
  { label: "AI", meta: "agents · local inference", shape: "rings", spin: 11 },
];

export function Artifact({ index }) {
  const [step, setStep] = useState(0);

  const onWork = index === 1;
  const visible = index === 0 || index === 1;

  const items = onWork
    ? projects.map((p) => ({
        label: p.name.toUpperCase(),
        meta: p.tech.slice(0, 3).join(" · ").toLowerCase(),
        shape: "cube",
        spin: 1.6, // fast
      }))
    : INTRO_ITEMS;

  const item = items[step % items.length];
  const spin = onWork ? 1.6 : item.spin;

  useEffect(() => setStep(0), [index]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setStep((s) => s + 1), onWork ? 1600 : 2600);
    return () => clearInterval(id);
  }, [visible, onWork]);

  return (
    <div
      className={`fixed pointer-events-none hidden lg:flex flex-col items-center gap-7 ${onWork ? "z-0" : "z-[60]"}`}
      style={{
        right: onWork ? "50%" : "8vw",
        top: "50%",
        transform: onWork
          ? "translate(50%, -50%) scale(3.4)"
          : `translateY(-50%) scale(${visible ? 1 : 0.85})`,
        opacity: visible ? (onWork ? 0.12 : 1) : 0,
        transition:
          "opacity 0.8s ease, transform 1s cubic-bezier(0.16,1,0.3,1), right 1s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* ── the spinning solid ── */}
      <div style={{ perspective: 900 }}>
        <div
          key={item.shape}
          style={{
            width: 180,
            height: 180,
            position: "relative",
            transformStyle: "preserve-3d",
            animation: `xb-spin ${spin}s linear infinite`,
          }}
        >
          <Shape
            shape={item.shape}
            color={onWork ? "rgba(214,48,34,0.6)" : "rgba(245,244,239,0.34)"}
            fill={onWork ? "rgba(214,48,34,0.04)" : "rgba(245,244,239,0.022)"}
          />

          {/* core that pulses */}
          <div
            className="absolute"
            style={{
              inset: "42%",
              background: onWork ? "#D63022" : "rgba(245,244,239,0.5)",
              transition: "background 0.7s ease",
              animation: "xb-blink 2.4s infinite",
            }}
          />
        </div>
      </div>

      {/* ── readout (hidden while it is a backdrop) ── */}
      <div
        className="text-center"
        style={{ width: 230, opacity: onWork ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        <div style={{ overflow: "hidden", height: "1.6rem" }}>
          <RiseText
            key={item.label}
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: "1.15rem",
              lineHeight: 1.35,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: onWork ? "#D63022" : "#F5F4EF",
            }}
          >
            {item.label}
          </RiseText>
        </div>
        <div className="mt-1" style={{ overflow: "hidden", height: "0.95rem" }}>
          <RiseText
            key={item.meta}
            delay={0.06}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem",
              lineHeight: 1.6,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,244,239,0.4)",
            }}
          >
            {item.meta}
          </RiseText>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === step % items.length ? 14 : 5,
                height: 1,
                background:
                  i === step % items.length
                    ? onWork
                      ? "#D63022"
                      : "#F5F4EF"
                    : "rgba(245,244,239,0.25)",
                transition: "all 0.4s cubic-bezier(0.76,0,0.24,1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
