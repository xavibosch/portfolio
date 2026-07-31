import { motion, useReducedMotion } from "motion/react";

/**
 * Puzzle-assembly entrance.
 *
 * Every piece starts scattered — pushed out along a random angle, rotated and
 * blurred — then converges into its final position. Because the offsets are
 * derived from a hash of the piece index rather than Math.random(), a piece
 * always flies in from the same place, so a re-render mid-flight never makes
 * it jump to a new trajectory.
 *
 * Pieces settle on a long easeOut curve: fast at first, then a slow lock into
 * place. That deceleration is what reads as "snapping into a slot" instead of
 * "sliding in".
 */

/** Deterministic 0..1 from an integer seed. */
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const SETTLE = [0.16, 1, 0.3, 1];

export function AssemblePiece({
  children,
  index = 0,
  delay = 0,
  stagger = 0.04,
  distance = 70,
  spin = 34,
  duration = 1.05,
  active = true,
  className,
  style,
}) {
  const reduced = useReducedMotion();

  // Scatter on a circle so pieces arrive from every direction, not one axis.
  const angle = rand(index * 1.7 + 1) * Math.PI * 2;
  const reach = distance * (0.55 + rand(index * 2.3 + 5) * 0.8);
  const tilt = (rand(index * 3.1 + 9) - 0.5) * spin;

  if (reduced) {
    return (
      <span className={className} style={{ display: "inline-block", ...style }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform, opacity, filter",
        ...style,
      }}
      initial={{
        x: Math.cos(angle) * reach,
        y: Math.sin(angle) * reach,
        rotate: tilt,
        opacity: 0,
        filter: "blur(7px)",
      }}
      animate={
        active
          ? { x: 0, y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{
        delay: delay + index * stagger,
        duration,
        ease: SETTLE,
        filter: { duration: duration * 0.55, delay: delay + index * stagger },
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Splits text on whitespace and assembles it word by word, preserving the
 * original spacing (the separator tokens are kept and rendered as-is, so
 * double spaces and line breaks survive).
 */
export function AssembleWords({
  text,
  active = true,
  delay = 0,
  stagger = 0.03,
  distance = 60,
  spin = 26,
  duration = 1,
  style,
}) {
  const tokens = String(text ?? "").split(/(\s+)/);
  let wordIndex = 0;

  return (
    <>
      {tokens.map((token, i) => {
        if (token === "") return null;
        if (/^\s+$/.test(token)) {
          return (
            <span key={i} style={{ whiteSpace: "pre" }}>
              {token}
            </span>
          );
        }
        const index = wordIndex++;
        return (
          <AssemblePiece
            key={i}
            index={index}
            delay={delay}
            stagger={stagger}
            distance={distance}
            spin={spin}
            duration={duration}
            active={active}
            style={style}
          >
            {token}
          </AssemblePiece>
        );
      })}
    </>
  );
}

/** Same idea, one piece per character — used for the big display type. */
export function AssembleChars({
  text,
  active = true,
  delay = 0,
  stagger = 0.05,
  distance = 130,
  spin = 55,
  duration = 1.25,
  style,
}) {
  return (
    <>
      {String(text ?? "")
        .split("")
        .map((char, i) =>
          char === " " ? (
            <span key={i} style={{ whiteSpace: "pre" }}>
              {char}
            </span>
          ) : (
            <AssemblePiece
              key={i}
              index={i}
              delay={delay}
              stagger={stagger}
              distance={distance}
              spin={spin}
              duration={duration}
              active={active}
              style={style}
            >
              {char}
            </AssemblePiece>
          )
        )}
    </>
  );
}
