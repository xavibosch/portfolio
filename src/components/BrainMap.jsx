import { useEffect, useMemo, useRef, useState } from 'react'
import { UI, t, useLang } from '../i18n'

const NODES = [
  // Core interests
  {
    id: 'ai',
    label: { en: 'AI', es: 'IA', ca: 'IA' },
    kind: 'interest',
    description: {
      en: 'My interest in AI tools, workflows, memory systems, prompting, and emerging interaction models.',
      es: 'Mi interés por las herramientas de IA, flujos de trabajo, sistemas de memoria, prompting y nuevos modelos de interacción.',
      ca: 'El meu interès per les eines d\'IA, fluxos de treball, sistemes de memòria, prompting i nous models d\'interacció.',
    },
  },
  {
    id: 'product',
    label: { en: 'Product', es: 'Producto', ca: 'Producte' },
    kind: 'interest',
    description: {
      en: 'Turning ideas into real digital products through experimentation and iterative thinking.',
      es: 'Convertir ideas en productos digitales reales mediante experimentación y pensamiento iterativo.',
      ca: 'Convertir idees en productes digitals reals mitjançant experimentació i pensament iteratiu.',
    },
  },
  {
    id: 'design',
    label: { en: 'Design', es: 'Diseño', ca: 'Disseny' },
    kind: 'interest',
    description: {
      en: 'Hierarchy, typography, motion. The small details that separate good products from forgettable ones.',
      es: 'Jerarquía, tipografía, movimiento. Los pequeños detalles que separan los productos buenos de los olvidables.',
      ca: 'Jerarquia, tipografia, moviment. Els petits detalls que separen els productes bons dels oblidables.',
    },
  },
  {
    id: 'tech',
    label: { en: 'Technology', es: 'Tecnología', ca: 'Tecnologia' },
    kind: 'interest',
    description: {
      en: 'Curiosity about systems, implementation, and the technical possibilities behind every interface.',
      es: 'Curiosidad por los sistemas, la implementación y las posibilidades técnicas detrás de cada interfaz.',
      ca: 'Curiositat pels sistemes, la implementació i les possibilitats tècniques darrere de cada interfície.',
    },
  },
  {
    id: 'interaction',
    label: { en: 'Interaction', es: 'Interacción', ca: 'Interacció' },
    kind: 'interest',
    description: {
      en: 'How users feel, anticipate, and connect with a system — beyond visual surface.',
      es: 'Cómo el usuario siente, anticipa y conecta con un sistema — más allá de la superficie visual.',
      ca: 'Com l\'usuari sent, anticipa i connecta amb un sistema — més enllà de la superfície visual.',
    },
  },
  {
    id: 'building',
    label: { en: 'Building', es: 'Construir', ca: 'Construir' },
    kind: 'interest',
    description: {
      en: 'Going from idea to working thing as fast as possible. Iteration over polish, ship over perfect.',
      es: 'Ir de la idea a algo que funciona lo más rápido posible. Iteración antes que pulido, enviar antes que perfecto.',
      ca: 'Anar de la idea a alguna cosa que funcioni el més ràpid possible. Iteració abans que polidura, enviar abans que perfecte.',
    },
  },
  {
    id: 'experiments',
    label: { en: 'Experiments', es: 'Experimentos', ca: 'Experiments' },
    kind: 'interest',
    description: {
      en: 'Smaller side explorations, concept tests, prototypes, and interaction ideas.',
      es: 'Pequeñas exploraciones paralelas, tests de concepto, prototipos e ideas de interacción.',
      ca: 'Petites exploracions paral·leles, tests de concepte, prototips i idees d\'interacció.',
    },
  },
  {
    id: 'hardware',
    label: { en: 'Hardware', es: 'Hardware', ca: 'Hardware' },
    kind: 'interest',
    description: {
      en: 'Arduinos, sensors, and physical interfaces. I love when software escapes the screen.',
      es: 'Arduinos, sensores e interfaces físicas. Me encanta cuando el software escapa de la pantalla.',
      ca: 'Arduinos, sensors i interfícies físiques. M\'encanta quan el software s\'escapa de la pantalla.',
    },
  },

  // Origin / formation
  {
    id: 'lasalle',
    label: { en: 'La Salle', es: 'La Salle', ca: 'La Salle' },
    kind: 'origin',
    description: {
      en: 'Thanks to my degree at La Salle Barcelona I learned to think in systems — hardware, software, and design as one continuous problem.',
      es: 'Gracias a mi carrera en La Salle Barcelona aprendí a pensar en sistemas — hardware, software y diseño como un mismo problema continuo.',
      ca: 'Gràcies a la meva carrera a La Salle Barcelona vaig aprendre a pensar en sistemes — hardware, software i disseny com un mateix problema continu.',
    },
  },
  {
    id: 'curiosity',
    label: { en: 'Curiosity', es: 'Curiosidad', ca: 'Curiositat' },
    kind: 'origin',
    description: {
      en: 'A lifelong instinct to take things apart and ask "but why does it work this way?" Drives most of what I make.',
      es: 'Un instinto de toda la vida para desmontar cosas y preguntar "¿pero por qué funciona así?" Es lo que mueve casi todo lo que hago.',
      ca: 'Un instint de tota la vida per desmuntar coses i preguntar "però per què funciona així?" És el que mou gairebé tot el que faig.',
    },
  },
  {
    id: 'sports',
    label: { en: 'Sports', es: 'Deporte', ca: 'Esport' },
    kind: 'origin',
    description: {
      en: 'Competition, training, discipline. Sports taught me iteration before I ever wrote a line of code — and inspired Betsy.',
      es: 'Competición, entrenamiento, disciplina. El deporte me enseñó a iterar antes de escribir mi primera línea de código — y dio origen a Betsy.',
      ca: 'Competició, entrenament, disciplina. L\'esport em va ensenyar a iterar abans d\'escriure la meva primera línia de codi — i va donar origen a Betsy.',
    },
  },
  {
    id: 'self',
    label: { en: 'Self-learning', es: 'Autoaprendizaje', ca: 'Autoaprenentatge' },
    kind: 'origin',
    description: {
      en: 'Most of what I know came from outside class — docs, YouTube, and breaking things until they work.',
      es: 'La mayoría de lo que sé viene de fuera de clase — docs, YouTube y romper cosas hasta que funcionan.',
      ca: 'La majoria del que sé ve de fora de classe — docs, YouTube i trencar coses fins que funcionen.',
    },
  },

  // Mindset
  {
    id: 'iteration',
    label: { en: 'Iteration', es: 'Iteración', ca: 'Iteració' },
    kind: 'mindset',
    description: {
      en: 'Ship rough, fix fast. The earliest working version teaches more than the perfect plan ever could.',
      es: 'Lanzar tosco, arreglar rápido. La primera versión que funciona enseña más que el plan perfecto.',
      ca: 'Llançar bast, arreglar ràpid. La primera versió que funciona ensenya més que el pla perfecte.',
    },
  },
  {
    id: 'independence',
    label: { en: 'Independence', es: 'Independencia', ca: 'Independència' },
    kind: 'mindset',
    description: {
      en: 'I move faster alone or in tiny teams. Excited about what comes after the syllabus ends.',
      es: 'Voy más rápido solo o en equipos pequeños. Me ilusiona lo que viene después de que termine el temario.',
      ca: 'Vaig més ràpid sol o en equips petits. M\'il·lusiona el que ve després que s\'acabi el temari.',
    },
  },
]

