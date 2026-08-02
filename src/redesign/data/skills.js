// Grounded in the first year of the degree (60 ECTS) and in what was actually
// produced for each subject. Grades are deliberately not published: a
// portfolio is evidence of work, not a transcript.
const l = (en, es, ca) => ({ en, es, ca });

export const degree = l(
  "Interactive Product Design and Creation, La Salle Barcelona",
  "Diseño y Creación de Productos Interactivos, La Salle Barcelona",
  "Disseny i Creació de Productes Interactius, La Salle Barcelona"
);

export const intro = l(
  "One year in, the degree keeps pulling in two directions at once: how a thing is built, and how it feels to use. These are the disciplines it has put in front of me so far, and what I actually made in each.",
  "Un año dentro, la carrera sigue tirando en dos direcciones a la vez: cómo se construye algo y cómo se siente al usarlo. Estas son las disciplinas que me ha puesto delante hasta ahora, y lo que hice en cada una.",
  "Un any a dins, la carrera segueix estirant en dues direccions alhora: com es construeix una cosa i com se sent en fer-la servir. Aquestes són les disciplines que m'ha posat al davant fins ara, i el que vaig fer a cadascuna."
);

/** Discipline plus the concrete work behind it. */
export const disciplines = [
  {
    field: l("Experience Design", "Experience Design", "Experience Design"),
    did: l(
      "Card sorting, expert reviews and the seven usability principles, run against real products rather than invented ones.",
      "Card sorting, expert reviews y los siete principios de usabilidad, aplicados a productos reales y no inventados.",
      "Card sorting, expert reviews i els set principis d'usabilitat, aplicats a productes reals i no inventats."
    ),
  },
  {
    field: l("Inclusive Design", "Inclusive Design", "Inclusive Design"),
    did: l(
      "Designing for the people a default interface leaves out. It is the reason Haptic Hunter and Gesture TV exist.",
      "Diseñar para las personas que una interfaz por defecto deja fuera. Es la razón de que existan Haptic Hunter y Gesture TV.",
      "Dissenyar per a les persones que una interfície per defecte deixa fora. És la raó que existeixin Haptic Hunter i Gesture TV."
    ),
  },
  {
    field: l("Interface and Graphic Design", "Diseño de Interfaz y Gráfico", "Disseny d'Interfície i Gràfic"),
    did: l(
      "Wireframes, wireflows and visual systems in Figma and Illustrator. Betsy's interface started here as coursework.",
      "Wireframes, wireflows y sistemas visuales en Figma e Illustrator. La interfaz de Betsy empezó aquí como trabajo de clase.",
      "Wireframes, wireflows i sistemes visuals a Figma i Illustrator. La interfície de Betsy va començar aquí com a treball de classe."
    ),
  },
  {
    field: l("Programming", "Programación", "Programació"),
    did: l(
      "Fundamentals and interactive environments: object orientation, UML, and systems written from nothing.",
      "Fundamentos y entornos interactivos: orientación a objetos, UML y sistemas escritos desde cero.",
      "Fonaments i entorns interactius: orientació a objectes, UML i sistemes escrits des de zero."
    ),
  },
  {
    field: l("Electronics", "Electrónica", "Electrònica"),
    did: l(
      "Circuit analysis, Ohm and Kirchhoff, ADC and actuators. The theory underneath Wake Station and the robot car.",
      "Análisis de circuitos, Ohm y Kirchhoff, ADC y actuadores. La teoría que hay debajo de Wake Station y el coche robot.",
      "Anàlisi de circuits, Ohm i Kirchhoff, ADC i actuadors. La teoria que hi ha sota Wake Station i el cotxe robot."
    ),
  },
  {
    field: l("3D, Animation and Story", "3D, Animación e Historia", "3D, Animació i Història"),
    did: l(
      "Modelling and sculpting in Maya and ZBrush, animation, digital photography, and narrative cut in Premiere.",
      "Modelado y escultura en Maya y ZBrush, animación, fotografía digital y narrativa montada en Premiere.",
      "Modelatge i escultura a Maya i ZBrush, animació, fotografia digital i narrativa muntada a Premiere."
    ),
  },
];

/**
 * Carousel rows. Plain strings are proper nouns and pass through the t()
 * resolver untranslated; l() objects are the terms that genuinely differ.
 */
export const skillTracks = [
  [
    l("Experience Design", "Experience Design", "Experience Design"),
    l("Inclusive Design", "Inclusive Design", "Inclusive Design"),
    l("Interface Design", "Diseño de Interfaz", "Disseny d'Interfície"),
    l("Graphic Design", "Diseño Gráfico", "Disseny Gràfic"),
    l("Wireframing", "Wireframing", "Wireframing"),
    l("Card Sorting", "Card Sorting", "Card Sorting"),
    l("Expert Review", "Expert Review", "Expert Review"),
    l("Prototyping", "Prototipado", "Prototipatge"),
    l("Design Systems", "Sistemas de Diseño", "Sistemes de Disseny"),
    l("Accessibility", "Accesibilidad", "Accessibilitat"),
  ],
  [
    "Python", "Swift", "SwiftUI", "Java", "JavaScript", "React",
    l("Object Orientation", "Orientación a Objetos", "Orientació a Objectes"),
    "UML", "Firebase", "Canvas", "PWA", "Git",
  ],
  [
    "Arduino", "ESP32",
    l("Circuit Analysis", "Análisis de Circuitos", "Anàlisi de Circuits"),
    "ADC",
    l("Actuators", "Actuadores", "Actuadors"),
    l("Sensors", "Sensores", "Sensors"),
    "NFC", "MQTT", "Maya", "ZBrush", "Figma", "Illustrator", "Premiere",
    l("Digital Photography", "Fotografía Digital", "Fotografia Digital"),
    l("Storytelling", "Narrativa", "Narrativa"),
  ],
];
