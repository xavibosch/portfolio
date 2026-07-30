import { person } from '../data/projects'
import { UI, t, useLang } from '../i18n'

const CONTACT_KEYWORDS = {
  en: ['internships', 'collaborations', 'conversations'],
  es: ['prácticas', 'colaboraciones', 'conversaciones'],
  ca: ['pràctiques', 'col·laboracions', 'converses'],
}

function HighlightSub({ text, lang }) {
  const kws = CONTACT_KEYWORDS[lang] || CONTACT_KEYWORDS.en
  const regex = new RegExp(`(${kws.join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((p, i) =>
        kws.some((k) => k.toLowerCase() === p.toLowerCase()) ? (
          <strong key={i} className="text-zinc-200 font-semibold">{p}</strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

const socialLinks = [
  {
    key: 'github',
    label: 'GitHub',
    href: person.github,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    href: person.twitter,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: person.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
].filter(s => s.href)

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer id="contact" className="border-t border-white/[0.06] pt-12 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-14">
          {t(UI.contact.eyebrow, lang)}
        </p>

        <div className="grid md:grid-cols-2 gap-14 items-end">
          {/* Left */}
          <div>
            <h2
              className="font-bold text-white tracking-[-0.03em] leading-[0.95] mb-5"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {t(UI.contact.title, lang)}
            </h2>
            <p className="text-zinc-500 text-base mb-10 leading-relaxed max-w-md">
              <HighlightSub text={t(UI.contact.sub, lang)} lang={lang} />
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-4 group"
              >
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.18em] w-14 flex-shrink-0">
                  {t(UI.contact.email, lang)}
                </span>
                <span className="relative inline-block text-zinc-300 text-sm group-hover:text-white transition-colors duration-200">
                  {person.email}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-0.5 h-px w-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  />
                </span>
              </a>

              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.18em] w-14 flex-shrink-0">
                    {t(UI.contact.phone, lang)}
                  </span>
                  <span className="relative inline-block text-zinc-300 text-sm group-hover:text-white transition-colors duration-200">
                    {person.phone}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-0.5 h-px w-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    />
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map(({ key, label, href, icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="
                      w-9 h-9 flex items-center justify-center rounded-full
                      border border-white/[0.08] bg-white/[0.02] text-zinc-600
                      hover:bg-white/[0.08] hover:text-white hover:border-white/40 hover:scale-110
                      active:scale-95
                      transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer
                    "
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}

            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-white">{person.name}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{t(person.role, lang)}</p>
            </div>

            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
