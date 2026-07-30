import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang, t } from "../i18n";

const LINES = [
  { en: "systems online", es: "sistemas en línea", ca: "sistemes en línia" },
  { en: "scanning systems bus", es: "escaneando bus de sistemas", ca: "escanejant bus de sistemes" },
  { en: "loading interaction layer", es: "cargando capa de interacción", ca: "carregant capa d'interacció" },
  { en: "mounting design tokens", es: "montando tokens de diseño", ca: "muntant tokens de disseny" },
  { en: "all systems nominal", es: "todos los sistemas operativos", ca: "tots els sistemes operatius" },
];

const OS_LABEL = { en: "XB — Portfolio OS", es: "XB — Portfolio OS", ca: "XB — Portfolio OS" };
const FOOTER_LABEL = { en: "Xavi Bosch — Interactive Product Design", es: "Xavi Bosch — Diseño de Producto Interactivo", ca: "Xavi Bosch — Disseny de Producte Interactiu" };

/**
 * Terminal-style boot overlay that plays once on first load, echoing the
 * "systems" language of the real projects, then wipes away to reveal the site.
 */
export function BootSequence({ onDone }) {
  const { lang } = useLang();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const dur = 2200;
    const t0 = performance.now();
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setCount(100);
      setLineIdx(LINES.length - 1);
      setVisible(false);
      setTimeout(onDone, 700);
    };

    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setLineIdx(Math.min(LINES.length - 1, Math.floor(eased * LINES.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 350);
    };
    raf = requestAnimationFrame(tick);

    /**
     * Failsafe: requestAnimationFrame is throttled to zero in a background
     * tab, so a page opened in one (cmd-click, restored session) would sit on
     * the boot overlay forever. setTimeout keeps running there, so this
     * guarantees the site is always reachable.
     */
    const bail = setTimeout(finish, dur + 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between p-7 md:p-12"
          style={{ background: "#0C0B09" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(245,244,239,0.5)",
              }}
            >
              {t(OS_LABEL, lang)}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                color: "#D63022",
              }}
            >
              v2.0
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {LINES.map((l, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{
                  opacity: i <= lineIdx ? 1 : 0.15,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span style={{ color: "#D63022", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}>
                  {i < lineIdx ? "✓" : i === lineIdx ? "›" : "·"}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    color: "rgba(245,244,239,0.85)",
                  }}
                >
                  {t(l, lang)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <div style={{ overflow: "hidden" }}>
              <span
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 12vw, 9rem)",
                  lineHeight: 0.85,
                  color: "#F5F4EF",
                  letterSpacing: "-0.02em",
                }}
              >
                {count}
                <span style={{ color: "#D63022" }}>%</span>
              </span>
            </div>
            <div
              className="hidden md:block"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                color: "rgba(245,244,239,0.4)",
                textTransform: "uppercase",
              }}
            >
              {t(FOOTER_LABEL, lang)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
