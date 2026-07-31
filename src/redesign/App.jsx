import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "./data/projects";
import { Cursor } from "./components/Cursor";
import { BootSequence } from "./components/BootSequence";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { HeroContent, WorkContent, AboutContent, ContactContent } from "./components/sections";
import { HeroParticleMorph } from "./components/HeroParticleMorph";
import { AssemblePiece } from "./components/Assemble";
import { LanguageProvider, useLang, t, LANGS } from "./i18n";

const PANELS = [
  { id: "intro", label: { en: "Intro", es: "Inicio", ca: "Inici" } },
  { id: "work", label: { en: "Work", es: "Trabajo", ca: "Treball" } },
  { id: "about", label: { en: "About", es: "Sobre mí", ca: "Sobre mi" } },
  { id: "contact", label: { en: "Contact", es: "Contacto", ca: "Contacte" } },
];

const OPEN_STATUS_YEAR = { en: "Open to opportunities · 2026", es: "Abierto a oportunidades · 2026", ca: "Obert a oportunitats · 2026" };
const FROM_BCN = { en: "From BCN", es: "Desde BCN", ca: "Des de BCN" };
const SCROLL_HINT = { en: "Scroll / drag / arrows", es: "Scroll / arrastra / flechas", ca: "Scroll / arrossega / fletxes" };

