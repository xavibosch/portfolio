import { motion, AnimatePresence } from "motion/react";
import { X, Play, ArrowLeft, ArrowRight, Images } from "lucide-react";
import { Github } from "./BrandIcons";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLang, t } from "../i18n";

const UI = {
  gallery: { en: "GALLERY", es: "GALERÍA", ca: "GALERIA" },
  close: { en: "Close", es: "Cerrar", ca: "Tancar" },
  prev: { en: "Prev", es: "Ant.", ca: "Ant." },
  next: { en: "Next", es: "Seg.", ca: "Seg." },
  caseStudy: { en: "CASE STUDY", es: "CASO DE ESTUDIO", ca: "CAS D'ESTUDI" },
  taughtMe: { en: "What it taught me", es: "Qué aprendí", ca: "Què vaig aprendre" },
  role: { en: "Role", es: "Rol", ca: "Rol" },
  viewCode: { en: "View code", es: "Ver código", ca: "Veure codi" },
  watchDemo: { en: "Watch demo", es: "Ver demo", ca: "Veure demo" },
  viewGallery: { en: "View gallery", es: "Ver galería", ca: "Veure galeria" },
  image: { en: "image", es: "imagen", ca: "imatge" },
  images: { en: "images", es: "imágenes", ca: "imatges" },
};