// Connections between node IDs — organic graph, not center-hub
const EDGES = [
  ['ai', 'building'],
  ['ai', 'experiments'],
  ['ai', 'product'],
  ['ai', 'curiosity'],
  ['product', 'design'],
  ['product', 'building'],
  ['product', 'interaction'],
  ['design', 'interaction'],
  ['design', 'tech'],
  ['design', 'lasalle'],
  ['interaction', 'tech'],
  ['interaction', 'hardware'],
  ['tech', 'hardware'],
  ['tech', 'lasalle'],
  ['building', 'hardware'],
  ['building', 'iteration'],
  ['building', 'sports'],
  ['experiments', 'iteration'],
  ['experiments', 'curiosity'],
  ['experiments', 'hardware'],
  ['lasalle', 'self'],
  ['self', 'curiosity'],
  ['self', 'independence'],
  ['independence', 'building'],
  ['iteration', 'sports'],
  ['curiosity', 'design'],
]

// Even-spaced points on a sphere
function fibSphere(n, R) {
  const pts = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = phi * i
    pts.push({ x: Math.cos(t) * r * R, y: y * R, z: Math.sin(t) * r * R })
  }
  return pts
}

function rotatePoint(p, rotXDeg, rotYDeg) {
  const ry = (rotYDeg * Math.PI) / 180
  const rx = (rotXDeg * Math.PI) / 180
  // rotateY first
  const x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry)
  const z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry)
  const y1 = p.y
  // rotateX
  const y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx)
  const z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx)
  return { x: x1, y: y2, z: z2 }
}

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, v]
}

