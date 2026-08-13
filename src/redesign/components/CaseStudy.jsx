import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Images, Play } from "lucide-react";
import { Github } from "./BrandIcons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { t } from "../i18n";

/**
 * A case study read one idea at a time.
 *
 * The previous version stacked every section into one column, so opening a
 * project handed the reader six paragraphs at once and most of them bounced.
 * Here each idea gets the whole panel: a short passage, its own image, and a
 * numbered rail showing how much is left. Nothing is hidden, it is just not
 * all shouted simultaneously.
 *
 * Chapters are built from whichever fields a project actually has, so a
 * project with no failure to report simply has one chapter fewer rather than
 * an empty heading.
 */

const UI = {
  role: { en: "Role", es: "Rol", ca: "Rol" },
  viewCode: { en: "View code", es: "Ver código", ca: "Veure codi" },
  watchDemo: { en: "Watch demo", es: "Ver demo", ca: "Veure demo" },
  viewLive: { en: "Open it live", es: "Abrir en vivo", ca: "Obrir en directe" },
  next: { en: "Next", es: "Siguiente", ca: "Següent" },
  back: { en: "Back", es: "Atrás", ca: "Enrere" },
  viewGallery: { en: "View gallery", es: "Ver galería", ca: "Veure galeria" },
};

const CHAPTERS = [
  { key: "builtFor", label: { en: "Who it is for", es: "Para quién es", ca: "Per a qui és" } },
  { key: "problem", label: { en: "What was broken", es: "Qué estaba roto", ca: "Què estava trencat" } },
  { key: "description", label: { en: "What I built", es: "Qué construí", ca: "Què vaig construir" } },
  { key: "research", label: { en: "The research", es: "La investigación", ca: "La recerca" } },
  { key: "changed", label: { en: "What went wrong", es: "Qué falló", ca: "Què va fallar" } },
  { key: "learning", label: { en: "What it taught me", es: "Qué aprendí", ca: "Què vaig aprendre" } },
];

