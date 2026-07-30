import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'
import { UI, cleanText, t, useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { useTheme } from '../hooks/useTheme'

/**
 * Scroll to a project index in the horizontal pin section.
 * Uses Lenis if available, otherwise native scroll.
 */
function scrollToProject(index, sectionRef, total) {
  const el = sectionRef.current
  if (!el) return
  const rect = el.getBoundingClientRect()
  const sectionTop = rect.top + window.scrollY
  const totalScroll = el.offsetHeight - window.innerHeight
  if (totalScroll <= 0) return
  const targetProgress = total > 1 ? index / (total - 1) : 0
  const targetY = sectionTop + targetProgress * totalScroll
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(targetY, { duration: 1.1 })
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }
}

export default function Projects() {
  const { lang } = useLang()
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [sectionInView, setSectionInView] = useState(false)
  const sectionRef = useRef(null)

  // Responsive detection
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Section in-view (for header animation)
  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => setSectionInView(e.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Scroll-driven horizontal progress
  useEffect(() => {
    if (!isDesktop) { setProgress(0); return }

    let raf = 0
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const scrolled = Math.max(0, -rect.top)
      const p = Math.min(1, scrolled / total)
      setProgress(p)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isDesktop])

  const offset = isDesktop ? progress * (projects.length - 1) : 0
  const currentIdx = Math.round(offset)
  // Card width 58vw + gap 24px. Start card 0 centered with 21vw left pad.
  const translateExpr = `translateX(calc(21vw - ${offset} * (58vw + 24px)))`

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative"
        style={{
          height: isDesktop ? `${(projects.length + 0.4) * 100}vh` : 'auto',
        }}
      >
        <div
          className={
            isDesktop
              ? 'sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden'
              : 'py-14'
          }
        >
          {/* Header */}
          <div
            className={`relative z-10 px-6 lg:px-12 max-w-7xl mx-auto w-full mb-6 lg:mb-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-2">
                  {t(UI.work.eyebrow, lang)}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[0.95]">
                  {t(UI.work.title, lang)}
                </h2>
              </div>
              {isDesktop && (
                <div className="hidden lg:flex flex-col items-end gap-3 pb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em]">
                    <span className="text-white">
                      {String(currentIdx + 1).padStart(2, '0')}
                    </span>{' '}
                    / {String(projects.length).padStart(2, '0')}
                  </span>
                  {/* Clickable dots */}
                  <div className="flex items-center gap-2" role="tablist" aria-label="Projects">
                    {projects.map((p, i) => {
                      const active = i === currentIdx
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={`Go to project ${i + 1}`}
                          onClick={() => scrollToProject(i, sectionRef, projects.length)}
                          className="group flex items-center justify-center w-5 h-5 cursor-pointer"
                        >
                          <span
                            className={`block rounded-full transition-[width,height,background-color] duration-300 ease-out ${
                              active
                                ? 'w-2.5 h-2.5 bg-white'
                                : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/60'
                            }`}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: horizontal pinned scroll */}
          {isDesktop ? (
            <div className="relative">
              <div
                className="flex gap-6 will-change-transform"
                style={{ transform: translateExpr }}
              >
                {projects.map((p, i) => (
                  <HorizontalCard
                    key={p.id}
                    project={p}
                    index={i}
                    isActive={i === currentIdx}
                    distance={Math.abs(offset - i)}
                    onOpen={() => setSelected(p)}
                    lang={lang}
                  />
                ))}
                {/* Trailing spacer so last card centers */}
                <div className="flex-shrink-0 w-[21vw]" aria-hidden="true" />
              </div>
            </div>
          ) : (
            /* Mobile / tablet: stacked vertical cards */
            <div className="px-6 max-w-3xl mx-auto flex flex-col gap-6">
              {projects.map((p, i) => (
                <MobileCard
                  key={p.id}
                  project={p}
                  index={i}
                  onOpen={() => setSelected(p)}
                  lang={lang}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          index={projects.findIndex((p) => p.id === selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

/* ─────────────────────────────────────────── */

function HorizontalCard({ project, index, isActive, distance, onOpen, lang }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    if (!ref.current || !isActive) return
    // Tilt is a hover decoration — skip on coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -4.5, y: x * 6 })
  }

  const onLeave = () => setTilt({ x: 0, y: 0 })

  // Fade non-active cards proportionally
  const dimming = Math.min(0.7, distance * 0.55)
  const scale = isActive ? 1 : 1 - Math.min(0.08, distance * 0.06)

  return (
    <article
      className="flex-shrink-0 w-[58vw] max-w-[980px] relative flex flex-col"
      style={{
        opacity: 1 - dimming,
        transform: `scale(${scale})`,
        transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Watermark index — large, decorative, top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-6 right-2 font-black text-white/[0.06] select-none pointer-events-none leading-none tracking-tighter z-0"
        style={{ fontSize: 'clamp(5.5rem, 10vw, 10rem)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Image card — full poster visible, no overlay */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onOpen}
        className="relative z-10 w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] cursor-pointer group"
        style={{
          transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
          willChange: isActive ? 'transform' : 'auto',
        }}
      >
        {project.media?.src && (
          <img
            src={project.media.src}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            loading={index < 2 ? 'eager' : 'lazy'}
            draggable={false}
          />
        )}

        {/* Top index chip floating on image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-white tracking-[0.2em]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Hover hint bottom-right */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.12] text-[10px] font-mono text-white uppercase tracking-[0.18em]">
            Open
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content row below card — title, description, tags */}
      <div className="relative z-10 mt-4 grid grid-cols-[1fr_auto] gap-5 items-start">
        <div className="min-w-0">
          <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight mb-1.5">
            {t(project.title, lang)}
          </h3>
          <p className="text-zinc-400 text-[12px] lg:text-[13px] leading-relaxed line-clamp-2">
            {t(project.description, lang)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex flex-wrap gap-1 justify-end max-w-[240px]">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-transparent border border-white/[0.12] text-[10px] text-zinc-400 tracking-wide hover:bg-white/[0.08] hover:border-white/40 hover:text-white transition-colors duration-200 cursor-default"
              >
                {cleanText(tag)}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="group/btn inline-flex items-center gap-1.5 text-[9px] font-mono text-white uppercase tracking-[0.22em] cursor-pointer hover:text-white transition-colors"
          >
            <span>{t(UI.work.open, lang)}</span>
            <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────── */

function MobileCard({ project, index, onOpen, lang }) {
  const [ref, visible] = useReveal(0.15)
  const { theme } = useTheme()
  const delay = `${index * 70}ms`
  const light = theme === 'light'
  const borderIdle  = light ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.07)'
  const borderHover = light ? 'rgba(0,0,0,0.32)' : 'rgba(255,255,255,0.15)'
  const bg          = light ? '#ffffff' : 'rgba(255,255,255,0.02)'
  const shadow      = light ? '0 1px 0 rgba(0,0,0,0.04), 0 6px 22px -10px rgba(0,0,0,0.1)' : 'none'

  return (
    <article
      ref={ref}
      onClick={onOpen}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: bg,
        border: `1px solid ${borderIdle}`,
        boxShadow: shadow,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionProperty: 'opacity, transform, border-color, background, box-shadow',
        transitionDuration: '550ms, 550ms, 300ms, 300ms, 300ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: visible ? delay : '0ms',
      }}
      onMouseEnter={(e) => {
        if (window.matchMedia('(hover: none)').matches) return
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = borderHover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(30px)'
        e.currentTarget.style.borderColor = borderIdle
      }}
    >
      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="absolute top-2 right-3 font-black text-white/[0.06] select-none pointer-events-none leading-none z-0"
        style={{ fontSize: '5rem' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative aspect-[16/10] overflow-hidden">
        {project.media?.src && (
          <img
            src={project.media.src}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <span className="absolute top-3 left-4 text-[10px] font-mono text-white/90 tracking-[0.2em]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="relative p-5 z-10">
        <h3 className="text-xl font-bold text-white mb-2">{t(project.title, lang)}</h3>
        <p className="text-[13px] text-zinc-400 leading-relaxed mb-3 line-clamp-3">
          {t(project.description, lang)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-transparent border border-white/[0.12] text-[10px] text-zinc-400 hover:bg-white/[0.08] hover:border-white/40 hover:text-white transition-colors duration-200"
            >
              {cleanText(tag)}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