export default function BrainMap() {
  const { lang } = useLang()
  const [size, setSize] = useState(640)
  const [active, setActive] = useState(null)
  const [rot, setRot] = useState({ x: -12, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef(null)
  const [headerRef, headerInView] = useInView(0.2)

  useEffect(() => {
    const update = () => {
      const w = Math.min(window.innerWidth - 32, 720)
      setSize(Math.max(320, w))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Auto-rotate when idle
  useEffect(() => {
    if (dragging || active) return
    let raf = 0
    const tick = () => {
      setRot((r) => ({ ...r, y: r.y + 0.1 }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [dragging, active])

  // Lock body on modal
  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  // Pointer drag
  const getPoint = (e) => {
    if ('touches' in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    return { x: e.clientX, y: e.clientY }
  }

  const onDown = (e) => {
    const p = getPoint(e)
    dragRef.current = { x: p.x, y: p.y, rotX: rot.x, rotY: rot.y }
    setDragging(true)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      if (!dragRef.current) return
      const p = getPoint(e)
      const dx = p.x - dragRef.current.x
      const dy = p.y - dragRef.current.y
      setRot({
        x: Math.max(-65, Math.min(65, dragRef.current.rotX - dy * 0.4)),
        y: dragRef.current.rotY + dx * 0.4,
      })
      if ('touches' in e) e.preventDefault()
    }
    const onUp = () => setDragging(false)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  const R = size * 0.4
  const labelPoints    = useMemo(() => fibSphere(NODES.length, R), [R])
  const particlePoints = useMemo(() => fibSphere(90, R * 0.95), [R])
  const innerPoints    = useMemo(() => fibSphere(50, R * 0.55), [R])

  // Rotated positions for nodes (full 3D, used by edges + depth)
  const nodeRot = labelPoints.map((p) => rotatePoint(p, rot.x, rot.y))
  const particleDepths = particlePoints.map((p) => rotatePoint(p, rot.x, rot.y).z)
  const innerDepths    = innerPoints.map((p) => rotatePoint(p, rot.x, rot.y).z)

  // Helper: find node index by id
  const idxOf = (id) => NODES.findIndex((n) => n.id === id)

  return (
    <section id="brain" className="relative py-24 lg:py-32 px-6">
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-3">
          {t(UI.brain.eyebrow, lang)}
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
          {t(UI.brain.title, lang)}
        </h2>
        <p className="mt-5 text-zinc-500 text-sm sm:text-base leading-relaxed">
          {t(UI.brain.sub, lang)}
        </p>
      </div>

      {/* Sphere */}
      <div
        className="relative mx-auto mt-12 select-none"
        style={{
          width: size,
          height: size,
          perspective: 1600,
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onMouseDown={onDown}
        onTouchStart={onDown}
      >
        {/* Ambient glow behind */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Edges (SVG overlay, projected from rotated 3D positions) */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={size}
          height={size}
          aria-hidden="true"
        >
          {EDGES.map(([aId, bId], i) => {
            const a = nodeRot[idxOf(aId)]
            const b = nodeRot[idxOf(bId)]
            if (!a || !b) return null
            const avgZ = (a.z + b.z) / 2
            const depth = (avgZ + R) / (2 * R) // 0 back → 1 front
            const opacity = 0.04 + depth * 0.22
            const hovered =
              active && (active.id === aId || active.id === bId)
            return (
              <line
                key={`e${i}`}
                x1={size / 2 + a.x}
                y1={size / 2 + a.y}
                x2={size / 2 + b.x}
                y2={size / 2 + b.y}
                stroke={
                  hovered
                    ? `rgba(255,255,255,${0.35 + depth * 0.4})`
                    : `rgba(255,255,255,${opacity})`
                }
                strokeWidth={hovered ? 1.3 : 1}
                style={{ transition: 'stroke 250ms ease' }}
              />
            )
          })}
        </svg>

        {/* 3D wrapper */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          }}
        >
          {/* Outer particles */}
          {particlePoints.map((p, i) => {
            const depth = (particleDepths[i] + R) / (2 * R)
            const opacity = 0.08 + depth * 0.55
            const scale = 0.5 + depth * 0.9
            return (
              <span
                key={`p${i}`}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 block rounded-full bg-zinc-100 pointer-events-none"
                style={{
                  width: 3,
                  height: 3,
                  transform: `translate3d(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px), ${p.z}px) scale(${scale})`,
                  opacity,
                  boxShadow: depth > 0.7 ? '0 0 6px rgba(255,255,255,0.6)' : 'none',
                }}
              />
            )
          })}

          {/* Inner particles (smaller, denser) */}
          {innerPoints.map((p, i) => {
            const depth = (innerDepths[i] + R * 0.55) / (R * 1.1)
            const opacity = 0.04 + depth * 0.3
            return (
              <span
                key={`ip${i}`}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 block rounded-full bg-white pointer-events-none"
                style={{
                  width: 2,
                  height: 2,
                  transform: `translate3d(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px), ${p.z}px)`,
                  opacity,
                }}
              />
            )
          })}

          {/* Label nodes */}
          {NODES.map((node, i) => {
            const p = labelPoints[i]
            const depth = (nodeRot[i].z + R) / (2 * R)
            const isActive = active?.id === node.id
            const isOrigin = node.kind === 'origin'
            const isMindset = node.kind === 'mindset'
            return (
              <div
                key={node.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
                  transformStyle: 'preserve-3d',
                  zIndex: Math.round(depth * 100),
                }}
              >
                {/* Billboard: counter-rotate */}
                <div
                  style={{
                    transform: `rotateY(${-rot.y}deg) rotateX(${-rot.x}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActive(node) }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className={`whitespace-nowrap rounded-full border backdrop-blur-md font-medium tracking-wide cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black border-white shadow-[0_0_28px_rgba(255,255,255,0.55)] scale-110'
                        : isOrigin
                          ? 'bg-white/[0.04] text-zinc-200 border-white/30 hover:bg-white/15 hover:border-white/60'
                          : isMindset
                            ? 'bg-white/[0.04] text-zinc-300 border-white/[0.18] hover:bg-white/[0.08] hover:border-white/[0.3]'
                            : 'bg-white/[0.04] text-zinc-300 border-white/[0.1] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.22]'
                    }`}
                    style={{
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.35 + depth * 0.65,
                      padding: depth < 0.4 ? '4px 9px' : '6px 12px',
                      fontSize: depth < 0.4 ? 10 : 11,
                      filter: depth < 0.3 ? 'blur(0.4px)' : 'none',
                    }}
                  >
                    {t(node.label, lang)}
                  </button>
                </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* Hint + legend */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-700 tracking-[0.22em] uppercase">
          <span className="w-6 h-px bg-zinc-700" />
          <span>{t(UI.brain.hint, lang)}</span>
          <span className="w-6 h-px bg-zinc-700" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.15em]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            {t(UI.brain.legend.interest, lang)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {t(UI.brain.legend.origin, lang)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            {t(UI.brain.legend.mindset, lang)}
          </span>
        </div>
      </div>

      <DetailPanel node={active} onClose={() => setActive(null)} lang={lang} />
    </section>
  )
}

function DetailPanel({ node, onClose, lang }) {
  if (!node) return null
  const kindLabel = t(UI.brain.kindLabel[node.kind] || UI.brain.kindLabel.interest, lang)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(14px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={t(node.label, lang)}
    >
      <div className="animate-scale-in max-w-md w-full bg-[#0c0c0c] border border-white/[0.1] rounded-2xl p-7 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">
            {kindLabel}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.12] flex items-center justify-center cursor-pointer transition-colors"
          >
            <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{t(node.label, lang)}</h3>
        <p className="text-zinc-300 leading-[1.8] text-[15px]">{t(node.description, lang)}</p>
      </div>
    </div>
  )
}
