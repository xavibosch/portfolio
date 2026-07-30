import { useState, useEffect } from 'react'
import { UI, t, useLang, LANGS } from '../i18n'
import { useTheme } from '../hooks/useTheme'

const SECTION_IDS = ['about', 'projects', 'now', 'contact']

export default function Navbar() {
  const { lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently on screen (wayfinding)
  useEffect(() => {
    const els = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length) return
    const visible = new Map()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.intersectionRatio)
        let best = null
        let bestRatio = 0.08 // minimum presence before highlighting
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) { best = id; bestRatio = ratio }
        }
        setActiveSection(best)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const links = [
    { label: t(UI.nav.about, lang),   href: '#about',    id: 'about' },
    { label: t(UI.nav.work, lang),    href: '#projects', id: 'projects' },
    { label: t(UI.nav.now, lang),     href: '#now',      id: 'now' },
    { label: t(UI.nav.contact, lang), href: '#contact',  id: 'contact' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-4 px-4 pointer-events-none">
      <nav
        className={`
          pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full
          transition-[background-color,border-color,box-shadow] duration-300 backdrop-blur-md
          ${scrolled
            ? 'bg-black/60 border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.55)]'
            : 'bg-transparent border border-transparent'
          }
        `}
      >
        <a
          href="#top"
          className="px-3 py-1.5 text-[11px] font-black tracking-[0.18em] text-white/90 hover:text-white active:scale-95 transition-[color,transform] duration-150 inline-block"
          aria-label="Home"
        >
          XB
        </a>
        <span className="w-px h-4 bg-white/[0.08]" aria-hidden="true" />
        <div className="flex items-center gap-0.5">
          {links.map(({ label, href, id }) => {
            const active = activeSection === id
            return (
              <a
                key={href}
                href={href}
                aria-current={active ? 'true' : undefined}
                className={`relative px-3 py-1.5 rounded-full text-[12px] tracking-wide transition-colors duration-200 cursor-pointer ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {label}
                {/* Active dot indicator */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] h-[3px] rounded-full bg-white transition-[opacity,transform] duration-300 ease-out"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: `translateX(-50%) scale(${active ? 1 : 0.5})`,
                  }}
                />
              </a>
            )
          })}
        </div>
        <span className="w-px h-4 bg-white/[0.08] mx-1" aria-hidden="true" />
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-[color,background-color,transform] duration-150 cursor-pointer"
        >
          {theme === 'dark' ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </button>
        <span className="w-px h-4 bg-white/[0.08] mx-1" aria-hidden="true" />
        <div
          className="flex items-center gap-0.5 px-1 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]"
          role="group"
          aria-label="Language"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.12em] active:scale-95 transition-[color,background-color,transform] duration-150 cursor-pointer ${
                lang === l
                  ? 'bg-white text-black'
                  : 'text-zinc-500 hover:text-white'
              }`}
              aria-pressed={lang === l}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
