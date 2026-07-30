import { useEffect, useRef, useState } from 'react'
import { UI, t, useLang } from '../i18n'
import { useTheme } from '../hooks/useTheme'

const I18N_ITEMS = {
  building: [
    { en: 'Betsy', es: 'Betsy', ca: 'Betsy' },
  ],
  learning: [
    { en: 'AI prompting', es: 'Prompting de IA', ca: 'Prompting d\'IA' },
    { en: 'Backend systems', es: 'Sistemas backend', ca: 'Sistemes backend' },
  ],
  exploring: [
    { en: 'AI memory',      es: 'Memoria de IA',       ca: 'Memòria d\'IA' },
    { en: 'Skill systems',  es: 'Sistemas de skills',  ca: 'Sistemes de skills' },
    { en: 'Agent cognition',es: 'Cognición de agentes',ca: 'Cognició d\'agents' },
  ],
}

const ACCENT_MAP = {
  lime:   { dot: 'bg-white',     text: 'text-white',     glow: 'rgba(255,255,255,0.10)' },
  cyan:   { dot: 'bg-white/70',  text: 'text-white/70',  glow: 'rgba(255,255,255,0.06)' },
  violet: { dot: 'bg-white/40',  text: 'text-white/40',  glow: 'rgba(255,255,255,0.04)' },
}

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function CurrentFocus() {
  const { lang } = useLang()
  const [ref, inView] = useInView()

  const CARDS = [
    {
      label:      t(UI.now.building.label, lang),
      title:      t(UI.now.building.sub, lang),
      items:      I18N_ITEMS.building.map((x) => t(x, lang)),
      statusText: t(UI.now.building.status, lang),
      accent:     'lime',
    },
    {
      label:      t(UI.now.learning.label, lang),
      title:      t(UI.now.learning.sub, lang),
      items:      I18N_ITEMS.learning.map((x) => t(x, lang)),
      statusText: t(UI.now.learning.status, lang),
      accent:     'cyan',
    },
    {
      label:      t(UI.now.exploring.label, lang),
      title:      t(UI.now.exploring.sub, lang),
      items:      I18N_ITEMS.exploring.map((x) => t(x, lang)),
      statusText: t(UI.now.exploring.status, lang),
      accent:     'violet',
    },
  ]

  return (
    <section id="now" ref={ref} className="relative py-16 lg:py-20 px-6 max-w-7xl mx-auto">
      <div
        className={`mb-12 lg:mb-16 flex items-end justify-between gap-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-3">
            {t(UI.now.eyebrow, lang)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
            {t(UI.now.title, lang)}
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] pb-2">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-white" />
          </span>
          <span>{t(UI.now.live, lang)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {CARDS.map((card, i) => (
          <FocusCard key={card.label} card={card} index={i} inView={inView} activeLabel={t(UI.now.active, lang)} />
        ))}
      </div>
    </section>
  )
}

function FocusCard({ card, index, inView, activeLabel }) {
  const a = ACCENT_MAP[card.accent]
  const { theme } = useTheme()
  const cardDelay = index * 120 + 100
  const light = theme === 'light'
  const borderIdle  = light ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.08)'
  const borderHover = light ? 'rgba(0,0,0,0.32)' : 'rgba(255,255,255,0.18)'
  const bg          = light ? '#ffffff' : 'rgba(255,255,255,0.025)'
  const shadow      = light ? '0 1px 0 rgba(0,0,0,0.04), 0 6px 24px -8px rgba(0,0,0,0.08)' : 'none'
  return (
    <article
      className="group relative rounded-2xl p-7 lg:p-8 overflow-hidden"
      style={{
        background: bg,
        backdropFilter: light ? 'none' : 'blur(10px)',
        WebkitBackdropFilter: light ? 'none' : 'blur(10px)',
        border: `1px solid ${borderIdle}`,
        boxShadow: shadow,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${cardDelay}ms`,
        transitionProperty: 'opacity, transform, border-color, box-shadow',
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        if (window.matchMedia('(hover: none)').matches) return
        e.currentTarget.style.borderColor = borderHover
      }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderIdle }}
    >
      {/* Bg accent glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: a.glow }}
      />

      {/* Top row — label + pulsing dot */}
      <div className="relative flex items-center justify-between mb-9">
        <span className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-400 tracking-[0.2em] uppercase">
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span className={`absolute inset-0 rounded-full ${a.dot} animate-ping opacity-60`} />
            <span className={`relative w-1.5 h-1.5 rounded-full ${a.dot}`} />
          </span>
          {card.label}
        </span>
        {/* Status mini-pill */}
        <span className="inline-flex items-center text-[9px] font-mono text-zinc-500 tracking-[0.18em] uppercase border border-white/[0.1] bg-white/[0.02] rounded-full px-2.5 py-0.5">
          {card.statusText}
        </span>
      </div>

      {/* Subtitle */}
      <p className="relative text-zinc-500 text-[13px] mb-3">{card.title}</p>

      {/* Items — staggered reveal */}
      <ul className="relative space-y-1.5">
        {card.items.map((item, i) => (
          <li
            key={item}
            className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight flex items-start gap-2.5"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: `${cardDelay + 250 + i * 60}ms`,
              transitionDuration: '500ms',
              transitionProperty: 'opacity, transform',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <span className={`mt-1.5 inline-block w-1 h-1 rounded-full ${a.dot} flex-shrink-0`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Active footer */}
      <div className="relative mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-end">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono ${a.text} tracking-[0.18em] uppercase`}>
          <span className={`w-1 h-1 rounded-full ${a.dot}`} aria-hidden="true" />
          {activeLabel}
        </span>
      </div>
    </article>
  )
}
