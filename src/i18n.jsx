import { createContext, useContext, useEffect, useState } from 'react'

export const LANGS = ['en', 'es', 'ca']
const DEFAULT = 'en'
const STORAGE_KEY = 'xb_lang'

const LangContext = createContext({ lang: DEFAULT, setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && LANGS.includes(saved)) setLang(saved)
  }, [])

  const updateLang = (l) => {
    if (!LANGS.includes(l)) return
    setLang(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
  }

  return (
    <LangContext.Provider value={{ lang, setLang: updateLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

// Dashes are stripped at the source files, so no runtime cleaning is needed.
// (A previous runtime regex here was eating commas from every string.)
export function cleanText(value) {
  return String(value)
}

// Pick localized value from string or {en,es,ca}. Falls back to en, then first available.
export function t(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || value.es || value.ca || ''
}

// Static UI strings (multi-locale)
export const UI = {
  nav: {
    mind:    { en: 'Mind',    es: 'Mente',    ca: 'Ment'     },
    work:    { en: 'Work',    es: 'Trabajo',  ca: 'Treball'  },
    now:     { en: 'Now',     es: 'Ahora',    ca: 'Ara'      },
    about:   { en: 'About',   es: 'Sobre mí', ca: 'Sobre mi' },
    contact: { en: 'Contact', es: 'Contacto', ca: 'Contacte' },
  },
  hero: {
    badge:    { en: 'Student · La Salle Barcelona', es: 'Estudiante · La Salle Barcelona', ca: 'Estudiant · La Salle Barcelona' },
    cta1:     { en: 'See my work',  es: 'Ver mi trabajo', ca: 'Veure el meu treball' },
    cta2:     { en: 'Get in touch', es: 'Contacta',       ca: 'Contacta\'m' },
    building: { en: 'Currently building', es: 'Construyendo ahora', ca: 'Construint ara' },
    sigName:  { en: 'Name',     es: 'Nombre',   ca: 'Nom' },
    sigStatus:{ en: 'Status',   es: 'Estado',   ca: 'Estat' },
    sigActive:{ en: 'Active',   es: 'Activo',   ca: 'Actiu' },
    sigProj:  { en: 'Projects', es: 'Proyectos', ca: 'Projectes' },
    sigYear:  { en: 'Year',     es: 'Año',      ca: 'Any' },
    sigBased: { en: 'Based',    es: 'Desde',    ca: 'Des de' },
  },
  brain: {
    eyebrow: { en: '02 / The Mind', es: '02 / La Mente', ca: '02 / La Ment' },
    title:   { en: 'A map of how I think', es: 'Un mapa de cómo pienso', ca: 'Un mapa de com penso' },
    sub:     { en: 'Not a job title: a constellation. Drag to rotate. Tap any node to see what it means to me and where it came from.',
               es: 'No un cargo: una constelación. Arrastra para girar. Toca un nodo para ver qué significa y de dónde viene.',
               ca: 'No un càrrec: una constel·lació. Arrossega per girar. Toca un node per veure què significa i d\'on ve.' },
    hint:    { en: 'Drag to rotate · Click a node', es: 'Arrastra para girar · Click en un nodo', ca: 'Arrossega per girar · Clica un node' },
    legend:  { interest: { en: 'Interest', es: 'Interés', ca: 'Interès' },
               origin:   { en: 'Origin',   es: 'Origen',  ca: 'Origen'  },
               mindset:  { en: 'Mindset',  es: 'Mentalidad', ca: 'Mentalitat' } },
    kindLabel:{ interest: { en: 'Interest · what I explore', es: 'Interés · qué exploro', ca: 'Interès · què exploro' },
                origin:   { en: 'Origin · what shaped me',    es: 'Origen · qué me formó',   ca: 'Origen · què em va formar' },
                mindset:  { en: 'Mindset · how I work',       es: 'Mentalidad · cómo trabajo', ca: 'Mentalitat · com treballo' } },
  },
  work: {
    eyebrow: { en: '02 / Work',   es: '02 / Trabajo', ca: '02 / Treball' },
    title:   { en: 'My projects', es: 'Mis proyectos', ca: 'Projectes' },
    hint:    { en: 'Scroll to explore', es: 'Desplázate para explorar', ca: 'Desplaça per explorar' },
    open:    { en: 'Open project', es: 'Abrir proyecto', ca: 'Obrir projecte' },
  },
  now: {
    eyebrow: { en: '03 / Now', es: '03 / Ahora', ca: '03 / Ara' },
    title:   { en: 'Current focus', es: 'Foco actual', ca: 'Focus actual' },
    live:    { en: 'Live snapshot', es: 'Vista en vivo', ca: 'Vista en directe' },
    building:  { label: { en: 'Building',  es: 'Construyendo', ca: 'Construint' },
                 sub:   { en: 'Currently building', es: 'Construyendo ahora', ca: 'Construint ara' },
                 status:{ en: 'Active sprint', es: 'Sprint activo', ca: 'Sprint actiu' } },
    learning:  { label: { en: 'Learning',  es: 'Aprendiendo',  ca: 'Aprenent' },
                 sub:   { en: 'Currently learning', es: 'Aprendiendo ahora', ca: 'Aprenent ara' },
                 status:{ en: 'In progress', es: 'En curso', ca: 'En curs' } },
    exploring: { label: { en: 'Exploring', es: 'Explorando',   ca: 'Explorant' },
                 sub:   { en: 'Currently exploring', es: 'Explorando ahora', ca: 'Explorant ara' },
                 status:{ en: 'Open thread', es: 'Hilo abierto', ca: 'Fil obert' } },
    active:  { en: 'Active', es: 'Activo', ca: 'Actiu' },
  },
  about: {
    eyebrow: { en: '01 / About', es: '01 / Sobre mí', ca: '01 / Sobre mi' },
    title:   { en: 'I think by building.', es: 'Pienso construyendo.', ca: 'Penso construint.' },
    p1:      { en: 'I\'m currently studying Interactive Product Design and Creation at La Salle Barcelona, where I\'ve been developing a perspective that combines design, technology, and digital product development.',
               es: 'Actualmente estudio Diseño y Creación de Productos Interactivos en La Salle Barcelona, donde estoy desarrollando una visión que combina diseño, tecnología y desarrollo de productos digitales.',
               ca: 'Actualment estudio Disseny i Creació de Productes Interactius a La Salle Barcelona, on estic desenvolupant una manera d\'entendre el disseny, la tecnologia i el desenvolupament de productes digitals des d\'una perspectiva molt transversal.' },
    p2:      { en: 'What motivates me most is exploring the space where technical thinking meets human needs. I enjoy understanding how products work behind the scenes, but I\'m just as interested in how people interact with them and what makes an experience feel intuitive.',
               es: 'Lo que más me interesa es el punto donde el pensamiento técnico se encuentra con las personas. Me gusta entender cómo funcionan los productos por dentro, pero también cómo los viven quienes los utilizan y qué hace que una experiencia resulte sencilla e intuitiva.',
               ca: 'El que més m\'interessa és el punt on el pensament tècnic es troba amb les persones. M\'agrada entendre com funcionen els productes per dins, però també com els viuen els qui els utilitzen i què fa que una experiència sigui intuïtiva i natural.' },
    p3:      { en: 'Outside university, I spend a lot of my time building personal projects, experimenting with new ideas, and learning by creating. I enjoy moving between different areas: from product design and user experience to programming, interactive systems, and emerging technologies: following whatever sparks my curiosity.',
               es: 'Fuera de la universidad dedico gran parte de mi tiempo a crear proyectos personales, experimentar con nuevas ideas y aprender construyendo. Me gusta moverme entre distintas disciplinas, desde el diseño de producto y la experiencia de usuario hasta la programación, los sistemas interactivos y las tecnologías emergentes, siguiendo aquello que despierta mi curiosidad.',
               ca: 'Fora de la universitat dedico bona part del meu temps a crear projectes personals, experimentar amb noves idees i aprendre construint. M\'agrada moure\'m entre diferents disciplines, des del disseny de producte i l\'experiència d\'usuari fins a la programació, els sistemes interactius i les tecnologies emergents, seguint allò que desperta la meva curiositat.' },
    p4:      { en: 'Recently, much of that curiosity has been focused on artificial intelligence. I\'m fascinated by how AI is changing the way digital products are imagined, designed, and built, and I enjoy exploring not only what it can do today, but also the opportunities it creates for the future.',
               es: 'Últimamente gran parte de esa curiosidad gira en torno a la inteligencia artificial. Me interesa entender cómo está transformando la forma en que imaginamos, diseñamos y desarrollamos productos digitales, y explorar las posibilidades que puede abrir en el futuro.',
               ca: 'Darrerament, gran part d\'aquesta curiositat se centra en la intel·ligència artificial. M\'interessa entendre com està transformant la manera com imaginem, dissenyem i desenvolupem productes digitals, i descobrir les oportunitats que pot aportar en els pròxims anys.' },
    p5:      { en: 'This portfolio is a reflection of that journey. It\'s a collection of projects, experiments, and ideas that represent what I\'m learning, what I\'m exploring, and the kind of products I hope to build.',
               es: 'Este portfolio refleja ese proceso. Aquí reúno proyectos, experimentos e ideas que muestran lo que estoy aprendiendo, lo que estoy explorando y el tipo de productos que me gustaría crear.',
               ca: 'Aquest portfolio és un reflex d\'aquest camí. Hi recullo projectes, experiments i idees que representen el que estic aprenent, el que estic explorant i el tipus de productes que m\'agradaria construir.' },
    skillLabels: {
      focus:    { en: 'Focus',    es: 'Foco',    ca: 'Focus' },
      stack:    { en: 'Stack',    es: 'Stack',   ca: 'Stack' },
      approach: { en: 'Approach', es: 'Enfoque', ca: 'Enfocament' },
    },
    school:  { en: 'Currently studying at', es: 'Estudiando actualmente en', ca: 'Estudiant actualment a' },
  },
  contact: {
    eyebrow: { en: '04 / Contact', es: '04 / Contacto', ca: '04 / Contacte' },
    title:   { en: 'Get in touch', es: 'Contacta', ca: 'Contacta\'m' },
    sub:     { en: 'Open to internships, collaborations, and interesting conversations.',
               es: 'Abierto a prácticas, colaboraciones y conversaciones interesantes.',
               ca: 'Obert a pràctiques, col·laboracions i converses interessants.' },
    email:   { en: 'Email', es: 'Email', ca: 'Email' },
    phone:   { en: 'Phone', es: 'Teléfono', ca: 'Telèfon' },
  },
  modal: {
    overview:  { en: 'Overview',  es: 'Resumen',   ca: 'Resum' },
    problem:   { en: 'Problem',   es: 'Problema',  ca: 'Problema' },
    idea:      { en: 'Idea',      es: 'Idea',      ca: 'Idea' },
    execution: { en: 'Execution', es: 'Ejecución', ca: 'Execució' },
    learned:   { en: 'What I learned', es: 'Qué aprendí', ca: 'Què he après' },
    gallery:   { en: 'Real images', es: 'Imágenes reales', ca: 'Imatges reals' },
    galleryToggleShow: { en: 'Show gallery', es: 'Ver galería', ca: 'Veure galeria' },
    galleryToggleHide: { en: 'Hide gallery', es: 'Ocultar galería', ca: 'Amagar galeria' },
    galleryEmpty: { en: 'Gallery coming soon: real screenshots and footage will be added here.',
                    es: 'Galería próximamente: aquí se añadirán capturas reales.',
                    ca: 'Galeria aviat: aquí s\'afegiran captures reals.' },
    open:      { en: 'View code on GitHub', es: 'Ver código en GitHub', ca: 'Veure codi a GitHub' },
    demo:      { en: 'Watch demo', es: 'Ver demo', ca: 'Veure demo' },
  },
}
