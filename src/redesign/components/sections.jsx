import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { motion } from "motion/react";
import { projects, techMarquee } from "../data/projects";
import { degree, intro, disciplines, skillTracks } from "../data/skills";
import { useLang, t } from "../i18n";
import { Scramble } from "./Scramble";
import { AssemblePiece, AssembleWords } from "./Assemble";
import { AsciiPhoto } from "./AsciiPhoto";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* UI copy that isn't per-project data lives here, next to the components
   that render it. Keys map straight to the strings below. */
const UI = {
  heroKicker: { en: "Interactive Product Design", es: "Diseño de Producto Interactivo", ca: "Disseny de Producte Interactiu" },
  heroPlace: { en: "Barcelona · La Salle", es: "Barcelona · La Salle", ca: "Barcelona · La Salle" },
  heroBody: {
    en: "A student exploring the intersection of design, technology, and the future. Building small systems, experiments and prototypes where hardware, software and interaction meet.",
    es: "Un estudiante explorando la intersección entre diseño, tecnología y futuro. Construyendo pequeños sistemas, experimentos y prototipos donde se encuentran el hardware, el software y la interacción.",
    ca: "Un estudiant explorant la intersecció entre disseny, tecnologia i futur. Construint petits sistemes, experiments i prototips on es troben el hardware, el software i la interacció.",
  },
  heroCta: { en: "View the work", es: "Ver el trabajo", ca: "Veure el treball" },

  // A bare "18" is ambiguous, so the badge carries its meaning in the cursor
  // label and the title/aria text rather than leaving the number to guess at.
  builtAtAge: { en: "Built at 18", es: "Hecho a los 18", ca: "Fet als 18" },

  skillsLabel: { en: "What I've learned", es: "Lo que he aprendido", ca: "El que he après" },

  workLabel: { en: "My Projects", es: "Mis Proyectos", ca: "Els Meus Projectes" },
  workCount: { en: "projects", es: "proyectos", ca: "projectes" },

  aboutScramble: { en: "About · Xavi Bosch", es: "Sobre mí · Xavi Bosch", ca: "Sobre mi · Xavi Bosch" },
  aboutDegree: { en: "Interactive Product Design and Creation", es: "Diseño y Creación de Productos Interactivos", ca: "Disseny i Creació de Productes Interactius" },
  aboutP1a: { en: "I'm currently studying", es: "Actualmente estudio", ca: "Actualment estudio" },
  aboutP1b: {
    en: "at La Salle Barcelona, where I've been developing a perspective that combines design, technology, and digital product development.",
    es: "en La Salle Barcelona, donde he ido desarrollando una perspectiva que combina diseño, tecnología y desarrollo de producto digital.",
    ca: "a La Salle Barcelona, on he anat desenvolupant una perspectiva que combina disseny, tecnologia i desenvolupament de producte digital.",
  },
  aboutP2: {
    en: "What motivates me most is exploring the space where technical thinking meets human needs. I enjoy understanding how products work behind the scenes, but I'm just as interested in how people interact with them and what makes an experience feel intuitive.",
    es: "Lo que más me motiva es explorar el espacio donde el pensamiento técnico se encuentra con las necesidades humanas. Disfruto entendiendo cómo funcionan los productos por dentro, pero me interesa igual cómo interactúa la gente con ellos y qué hace que una experiencia se sienta intuitiva.",
    ca: "El que més em motiva és explorar l'espai on el pensament tècnic es troba amb les necessitats humanes. Gaudeixo entenent com funcionen els productes per dins, però m'interessa igual com hi interactua la gent i què fa que una experiència se senti intuïtiva.",
  },
  aboutP3: {
    en: "Recently, much of that curiosity has been focused on artificial intelligence, and how it is changing the way digital products are imagined, designed, and built, and the opportunities it creates for the future.",
    es: "Últimamente, buena parte de esa curiosidad se ha centrado en la inteligencia artificial, y cómo está cambiando la forma en que se imaginan, diseñan y construyen los productos digitales, y las oportunidades que crea para el futuro.",
    ca: "Últimament, bona part d'aquesta curiositat s'ha centrat en la intel·ligència artificial, i com està canviant la manera com s'imaginen, es dissenyen i es construeixen els productes digitals, i les oportunitats que crea per al futur.",
  },
  aboutP4: {
    en: "This portfolio is a reflection of that journey: a collection of projects, experiments, and ideas that represent what I'm learning and the kind of products I hope to build.",
    es: "Este portfolio es un reflejo de ese recorrido: una colección de proyectos, experimentos e ideas que representan lo que estoy aprendiendo y el tipo de productos que espero construir.",
    ca: "Aquest portfolio és un reflex d'aquest recorregut: una col·lecció de projectes, experiments i idees que representen el que estic aprenent i el tipus de productes que espero construir.",
  },

  contactLabel: { en: "Contact", es: "Contacto", ca: "Contacte" },
  contactStatus: { en: "Open to opportunities", es: "Abierto a oportunidades", ca: "Obert a oportunitats" },
  contactHeading1: { en: "Let's", es: "Hablemos", ca: "Parlem" },
  contactHeading2: { en: "work", es: "de tu", ca: "del teu" },
  contactHeading3: { en: "together.", es: "proyecto.", ca: "projecte." },
  contactBody: {
    en: "I'm looking for internships and junior roles in product design and development where I can keep building real, thoughtful digital products. Feel free to reach out. I would love to talk.",
    es: "Estoy buscando prácticas y puestos junior en diseño y desarrollo de producto donde pueda seguir construyendo productos digitales reales y con criterio. Escríbeme sin problema. Me encantaría hablar.",
    ca: "Estic buscant pràctiques i llocs júnior en disseny i desenvolupament de producte on pugui seguir construint productes digitals reals i amb criteri. Escriu-me sense problema. M'encantaria parlar.",
  },
  labelEmail: { en: "Email", es: "Email", ca: "Email" },
  labelBasedIn: { en: "Based in", es: "Ubicado en", ca: "Ubicat a" },
};

