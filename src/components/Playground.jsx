import { useEffect, useRef, useState } from 'react'

const EXPERIMENTS = [
  {
    label: 'Agentic UX patterns',
    desc: 'Designing UI for tools that act on their own. When does the user step in?',
    date: 'May',
  },
  {
    label: 'Clap trigger Spotify',
    desc: 'Arduino + clap sensor → music starts. Physical world becomes a hotkey.',
    date: 'May',
  },
  {
    label: 'Haptic Morse',
    desc: 'Encoding short messages purely through vibration patterns on iPhone.',
    date: 'Apr',
  },
  {
    label: 'Voice → SwiftUI scaffold',
    desc: 'Voice memo describes a feature → app skeleton spits out in 30 seconds.',
    date: 'Apr',
  },
  {
    label: 'AI memory journal',
    desc: 'Long term context system for chat agents that actually remembers what matters.',
    date: 'Mar',
  },
]

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

export default function Playground() {
  const [ref, inView] = useInView()

  return (
    <section id="lab" ref={ref} className="relative py-24 lg:py-32 px-6 max-w-7xl mx-auto">
      <div
        className={`mb-12 lg:mb-14 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 mb-3">
          05 / The Lab
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
          Smaller experiments
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base mt-5 max-w-lg leading-relaxed">
          Ideas tested over a weekend. Half discarded. Each one taught me something
          I couldn't have learned by reading.
        </p>
      </div>

      <ul
        className="rounded-2xl overflow-hidden border border-white/[0.07] divide-y divide-white/[0.05] bg-[#0a0a0a]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 800ms ease 200ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 200ms',
        }}
      >
        {EXPERIMENTS.map((e, i) => (
          <li
            key={e.label}
            className="group relative hover:bg-[#101010] transition-colors duration-300"
          >
            <div className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[60px_1fr_auto] gap-4 sm:gap-8 items-center p-5 sm:p-7 lg:p-8">
              <span className="text-[10px] font-mono text-zinc-700 group-hover:text-white tracking-[0.18em] transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white tracking-tight mb-1 group-hover:text-white">
                  {e.label}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-zinc-500 leading-relaxed">
                  {e.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em] hidden sm:inline">
                {e.date}
              </span>
            </div>
            {/* Accent line on hover */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
