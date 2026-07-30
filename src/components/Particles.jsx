import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

/**
 * 2D canvas particles with cursor repel interaction.
 * - Mono color, depth via radius + alpha
 * - Returns to base drift via velocity damping
 * - Pauses offscreen, respects reduced-motion
 */
export default function Particles({
  count = 1200,
  repelRadius = 140,
  repelForce = 0.55,
  className = '',
}) {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Particle pool — seeded with normalized fractions (fx, fy) so they can be
    // projected to pixels once the canvas actually has a size. Prevents the
    // "all stacked in the top-left" bug when width/height read 0 at mount.
    const particles = Array.from({ length: count }, () => {
      const depth = Math.random()
      const baseVx = (Math.random() - 0.5) * 0.06 * (0.3 + depth)
      const baseVy = (Math.random() - 0.5) * 0.05 * (0.3 + depth) - 0.01
      return {
        fx: Math.random(),
        fy: Math.random(),
        x: 0,
        y: 0,
        z: depth,
        r: 0.4 + depth * 1.8,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        color: theme === 'light' ? [24, 24, 27] : [255, 255, 255],
        alpha: (theme === 'light' ? 0.05 : 0.10) + depth * 0.42,
        twPhase: Math.random() * Math.PI * 2,
        twSpeed: 0.6 + Math.random() * 1.2,
      }
    })
    let placed = false

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Project fractions to pixels the first time we get a real size
      if (!placed && width > 0 && height > 0) {
        for (const p of particles) {
          p.x = p.fx * width
          p.y = p.fy * height
        }
        placed = true
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Mouse state — relative to canvas
    const mouse = { x: -9999, y: -9999, active: false }
    function onMouse(e) {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      if (mx >= -20 && mx <= rect.width + 20 && my >= -20 && my <= rect.height + 20) {
        mouse.x = mx
        mouse.y = my
        mouse.active = true
      } else {
        mouse.active = false
      }
    }
    function onLeave() { mouse.active = false }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('blur', onLeave)

    let raf
    let visible = true
    let lastT = performance.now()

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(canvas)

    const R = repelRadius
    const R2 = R * R

    function draw(t) {
      const dt = Math.min(48, t - lastT) / 16.67
      lastT = t

      // Skip until offscreen or before particles have real positions
      if (!visible || !placed) {
        raf = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!reduce) {
          // Cursor repel
          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const d2 = dx * dx + dy * dy
            if (d2 < R2 && d2 > 0.01) {
              const dist = Math.sqrt(d2)
              const falloff = 1 - dist / R   // 1 at center → 0 at edge
              const f = falloff * falloff * repelForce
              p.vx += (dx / dist) * f * dt
              p.vy += (dy / dist) * f * dt
            }
          }

          // Damping back toward base velocity
          p.vx = p.vx * 0.93 + p.baseVx * 0.07
          p.vy = p.vy * 0.93 + p.baseVy * 0.07

          p.x += p.vx * dt
          p.y += p.vy * dt

          // wrap edges
          if (p.x < -12) p.x = width + 12
          else if (p.x > width + 12) p.x = -12
          if (p.y < -12) p.y = height + 12
          else if (p.y > height + 12) p.y = -12

          p.twPhase += 0.008 * p.twSpeed * dt
        }

        const tw = (Math.sin(p.twPhase) + 1) * 0.5
        const a = p.alpha * (0.55 + tw * 0.45)

        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [count, repelRadius, repelForce, theme])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
