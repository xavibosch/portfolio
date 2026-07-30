import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal hook. Returns [ref, visible].
 * Attach ref to element, then conditionally apply visible class.
 */
export function useReveal(threshold = 0.15, once = true) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, visible]
}
