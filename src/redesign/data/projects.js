const IMG = "/images/";

// Small helper: { en, es, ca } object literal, read by t() in ../i18n.jsx.
const l = (en, es, ca) => ({ en, es, ca });

export const projects = [
  {
    id: "01",
    name: "Jeffrey",
    tagline: l(
      "An assistant that acts, not answers.",
      "Un asistente que actúa, no contesta.",
      "Un assistent que actua, no contesta."
    ),
    description: l(
      "A personal AI system that doesn't stop at an answer. Jeffrey listens, chooses a route, calls the right tool, executes on macOS and responds in the user's language. The experience is one sentence. Underneath, five systems coordinate every request.",
      "Un sistema de IA personal que no se detiene en una respuesta. Jeffrey escucha, elige una ruta, llama a la herramienta adecuada, ejecuta en macOS y responde en el idioma del usuario. La experiencia es una frase. Por debajo, cinco sistemas coordinan cada petición.",
      "Un sistema d'IA personal que no s'atura en una resposta. Jeffrey escolta, tria una ruta, crida l'eina adequada, executa a macOS i respon en l'idioma de l'usuari. L'experiència és una frase. Per sota, cinc sistemes coordinen cada petició."
    ),
    role: l("Design + Systems + Engineering", "Diseño + Sistemas + Ingeniería", "Disseny + Sistemes + Enginyeria"),
    context: l("Personal AI agent for macOS", "Agente de IA personal para macOS", "Agent d'IA personal per a macOS"),
    age: 18,
    tags: [l("AI Agent", "Agente IA", "Agent IA"), l("Systems", "Sistemas", "Sistemes")],
    tech: ["Python", "Ollama", "macOS", "Agent loop"],
    learning: l(
      "The quality of tool design matters far more than model quality when AI is doing the acting, not just the answering. Ollama is not a demo mode, it is the continuity layer when cloud inference is unavailable.",
      "La calidad del diseño de las herramientas importa mucho más que la calidad del modelo cuando la IA actúa, no solo responde. Ollama no es un modo demo, es la capa de continuidad cuando la inferencia en la nube no está disponible.",
      "La qualitat del disseny de les eines importa molt més que la qualitat del model quan la IA actua, no només respon. Ollama no és un mode demo, és la capa de continuïtat quan la inferència al núvol no està disponible."
    ),
    repo: "https://github.com/xavibosch/jeffrey-ai-assistant",
    images: [IMG + "jeffrey.png"],
  },
  {
    id: "02",
    name: "Jeffrey Remote",
    tagline: l("One assistant, many surfaces.", "Un asistente, muchas superficies.", "Un assistent, moltes superfícies."),
    description: l(
      "A native iOS control surface for Jeffrey and the Mac. Live preview, cursor, commands, media, apps and voice over a resilient direct connection. Each tab is designed around a distinct remote job instead of a generic list of commands.",
      "Una superficie de control nativa en iOS para Jeffrey y el Mac. Vista en vivo, cursor, comandos, multimedia, apps y voz sobre una conexión directa y resiliente. Cada pestaña está diseñada para una tarea remota concreta, no como una lista genérica de comandos.",
      "Una superfície de control nativa a iOS per a Jeffrey i el Mac. Vista en directe, cursor, ordres, multimèdia, apps i veu sobre una connexió directa i resilient. Cada pestanya està dissenyada per a una tasca remota concreta, no com una llista genèrica d'ordres."
    ),
    role: l("Product Design + iOS", "Diseño de Producto + iOS", "Disseny de Producte + iOS"),
    context: l("Native companion app", "App nativa complementaria", "App nativa complementària"),
    age: 18,
    tags: ["iOS", l("Product", "Producto", "Producte")],
    tech: ["Swift", "SwiftUI", "macOS bridge"],
    learning: l(
      "Jeffrey worked well on a Mac, but the most useful moments of the agent are when you're not in front of it. Designing the redundant channel core first made every later feature accessible for free.",
      "Jeffrey funcionaba bien en un Mac, pero los momentos más útiles del agente son cuando no estás delante. Diseñar primero el núcleo de canales redundantes hizo que cada función posterior fuera accesible sin coste.",
      "Jeffrey funcionava bé en un Mac, però els moments més útils de l'agent són quan no ets davant. Dissenyar primer el nucli de canals redundants va fer que cada funció posterior fos accessible sense cost."
    ),
    repo: "https://github.com/xavibosch/jeffrey-remote",
    images: [IMG + "jeffrey-remote.png", IMG + "jeffrey-remote-apps.webp", IMG + "jeffrey-remote-controls.webp"],
  },
  {
    id: "03",
    name: "Jeffrey Wake Station",
    tagline: l("Latency is interaction design.", "La latencia es diseño de interacción.", "La latència és disseny d'interacció."),
    description: l(
      "Jeffrey Wake Station turns the desk into an input device. Motion, sound and a physical button travel from an Arduino MEGA to macOS and fire full routines in under 200 milliseconds. Designed for a hallway, not a keynote.",
      "Jeffrey Wake Station convierte el escritorio en un dispositivo de entrada. El movimiento, el sonido y un botón físico viajan de un Arduino MEGA a macOS y disparan rutinas completas en menos de 200 milisegundos. Diseñado para un pasillo, no para una keynote.",
      "Jeffrey Wake Station converteix l'escriptori en un dispositiu d'entrada. El moviment, el so i un botó físic viatgen d'un Arduino MEGA a macOS i disparen rutines completes en menys de 200 mil·lisegons. Dissenyat per a un passadís, no per a una keynote."
    ),
    role: l("Hardware + Interaction", "Hardware + Interacción", "Hardware + Interacció"),
    context: l("Physical trigger for Jeffrey", "Disparador físico para Jeffrey", "Disparador físic per a Jeffrey"),
    age: 18,
    tags: ["Hardware", l("Interaction", "Interacción", "Interacció")],
    tech: ["Arduino MEGA", "Serial", "macOS"],
    learning: l(
      "When physical sensors drive software, latency stops being an engineering metric and becomes a UX one. Anything above 200ms between gesture and screen breaks immersion completely.",
      "Cuando los sensores físicos controlan el software, la latencia deja de ser una métrica de ingeniería y pasa a ser una de UX. Cualquier cosa por encima de 200ms entre el gesto y la pantalla rompe la inmersión por completo.",
      "Quan els sensors físics controlen el software, la latència deixa de ser una mètrica d'enginyeria i passa a ser una d'UX. Qualsevol cosa per damunt de 200ms entre el gest i la pantalla trenca la immersió completament."
    ),
    repo: "https://github.com/xavibosch/jeffrey-wake-station",
    images: [IMG + "sensor-workspace.png"],
  },
  {
    id: "04",
    name: "Betsy",
    tagline: l(
      "All the tension of betting, zero real money.",
      "Toda la tensión de apostar, cero dinero real.",
      "Tota la tensió d'apostar, zero diners reals."
    ),
    description: l(
      "Betsy turns a group of friends into a private league: real fixtures, virtual points, live rankings and 1v1 duels. The product is the tension between friends. Every system exists to feed it.",
      "Betsy convierte un grupo de amigos en una liga privada: partidos reales, puntos virtuales, rankings en vivo y duelos 1v1. El producto es la tensión entre amigos. Cada sistema existe para alimentarla.",
      "Betsy converteix un grup d'amics en una lliga privada: partits reals, punts virtuals, rànquings en directe i duels 1v1. El producte és la tensió entre amics. Cada sistema existeix per alimentar-la."
    ),
    role: l("Product Design + iOS", "Diseño de Producto + iOS", "Disseny de Producte + iOS"),
    context: l("Social betting league app", "App social de ligas de apuestas", "App social de lligues d'apostes"),
    age: 18,
    tags: ["iOS", l("Product", "Producto", "Producte")],
    tech: ["Swift", "SwiftUI", "Firestore"],
    learning: l(
      "Building Firestore rules and SwiftUI views in parallel surfaced product problems no wireframe ever showed. Real backend + real UI at the same time reveals what static screens can't.",
      "Construir reglas de Firestore y vistas SwiftUI en paralelo reveló problemas de producto que ningún wireframe mostró jamás. Backend real + UI real a la vez revela lo que las pantallas estáticas no pueden.",
      "Construir regles de Firestore i vistes SwiftUI en paral·lel va revelar problemes de producte que cap wireframe va mostrar mai. Backend real + UI real alhora revela el que les pantalles estàtiques no poden."
    ),
    repo: "https://github.com/xavibosch/betsy-ios",
    images: [IMG + "betsy-real-hero.jpg", IMG + "betsy-real-league.png", IMG + "betsy-real-markets.png", IMG + "betsy-real-betslip.png"],
  },
  {
    id: "05",
    name: "Nevera Bosch",
    tagline: l("The fridge is the app.", "La nevera es la app.", "La nevera és l'app."),
    description: l(
      "A shared shopping list that lives on the fridge: tap your phone against an NFC sticker and the family list opens instantly, with no app store, no accounts, no friction. A sticker on the fridge door is the entire onboarding.",
      "Una lista de la compra compartida que vive en la nevera: acercas el móvil a una pegatina NFC y la lista familiar se abre al instante, sin app store, sin cuentas, sin fricción. Una pegatina en la puerta de la nevera es todo el onboarding.",
      "Una llista de la compra compartida que viu a la nevera: acostes el mòbil a un adhesiu NFC i la llista familiar s'obre a l'instant, sense app store, sense comptes, sense fricció. Un adhesiu a la porta de la nevera és tot l'onboarding."
    ),
    role: l("UX + Web", "UX + Web", "UX + Web"),
    context: l("NFC-anchored family utility", "Utilidad familiar anclada a NFC", "Utilitat familiar ancorada a NFC"),
    age: 18,
    tags: ["NFC", "UX"], // universal abbreviations, no translation needed
    tech: ["NFC", "Web", "Realtime DB"],
    learning: l(
      "People forget apps but never forget the fridge. Anchoring software to a physical object made usage automatic, and family is the hardest usability test there is: if a parent with shopping bags can't use it in three seconds, the design is wrong.",
      "La gente olvida las apps pero nunca olvida la nevera. Anclar el software a un objeto físico hizo el uso automático, y la familia es el test de usabilidad más duro que existe: si un padre con bolsas de la compra no puede usarla en tres segundos, el diseño está mal.",
      "La gent oblida les apps però mai oblida la nevera. Ancorar el software a un objecte físic va fer l'ús automàtic, i la família és el test d'usabilitat més dur que existeix: si un pare amb bosses de la compra no pot usar-la en tres segons, el disseny està malament."
    ),
    repo: "https://github.com/xavibosch/nevera-bosch",
    images: [IMG + "nevera-real-hero.jpg", IMG + "nevera-real.png"],
  },
  {
    id: "06",
    name: "Haptic Hunter",
    tagline: l(
      "A game you can play with your eyes closed.",
      "Un juego que puedes jugar con los ojos cerrados.",
      "Un joc que pots jugar amb els ulls tancats."
    ),
    description: l(
      "An accessible mobile game for everyone, including blind, deaf and low vision players. You hunt invisible signals using haptic feedback, dynamic sound, and minimal visuals. Designed so the same game works on any combination of senses.",
      "Un juego móvil accesible para todos, incluyendo jugadores ciegos, sordos y con baja visión. Cazas señales invisibles usando respuesta háptica, sonido dinámico y visuales mínimos. Diseñado para que el mismo juego funcione con cualquier combinación de sentidos.",
      "Un joc mòbil accessible per a tothom, incloent jugadors cecs, sords i amb baixa visió. Caces senyals invisibles fent servir resposta hàptica, so dinàmic i visuals mínims. Dissenyat perquè el mateix joc funcioni amb qualsevol combinació de sentits."
    ),
    role: l("Interaction + Accessibility", "Interacción + Accesibilidad", "Interacció + Accessibilitat"),
    context: l("Multisensory accessible game", "Juego accesible multisensorial", "Joc accessible multisensorial"),
    age: 18,
    tags: [l("Accessibility", "Accesibilidad", "Accessibilitat"), l("Haptics", "Háptica", "Hàptica")],
    tech: ["Core Haptics", "Spatial Audio", "Swift"],
    learning: l(
      "No simulator can tell you how a haptic feels. Physical playtesting was the only honest signal. Designing the redundant channel core first made accessibility a property of the system, not a feature bolted on.",
      "Ningún simulador puede decirte cómo se siente una vibración. Probar en físico era la única señal honesta. Diseñar primero el núcleo de canales redundantes hizo de la accesibilidad una propiedad del sistema, no una función añadida.",
      "Cap simulador pot dir-te com se sent una vibració. Provar en físic era l'únic senyal honest. Dissenyar primer el nucli de canals redundants va fer de l'accessibilitat una propietat del sistema, no una funció afegida."
    ),
    repo: "https://github.com/xavibosch/haptic-hunter",
    images: [IMG + "haptic-real-hero.jpg", IMG + "haptic-real-game.jpg", IMG + "haptic-real-accessibility.jpg"],
  },
  {
    id: "07",
    name: "Remote Robot Car",
    tagline: l(
      "One message travelling from a thumb to four wheels.",
      "Un mensaje viajando de un pulgar a cuatro ruedas.",
      "Un missatge viatjant d'un polze a quatre rodes."
    ),
    description: l(
      "A 4-wheel ESP32 robot car driven from any phone through a public MQTT broker, with an autonomous layer that brakes, reverses and beeps when the world gets too close. Public broker, private robot.",
      "Un coche robot de 4 ruedas con ESP32 conducido desde cualquier móvil a través de un broker MQTT público, con una capa autónoma que frena, retrocede y pita cuando el mundo se acerca demasiado. Broker público, robot privado.",
      "Un cotxe robot de 4 rodes amb ESP32 conduït des de qualsevol mòbil a través d'un broker MQTT públic, amb una capa autònoma que frena, retrocedeix i pita quan el món s'acosta massa. Broker públic, robot privat."
    ),
    role: l("Hardware + Systems", "Hardware + Sistemas", "Hardware + Sistemes"),
    context: l("La Salle · Electronics course", "La Salle · Asignatura de Electrónica", "La Salle · Assignatura d'Electrònica"),
    age: 18,
    tags: [l("Robotics", "Robótica", "Robòtica"), l("Systems", "Sistemas", "Sistemes")],
    tech: ["ESP32", "MQTT", "Ultrasonic"],
    learning: l(
      "Using broker.emqx.io removed a whole server from the project and taught real pub/sub architecture. Isolated component tests found in minutes what full-system debugging missed for hours.",
      "Usar broker.emqx.io eliminó un servidor entero del proyecto y enseñó arquitectura pub/sub real. Las pruebas aisladas de componentes encontraron en minutos lo que el debugging completo no vio en horas.",
      "Usar broker.emqx.io va eliminar un servidor sencer del projecte i va ensenyar arquitectura pub/sub real. Les proves aïllades de components van trobar en minuts el que el debugging complet no va veure en hores."
    ),
    repo: "https://github.com/xavibosch/remote-robot-car",
    video: "https://youtu.be/cBed9lY9uKQ",
    images: [IMG + "cotxe-hero.jpg", IMG + "cotxe-build.jpg", IMG + "cotxe-wiring.jpg", IMG + "cotxe-final.jpg"],
  },
  {
    id: "08",
    name: "laSallefy",
    tagline: l("No decoder: build the sound.", "Sin decodificador: crear el sonido.", "Sense descodificador: crear el so."),
    description: l(
      "A music player with no audio files: every song is a sequence of frequencies synthesized in real time by four custom wave engines, inside a strict layered architecture. An AlbumGenerator builds random albums filtered by mood and target length.",
      "Un reproductor de música sin archivos de audio: cada canción es una secuencia de frecuencias sintetizada en tiempo real por cuatro motores de onda propios, dentro de una arquitectura por capas estricta. Un AlbumGenerator crea álbumes aleatorios filtrados por mood y duración objetivo.",
      "Un reproductor de música sense fitxers d'àudio: cada cançó és una seqüència de freqüències sintetitzada en temps real per quatre motors d'ona propis, dins d'una arquitectura per capes estricta. Un AlbumGenerator crea àlbums aleatoris filtrats per mood i durada objectiu."
    ),
    role: l("Architecture + Engineering", "Arquitectura + Ingeniería", "Arquitectura + Enginyeria"),
    context: l("La Salle · OOP course (pair)", "La Salle · Asignatura de POO (en pareja)", "La Salle · Assignatura de POO (en parella)"),
    age: 18,
    tags: [l("Systems", "Sistemas", "Sistemes"), "Java"],
    tech: ["Java", "OOP", "DSP"],
    learning: l(
      "Built in pair for La Salle's OOP course. Strict layers made parallel work possible. Synthesizing sound from scratch forced a cleaner architecture than any file based player would have.",
      "Hecho en pareja para la asignatura de POO en La Salle. Las capas estrictas permitieron trabajar en paralelo. Sintetizar sonido desde cero obligó a una arquitectura más limpia de la que tendría cualquier reproductor basado en archivos.",
      "Fet en parella per a l'assignatura de POO a La Salle. Les capes estrictes van permetre treballar en paral·lel. Sintetitzar so des de zero va obligar a una arquitectura més neta de la que tindria qualsevol reproductor basat en fitxers."
    ),
    repo: "https://github.com/xavibosch/lasallefy-java",
    images: [IMG + "sallefy-hero.svg"],
  },
  {
    id: "09",
    name: "Gesture TV",
    tagline: l(
      "The remote was the barrier, so I removed it.",
      "El mando era la barrera, así que lo quité.",
      "El comandament era la barrera, així que el vaig treure."
    ),
    description: l(
      "I know someone who cannot use a television remote. The buttons are small, the presses are precise, and none of it was designed for their hands. Gesture TV replaces the remote entirely: a clap turns the television on, a hand held inside a screen zone opens Netflix or YouTube or moves through the menu, and local voice commands cover the rest. No remote, no phone, and no need to ask anyone for help.",
      "Conozco a una persona que no puede usar el mando de la televisión. Los botones son pequeños, las pulsaciones precisas, y nada de eso estaba pensado para sus manos. Gesture TV sustituye el mando por completo: una palmada enciende la televisión, la mano dentro de una zona de la pantalla abre Netflix o YouTube o se mueve por el menú, y los comandos de voz locales cubren el resto. Sin mando, sin móvil y sin tener que pedir ayuda a nadie.",
      "Conec una persona que no pot fer servir el comandament de la televisió. Els botons són petits, les pulsacions precises, i res d'això estava pensat per a les seves mans. Gesture TV substitueix el comandament del tot: una palmada encén la televisió, la mà dins d'una zona de la pantalla obre Netflix o YouTube o es mou pel menú, i les ordres de veu locals cobreixen la resta. Sense comandament, sense mòbil i sense haver de demanar ajuda a ningú."
    ),
    role: l("Interaction Design + Computer Vision", "Diseño de Interacción + Visión por Computador", "Disseny d'Interacció + Visió per Computador"),
    context: l("Hands free TV control", "Control de TV sin manos", "Control de TV sense mans"),
    age: 18,
    tags: [l("Accessibility", "Accesibilidad", "Accessibilitat"), l("Vision", "Visión", "Visió")],
    tech: ["Python", "OpenCV", "MediaPipe", "Vosk", "Wake on LAN"],
    learning: l(
      "Designing for one real person cuts every abstract debate short. The camera never writes a single frame to disk, because a system that watches someone's living room to give them independence cannot charge them their privacy for it. Refusing shell access to the television was the same decision: the safest version was also the easiest one to trust.",
      "Diseñar para una persona concreta corta de raíz cualquier debate abstracto. La cámara no guarda ni un solo fotograma, porque un sistema que mira el salón de alguien para darle independencia no puede cobrársela en privacidad. Renunciar al acceso de shell en la televisión fue la misma decisión: la versión más segura era también la más fácil de confiar.",
      "Dissenyar per a una persona concreta talla de rel qualsevol debat abstracte. La càmera no desa ni un sol fotograma, perquè un sistema que mira el menjador d'algú per donar-li independència no li pot cobrar la privacitat a canvi. Renunciar a l'accés de shell a la televisió va ser la mateixa decisió: la versió més segura era també la més fàcil de confiar."
    ),
    repo: "https://github.com/xavibosch/gesture-tv",
    images: [],
  },
];

export const techMarquee = [
  "Swift", "SwiftUI", "Python", "Ollama", "Arduino", "ESP32",
  "MQTT", "NFC", "Core Haptics", "Firestore", "Java", "macOS",
  "Interaction Design", "Systems Thinking", "Prototyping",
];
