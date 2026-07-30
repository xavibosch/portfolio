import { useEffect, useRef, useState } from 'react'

const NAME = 'Xavi Bosch'
const FILL_DURATION = 900         // ms — uniform linear fill across whole name
const POST_FILL_PAUSE = 120       // ms — pause at 100% before fly
const FLY_DURATION = 850          // ms — per-letter fly duration
const FLY_STAGGER = 38            // ms per letter
const BG_FADE = 450               // ms — background fade

/**
 * Pre-hero loader: name fills with white slowly, then each letter flies
 * to its matching slot in the hero (elements tagged data-hero-letter="<i>").
 */
export default function Loader({ onFlyStart, onDone }) {
  const [pct, setPct] = useState(0)
  const [flying, setFlying] = useState(false)
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)
  const letterRefs = useRef([])

  // Counter / fill loop
  useEffect(() => {
    const start = performance.now()
    let loaded = false
    const onLoad = () => { loaded = true }
    if (document.readyState === 'complete') loaded = true
    else window.addEventListener('load', onLoad)

    let raf
    const tick = (now) => {
      const elapsed = now - start
      const ratio = Math.min(elapsed / FILL_DURATION, 1)
      // Linear — uniform pace across whole name (no per-letter speed shift)
      const target = loaded ? ratio * 100 : Math.min(ratio * 96, 96)
      setPct(target)

      if (loaded && ratio >= 1) {
        setPct(100)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Trigger fly when pct hits 100
  useEffect(() => {
    if (pct < 100 || flying) return
    const t1 = setTimeout(() => {
      const totalFlyEnd = FLY_DURATION + FLY_STAGGER * NAME.length
      letterRefs.current.forEach((el, i) => {
        if (!el) return
        const target = document.querySelector(`[data-hero-letter="${i}"]`)
        if (!target) {
          // Space or no target → drift up + fade
          el.animate(
            [
              { transform: 'translate(0, 0)', opacity: 1 },
              { transform: 'translate(0, -30px)', opacity: 0 },
            ],
            { duration: 700, delay: i * FLY_STAGGER, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
          )
          return
        }
        const src = el.getBoundingClientRect()
        const dst = target.getBoundingClientRect()
        const dx = (dst.left + dst.width / 2) - (src.left + src.width / 2)
        const dy = (dst.top + dst.height / 2) - (src.top + src.height / 2)
        const scale = dst.height > 0 ? dst.height / src.height : 1

        // Particle-like waypoint: drift sideways + lift slightly before settling
        const driftX = (i % 2 === 0 ? -1 : 1) * (12 + (i * 3) % 18)
        const liftY = -32 - ((i * 7) % 14)
        const rot = ((i % 2 === 0 ? -1 : 1) * (4 + (i % 3) * 2)) // deg
        const midScale = 1 + (scale - 1) * 0.25
        const delay = i * FLY_STAGGER

        el.animate(
          [
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1, offset: 0 },
            {
              transform: `translate(${dx * 0.2 + driftX}px, ${dy * 0.15 + liftY}px) scale(${midScale}) rotate(${rot}deg)`,
              opacity: 1,
              offset: 0.35,
            },
            {
              transform: `translate(${dx * 0.85}px, ${dy * 0.85}px) scale(${scale * 0.98}) rotate(${rot * 0.2}deg)`,
              opacity: 0.55,
              offset: 0.85,
            },
            {
              transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(0deg)`,
              opacity: 0,
              offset: 1,
            },
          ],
          {
            duration: FLY_DURATION,
            delay,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            fill: 'forwards',
          }
        )
      })
      setFlying(true)
      onFlyStart?.()

      const bgFadeDelay = totalFlyEnd - BG_FADE - 100
      setTimeout(() => setFading(true), Math.max(0, bgFadeDelay))
      setTimeout(() => {
        setHidden(true)
        onDone?.()
      }, totalFlyEnd + 250)
    }, POST_FILL_PAUSE)
    return () => clearTimeout(t1)
  }, [pct, flying, onFlyStart, onDone])

  if (hidden) return null

  const totalChars = NAME.length
  const perLetter = (i) => {
    const step = 100 / totalChars
    const local = (pct - i * step) / step
    return Math.max(0, Math.min(1, local))
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${BG_FADE}ms` }}
    >
      <div className="flex flex-col items-center gap-7">
        <div
          className="flex font-bold uppercase tracking-[0.06em] select-none"
          style={{ fontSize: 'clamp(28px, 5.5vw, 56px)', lineHeight: 1 }}
        >
          {NAME.split('').map((ch, i) => {
            const fill = perLetter(i)
            const isSpace = ch === ' '
            return (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className="relative inline-block"
                style={{
                  width: isSpace ? '0.35em' : undefined,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Ghost outline */}
                <span aria-hidden="true" className="block text-white/15">
                  {isSpace ? ' ' : ch}
                </span>
                {/* Solid fill clipped by per-letter ratio */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block text-white"
                  style={{
                    clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
                    transition: 'clip-path 120ms linear',
                  }}
                >
                  {isSpace ? ' ' : ch}
                </span>
              </span>
            )
          })}
        </div>

        <span
          className={`font-mono text-[11px] tracking-[0.4em] text-white/40 tabular-nums transition-opacity duration-300 ${
            flying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {String(Math.floor(pct)).padStart(3, '0')}%
        </span>
      </div>
    </div>
  )
}