/* ───────────────────────  HORIZONTAL DECK ENGINE  ─────────────────────── */
function Deck({
  index,
  onNavigate,
  panels,
  count,
  locked = false,
}) {
  const lock = useRef(false);
  const acc = useRef(0);

  useEffect(() => {
    /**
     * While a case study is open the deck must not listen at all. Its handlers
     * sit on window, so scrolling inside the overlay used to advance the deck
     * behind it — closing the overlay then dropped you on About or Contact
     * instead of back on Work. Bailing before the listeners are attached also
     * stops the arrow keys from driving the deck and the overlay at once.
     */
    if (locked) {
      acc.current = 0;
      return undefined;
    }

    const advance = (dir) => {
      if (lock.current) return;
      lock.current = true;
      onNavigate(Math.max(0, Math.min(count - 1, index + dir)));
      setTimeout(() => (lock.current = false), 850);
    };

    const onWheel = (e) => {
      if (lock.current) return;
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      acc.current += d;
      if (Math.abs(acc.current) > 40) {
        advance(acc.current > 0 ? 1 : -1);
        acc.current = 0;
      }
    };
    const onKey = (e) => {
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) advance(1);
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) advance(-1);
    };

    let ts = 0;
    const onTS = (e) => (ts = e.touches[0].clientX);
    const onTE = (e) => {
      const diff = ts - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 55) advance(diff > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, [count, index, onNavigate, locked]);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      <div
        className="flex flex-row h-screen"
        style={{
          width: `${count * 100}vw`,
          transform: `translateX(${-index * 100}vw)`,
          transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        {panels.map((node, i) => (
          <div
            key={i}
            data-deck-panel={i}
            className="relative flex flex-col justify-center px-7 md:px-12"
            style={{ width: "100vw", height: "100vh", flexShrink: 0, paddingTop: "5.5rem", paddingBottom: "4.5rem" }}
          >
            <div
              className="w-full h-full overflow-hidden"
              style={{
                opacity: index === i ? 1 : 0,
                transform: index === i ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              {node}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────  LANG TOGGLE  ────────────────────────────── */
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1" data-cursor="Lang">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="transition-colors"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: lang === l ? "#D63022" : "rgba(245,244,239,0.45)",
            padding: "2px 4px",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────  APP  ──────────────────────────────────── */
function AppInner() {
  const { lang } = useLang();
  const [booted, setBooted] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [workEntry, setWorkEntry] = useState({
    id: 0,
    direction: "forward",
  });
  const [particleRestart, setParticleRestart] = useState(0);
  const [aboutPhotoVisible, setAboutPhotoVisible] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setAboutPhotoVisible(false);
    if (index !== 2) return undefined;

    const interval = setInterval(
      () => setAboutPhotoVisible((visible) => !visible),
      3000
    );
    return () => clearInterval(interval);
  }, [index]);

  const handleDone = useCallback(() => setBooted(true), []);
  const goTo = useCallback((i) => {
    const current = indexRef.current;
    if (i === current) return;
    if (i === 1) {
      setWorkEntry((entry) => ({
        id: entry.id + 1,
        direction: current >= 2 ? "reverse" : "forward",
      }));
    }
    indexRef.current = i;
    setIndex(i);
  }, []);
  const returnToIntro = useCallback(() => {
    setParticleRestart((value) => value + 1);
    indexRef.current = 0;
    setIndex(0);
  }, []);

  const openIdx = projects.findIndex((p) => p.id === openId);
  const openProject = openIdx >= 0 ? projects[openIdx] : null;
  const openProjectAt = (delta) => {
    const n = (openIdx + delta + projects.length) % projects.length;
    setOpenId(projects[n].id);
  };

  const panelNodes = [
    <HeroContent key="intro" booted={booted} onGoWork={() => goTo(1)} />,
    <WorkContent
      key="work"
      onOpen={(p) => setOpenId(p.id)}
      entry={workEntry}
      compact
    />,
    <AboutContent
      key="about"
      photoVisible={aboutPhotoVisible}
    />,
    <ContactContent key="contact" onReturnHome={returnToIntro} />,
  ];

  return (
    <div style={{ background: "#0C0B09", minHeight: "100vh", cursor: "none" }}>
      <style>{`
        @keyframes xb-marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        @keyframes xb-blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        @keyframes xb-spin {
          from { transform: rotateX(-18deg) rotateY(0deg); }
          to   { transform: rotateX(-18deg) rotateY(360deg); }
        }
        @keyframes xb-rise {
          from { transform: translateY(105%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes xb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        ::selection { background:#D63022; color:#F5F4EF; }
        a, button { cursor: none; }
      `}</style>

      <Cursor />
      <BootSequence onDone={handleDone} />
      <ProjectOverlay
        project={openProject}
        onClose={() => setOpenId(null)}
        onPrev={() => openProjectAt(-1)}
        onNext={() => openProjectAt(1)}
      />
      <HeroParticleMorph
        scene={index}
        restartToken={particleRestart}
        aboutPhotoVisible={aboutPhotoVisible}
      />

      {/* NAV */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-[150]"
      >
        <nav className="flex items-center justify-between px-7 md:px-12 py-5">
          <AssemblePiece index={0} delay={0.05} stagger={0} distance={44} spin={12} active={booted}>
            <button
              onClick={() => goTo(0)}
              data-cursor="Home"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, letterSpacing: "0.06em", fontSize: "0.85rem", textTransform: "uppercase", color: "#F5F4EF" }}
            >
              XAVI BOSCH<span style={{ color: "#D63022" }}>.</span>
            </button>
          </AssemblePiece>
          <div className="flex items-center gap-5 md:gap-8">
            {PANELS.map((p, i) => (
              <AssemblePiece key={p.id} index={i} delay={1.35} stagger={0.07} distance={40} spin={14} active={booted}>
                <button
                  data-cursor="Go"
                  onClick={() => goTo(i)}
                  className="hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem", letterSpacing: "0.14em", textTransform: "uppercase", color: index === i ? "#D63022" : "rgba(245,244,239,0.6)" }}
                >
                  {String(i + 1).padStart(2, "0")} {t(p.label, lang)}
                </button>
              </AssemblePiece>
            ))}
            <AssemblePiece index={4} delay={1.35} stagger={0.07} distance={40} spin={14} active={booted}>
              <LangToggle />
            </AssemblePiece>
          </div>
        </nav>
      </motion.header>

      {/* STATUS RAIL */}
      <div className="fixed bottom-5 left-7 md:left-12 z-[120] hidden md:flex items-center gap-2.5 pointer-events-none">
        <AssemblePiece index={1} delay={2.15} stagger={0} distance={38} spin={10} active={booted}>
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", animation: "xb-blink 2.5s infinite" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(245,244,239,0.5)", textTransform: "uppercase" }}>
              {t(OPEN_STATUS_YEAR, lang)}
            </span>
          </span>
        </AssemblePiece>
      </div>
      <div className="fixed bottom-5 right-7 md:right-12 z-[120] hidden md:block pointer-events-none">
        <AssemblePiece index={2} delay={2.25} stagger={0} distance={38} spin={10} active={booted}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(245,244,239,0.5)" }}>
            {t(FROM_BCN, lang)} — {clock}
          </span>
        </AssemblePiece>
      </div>

      {/* DECK */}
      <Deck
        index={index}
        onNavigate={goTo}
        panels={panelNodes}
        count={PANELS.length}
        locked={openId !== null}
      />

      {/* PROGRESS DOTS (bottom center) */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[120] flex flex-row gap-3">
        {PANELS.map((p, i) => (
          <AssemblePiece key={p.id} index={i} delay={1.95} stagger={0.06} distance={30} spin={0} active={booted}>
            <button data-cursor={t(p.label, lang)} onClick={() => goTo(i)}>
              <span
                style={{
                  width: index === i ? 28 : 10,
                  height: 2,
                  background: index === i ? "#D63022" : "rgba(245,244,239,0.3)",
                  transition: "all 0.4s cubic-bezier(0.76,0,0.24,1)",
                  display: "block",
                }}
              />
            </button>
          </AssemblePiece>
        ))}
      </div>

      {/* NAV HINT */}
      <AnimatePresence>
        {index < PANELS.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 pointer-events-none"
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.6)" }}>
              {t(SCROLL_HINT, lang)}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-white/60" style={{ animation: "xb-blink 2s infinite" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
