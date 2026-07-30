import { useEffect, useRef, useState } from 'react'
import { person } from '../data/projects'
import { UI, t, useLang } from '../i18n'

function useInView(threshold = 0.08) {
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

function PhotoSlot({ item, className = '', lang = 'en' }) {
  if (item.src) {
    const captionText = t(item.caption, lang)
    const imageClass = 'absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]'
    return (
      <figure className={`relative ${className}`}>
        <div className={`group relative h-full w-full overflow-hidden rounded-xl ${item.asciiSrc ? 'ascii-portrait' : ''}`}>
          <img
            src={item.src}
            alt={captionText || item.label}
            className={imageClass}
            loading="lazy"
            decoding="async"
          />
          {item.asciiSrc ? (
            <>
              <img
                src={item.asciiSrc}
                alt=""
                aria-hidden="true"
                className={`${imageClass} ascii-wipe`}
                loading="lazy"
                decoding="async"
              />
              <img
                src={item.src}
                alt=""
                aria-hidden="true"
                className={`${imageClass} photo-wipe`}
                loading="lazy"
                decoding="async"
              />
              <span className="ascii-scanline" aria-hidden="true" />
            </>
          ) : null}
        </div>
        {captionText && (
          <figcaption className="absolute bottom-3 left-3 z-10 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-mono text-white/70 tracking-[0.15em] uppercase backdrop-blur-sm">
            {captionText}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div
      className={`
        rounded-xl border border-dashed border-white/[0.09] bg-white/[0.012]
        flex flex-col items-center justify-center gap-2
        hover:border-white/[0.18] hover:bg-white/[0.025]
        transition-colors duration-300 cursor-default
        ${className}
      `}
    >
      <svg
        className="w-5 h-5 text-zinc-800"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      <span className="text-[9px] font-mono text-zinc-800 tracking-[0.15em] uppercase">
        {item.label}
      </span>
    </div>
  )
}

const gallery = person.gallery?.length ? person.gallery : []

export default function About() {
  const { lang } = useLang()
  const [ref, inView] = useInView()
  const school = person.school

  const skillRows = [
    {
      label: t(UI.about.skillLabels.focus, lang),
      items: [
        { en: 'AI prototyping',     es: 'Prototipado IA',       ca: 'Prototipat IA' },
        { en: 'interaction design', es: 'diseño de interacción', ca: 'disseny d\'interacció' },
        { en: 'product systems',    es: 'sistemas de producto',  ca: 'sistemes de producte' },
      ].map((x) => t(x, lang)),
    },
    {
      label: t(UI.about.skillLabels.stack, lang),
      items: ['SwiftUI', 'Python', 'Firebase', { en: 'automation', es: 'automatización', ca: 'automatització' }].map((x) => typeof x === 'string' ? x : t(x, lang)),
    },
    {
      label: t(UI.about.skillLabels.approach, lang),
      items: [
        { en: 'fast iteration',      es: 'iteración rápida',         ca: 'iteració ràpida' },
        { en: 'build to learn',      es: 'construir para aprender',  ca: 'construir per aprendre' },
        { en: 'hardware + software', es: 'hardware + software',      ca: 'hardware + software' },
      ].map((x) => t(x, lang)),
    },
  ]

  return (
    <section id="about" className="py-16 lg:py-20 px-6 max-w-7xl mx-auto" ref={ref}>
      {/* Section label */}
      <p
        className={`text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {t(UI.about.eyebrow, lang)}
      </p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
        {/* Left — title + long-form introduction */}
        <div className={`transition-[opacity,transform] duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2
            className="font-bold tracking-[-0.035em] text-white leading-[1.02] mb-7 lg:whitespace-nowrap"
            style={{ fontSize: 'clamp(2.5rem, 3.4vw, 3.35rem)' }}
          >
            {t(UI.about.title, lang).split(/(\s+)/).map((word, i) => {
              if (/^\s+$/.test(word)) return word
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: inView ? 1 : 0.1,
                    filter: inView ? 'blur(0)' : 'blur(6px)',
                    transform: inView ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${i * 55}ms`,
                  }}
                >
                  {word}
                </span>
              )
            })}
          </h2>

          <div className="space-y-4 text-zinc-300 leading-[1.75] text-[15px]">
            <p>{t(UI.about.p1, lang)}</p>
            <p>{t(UI.about.p2, lang)}</p>
            <p>{t(UI.about.p3, lang)}</p>
            <p>{t(UI.about.p4, lang)}</p>
            <p>{t(UI.about.p5, lang)}</p>
          </div>
        </div>

        {/* Right — photo stretches to the full title + copy height */}
        <div className={`h-full transition-opacity duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`img-reveal h-full ${inView ? 'visible' : ''}`}>
            <PhotoSlot
              item={gallery[0]}
              className="h-full min-h-[32rem] md:min-h-0"
              lang={lang}
            />
          </div>
        </div>
      </div>

      {/* Secondary details stay below the matched-height portrait row */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mt-10">
        <div>
          {school && (
            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.15em] block mb-3">
                {t(UI.about.school, lang)}
              </span>
              <a
                href={school.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col"
              >
                <span className="text-sm text-white font-semibold group-hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  {school.name}
                  <svg className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[opacity,transform] duration-200" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-[12px] text-zinc-600 mt-1 group-hover:text-zinc-400 transition-colors duration-200">
                  {t(school.program, lang)}
                </span>
              </a>
            </div>
          )}
        </div>

        <div>
          <div className="space-y-3">
            {skillRows.map(({ label, items }, r) => (
              <div
                key={label}
                className="flex gap-4 items-baseline"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${450 + r * 70}ms`,
                }}
              >
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.15em] w-20 flex-shrink-0 pt-0.5">
                  {label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-full bg-transparent border border-white/[0.12] text-[11px] text-zinc-400 tracking-wide hover:bg-white/[0.08] hover:border-white/40 hover:text-white transition-colors duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