export function CaseStudy({ project, lang, onOpenGallery }) {
  const chapters = useMemo(
    () => CHAPTERS.filter((c) => project[c.key]),
    [project]
  );
  const [i, setI] = useState(0);

  // a different project starts at its own first chapter, never mid way through
  useEffect(() => setI(0), [project.id]);

  const go = (d) => setI((n) => Math.min(chapters.length - 1, Math.max(0, n + d)));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); go(1); }
      if (e.key === "ArrowUp") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapters.length]);

  const chapter = chapters[i];
  const shots = project.images ?? [];
  // one image per chapter where there are enough, otherwise reuse in order
  const shot = shots.length ? shots[i % shots.length] : null;
  const isLast = i === chapters.length - 1;

  return (
    <div className="grid md:grid-cols-[0.9fr_1.1fr] h-full">
      {/* ── left: the words ── */}
      <div className="flex flex-col px-6 md:px-12 py-7 md:py-9 min-h-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, ti) => (
            <span key={ti} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", border: "1px solid rgba(245,244,239,0.2)", color: "rgba(245,244,239,0.65)" }}>
              {typeof tag === "string" ? tag : t(tag, lang)}
            </span>
          ))}
          {project.age && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", padding: "3px 9px", border: "1px solid rgba(214,48,34,0.5)", color: "#D63022" }}>
              {project.age}
            </span>
          )}
        </div>

        <h2 className="mt-4" style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.4vw, 4.2rem)", lineHeight: 0.86, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#F5F4EF" }}>
          {project.name}
        </h2>
        <p className="mt-2" style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)", lineHeight: 1.05, color: "#D63022", textTransform: "uppercase" }}>
          {t(project.tagline, lang)}
        </p>

        {/* ── chapter marker ──
            One title at a time, at a size you can actually read. The old row
            of six tiny labels was both unreadable and told you nothing about
            where you were. */}
        <div className="mt-7">
          <div className="flex items-baseline gap-3 overflow-hidden">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#D63022", flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Deliberately not wrapped in AnimatePresence. This sits inside
                the overlay's own AnimatePresence mode="wait", and nesting them
                left the exit animation unresolved, so the outgoing chapter
                never handed over and the panel froze on chapter one while the
                counter kept moving. A changing key remounts and replays the
                entrance, which is the whole effect anyway. */}
              <motion.h3
                key={chapter.key}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: "#F5F4EF",
                }}
              >
                {t(chapter.label, lang)}
              </motion.h3>
          </div>

          {/* segmented progress, one notch per chapter, each a jump target */}
          <div className="flex gap-1.5 mt-3">
            {chapters.map((c, n) => (
              <button
                key={c.key}
                onClick={() => setI(n)}
                data-cursor="Read"
                aria-label={t(c.label, lang)}
                className="h-0.5 flex-1 transition-colors duration-300"
                style={{ background: n <= i ? "#D63022" : "rgba(245,244,239,0.16)" }}
              />
            ))}
          </div>
        </div>

        {/* ── the passage ── */}
        <div className="flex-1 flex items-center min-h-0 py-5">
            <motion.p
              key={chapter.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(0.95rem, 1.35vw, 1.15rem)",
                lineHeight: 1.62,
                color: "rgba(245,244,239,0.86)",
                maxWidth: "34rem",
              }}
            >
              {t(project[chapter.key], lang)}
            </motion.p>
        </div>

        {/* ── chapter nav ── */}
        <div className="flex items-center gap-2.5">
          <button onClick={() => go(-1)} disabled={i === 0} data-cursor="Back" className="p-2.5 disabled:opacity-25 transition-opacity" style={{ border: "1px solid rgba(245,244,239,0.2)", color: "#F5F4EF" }} aria-label={t(UI.back, lang)}>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => go(1)} disabled={isLast} data-cursor="Next" className="flex items-center gap-2 px-4 py-2.5 disabled:opacity-25 transition-opacity" style={{ background: isLast ? "transparent" : "#F5F4EF", border: "1px solid rgba(245,244,239,0.2)", color: isLast ? "#F5F4EF" : "#0C0B09", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {t(UI.next, lang)} <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <span className="ml-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "rgba(245,244,239,0.35)" }}>
            {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── the constants: role, tech, links ── */}
        <div className="mt-6 pt-5 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ borderTop: "1px solid rgba(245,244,239,0.1)" }}>
          <div className="flex flex-col gap-0.5">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)" }}>{t(UI.role, lang)}</span>
            <span style={{ fontSize: "0.76rem", color: "#F5F4EF" }}>{t(project.role, lang)}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", padding: "3px 8px", border: "1px solid rgba(245,244,239,0.16)", color: "rgba(245,244,239,0.65)" }}>{tech}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2 px-4 py-2.5" style={{ background: "#D63022", color: "#F5F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <Play className="w-3 h-3" /> {t(UI.viewLive, lang)}
              </a>
            )}
            {/* Not every project has a public repo, and a dead link is worse
                than no link. */}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2 px-4 py-2.5" style={{ background: "#F5F4EF", color: "#0C0B09", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <Github className="w-3.5 h-3.5" /> {t(UI.viewCode, lang)}
              </a>
            )}
            {project.video && (
              <a href={project.video} target="_blank" rel="noreferrer" data-cursor="Watch" className="inline-flex items-center gap-2 px-4 py-2.5" style={{ border: "1px solid rgba(245,244,239,0.3)", color: "#F5F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <Play className="w-3 h-3" /> {t(UI.watchDemo, lang)}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── right: the picture for this chapter ──
          Fitted, never cropped. Filling the panel looked sharp and cut the
          top and sides off every screenshot, which is the one thing a
          screenshot cannot afford. Whole image here, gallery for a closer
          look. */}
      <div className="relative hidden md:flex flex-col" style={{ borderLeft: "1px solid rgba(245,244,239,0.1)", background: "#100E0C" }}>
        {shot ? (
            <motion.div
              key={shot}
              className="flex-1 flex items-center justify-center p-8 lg:p-12 min-h-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={onOpenGallery}
                data-cursor="Zoom"
                className="relative max-w-full max-h-full group"
                style={{ border: "1px solid rgba(245,244,239,0.14)" }}
              >
                <ImageWithFallback
                  src={shot}
                  alt={project.name}
                  className="max-w-full block"
                  style={{ objectFit: "contain", maxHeight: "62vh" }}
                />
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(12,11,9,0.25)" }}
                />
              </button>
            </motion.div>
          ) : (
            <div
              className="absolute inset-0 grid place-items-center"
              style={{ background: "#100E0C" }}
            >
              <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "22vw", lineHeight: 1, color: "rgba(245,244,239,0.035)" }}>
                {project.id}
              </span>
            </div>
          )}

        {shots.length > 0 && (
          <div className="flex items-center justify-between px-8 lg:px-12 py-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(245,244,239,0.1)" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)" }}>
              {String((i % shots.length) + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
            </span>
            <button
              onClick={onOpenGallery}
              data-cursor="Open"
              className="inline-flex items-center gap-2 px-4 py-2.5"
              style={{ border: "1px solid rgba(245,244,239,0.25)", color: "#F5F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <Images className="w-3.5 h-3.5" /> {t(UI.viewGallery, lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
