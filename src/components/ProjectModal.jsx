import { useEffect, useCallback, useState, useRef } from 'react'
import { UI, cleanText, t, useLang } from '../i18n'

const placeholders = [
  'from-violet-950 via-indigo-950 to-slate-950',
  'from-zinc-900 via-slate-900 to-zinc-950',
  'from-emerald-950 via-teal-950 to-slate-950',
  'from-rose-950 via-pink-950 to-slate-950',
  'from-amber-950 via-orange-950 to-zinc-950',
  'from-blue-950 via-indigo-950 to-zinc-950',
  'from-fuchsia-950 via-pink-950 to-zinc-950',
]

const CLOSE_MS = 200

function MediaFull({ media, index, title, deep = false }) {
  const gradient = placeholders[index % placeholders.length]
  const frame = deep ? 'rounded-none sm:rounded-t-[1.45rem]' : 'rounded-xl'

  if (!media) {
    return <div className={`w-full aspect-[16/9] ${frame} bg-gradient-to-br ${gradient}`} />
  }

  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        controls
        className={`w-full aspect-[16/9] ${frame} object-cover`}
        aria-label={title}
      />
    )
  }

  return (
    <img
      src={media.src}
      alt={title}
      className={`w-full aspect-[16/9] ${frame} object-cover`}
      decoding="async"
    />
  )
}

function Section({ label, children }) {
  if (!children) return null
  return (
    <div>
      <p className="mb-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">{label}</p>
      <p className="text-[14px] leading-[1.75] text-zinc-300">{children}</p>
    </div>
  )
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
          {cleanText(tag)}
        </span>
      ))}
    </div>
  )
}

function DeepHeader({ project, index, lang }) {
  const deep = project.deepDive

  return (
    <div className="relative overflow-hidden border-b border-white/[0.07]">
      <MediaFull media={project.media} index={index} title={t(project.title, lang)} deep />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/25 to-transparent" />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-52 w-2/3 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: deep.accent }}
      />
    </div>
  )
}

function DeepIntro({ project, lang }) {
  const deep = project.deepDive

  return (
    <section className="grid gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:py-14">
      <div>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: deep.accent }}>
          {t(deep.eyebrow, lang)}
        </p>
        <h3 className="max-w-[12ch] text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl">
          {t(project.title, lang)}
        </h3>
      </div>
      <div className="flex flex-col justify-between gap-7">
        <p className="max-w-3xl text-xl leading-[1.5] tracking-[-0.02em] text-zinc-200 sm:text-2xl">
          {t(deep.statement, lang)}
        </p>
        <Tags tags={project.tags} />
      </div>
    </section>
  )
}

function Stats({ items, lang, accent }) {
  return (
    <section className="grid grid-cols-2 border-y border-white/[0.07] lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.value + t(item.label, lang)}
          className={`min-h-40 p-5 sm:p-7 ${i % 2 === 0 ? 'border-r border-white/[0.07]' : ''} ${i < 2 ? 'border-b border-white/[0.07] lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''}`}
        >
          <p className="mb-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl" style={{ color: accent }}>{item.value}</p>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">{t(item.label, lang)}</p>
          <p className="text-xs leading-relaxed text-zinc-500">{t(item.detail, lang)}</p>
        </div>
      ))}
    </section>
  )
}

function SectionHeading({ eyebrow, title, lead, lang, accent }) {
  return (
    <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <div>
        {eyebrow && <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>{eyebrow}</p>}
        <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{t(title, lang)}</h3>
      </div>
      {lead && <p className="max-w-2xl text-[15px] leading-[1.7] text-zinc-400 lg:pt-1">{t(lead, lang)}</p>}
    </div>
  )
}