const OPEN_STATUS_YEAR = { en: "Open to opportunities · 2026", es: "Abierto a oportunidades · 2026", ca: "Obert a oportunitats · 2026" };
const FROM_BCN = { en: "From BCN", es: "Desde BCN", ca: "Des de BCN" };
const SCROLL_HINT = { en: "Scroll / drag / arrows", es: "Scroll / arrastra / flechas", ca: "Scroll / arrossega / fletxes" };

/* ─────────────────────────  HERO NAME (kinetic)  ───────────────────────── */
export function HeroName({ booted = true }) {
  const ref = useRef(null);
  const rowRefs = useRef([]);

  /**
   * The magnetic effect writes transforms straight to the DOM inside a single
   * rAF loop. Storing pointer position in React state re-rendered both <h1>
   * elements (and their motion wrappers) on every mousemove, which is what
   * made the name stutter. Now React renders once and the loop owns motion.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - (r.left + r.width / 2)) / (r.width || 1);
      target.y = (e.clientY - (r.top + r.height / 2)) / (r.height || 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      // lerp toward the pointer: smooth trail instead of a hard snap
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      rowRefs.current.forEach((row, ri) => {
        if (!row) return;
        const dx = current.x * (ri === 0 ? 18 : -18);
        const dy = current.y * 8;
        row.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const rows = ["XAVI", "BOSCH"];
  // Letters keep assembling across both rows, so BOSCH continues the count
  // rather than restarting the stagger halfway through the name.
  let charIndex = 0;

  return (
    <div ref={ref} className="select-none">
      {rows.map((word, ri) => {
        const startIndex = charIndex;
        charIndex += word.length;
        return (
          <div
            key={word}
            ref={(el) => (rowRefs.current[ri] = el)}
            style={{ willChange: "transform" }}
          >
            <h1
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(4rem, 16vw, 17rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.03em",
                color: "#F5F4EF",
                margin: 0,
              }}
            >
              {word.split("").map((char, ci) => (
                <AssemblePiece
                  key={`${word}-${ci}`}
                  index={startIndex + ci}
                  delay={0.2}
                  stagger={0.055}
                  distance={150}
                  spin={52}
                  duration={1.3}
                  active={booted}
                >
                  {char}
                </AssemblePiece>
              ))}
            </h1>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────  MARQUEE  ──────────────────────────────── */
export function Marquee() {
  const content = [...techMarquee, ...techMarquee];
  return (
    <div
      className="py-4 overflow-hidden select-none w-full"
      style={{ background: "#D63022", borderTop: "1px solid rgba(245,244,239,0.15)", borderBottom: "1px solid rgba(245,244,239,0.15)" }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: "xb-marquee 32s linear infinite" }}>
        {content.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#F5F4EF" }}
          >
            {item}
            <span style={{ opacity: 0.55 }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────  HERO CONTENT  ───────────────────────────── */
export function HeroContent({ booted, onGoWork }) {
  const { lang } = useLang();
  return (
    <div className="relative w-full flex flex-col justify-between h-full overflow-hidden">
      <div className="relative z-10 flex items-start justify-between flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.12)", paddingBottom: "1.1rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          <AssembleWords text={t(UI.heroKicker, lang)} active={booted} delay={0.1} stagger={0.05} distance={46} spin={18} />
        </p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          <AssembleWords text={t(UI.heroPlace, lang)} active={booted} delay={0.18} stagger={0.05} distance={46} spin={18} />
        </p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
        <HeroName booted={booted} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <p
          className="max-w-md"
          style={{ fontSize: "1rem", lineHeight: 1.6, color: "rgba(245,244,239,0.7)" }}
        >
          <AssembleWords
            text={t(UI.heroBody, lang)}
            active={booted}
            delay={0.95}
            stagger={0.022}
            distance={52}
            spin={22}
            duration={0.95}
          />
        </p>
        <AssemblePiece index={3} delay={1.75} stagger={0} distance={80} spin={16} duration={1.1} active={booted}>
          <a
            href="#work"
            data-cursor="Enter"
            onClick={(e) => { if (onGoWork) { e.preventDefault(); onGoWork(); } }}
            className="inline-flex items-center gap-3 px-6 py-4 group"
            style={{ border: "1px solid rgba(245,244,239,0.4)", color: "#F5F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            {t(UI.heroCta, lang)}
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </AssemblePiece>
      </div>
    </div>
  );
}

/* ────────────────────────────  PROJECT ROW  ───────────────────────────── */
const TYPE_START_DELAY = 0.62;
const TYPE_LETTER_DELAY = 0.07;

function AnimatedProjectName({ name, entry }) {
  const letters = Array.from(name);
  const reverse = entry.direction === "reverse";
  const duration = Math.max(
    0.5,
    letters.length * TYPE_LETTER_DELAY + 0.16
  );

  return (
    <span
      className="relative inline-flex"
      aria-label={name}
      style={{ whiteSpace: "nowrap" }}
    >
      {letters.map((letter, index) => {
        const order = reverse ? letters.length - 1 - index : index;
        return (
          <motion.span
            key={`${entry.id}-${entry.direction}-${index}`}
            aria-hidden="true"
            initial={
              entry.id === 0
                ? false
                : {
                    opacity: 0,
                    y: reverse ? "-0.12em" : "0.12em",
                    scaleX: 0.55,
                    filter: "blur(2px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scaleX: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay:
                TYPE_START_DELAY + order * TYPE_LETTER_DELAY,
              duration: 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "inline-block",
              transformOrigin: reverse
                ? "right center"
                : "left center",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}

      {entry.id > 0 && (
        <motion.span
          key={`caret-${entry.id}-${entry.direction}`}
          aria-hidden="true"
          className="absolute"
          initial={{
            left: reverse ? "100%" : "0%",
            opacity: 0,
          }}
          animate={{
            left: reverse ? "0%" : "100%",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            left: {
              delay: TYPE_START_DELAY,
              duration,
              ease: [0.76, 0, 0.24, 1],
            },
            opacity: {
              delay: TYPE_START_DELAY,
              duration: duration + 0.18,
              times: [0, 0.08, 0.82, 1],
            },
          }}
          style={{
            top: "-0.04em",
            bottom: "-0.02em",
            width: 2,
            background: "#D63022",
            boxShadow: "0 0 8px rgba(214,48,34,0.65)",
          }}
        />
      )}
    </span>
  );
}

export function ProjectRow({
  p,
  onHover,
  onOpen,
  compact,
  entry,
}) {
  const [hover, setHover] = useState(false);
  const { lang } = useLang();
  return (
    <div
      className="group relative cursor-pointer"
      data-cursor="View"
      style={{ borderBottom: "1px solid rgba(245,244,239,0.12)" }}
      onMouseEnter={() => { setHover(true); onHover(p.id); }}
      onMouseLeave={() => { setHover(false); onHover(null); }}
      onClick={() => onOpen(p)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "#F5F4EF",
          transform: hover ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: hover ? "bottom" : "top",
          transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
        }}
      />
      <div
        className={`relative flex items-center gap-5 md:gap-10 px-1 ${compact ? "" : "py-6 md:py-8"}`}
        /* Compact rows live in a fixed 100vh panel, so their padding has to be
           height-driven. A width-driven size overflowed the panel on short
           windows and pushed the eighth project under the progress dots. */
        style={compact ? { paddingTop: "clamp(0.2rem, calc(var(--row-h) * 0.13), 1rem)", paddingBottom: "clamp(0.2rem, calc(var(--row-h) * 0.13), 1rem)" } : undefined}
      >
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", width: "2rem", flexShrink: 0, color: hover ? "#D63022" : "rgba(245,244,239,0.4)", transition: "color 0.3s" }}
        >
          {p.id}
        </span>
        <span
          className="flex-1"
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: compact ? "clamp(0.8rem, min(3.5vw, calc(var(--row-h) * 0.62)), 2.6rem)" : "clamp(2rem, 6vw, 5rem)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: hover ? "#0C0B09" : "#F5F4EF",
            transition: "color 0.35s",
          }}
        >
          <AnimatedProjectName name={p.name} entry={entry} />
        </span>
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {p.tags.map((tag, ti) => (
            <span
              key={ti}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 11px", border: `1px solid ${hover ? "rgba(12,11,9,0.3)" : "rgba(245,244,239,0.2)"}`, color: hover ? "#0C0B09" : "rgba(245,244,239,0.6)", transition: "all 0.3s" }}
            >
              {t(tag, lang)}
            </span>
          ))}
          {p.age && (
            <span
              title={t(UI.builtAtAge, lang)}
              aria-label={t(UI.builtAtAge, lang)}
              data-cursor={t(UI.builtAtAge, lang)}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", padding: "5px 9px", border: "1px solid rgba(214,48,34,0.55)", color: "#D63022", transition: "all 0.3s" }}
            >
              {p.age}
            </span>
          )}
        </div>
        <ArrowUpRight
          className={`${compact ? "w-5 h-5" : "w-6 h-6 md:w-8 md:h-8"} flex-shrink-0`}
          style={{ color: hover ? "#D63022" : "#F5F4EF", transform: hover ? "translate(0,0)" : "translate(-6px,6px)", opacity: hover ? 1 : 0.3, transition: "all 0.35s" }}
        />
      </div>
    </div>
  );
}

/* ───────────────────────────  WORK CONTENT  ───────────────────────────── */
export function WorkContent({ onOpen, compact, entry }) {
  const [hovered, setHovered] = useState(null);
  const followRef = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    const el = followRef.current;
    if (!el) return;
    const CARD_H = 250;
    const CARD_W = 280;
    const BOTTOM_SAFE = 96; // clear the bottom nav dots / hint
    const move = (e) => {
      // in the lower half of the screen, flip the preview ABOVE the cursor
      let y = e.clientY > window.innerHeight * 0.5 ? e.clientY - CARD_H - 24 : e.clientY - 40;
      y = Math.max(24, Math.min(y, window.innerHeight - CARD_H - BOTTOM_SAFE));
      const x = Math.min(e.clientX + 24, window.innerWidth - CARD_W - 16);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const active = projects.find((p) => p.id === hovered);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-baseline justify-between flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.12)", paddingBottom: "1.1rem" }}>
        <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          {t(UI.workLabel, lang)}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(245,244,239,0.4)" }}>
          [ {projects.length} ] {t(UI.workCount, lang)}
        </span>
      </div>

      {/* pt gives the first row air so it never touches the header rule */}
      {/* Top-aligned, not centred: the list sits tight under the header rule
          and leftover room collects at the bottom.

          --row-h is the height budget each row gets: the panel height minus
          its chrome (padding, header rule, bottom nav), divided by how many
          projects there actually are. Rows size themselves off it, so adding
          a tenth or twelfth project shrinks the list to fit instead of
          pushing the last one under the progress dots. */}
      <div
        className="flex-1 min-h-0 flex flex-col justify-start"
        style={{
          paddingTop: "clamp(0.15rem, 0.5vh, 0.5rem)",
          "--row-h": `calc((100vh - 14rem) / ${projects.length})`,
        }}
      >
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            p={p}
            onHover={setHovered}
            onOpen={onOpen}
            compact={compact}
            entry={entry}
          />
        ))}
      </div>

      <div
        ref={followRef}
        className="fixed top-0 left-0 z-[80] pointer-events-none hidden md:block"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        {active && (
          <div style={{ width: 280, background: "#0C0B09", border: "1px solid rgba(245,244,239,0.15)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
            {active.images?.length > 0 && (
              <div style={{ height: 160, overflow: "hidden" }}>
                <ImageWithFallback
                  src={active.images[0]}
                  alt={active.name}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div style={{ padding: "14px 16px", borderTop: "2px solid #D63022" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.5)", marginBottom: 5 }}>
                {t(active.context, lang)}
              </p>
              <p style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.05, textTransform: "uppercase", color: "#F5F4EF" }}>
                {t(active.tagline, lang)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────  ABOUT CONTENT  ───────────────────────────── */
export function AboutContent({ photoVisible = false }) {
  const { lang } = useLang();
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto md:overflow-hidden">
      <div className="flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.12)", paddingBottom: "1.1rem" }}>
        <Scramble
          text={t(UI.aboutScramble, lang)}
          duration={1500}
          style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}
        />
      </div>

      <div className="flex-1 min-h-0 grid md:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] gap-8 md:gap-12 lg:gap-16 items-stretch pt-5">
        <div className="flex flex-col justify-center min-h-0" style={{ gap: "clamp(0.85rem, 2.2vh, 1.25rem)" }}>
          <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.55, color: "#F5F4EF" }}>
            {t(UI.aboutP1a, lang)} <span style={{ color: "#D63022" }}>{t(UI.aboutDegree, lang)}</span> {t(UI.aboutP1b, lang)}
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.05rem)", lineHeight: 1.55, color: "rgba(245,244,239,0.68)" }}>
            {t(UI.aboutP2, lang)}
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.05rem)", lineHeight: 1.55, color: "rgba(245,244,239,0.68)" }}>
            {t(UI.aboutP3, lang)}
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.05rem)", lineHeight: 1.55, color: "rgba(245,244,239,0.68)" }}>
            {t(UI.aboutP4, lang)}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {["Swift", "Python + AI", "Arduino / ESP32", "NFC / MQTT", "Java", "Figma"].map((tag) => (
              <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 11px", border: "1px solid rgba(245,244,239,0.2)", color: "rgba(245,244,239,0.65)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="min-h-[24rem] md:min-h-0 md:h-full flex items-center justify-center md:justify-end">
          <AsciiPhoto
            src="/images/about-event.jpg"
            alt="Xavi Bosch"
            fitHeight
            photoVisible={photoVisible}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────  CONTACT CONTENT  ──────────────────────────── */
export function ContactContent({ onReturnHome }) {
  const { lang } = useLang();
  const methods = [
    { icon: Mail, label: UI.labelEmail, value: "bosch.xavii@gmail.com", href: "mailto:bosch.xavii@gmail.com", cursor: "Email" },
    { icon: Linkedin, label: { en: "LinkedIn", es: "LinkedIn", ca: "LinkedIn" }, value: "xavi-bosch-galilea", href: "https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410", cursor: "LinkedIn" },
    { icon: Github, label: { en: "GitHub", es: "GitHub", ca: "GitHub" }, value: "github.com/xavibosch", href: "https://github.com/xavibosch", cursor: "GitHub" },
    { icon: MapPin, label: UI.labelBasedIn, value: "Barcelona, ES", href: null, cursor: "" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.12)", paddingBottom: "1.1rem" }}>
        <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          {t(UI.contactLabel, lang)}
        </span>
        <span className="flex items-center gap-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
          {t(UI.contactStatus, lang)}
        </span>
      </div>

      <div className="flex-1 min-h-0 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-20 items-center">
        <div>
          <h2 style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem, 8vw, 8rem)", lineHeight: 0.85, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#F5F4EF" }}>
            {t(UI.contactHeading1, lang)}<br />{t(UI.contactHeading2, lang)}<br /><span style={{ color: "#D63022" }}>{t(UI.contactHeading3, lang)}</span>
          </h2>
          <p className="mt-6 max-w-md" style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "rgba(245,244,239,0.68)" }}>
            {t(UI.contactBody, lang)}
          </p>
        </div>

        <div className="flex flex-col md:-translate-y-5">
          {methods.map(({ icon: Icon, label, value, href, cursor }) => {
            const inner = (
              <div className="flex items-center gap-4 py-4 group" style={{ borderTop: "1px solid rgba(245,244,239,0.12)" }}>
                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: "rgba(245,244,239,0.55)" }} />
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)" }}>{t(label, lang)}</span>
                  <span className="group-hover:text-[#D63022] transition-colors duration-200" style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.01em", color: "#F5F4EF" }}>{value}</span>
                </div>
                {href && <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-[#D63022] transition-all duration-200" style={{ color: "#F5F4EF" }} />}
              </div>
            );
            return href ? (
              <a key={value} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-cursor={cursor}>
                {inner}
              </a>
            ) : (
              <div key={value}>{inner}</div>
            );
          })}
          <button
            type="button"
            data-particle-end-target
            data-cursor="Restart"
            onClick={onReturnHome}
            aria-label="Return to intro"
            className="relative mt-2 h-20 md:h-24 w-full overflow-hidden"
            style={{ borderTop: "1px solid rgba(245,244,239,0.12)" }}
          >
            <span className="sr-only">The End</span>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center md:hidden"
              style={{
                fontFamily:
                  "'Snell Roundhand', 'Brush Script MT', cursive",
                fontSize: "clamp(2.7rem, 5vw, 4.8rem)",
                fontStyle: "italic",
                color: "rgba(245,244,239,0.08)",
              }}
            >
              The End
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────  SKILLS CONTENT  ─────────────────────────── */

/**
 * One scrolling row of the carousel. The track holds the items twice and
 * travels exactly -50%, so the second copy lands where the first started and
 * the loop is seamless. Direction and speed differ per row so the three
 * bands never lock into a pattern.
 */
function SkillTrack({ items, lang, reverse = false, duration = 42 }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="xb-marquee-row overflow-hidden select-none"
      style={{
        // fade the ends instead of cutting them hard against the panel edge
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="xb-track flex items-center"
        style={{
          width: "max-content",
          animation: `xb-marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center flex-shrink-0"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(0.58rem, 1.35vh, 0.72rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(245,244,239,0.72)",
              padding: "clamp(4px, 0.8vh, 8px) clamp(10px, 1.4vw, 16px)",
              border: "1px solid rgba(245,244,239,0.18)",
              marginRight: "clamp(6px, 0.7vw, 12px)",
              whiteSpace: "nowrap",
            }}
          >
            {t(item, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsContent() {
  const { lang } = useLang();
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-baseline justify-between flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.12)", paddingBottom: "1.1rem" }}>
        <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,244,239,0.55)" }}>
          {t(UI.skillsLabel, lang)}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(245,244,239,0.4)" }}>
          {t(degree, lang)}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-between" style={{ paddingTop: "clamp(0.6rem, 2vh, 1.6rem)" }}>
        <p
          className="max-w-3xl flex-shrink-0"
          style={{ fontSize: "clamp(0.85rem, 1.6vh, 1.05rem)", lineHeight: 1.55, color: "rgba(245,244,239,0.7)" }}
        >
          {t(intro, lang)}
        </p>

        {/* discipline · what I actually did */}
        <div
          className="grid md:grid-cols-2 min-h-0"
          style={{ gap: "clamp(0.5rem, 1.6vh, 1.4rem) clamp(1.5rem, 4vw, 4rem)", marginBlock: "clamp(0.6rem, 2vh, 1.6rem)" }}
        >
          {disciplines.map((d, i) => (
            <div key={i} className="flex gap-3 md:gap-4">
              <span
                className="flex-shrink-0"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.55rem, 1.2vh, 0.68rem)", color: "#D63022", paddingTop: "0.15em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 2vh, 1.3rem)", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.01em", color: "#F5F4EF" }}>
                  {t(d.field, lang)}
                </p>
                <p style={{ fontSize: "clamp(0.72rem, 1.4vh, 0.88rem)", lineHeight: 1.45, color: "rgba(245,244,239,0.6)", marginTop: "0.15rem" }}>
                  {t(d.did, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* the carousel. Bottom pad keeps the last row clear of the progress
            dots, which sit inside the panel's bottom padding. */}
        <div
          className="flex-shrink-0 flex flex-col"
          style={{ gap: "clamp(5px, 0.9vh, 10px)", paddingBottom: "clamp(1.5rem, 4vh, 2.5rem)" }}
        >
          <SkillTrack items={skillTracks[0]} lang={lang} duration={46} />
          <SkillTrack items={skillTracks[1]} lang={lang} duration={34} reverse />
          <SkillTrack items={skillTracks[2]} lang={lang} duration={54} />
        </div>
      </div>
    </div>
  );
}
