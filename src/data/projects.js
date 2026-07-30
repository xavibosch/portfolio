import { jeffreyDeepDive, jeffreyRemoteDeepDive } from './jeffreyDeepDives'
import { betsyDeepDive, hapticHunterDeepDive, robotCarDeepDive, sallefyDeepDive, neveraDeepDive, wakeStationDeepDive } from './deepDives'

// All text fields support either a string OR a {en, es, ca} object.
// The `t()` helper in src/i18n.jsx picks the right locale.

export const projects = [
  {
    id: 1,
    title: 'Jeffrey',
    description: {
      en: 'A voice-first AI agent for macOS with 86 action tools, multi-model routing and local inference. It listens, reasons, acts across the system and speaks back in your language.',
      es: 'Un agente de IA por voz para macOS con 86 herramientas, enrutamiento multimodelo e inferencia local. Escucha, razona, actúa en el sistema y responde en tu idioma.',
      ca: 'Un agent d\'IA per veu per a macOS amb 86 eines, encaminament multimodel i inferència local. Escolta, raona, actua al sistema i respon en el teu idioma.',
    },
    tags: ['Voice AI', 'Python', 'AppleScript', 'Ollama'],
    media: { type: 'image', src: '/images/jeffrey.png' },
    deepDive: jeffreyDeepDive,
    link: 'https://github.com/xavibosch/jeffrey-ai-assistant',
    problem: {
      en: 'Every AI assistant I tried answered questions: none actually did anything. I wanted to feel the gap between "AI that talks" and "AI that acts" with my own hands.',
      es: 'Cada asistente de IA que probé respondía preguntas: ninguno hacía cosas. Quería sentir la diferencia entre "IA que habla" e "IA que actúa" con mis propias manos.',
      ca: 'Cada assistent d\'IA que vaig provar responia preguntes: cap feia coses. Volia sentir la diferència entre "IA que parla" i "IA que actua" amb les meves pròpies mans.',
    },
    idea: {
      en: 'Build a small agent loop: give the model basic tools (screenshot, click, type) and a goal. Let it observe its own results and decide the next step.',
      es: 'Construir un loop de agente pequeño: dar al modelo herramientas básicas (captura, clic, escribir) y un objetivo. Que observe sus resultados y decida el siguiente paso.',
      ca: 'Construir un loop d\'agent petit: donar al model eines bàsiques (captura, clic, escriure) i un objectiu. Que observi els seus resultats i decideixi el següent pas.',
    },
    execution: {
      en: 'Python core + screenshot tool + AppleScript bindings for the OS. Iterated tool definitions over and over: turns out the agent\'s ceiling is set by the tools, not the model.',
      es: 'Core en Python + herramienta de captura + AppleScript para el SO. Iteré definiciones de herramientas muchas veces: resultó que el techo del agente lo marcan las herramientas, no el modelo.',
      ca: 'Nucli en Python + eina de captura + AppleScript per al SO. Vaig iterar definicions d\'eines moltes vegades: el sostre de l\'agent el marquen les eines, no el model.',
    },
    learned: {
      en: 'The quality of tool design matters far more than model quality when AI is doing the acting, not just the answering.',
      es: 'La calidad del diseño de las herramientas importa mucho más que la calidad del modelo cuando la IA actúa, no solo responde.',
      ca: 'La qualitat del disseny de les eines importa molt més que la qualitat del model quan la IA actua, no només respon.',
    },
    gallery: [],
  },
  {
    id: 2,
    title: 'Betsy',
    description: {
      en: 'Social sports app where friends compete in private leagues using virtual points. Full product loop: betting, live leaderboard, and 1v1 arena duels.',
      es: 'App social de deportes donde amigos compiten en ligas privadas usando puntos virtuales. Loop de producto completo: apuestas, ranking en vivo y duelos 1v1.',
      ca: 'App social d\'esports on amics competeixen en lligues privades usant punts virtuals. Loop de producte complet: apostes, rànquing en directe i duels 1v1.',
    },
    tags: ['iOS', 'SwiftUI', 'Firebase', 'Product Design'],
    deepDive: betsyDeepDive,
    media: { type: 'image', src: '/images/betsy-real-hero.jpg' },
    link: 'https://github.com/xavibosch/betsy-ios',
    problem: {
      en: 'Group chats around football were chaotic: bets scribbled on Notes, who-said-what arguments after every match. Friends wanted competition without real money or a creepy gambling app.',
      es: 'Los chats de grupo sobre fútbol eran un caos: apuestas en Notas, peleas de quién-dijo-qué después de cada partido. Los amigos querían competir sin dinero real ni una app de apuestas turbia.',
      ca: 'Els xats de grup sobre futbol eren un caos: apostes a Notes, baralles de qui-va-dir-què després de cada partit. Els amics volien competir sense diners reals ni una app d\'apostes terbola.',
    },
    idea: {
      en: 'A closed-circle app with virtual points only. Private leagues. Real fixtures. Pride as the only currency. Plus a 1v1 arena for direct head-to-head matches.',
      es: 'Una app de círculo cerrado con solo puntos virtuales. Ligas privadas. Partidos reales. El orgullo como única moneda. Más un arena 1v1 para enfrentamientos directos.',
      ca: 'Una app de cercle tancat amb només punts virtuals. Lligues privades. Partits reals. L\'orgull com a única moneda. A més una arena 1v1 per a enfrontaments directes.',
    },
    execution: {
      en: 'SwiftUI front-end + Firebase backend (Auth, Firestore, Functions). Built the league logic, ranking system, and arena duels in parallel: backend changes constantly broke UI assumptions and vice versa.',
      es: 'Frontend SwiftUI + backend Firebase (Auth, Firestore, Functions). Construí la lógica de liga, ranking y duelos en paralelo: los cambios de backend rompían constantemente supuestos de UI y al revés.',
      ca: 'Frontend SwiftUI + backend Firebase (Auth, Firestore, Functions). Vaig construir la lògica de lliga, rànquing i duels en paral·lel: els canvis de backend trencaven constantment supòsits de UI i a l\'inrevés.',
    },
    learned: {
      en: 'Building real backend + real UI together at the same time reveals product problems that no wireframe ever shows.',
      es: 'Construir backend real + UI real a la vez revela problemas de producto que ningún wireframe muestra nunca.',
      ca: 'Construir backend real + UI real alhora revela problemes de producte que cap wireframe mostra mai.',
    },
    gallery: [
      { src: '/images/betsy-real-league.png', caption: { en: 'Private league screen in the real iOS app', es: 'Pantalla de liga privada en la app iOS real', ca: 'Pantalla de lliga privada a l\'app iOS real' } },
      { src: '/images/betsy-real-markets.png', caption: { en: 'Live sports markets and virtual point odds', es: 'Mercados deportivos y cuotas con puntos virtuales', ca: 'Mercats esportius i quotes amb punts virtuals' } },
      { src: '/images/betsy-real-betslip.png', caption: { en: 'Native bet slip and selection flow', es: 'Boleto nativo y flujo de selecciones', ca: 'Butlleta nativa i flux de seleccions' } },
    ],
  },
  {
    id: 3,
    title: 'Jeffrey Remote',
    description: {
      en: 'A native iOS control surface for Jeffrey and the Mac. Live preview, cursor, commands, media, apps and voice over a resilient direct connection.',
      es: 'Una superficie nativa iOS para controlar Jeffrey y el Mac. Vista en vivo, cursor, comandos, multimedia, apps y voz mediante una conexión directa y resiliente.',
      ca: 'Una superfície nativa iOS per controlar Jeffrey i el Mac. Vista en directe, cursor, ordres, multimèdia, apps i veu mitjançant una connexió directa i resilient.',
    },
    tags: ['iOS', 'SwiftUI', 'Network.framework', 'Remote Control'],
    media: { type: 'image', src: '/images/jeffrey-remote.png' },
    deepDive: jeffreyRemoteDeepDive,
    link: 'https://github.com/xavibosch/jeffrey-remote',
    problem: {
      en: 'Jeffrey ran fine on one Mac: but the most useful agent moments are when you\'re away from the computer. Calling it from a phone meant trusting it on a machine you can\'t see.',
      es: 'Jeffrey funcionaba bien en un Mac: pero los momentos más útiles del agente son cuando no estás delante. Llamarlo desde el móvil significaba confiar en una máquina que no ves.',
      ca: 'Jeffrey funcionava bé en un Mac: però els moments més útils de l\'agent són quan no ets davant. Trucar-lo des del mòbil significava confiar en una màquina que no veus.',
    },
    idea: {
      en: 'Split Jeffrey into a remote control surface (phone) and an executor (computer) over a secure channel. Make the trust loop visible: live screenshot stream + action verification.',
      es: 'Dividir Jeffrey en una superficie de control remoto (móvil) y un ejecutor (ordenador) por canal seguro. Hacer visible el loop de confianza: stream de capturas + verificación de acciones.',
      ca: 'Dividir Jeffrey en una superfície de control remot (mòbil) i un executor (ordinador) per canal segur. Fer visible el cicle de confiança: streaming de captures + verificació d\'accions.',
    },
    execution: {
      en: 'Native SwiftUI app using Network.framework, Bonjour discovery and a direct TCP/JSON bridge. It supports Wi-Fi, Personal Hotspot and Tailscale, with health checks, reconnection and task-specific timeouts.',
      es: 'App nativa SwiftUI con Network.framework, descubrimiento Bonjour y un puente directo TCP/JSON. Funciona por Wi-Fi, Punto de acceso y Tailscale, con health checks, reconexión y timeouts por tarea.',
      ca: 'App nativa SwiftUI amb Network.framework, descobriment Bonjour i un pont directe TCP/JSON. Funciona per Wi-Fi, Punt d\'accés i Tailscale, amb health checks, reconnexió i timeouts per tasca.',
    },
    learned: {
      en: 'Distributing an AI agent across machines breaks more assumptions than it fixes. Most agent UX problems only appear when the action and the operator are in different rooms.',
      es: 'Distribuir un agente de IA entre máquinas rompe más supuestos de los que arregla. La mayoría de problemas de UX agéntica solo aparecen cuando la acción y el operador están en habitaciones distintas.',
      ca: 'Distribuir un agent d\'IA entre màquines trenca més supòsits dels que arregla. La majoria de problemes d\'UX agèntica només apareixen quan l\'acció i l\'operador són en habitacions diferents.',
    },
    gallery: [
      {
        src: '/images/jeffrey-remote-controls.webp',
        caption: {
          en: 'Control Deck: commands, workspaces and Mac power controls',
          es: 'Panel de control: comandos, espacios de trabajo y energía del Mac',
          ca: 'Tauler de control: ordres, espais de treball i energia del Mac',
        },
      },
      {
        src: '/images/jeffrey-remote-apps.webp',
        caption: {
          en: 'Launch Board: searchable apps and curated workspaces',
          es: 'Panel de apps: búsqueda y espacios de trabajo seleccionados',
          ca: 'Tauler d\'apps: cerca i espais de treball seleccionats',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Haptic Hunter',
    description: {
      en: 'An accessible mobile game for everyone: including blind, deaf, and low-vision players. You hunt invisible signals using haptic feedback, dynamic sound, and minimal visuals. Designed so the same game works on any combination of senses.',
      es: 'Un juego móvil accesible para todos: incluyendo personas ciegas, sordas y con baja visión. Cazas señales invisibles usando respuesta háptica, sonido dinámico y visuales mínimos. Diseñado para que el mismo juego funcione con cualquier combinación de sentidos.',
      ca: 'Un joc mòbil accessible per a tothom: incloent persones cegues, sordes i amb baixa visió. Caces senyals invisibles fent servir resposta hàptica, so dinàmic i visuals mínims. Dissenyat perquè el mateix joc funcioni amb qualsevol combinació de sentits.',
    },
    tags: ['Accessibility', 'Haptics', 'Game', 'Inclusive'],
    deepDive: hapticHunterDeepDive,
    media: { type: 'image', src: '/images/haptic-real-hero.jpg' },
    link: 'https://github.com/xavibosch/haptic-hunter',
    problem: {
      en: 'Most mobile games assume players can see, hear, and tap with full vision. Blind, deaf, and low-vision people get locked out of entire categories of casual gaming, and apps that do include them usually feel like a stripped-down "accessibility mode" bolted on top.',
      es: 'La mayoría de juegos móviles asumen que el jugador ve, oye y toca con visión completa. Las personas ciegas, sordas y con baja visión quedan fuera de categorías enteras de gaming casual, y las apps que las incluyen suelen sentirse como un "modo accesibilidad" recortado y añadido por encima.',
      ca: 'La majoria de jocs mòbils assumeixen que el jugador veu, sent i toca amb visió completa. Les persones cegues, sordes i amb baixa visió queden fora de categories senceres de gaming casual, i les apps que les inclouen solen sentir-se com un "mode accessibilitat" retallat afegit a sobre.',
    },
    idea: {
      en: 'Build a game where every signal: direction, distance, hit, miss, signal lost: can be carried by haptics, sound, OR visuals independently. The same gameplay works for blind, deaf, low-vision, or fully-sighted players. Accessibility isn\'t a mode, it\'s the architecture.',
      es: 'Construir un juego donde cada señal: dirección, distancia, acierto, fallo, señal perdida: se pueda transmitir por haptics, sonido O visuales de forma independiente. El mismo gameplay funciona para personas ciegas, sordas, con baja visión o con visión completa. La accesibilidad no es un modo, es la arquitectura.',
      ca: 'Construir un joc on cada senyal: direcció, distància, encert, fallada, senyal perduda: es pugui transmetre per haptics, so O visuals de manera independent. El mateix gameplay funciona per a persones cegues, sordes, amb baixa visió o amb visió completa. L\'accessibilitat no és un mode, és l\'arquitectura.',
    },
    execution: {
      en: 'SwiftUI + Core Haptics + AVAudio. Three parallel feedback layers (touch, sound, sight) carry the exact same information. Players turn off whatever they don\'t need. Includes Blind mode (no visuals), Visual mode (no audio), Precision mode, and a Daily Challenge with Game Center leaderboards.',
      es: 'SwiftUI + Core Haptics + AVAudio. Tres capas paralelas de feedback (tacto, sonido, vista) llevan exactamente la misma información. Cada jugador apaga la que no necesite. Incluye modo Ciego (sin visuales), modo Visual (sin audio), modo Precisión, y un Daily Challenge con leaderboards en Game Center.',
      ca: 'SwiftUI + Core Haptics + AVAudio. Tres capes paral·leles de feedback (tacte, so, vista) porten exactament la mateixa informació. Cada jugador apaga la que no necessita. Inclou mode Cec (sense visuals), mode Visual (sense àudio), mode Precisió, i un Daily Challenge amb leaderboards a Game Center.',
    },
    learned: {
      en: 'Designing for accessibility from day one doesn\'t limit a product: it forces clarity. The version that works for deaf, blind, and low-vision players became the cleanest version for everyone.',
      es: 'Diseñar pensando en accesibilidad desde el primer día no limita el producto: obliga a tener claridad. La versión que funciona para personas sordas, ciegas y con baja visión se convirtió en la versión más clara para todos.',
      ca: 'Dissenyar pensant en accessibilitat des del primer dia no limita el producte: obliga a tenir claredat. La versió que funciona per a persones sordes, cegues i amb baixa visió va esdevenir la versió més clara per a tothom.',
    },
    gallery: [
      { src: '/images/haptic-real-game.jpg', caption: { en: 'Real hunt screen from the native iOS game', es: 'Pantalla real de caza del juego nativo iOS', ca: 'Pantalla real de caça del joc natiu iOS' } },
      { src: '/images/haptic-real-accessibility.jpg', caption: { en: 'The same signal represented through three sensory layers', es: 'La misma señal representada con tres capas sensoriales', ca: 'El mateix senyal representat amb tres capes sensorials' } },
    ],
  },
  {
    id: 5,
    title: 'Jeffrey Wake Station',
    description: {
      en: 'A physical control station that turns motion, sound and a real button into instant Mac routines through Arduino, serial and AppleScript.',
      es: 'Una estación de control física que convierte movimiento, sonido y un botón real en rutinas instantáneas del Mac mediante Arduino, serial y AppleScript.',
      ca: 'Una estació de control física que converteix moviment, so i un botó real en rutines instantànies del Mac mitjançant Arduino, sèrie i AppleScript.',
    },
    tags: ['Arduino MEGA', 'Sensors', 'Serial', 'AppleScript'],
    media: { type: 'image', src: '/images/sensor-workspace.png' },
    deepDive: wakeStationDeepDive,
    link: 'https://github.com/xavibosch/jeffrey-wake-station',
    problem: {
      en: 'Daily workflow context lived inside the laptop: apps, tabs, focus modes. The desk around it stayed dumb. Switching from "writing mode" to "coding mode" was always a manual chore.',
      es: 'El contexto de trabajo vivía dentro del portátil: apps, pestañas, modos de foco. El escritorio alrededor era tonto. Cambiar de "modo escribir" a "modo programar" era siempre manual.',
      ca: 'El context de treball vivia dins del portàtil: apps, pestanyes, modes de focus. L\'escriptori al voltant era ximple. Canviar de "mode escriure" a "mode programar" era sempre manual.',
    },
    idea: {
      en: 'Use physical sensors (clap, motion, button) as triggers for full workspace presets. One gesture → 4 apps open, music starts, desktops re-arrange.',
      es: 'Usar sensores físicos (palmada, movimiento, botón) como triggers para presets de workspace completos. Un gesto → 4 apps abiertas, música suena, escritorios reordenados.',
      ca: 'Fer servir sensors físics (palmellada, moviment, botó) com a triggers per a presets de workspace complets. Un gest → 4 apps obertes, música sona, escriptoris reordenats.',
    },
    execution: {
      en: 'Arduino MEGA + PIR + sound sensor + physical trigger button → serial → Mac listener service → AppleScript routines. End-to-end latency under 200ms after tuning.',
      es: 'Arduino MEGA + PIR + sensor de sonido + botón físico → serial → servicio escucha en Mac → rutinas AppleScript. Latencia end-to-end por debajo de 200ms tras ajustar.',
      ca: 'Arduino MEGA + PIR + sensor de so + botó físic → sèrie → servei d\'escolta al Mac → rutines AppleScript. Latència end-to-end per sota de 200ms després d\'ajustar.',
    },
    learned: {
      en: 'When physical sensors drive software, latency stops being an engineering metric and becomes a UX one. Anything above 200ms between gesture and screen breaks immersion completely.',
      es: 'Cuando los sensores físicos controlan el software, la latencia deja de ser una métrica de ingeniería y pasa a ser una de UX. Cualquier cosa por encima de 200ms entre gesto y pantalla rompe la inmersión por completo.',
      ca: 'Quan els sensors físics controlen el software, la latència deixa de ser una mètrica d\'enginyeria i passa a ser una d\'UX. Qualsevol cosa per damunt de 200ms entre gest i pantalla trenca la immersió completament.',
    },
    gallery: [
      { src: '/images/sensor-workspace.png', caption: { en: 'Original system image showing the hardware to Mac workflow', es: 'Imagen original del sistema y el flujo del hardware al Mac', ca: 'Imatge original del sistema i el flux del hardware al Mac' } },
    ],
  },
  {
    id: 6,
    title: 'Remote Robot Car',
    description: {
      en: 'A 4-wheel ESP32 robot car controlled from a phone over MQTT, with autonomous obstacle avoidance via ultrasonic sensor. Built from scratch with a teammate for the Electronics course at La Salle.',
      es: 'Un coche robot de 4 ruedas con ESP32 controlado desde el móvil por MQTT, con evasión autónoma de obstáculos mediante sensor de ultrasonidos. Construido desde cero con un compañero para la asignatura de Electrónica en La Salle.',
      ca: 'Un cotxe robot de 4 rodes amb ESP32 controlat des del mòbil per MQTT, amb evasió autònoma d\'obstacles mitjançant sensor d\'ultrasons. Construït des de zero amb un company per a l\'assignatura d\'Electrònica a La Salle.',
    },
    tags: ['ESP32', 'MQTT', 'Embedded', 'Hardware', 'Arduino'],
    deepDive: robotCarDeepDive,
    media: { type: 'image', src: '/images/cotxe-hero.jpg' },
    link: 'https://github.com/xavibosch/remote-robot-car',
    demoLink: 'https://youtu.be/cBed9lY9uKQ',
    problem: {
      en: 'A standard kit car only does what you wire it to do. We wanted a system where the same vehicle could be driven remotely AND react on its own: without depending on a personal server or a fragile prototype-grade hack.',
      es: 'Un coche de kit estándar solo hace lo que cables. Queríamos un sistema donde el mismo vehículo pudiera ser conducido a distancia Y reaccionara solo: sin depender de un servidor propio ni de un montaje frágil de prototipo.',
      ca: 'Un cotxe de kit estàndard només fa allò que cablejes. Volíem un sistema on el mateix vehicle es pogués conduir a distància I reaccionés sol: sense dependre d\'un servidor propi ni d\'un muntatge fràgil de prototip.',
    },
    idea: {
      en: 'ESP32 as the brain, communicating via a public MQTT broker so any phone with the MyMQTT app becomes a controller. Layer an autonomous safety behaviour on top: ultrasonic sensor, automatic stop and backup when an obstacle is detected, audible warning via buzzer.',
      es: 'El ESP32 como cerebro, comunicándose a través de un broker MQTT público para que cualquier móvil con la app MyMQTT se convierta en mando. Encima, un comportamiento autónomo de seguridad: sensor de ultrasonidos, parada y marcha atrás automáticas al detectar obstáculo, aviso sonoro con buzzer.',
      ca: 'L\'ESP32 com a cervell, comunicant-se a través d\'un broker MQTT públic perquè qualsevol mòbil amb l\'app MyMQTT esdevingui un comandament. A sobre, un comportament autònom de seguretat: sensor d\'ultrasons, parada i marxa enrere automàtiques en detectar obstacle, avís sonor amb buzzer.',
    },
    execution: {
      en: 'ESP32 + L298N H-bridge driving 4 DC motors with PWM speed control (slow/normal/fast/turbo). HC-SR04 ultrasonic sensor at 50ms cycles with a 3-reading filter to ignore electrical noise. WiFi + MQTT over broker.emqx.io on topic casa/esp32/car. The hardest part was hardware: brownout resets from motor current spikes, ghost cables, and a sensor that detected obstacles that did not exist: all fixed by isolating components one at a time.',
      es: 'ESP32 + puente H L298N controlando 4 motores DC con velocidad PWM (slow/normal/fast/turbo). Sensor HC-SR04 a ciclos de 50ms con un filtro de 3 lecturas para ignorar el ruido eléctrico. WiFi + MQTT sobre broker.emqx.io en el topic casa/esp32/car. La parte más dura fue el hardware: resets por brownout debido a picos de corriente de los motores, cables fantasma y un sensor que detectaba obstáculos inexistentes: todo arreglado aislando componentes uno a uno.',
      ca: 'ESP32 + pont H L298N controlant 4 motors DC amb velocitat PWM (slow/normal/fast/turbo). Sensor HC-SR04 a cicles de 50ms amb un filtre de 3 lectures per ignorar el soroll elèctric. WiFi + MQTT sobre broker.emqx.io al topic casa/esp32/car. La part més dura va ser el hardware: resets per brownout deguts a pics de corrent dels motors, cables fantasma i un sensor que detectava obstacles inexistents: tot arreglat aïllant components un a un.',
    },
    learned: {
      en: 'Most of our bugs were not in the code: they were in the wiring, the power rails, and the assumptions about how each component actually behaves. Before touching software, verify cables, ground, and supply.',
      es: 'La mayoría de nuestros bugs no estaban en el código: estaban en el cableado, los raíles de alimentación y las suposiciones sobre cómo se comporta realmente cada componente. Antes de tocar el software, verifica cables, masa y alimentación.',
      ca: 'La majoria dels nostres bugs no eren al codi: eren al cablejat, als rails d\'alimentació i a les suposicions sobre com es comporta realment cada component. Abans de tocar el software, verifica cables, massa i alimentació.',
    },
    gallery: [
      { src: '/images/cotxe-build.jpg', caption: { en: 'Mid-build: wiring the H-bridge', es: 'A mitad de montaje: cableando el puente H', ca: 'A mig muntatge: cablejant el pont H' } },
      { src: '/images/cotxe-wiring.jpg', caption: { en: 'L298N driver mounted, motors connected', es: 'Driver L298N montado, motores conectados', ca: 'Driver L298N muntat, motors connectats' } },
      { src: '/images/cotxe-final.jpg', caption: { en: 'Final assembly with 12V battery', es: 'Montaje final con batería de 12V', ca: 'Muntatge final amb bateria de 12V' } },
    ],
  },
  {
    id: 7,
    title: 'laSallefy',
    description: {
      en: 'A console-based music player written in Java that generates audio in real time with its own synthesizer: no MP3s, no WAVs. Architected with classic layered OOP (View → Controller → Manager → DAO) and four custom waveform synths.',
      es: 'Un reproductor musical de consola en Java que genera audio en tiempo real con su propio sintetizador: sin MP3 ni WAV. Arquitectura clásica por capas POO (View → Controller → Manager → DAO) y cuatro sintetizadores de onda propios.',
      ca: 'Un reproductor musical de consola en Java que genera àudio en temps real amb el seu propi sintetitzador: sense MP3 ni WAV. Arquitectura clàssica per capes POO (View → Controller → Manager → DAO) i quatre sintetitzadors d\'ona propis.',
    },
    tags: ['Java', 'OOP', 'Audio Synthesis', 'GRASP', 'JSON'],
    deepDive: sallefyDeepDive,
    media: { type: 'image', src: '/images/sallefy-hero.svg' },
    link: 'https://github.com/xavibosch/lasallefy-java',
    problem: {
      en: 'Most student music projects either reuse audio files or wrap an existing library. We wanted to understand what a player actually does at the lowest level: how sound becomes a waveform, how a waveform becomes a sample, how a sample reaches the speakers.',
      es: 'La mayoría de proyectos de música de estudiantes reutilizan archivos de audio o envuelven una librería existente. Queríamos entender qué hace de verdad un reproductor en el nivel más bajo: cómo el sonido se vuelve onda, cómo una onda se vuelve sample, cómo un sample llega a los altavoces.',
      ca: 'La majoria de projectes de música d\'estudiants reutilitzen fitxers d\'àudio o envolten una llibreria existent. Volíem entendre què fa de debò un reproductor al nivell més baix: com el so esdevé ona, com una ona esdevé sample, com un sample arriba als altaveus.',
    },
    idea: {
      en: 'Build a Spotify-shaped console app, but with a synthesizer engine instead of an audio decoder. Each song is a sequence of (frequency, duration, timbre) triplets. Four interchangeable synths (sine, square, triangle, sawtooth) generate the sound via javax.sound.sampled, and Gson persists everything as JSON.',
      es: 'Construir una app de consola con forma de Spotify, pero con un motor de sintetizador en vez de un decodificador de audio. Cada canción es una secuencia de tripletas (frecuencia, duración, timbre). Cuatro sintetizadores intercambiables (seno, cuadrada, triangular, sierra) generan el sonido por javax.sound.sampled, y Gson persiste todo en JSON.',
      ca: 'Construir una app de consola amb forma de Spotify, però amb un motor de sintetitzador en lloc d\'un descodificador d\'àudio. Cada cançó és una seqüència de tripletes (freqüència, durada, timbre). Quatre sintetitzadors intercanviables (sinus, quadrada, triangular, dent de serra) generen el so per javax.sound.sampled, i Gson persisteix tot en JSON.',
    },
    execution: {
      en: 'Strict layered architecture in Java 17: View, Controller, Manager, DAO, Model, plus a separate synth package with an abstract SoundSynth class and four concrete subclasses. GRASP principles applied throughout: Information Expert, Creator, Controller, Low Coupling. Library management, playlists, mood-based random album generation, all persisted in JSON via Gson. Built in a team of two for La Salle\'s OOP course.',
      es: 'Arquitectura estricta por capas en Java 17: View, Controller, Manager, DAO, Model, más un paquete synth aparte con una clase abstracta SoundSynth y cuatro subclases concretas. Principios GRASP aplicados: Information Expert, Creator, Controller, Low Coupling. Gestión de biblioteca, playlists, generación de álbumes aleatorios por mood, todo persistido en JSON con Gson. Hecho en equipo de dos para la asignatura de POO en La Salle.',
      ca: 'Arquitectura estricta per capes en Java 17: View, Controller, Manager, DAO, Model, més un paquet synth a part amb una classe abstracta SoundSynth i quatre subclasses concretes. Principis GRASP aplicats: Information Expert, Creator, Controller, Low Coupling. Gestió de biblioteca, playlists, generació d\'àlbums aleatoris per mood, tot persistit en JSON amb Gson. Fet en equip de dos per a l\'assignatura de POO a La Salle.',
    },
    learned: {
      en: 'Layered architecture is not academic ceremony: it is what lets a small team work in parallel without breaking each other\'s code. Every shortcut around the layers costs more in debugging than it saves in keystrokes.',
      es: 'La arquitectura por capas no es ceremonia académica: es lo que permite a un equipo pequeño trabajar en paralelo sin romperse el código mutuamente. Cada atajo saltándose las capas cuesta más en debugging del que ahorra en pulsaciones.',
      ca: 'L\'arquitectura per capes no és cerimònia acadèmica: és el que permet a un equip petit treballar en paral·lel sense trencar-se el codi mútuament. Cada drecera saltant-se les capes costa més en depuració del que estalvia en pulsacions.',
    },
    gallery: [],
  },
  {
    id: 8,
    title: 'Nevera Bosch',
    description: {
      en: 'A family shopping list that lives on the fridge: tap your phone on an NFC sticker and the shared list opens instantly. React PWA + Firebase realtime sync, used daily by my family.',
      es: 'Una lista de la compra familiar que vive en la nevera: acercas el móvil a una pegatina NFC y la lista compartida se abre al instante. PWA en React + sync en tiempo real con Firebase, usada a diario por mi familia.',
      ca: 'Una llista de la compra familiar que viu a la nevera: acostes el mòbil a un adhesiu NFC i la llista compartida s\'obre a l\'instant. PWA en React + sync en temps real amb Firebase, usada cada dia per la meva família.',
    },
    tags: ['PWA', 'React', 'Firebase', 'NFC', 'UX'],
    media: { type: 'image', src: '/images/nevera-real-hero.jpg' },
    deepDive: neveraDeepDive,
    link: 'https://github.com/xavibosch/nevera-bosch',
    problem: {
      en: 'Our family shopping list lived in a group chat, on paper, and in four different heads at once. Things got bought twice or not at all, and no shared-list app survived the family\'s patience for logins and navigation.',
      es: 'Nuestra lista de la compra vivía en un chat de grupo, en papel y en cuatro cabezas a la vez. Las cosas se compraban dos veces o ninguna, y ninguna app de listas sobrevivió a la paciencia de la familia con logins y menús.',
      ca: 'La nostra llista de la compra vivia en un xat de grup, en paper i en quatre caps alhora. Les coses es compraven dues vegades o cap, i cap app de llistes va sobreviure a la paciència de la família amb logins i menús.',
    },
    idea: {
      en: 'Put the trigger where the need appears: an NFC sticker on the fridge door. Tap it and one shared realtime list opens: no accounts, just a short family PIN. If using it takes more than three seconds, it has failed.',
      es: 'Poner el disparador donde surge la necesidad: una pegatina NFC en la puerta de la nevera. La tocas y se abre una única lista compartida en tiempo real: sin cuentas, solo un PIN familiar corto. Si usarla lleva más de tres segundos, ha fallado.',
      ca: 'Posar el disparador on sorgeix la necessitat: un adhesiu NFC a la porta de la nevera. El toques i s\'obre una única llista compartida en temps real: sense comptes, només un PIN familiar curt. Si usar-la costa més de tres segons, ha fallat.',
    },
    execution: {
      en: 'Vite + React PWA installed to each phone\'s home screen, Firestore for realtime sync with security rules, and an NFC tag programmed with the app URL. Frequent items are one tap away; checked items vanish for everyone simultaneously mid-shop.',
      es: 'PWA en Vite + React instalada en la pantalla de inicio de cada móvil, Firestore para el sync en tiempo real con reglas de seguridad, y una etiqueta NFC programada con la URL. Los productos frecuentes están a un toque; los marcados desaparecen para todos a la vez en plena compra.',
      ca: 'PWA en Vite + React instal·lada a la pantalla d\'inici de cada mòbil, Firestore per al sync en temps real amb regles de seguretat, i una etiqueta NFC programada amb l\'URL. Els productes freqüents són a un toc; els marcats desapareixen per a tothom alhora en plena compra.',
    },
    learned: {
      en: 'Anchoring software to a physical object made usage automatic: nobody forgets the fridge. And family is the hardest usability test there is: every removed step multiplied real adoption.',
      es: 'Anclar el software a un objeto físico hizo el uso automático: nadie olvida la nevera. Y la familia es el test de usabilidad más duro que existe: cada paso eliminado multiplicó la adopción real.',
      ca: 'Ancorar el software a un objecte físic va fer l\'ús automàtic: ningú oblida la nevera. I la família és el test d\'usabilitat més dur que existeix: cada pas eliminat va multiplicar l\'adopció real.',
    },
    gallery: [
      { src: '/images/nevera-real.png', caption: { en: 'Real PWA interface used by the family', es: 'Interfaz real de la PWA usada por la familia', ca: 'Interfície real de la PWA usada per la família' } },
    ],
  },
]

export const person = {
  name:     'Xavi Bosch',
  role: {
    en: 'Interactive Product Design',
    es: 'Diseño de Productos Interactivos',
    ca: 'Disseny de Productes Interactius',
  },
  headline: {
    en: 'A student exploring the intersection of design, technology, and the future.',
    es: 'Estudiante explorando la intersección entre diseño, tecnología y futuro.',
    ca: 'Estudiant explorant la intersecció entre disseny, tecnologia i futur.',
  },
  subtext: {
    en: 'Curious student exploring how ideas become real through fast prototyping and iteration.',
    es: 'Estudiante curioso explorando cómo las ideas se vuelven reales mediante prototipado e iteración rápida.',
    ca: 'Estudiant curiós explorant com les idees es tornen reals mitjançant prototipat i iteració ràpida.',
  },
  email:    'bosch.xavii@gmail.com',
  phone:    '+34 686 585 368',
  github:   'https://github.com/xavibosch',
  twitter:  null,
  linkedin: 'https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410',
  school: {
    name: 'La Salle · URL Barcelona',
    program: {
      en: 'Design & Creation of Interactive Products',
      es: 'Diseño y Creación de Productos Interactivos',
      ca: 'Disseny i Creació de Productes Interactius',
    },
    url: 'https://www.salleurl.edu/en/education/bachelor-design-and-creation-interactive-products-minor-video-games',
  },
  gallery: [
    { label: 'Event',        src: '/images/about-event.jpg', asciiSrc: '/images/about-event-ascii.svg', caption: { en: 'Networking · Barcelona', es: 'Networking · Barcelona', ca: 'Networking · Barcelona' } },
    { label: 'Coding',       src: '/images/about-coding.jpg',    caption: { en: 'Building Haptic Hunter', es: 'Construyendo Haptic Hunter', ca: 'Construint Haptic Hunter' } },
    { label: 'Cambridge C1', src: '/images/about-cambridge.jpg', caption: { en: 'English · C1 Advanced',  es: 'Inglés · C1 Advanced',       ca: 'Anglès · C1 Advanced' } },
  ],
}
