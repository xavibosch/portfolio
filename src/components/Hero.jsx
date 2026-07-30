import { person } from '../data/projects'
import { UI, t, useLang } from '../i18n'
import Particles from './Particles'

// Highlight a few signal words for emphasis in headline
const HEADLINE_KEYWORDS = {
  en: ['design', 'technology', 'future'],
  es: ['diseño', 'tecnología', 'futuro'],
  ca: ['disseny', 'tecnologia', 'futur'],
}

function HighlightHeadline({ text, lang }) {
  const kws = HEADLINE_KEYWORDS[lang] || HEADLINE_KEYWORDS.en
  const regex = new RegExp(`(${kws.join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((p, i) =>
        kws.some((k) => k.toLowerCase() === p.toLowerCase()) ? (
          <strong key={i} className="text-white font-semibold">{p}</strong>
        ) : (
          <span key={i} className="text-zinc-400">{p}</span>
        )
      )}
    </>
  )
}

const marqueeLine1 = [
  'AI Prototyping',
  'Interaction Design',
  'SwiftUI',
  'Python',
  'Automation',
  'Mobile Apps',
  'Product Systems',
  'Fast Iteration',
  'Agentic AI',
]

const marqueeLine2 = [
  'La Salle Barcelona',
  'Hardware + Software',
  'Interactive Design',
  'AI Prototyping',
  'BCN',
  '2026',
]

const CURRENTLY_BUILDING = 'Betsy'

export default function Hero() {
  const { lang } = useLang()
  const rep1 = [...marqueeLine1, ...marqueeLine1]
  const rep2 = [...marqueeLine2, ...marqueeLine2]

  return (
    <section id="top" className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Ambient orb glow — hidden in light theme */}
      <div
        aria-hidden="true"
        data-theme-glow="dark"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.35] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)',
        }}
      />

      {/* Particles — full hero, mouse-reactive */}
      <Particles
        count={1300}
        repelRadius={150}
        repelForce={0.6}
        className="absolute inset-0 w-full h-full z-0 hidden md:block"
      />

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12">
        <div className="w-full max-w-3xl">
          {/* Left */}
          <div>
            <div className="animate-fade-up mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-[0.14em] uppercase border border-white/[0.08] bg-white/[0.025] px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                </span>
                {t(UI.hero.badge, lang)}
              </span>
            </div>

            <h1 className="leading-[0.84] tracking-[-0.05em] mb-9">
              <span
                className="block font-black text-white"
                style={{ fontSize: 'clamp(4.5rem, 12vw, 8.75rem)' }}
              >
                {'Xavi'.split('').map((ch, i) => (
                  <span
                    key={i}
                    data-hero-letter={i}
                    className="inline-block hero-letter"
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span
                className="block font-black text-white"
                style={{ fontSize: 'clamp(4.5rem, 12vw, 8.75rem)' }}
              >
                {'Bosch'.split('').map((ch, i) => (
                  <span
                    key={i}
                    data-hero-letter={i + 5}
                    className="inline-block hero-letter hero-letter-ghost"
                    style={{ opacity: 0.18 }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="animate-fade-up delay-200 leading-[1.7] max-w-md mb-9"
              style={{ fontSize: 'clamp(1rem, 1.7vw, 1.125rem)' }}
            >
              <HighlightHeadline text={t(person.headline, lang)} lang={lang} />
            </p>

            <div className="animate-fade-up delay-300 flex items-center gap-5 flex-wrap mb-7">
              <a
                href="#projects"
                className="group px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.97] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer inline-flex items-center gap-2"
              >
                {t(UI.hero.cta1, lang)}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contact"
                className="group relative inline-flex items-center text-zinc-300 text-sm font-medium hover:text-white transition-colors duration-200 py-2"
              >
                <span className="relative">
                  {t(UI.hero.cta2, lang)}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-0.5 h-px w-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  />
                </span>
              </a>
            </div>

            {/* Currently building */}
            <div className="animate-fade-up delay-400 inline-flex items-center gap-2.5 text-[12px] text-zinc-500">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-white" />
              </span>
              <span className="font-mono tracking-wide">
                {t(UI.hero.building, lang)} <span className="text-zinc-200 font-semibold">{CURRENTLY_BUILDING}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee — two opposing lanes */}
      <div className="relative border-t border-white/[0.05] py-3 overflow-hidden marquee-mask group">
        <div
          className="animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '45s' }}
        >
          {rep1.map((item, i) => (
            <span
              key={`a-${i}`}
              className="inline-flex items-center gap-5 px-5 text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em]"
            >
              {item}
              <span className="text-white/60 text-[9px]" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
        <div
          className="animate-marquee-rev group-hover:[animation-play-state:paused] mt-2"
          style={{ animationDuration: '35s' }}
        >
          {rep2.map((item, i) => (
            <span
              key={`b-${i}`}
              className="inline-flex items-center gap-5 px-5 text-[11px] font-medium text-zinc-600 uppercase tracking-[0.25em]"
            >
              {item}
              <span className="text-white/40 text-[9px]" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