function CaseStudy({ project, lang, accent }) {
  const cards = [
    [UI.modal.problem, project.problem],
    [UI.modal.idea, project.idea],
    [UI.modal.execution, project.execution],
  ].filter(([, value]) => value)

  if (!cards.length) return null

  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="grid gap-3 lg:grid-cols-3">
        {cards.map(([label, value], i) => (
          <article key={t(label, lang)} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t(label, lang)}</span>
              <span className="font-mono text-[10px]" style={{ color: accent }}>0{i + 1}</span>
            </div>
            <p className="text-[14px] leading-[1.75] text-zinc-300">{t(value, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SystemFlow({ deep, lang }) {
  return (
    <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-10 sm:px-10 sm:py-14">
      <SectionHeading title={deep.flowTitle} lead={deep.flowLead} lang={lang} accent={deep.accent} />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
        {deep.flow.map((step) => (
          <article key={step.number} className="min-h-52 bg-[#0d0d0f] p-5 sm:p-6">
            <p className="mb-12 font-mono text-[10px] tracking-[0.2em]" style={{ color: deep.accent }}>{step.number}</p>
            <h4 className="mb-3 text-lg font-semibold tracking-[-0.02em] text-white">{t(step.title, lang)}</h4>
            <p className="text-xs leading-[1.7] text-zinc-500">{t(step.body, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CapabilityGrid({ deep, lang }) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <SectionHeading title={deep.capabilitiesTitle} lead={deep.capabilitiesLead} lang={lang} accent={deep.accent} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {deep.capabilities.map((item, i) => (
          <article key={t(item.title, lang)} className="group min-h-48 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-transparent p-5 transition-colors duration-300 hover:border-white/[0.16] sm:p-6">
            <div className="mb-9 h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14" style={{ backgroundColor: deep.accent, opacity: 0.8 }} />
            <h4 className="mb-3 text-base font-semibold tracking-[-0.02em] text-white">{t(item.title, lang)}</h4>
            <p className="text-[13px] leading-[1.7] text-zinc-500">{t(item.body, lang)}</p>
            <span className="mt-5 block font-mono text-[9px] tracking-[0.18em] text-white/20">0{String(i + 1)}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function DeepGallery({ project, lang }) {
  const gallery = project.gallery || []
  const deep = project.deepDive
  if (!gallery.length) return null

  return (
    <section className="border-y border-white/[0.07] bg-[#08090c] px-5 py-10 sm:px-10 sm:py-14">
      <SectionHeading title={deep.galleryTitle || UI.modal.gallery} lead={deep.galleryLead} lang={lang} accent={deep.accent} />
      <div className="grid gap-5 sm:grid-cols-2">
        {gallery.map((item, i) => (
          <figure key={item.src + i} className="overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-2 sm:p-3">
            <div className="overflow-hidden rounded-[1.25rem] bg-black">
              <img
                src={item.src}
                alt={t(item.caption, lang) || `${t(project.title, lang)} screenshot ${i + 1}`}
                className="h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            {item.caption && <figcaption className="px-3 pb-2 pt-4 text-xs leading-relaxed text-zinc-500">{t(item.caption, lang)}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}

function Decisions({ deep, lang }) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <SectionHeading title={deep.decisionsTitle} lang={lang} accent={deep.accent} />
      <div className="grid gap-x-10 border-t border-white/[0.08] sm:grid-cols-2">
        {deep.decisions.map((item, i) => (
          <article key={t(item.title, lang)} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-white/[0.08] py-6 sm:py-8">
            <span className="font-mono text-[10px] pt-1" style={{ color: deep.accent }}>0{i + 1}</span>
            <div>
              <h4 className="mb-3 text-base font-semibold tracking-[-0.02em] text-white">{t(item.title, lang)}</h4>
              <p className="text-[13px] leading-[1.75] text-zinc-500">{t(item.body, lang)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Learned({ project, lang, deep = false }) {
  if (!project.learned) return null

  return (
    <div className={deep ? 'px-5 pb-12 sm:px-10 sm:pb-16' : ''}>
      <div className={`${deep ? 'rounded-2xl p-6 sm:p-8' : 'rounded-xl p-4'} border border-white/[0.1] bg-white/[0.04]`}>
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">{t(UI.modal.learned, lang)}</p>
        <p className={`${deep ? 'max-w-4xl text-lg sm:text-xl' : 'text-[14px]'} leading-relaxed italic text-zinc-300`}>
          “{t(project.learned, lang)}”
        </p>
      </div>
    </div>
  )
}

function GalleryToggle({ project, lang, open, setOpen }) {
  const gallery = project.gallery || []
  const hasGallery = gallery.length > 0

  return (
    <div className="border-t border-white/[0.06] pt-2">
      <button type="button" onClick={() => setOpen((value) => !value)} className="group flex w-full cursor-pointer items-center justify-between gap-3 py-2" aria-expanded={open}>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{t(UI.modal.gallery, lang)}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">{hasGallery ? gallery.length : '0'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-white">
          {open ? t(UI.modal.galleryToggleHide, lang) : t(UI.modal.galleryToggleShow, lang)}
          <svg className={`h-3 w-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="mt-4 animate-fade-in">
          {hasGallery ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {gallery.map((item, i) => (
                <figure key={item.src + i} className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0a0a]">
                  <img src={item.src} alt={t(item.caption, lang) || `${t(project.title, lang)} screenshot ${i + 1}`} className="h-auto w-full object-cover" loading="lazy" decoding="async" />
                  {item.caption && <figcaption className="border-t border-white/[0.06] px-3 py-2 text-[11px] text-zinc-400">{t(item.caption, lang)}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.012] p-6 text-center">
              <p className="text-[12px] leading-relaxed text-zinc-600">{t(UI.modal.galleryEmpty, lang)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ExternalLink({ project, lang, deep = false }) {
  if (!project.link) return null

  return (
    <div className={`${deep ? 'mx-5 mb-10 sm:mx-10' : ''} grid gap-2 sm:grid-cols-2`}>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] py-2.5 text-sm text-zinc-300 transition-[background-color,color,border-color,transform] duration-200 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white active:scale-[0.98]"
      >
        {t(UI.modal.open, lang)}
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 12L12 2M12 2H7M12 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {project.demoLink && (
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] py-2.5 text-sm text-zinc-300 transition-[background-color,color,border-color,transform] duration-200 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white active:scale-[0.98]"
        >
          {t(UI.modal.demo, lang)}
        </a>
      )}
    </div>
  )
}

function DeepDiveBody({ project, index, lang }) {
  const deep = project.deepDive

  return (
    <>
      <DeepHeader project={project} index={index} lang={lang} />
      <DeepIntro project={project} lang={lang} />
      <div data-mreveal><Stats items={deep.stats} lang={lang} accent={deep.accent} /></div>
      <div data-mreveal><CaseStudy project={project} lang={lang} accent={deep.accent} /></div>
      <div data-mreveal><SystemFlow deep={deep} lang={lang} /></div>
      <div data-mreveal><CapabilityGrid deep={deep} lang={lang} /></div>
      <div data-mreveal><DeepGallery project={project} lang={lang} /></div>
      <div data-mreveal><Decisions deep={deep} lang={lang} /></div>
      <div data-mreveal><Learned project={project} lang={lang} deep /></div>
      <ExternalLink project={project} lang={lang} deep />
    </>
  )
}

function StandardBody({ project, index, lang, galleryOpen, setGalleryOpen }) {
  return (
    <div className="flex flex-col gap-7 p-5">
      <MediaFull media={project.media} index={index} title={t(project.title, lang)} />
      <Section label={t(UI.modal.overview, lang)}>{t(project.description, lang)}</Section>
      <Tags tags={project.tags} />
      {(project.problem || project.idea || project.execution) && (
        <div className="space-y-6 border-t border-white/[0.06] pt-2">
          <Section label={t(UI.modal.problem, lang)}>{t(project.problem, lang)}</Section>
          <Section label={t(UI.modal.idea, lang)}>{t(project.idea, lang)}</Section>
          <Section label={t(UI.modal.execution, lang)}>{t(project.execution, lang)}</Section>
        </div>
      )}
      <GalleryToggle project={project} lang={lang} open={galleryOpen} setOpen={setGalleryOpen} />
      <Learned project={project} lang={lang} />
      <ExternalLink project={project} lang={lang} />
    </div>
  )
}

export default function ProjectModal({ project, index, onClose }) {
  const { lang } = useLang()
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const deep = Boolean(project.deepDive)
  const scrollRef = useRef(null)

  // Reveal deep-dive sections as they scroll into view inside the modal
  useEffect(() => {
    const rootEl = scrollRef.current
    if (!rootEl) return
    const targets = rootEl.querySelectorAll('[data-mreveal]')
    if (!targets.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mreveal-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { root: rootEl, threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    targets.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [project])

  const requestClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, CLOSE_MS)
  }, [onClose])

  const handleKey = useCallback((event) => {
    if (event.key === 'Escape') requestClose()
  }, [requestClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    const lenis = typeof window !== 'undefined' ? window.__lenis : null
    if (lenis) lenis.stop()

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }
  }, [handleKey])

  const label = String(index + 1).padStart(2, '0')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 animate-fade-in sm:items-center sm:p-6"
      style={{
        background: 'rgba(0,0,0,0.84)',
        backdropFilter: 'blur(14px)',
        opacity: closing ? 0 : 1,
        transition: `opacity ${CLOSE_MS}ms ease-out`,
      }}
      onClick={(event) => { if (event.target === event.currentTarget) requestClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={t(project.title, lang)}
    >
      <div
        ref={scrollRef}
        data-lenis-prevent
        className={`animate-scale-in max-h-[94vh] w-full overflow-y-auto rounded-t-2xl border border-white/[0.1] bg-[#0b0b0c] shadow-[0_24px_80px_rgba(0,0,0,0.9)] sm:rounded-3xl ${deep ? 'sm:max-w-6xl' : 'sm:max-w-2xl'}`}
        style={{
          opacity: closing ? 0 : undefined,
          transform: closing ? 'scale(0.97) translateY(10px)' : undefined,
          transition: closing ? `opacity ${CLOSE_MS}ms ease-out, transform ${CLOSE_MS}ms ease-out` : undefined,
        }}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#0b0b0c]/90 px-5 py-4 backdrop-blur-xl sm:rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/60">{label}</span>
            <h2 className="text-sm font-semibold text-white">{t(project.title, lang)}</h2>
          </div>
          <button onClick={requestClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] transition-[background-color,transform] duration-150 hover:bg-white/[0.12] active:scale-95" aria-label="Close">
            <svg className="h-3.5 w-3.5 text-zinc-300" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {deep ? (
          <DeepDiveBody project={project} index={index} lang={lang} />
        ) : (
          <StandardBody project={project} index={index} lang={lang} galleryOpen={galleryOpen} setGalleryOpen={setGalleryOpen} />
        )}
      </div>
    </div>
  )
}