/* ─────────────────────────  FULLSCREEN GALLERY  ───────────────────────── */
function Gallery({ project, onClose }) {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const n = project.images.length;
  const go = (d) => setI((c) => (c + d + n) % n);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    <motion.div
      className="fixed inset-0 z-[9500] flex flex-col"
      style={{ background: "rgba(6,5,4,0.98)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-16 flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.1)" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#D63022" }}>
          {project.name.toUpperCase()} · {t(UI.gallery, lang)}
        </span>
        <button onClick={onClose} data-cursor="Close" className="flex items-center gap-1.5 px-3 py-2 group" style={{ background: "#D63022", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5F4EF" }}>
          {t(UI.close, lang)} <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="w-full h-full flex items-center justify-center">
            <ImageWithFallback src={project.images[i]} alt={`${project.name} ${i + 1}`} className="max-w-full max-h-full" style={{ objectFit: "contain" }} />
          </motion.div>
        </AnimatePresence>

        {n > 1 && (
          <>
            <button onClick={() => go(-1)} data-cursor="Prev" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full" style={{ border: "1px solid rgba(245,244,239,0.25)", background: "rgba(12,11,9,0.6)", color: "#F5F4EF" }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => go(1)} data-cursor="Next" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full" style={{ border: "1px solid rgba(245,244,239,0.25)", background: "rgba(12,11,9,0.6)", color: "#F5F4EF" }}>
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="absolute top-6 right-6 md:right-12" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(245,244,239,0.7)" }}>
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </div>
      </div>

      {n > 1 && (
        <div className="flex gap-2 justify-center p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(245,244,239,0.1)" }}>
          {project.images.map((im, k) => (
            <button key={im} data-cursor="View" onClick={() => setI(k)} className="relative overflow-hidden" style={{ width: 80, height: 52, border: k === i ? "1px solid #D63022" : "1px solid rgba(245,244,239,0.15)", opacity: k === i ? 1 : 0.45, transition: "opacity 0.25s" }}>
              <ImageWithFallback src={im} alt="" className="w-full h-full" style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────  OVERLAY  ──────────────────────────────── */
export function ProjectOverlay({
  project,
  onClose,
  onPrev,
  onNext,
}) {
  const { lang } = useLang();
  const [gallery, setGallery] = useState(false);

  useEffect(() => setGallery(false), [project?.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (gallery) return; // gallery handles its own keys
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onPrev, onNext, gallery]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9000]"
          style={{ background: "#0C0B09" }}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 h-16 flex-shrink-0" style={{ borderBottom: "1px solid rgba(245,244,239,0.1)" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#D63022" }}>
              {project.id} · {t(UI.caseStudy, lang)}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={onPrev} data-cursor="Prev" className="flex items-center gap-1.5 px-3 py-2 hover:opacity-70 transition-opacity" style={{ border: "1px solid rgba(245,244,239,0.2)", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,244,239,0.8)" }}>
                <ArrowLeft className="w-3.5 h-3.5" /> {t(UI.prev, lang)}
              </button>
              <button onClick={onNext} data-cursor="Next" className="flex items-center gap-1.5 px-3 py-2 hover:opacity-70 transition-opacity" style={{ border: "1px solid rgba(245,244,239,0.2)", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,244,239,0.8)" }}>
                {t(UI.next, lang)} <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={onClose} data-cursor="Close" className="flex items-center gap-1.5 px-3 py-2 ml-1 group" style={{ background: "#D63022", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5F4EF" }}>
                {t(UI.close, lang)} <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[1.2fr_0.8fr] h-[calc(100vh-4rem)] overflow-y-auto md:overflow-hidden"
            >
              {/* LEFT — text */}
              <div className="flex flex-col justify-center px-6 md:px-12 py-8 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, ti) => (
                    <span key={ti} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid rgba(245,244,239,0.2)", color: "rgba(245,244,239,0.7)" }}>
                      {t(tag, lang)}
                    </span>
                  ))}
                </div>

                <h2 style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem, 6vw, 6.5rem)", lineHeight: 0.85, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#F5F4EF" }}>
                  {project.name}
                </h2>
                <p className="mt-3" style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.7rem)", lineHeight: 1.05, color: "#D63022", textTransform: "uppercase" }}>
                  {t(project.tagline, lang)}
                </p>

                <p className="mt-6 max-w-xl" style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "rgba(245,244,239,0.78)" }}>
                  {t(project.description, lang)}
                </p>

                <div className="mt-6 border-l-2 pl-5 max-w-xl" style={{ borderColor: "#D63022" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)" }}>
                    {t(UI.taughtMe, lang)}
                  </span>
                  <p className="mt-2" style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "rgba(245,244,239,0.7)" }}>
                    {t(project.learning, lang)}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <div className="flex flex-col gap-1 mr-3">
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)" }}>{t(UI.role, lang)}</span>
                    <span style={{ fontSize: "0.82rem", color: "#F5F4EF" }}>{t(project.role, lang)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", padding: "4px 9px", border: "1px solid rgba(245,244,239,0.18)", color: "rgba(245,244,239,0.7)" }}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={project.repo} target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2.5 px-5 py-3.5" style={{ background: "#F5F4EF", color: "#0C0B09", fontFamily: "'DM Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <Github className="w-4 h-4" /> {t(UI.viewCode, lang)}
                  </a>
                  {project.video && (
                    <a href={project.video} target="_blank" rel="noreferrer" data-cursor="Watch" className="inline-flex items-center gap-2.5 px-5 py-3.5" style={{ border: "1px solid rgba(245,244,239,0.3)", color: "#F5F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      <Play className="w-3.5 h-3.5" /> {t(UI.watchDemo, lang)}
                    </a>
                  )}
                </div>
              </div>

              {/* RIGHT — gallery entry button */}
              <div className="relative flex items-center justify-center p-6 md:p-10" style={{ borderLeft: "1px solid rgba(245,244,239,0.1)", background: "#141310" }}>
                <button
                  onClick={() => setGallery(true)}
                  data-cursor="Open"
                  className="group relative w-full max-w-sm overflow-hidden"
                  style={{ aspectRatio: "3 / 4", border: "1px solid rgba(245,244,239,0.15)" }}
                >
                  <ImageWithFallback
                    src={project.images[0]}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full group-hover:scale-105"
                    style={{ objectFit: "cover", filter: "brightness(0.55)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full group-hover:scale-110 transition-transform duration-300" style={{ background: "#D63022" }}>
                      <Images className="w-6 h-6" style={{ color: "#F5F4EF" }} />
                    </div>
                    <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "0.02em", color: "#F5F4EF" }}>
                      {t(UI.viewGallery, lang)}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,239,0.7)" }}>
                      {project.images.length} {project.images.length === 1 ? t(UI.image, lang) : t(UI.images, lang)}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {gallery && <Gallery project={project} onClose={() => setGallery(false)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
