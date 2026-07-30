const l = (en, es, ca) => ({ en, es, ca })

export const jeffreyDeepDive = {
  accent: '#67e8f9',
  eyebrow: l('VOICE-FIRST MAC AGENT', 'AGENTE DE MAC POR VOZ', 'AGENT DE MAC PER VEU'),
  statement: l(
    'A personal AI system that does not stop at an answer. Jeffrey listens, chooses a route, calls the right tool, executes on macOS and reports back in the user\'s language.',
    'Un sistema de IA personal que no se detiene en una respuesta. Jeffrey escucha, elige una ruta, llama a la herramienta adecuada, ejecuta en macOS y responde en el idioma del usuario.',
    'Un sistema d\'IA personal que no s\'atura en una resposta. Jeffrey escolta, tria una ruta, crida l\'eina adequada, executa a macOS i respon en l\'idioma de l\'usuari.'
  ),
  stats: [
    { value: '86', label: l('ACTION TOOLS', 'HERRAMIENTAS', 'EINES D\'ACCIÓ'), detail: l('From files and apps to media, web and developer workflows.', 'Desde archivos y apps hasta multimedia, web y flujos de desarrollo.', 'Des de fitxers i apps fins a multimèdia, web i fluxos de desenvolupament.') },
    { value: '3', label: l('INFERENCE ROUTES', 'RUTAS DE INFERENCIA', 'RUTES D\'INFERÈNCIA'), detail: l('NVIDIA NIM, Gemini and local Ollama fallback.', 'NVIDIA NIM, Gemini y respaldo local con Ollama.', 'NVIDIA NIM, Gemini i suport local amb Ollama.') },
    { value: '10', label: l('MEMORY TURNS', 'TURNOS DE MEMORIA', 'TORNS DE MEMÒRIA'), detail: l('A bounded context tuned for fast voice interaction.', 'Contexto acotado para una interacción por voz rápida.', 'Context acotat per a una interacció per veu ràpida.') },
    { value: '1', label: l('AGENT LOOP', 'CICLO DE AGENTE', 'CICLE D\'AGENT'), detail: l('Observe, decide, act, verify and speak.', 'Observar, decidir, actuar, verificar y hablar.', 'Observar, decidir, actuar, verificar i parlar.') },
  ],
  flowTitle: l('From intention to action', 'De la intención a la acción', 'De la intenció a l\'acció'),
  flowLead: l('The experience is one sentence. Underneath, five systems coordinate every request.', 'La experiencia es una frase. Por debajo, cinco sistemas coordinan cada petición.', 'L\'experiència és una frase. Per sota, cinc sistemes coordinen cada petició.'),
  flow: [
    { number: '01', title: l('Listen', 'Escuchar', 'Escoltar'), body: l('Silence-aware recording captures the request; Whisper turns it into text.', 'La grabación con detección de silencio captura la petición; Whisper la convierte en texto.', 'La gravació amb detecció de silenci captura la petició; Whisper la converteix en text.') },
    { number: '02', title: l('Route', 'Enrutar', 'Encaminar'), body: l('The brain selects cloud or local inference according to availability and task.', 'El cerebro selecciona inferencia cloud o local según disponibilidad y tarea.', 'El cervell selecciona inferència cloud o local segons disponibilitat i tasca.') },
    { number: '03', title: l('Act', 'Actuar', 'Actuar'), body: l('A structured function call enters an 86-tool registry built for macOS.', 'Una llamada estructurada entra en un registro de 86 herramientas para macOS.', 'Una crida estructurada entra en un registre de 86 eines per a macOS.') },
    { number: '04', title: l('Verify', 'Verificar', 'Verificar'), body: l('The result returns to the orchestrator; complex output is summarized when useful.', 'El resultado vuelve al orquestador; la salida compleja se resume cuando aporta valor.', 'El resultat torna a l\'orquestrador; la sortida complexa es resumeix quan aporta valor.') },
    { number: '05', title: l('Speak', 'Responder', 'Respondre'), body: l('Language-aware macOS voices close the loop and memory stores the turn.', 'Las voces de macOS adaptadas al idioma cierran el ciclo y guardan el turno.', 'Les veus de macOS adaptades a l\'idioma tanquen el cicle i guarden el torn.') },
  ],
  capabilitiesTitle: l('One assistant, many surfaces', 'Un asistente, muchas superficies', 'Un assistent, moltes superfícies'),
  capabilitiesLead: l('The tool layer is the product: every capability is explicit, inspectable and replaceable.', 'La capa de herramientas es el producto: cada capacidad es explícita, inspeccionable y reemplazable.', 'La capa d\'eines és el producte: cada capacitat és explícita, inspeccionable i reemplaçable.'),
  capabilities: [
    { title: l('Mac control', 'Control del Mac', 'Control del Mac'), body: l('Open apps, route desktops, arrange windows, type, click, lock or keep the Mac awake.', 'Abrir apps, mover escritorios, ordenar ventanas, escribir, hacer clic, bloquear o mantener el Mac activo.', 'Obrir apps, moure escriptoris, ordenar finestres, escriure, clicar, bloquejar o mantenir el Mac actiu.') },
    { title: l('Screen intelligence', 'Inteligencia visual', 'Intel·ligència visual'), body: l('Read interfaces through Accessibility, capture screens and extract text with OCR.', 'Leer interfaces con Accesibilidad, capturar pantallas y extraer texto con OCR.', 'Llegir interfícies amb Accessibilitat, capturar pantalles i extreure text amb OCR.') },
    { title: l('Personal workflows', 'Flujos personales', 'Fluxos personals'), body: l('Calendar, reminders, notes, messages, email, files and macOS Shortcuts.', 'Calendario, recordatorios, notas, mensajes, correo, archivos y Atajos de macOS.', 'Calendari, recordatoris, notes, missatges, correu, fitxers i Dreceres de macOS.') },
    { title: l('Media & creation', 'Multimedia y creación', 'Multimèdia i creació'), body: l('Spotify, camera, recording, image generation, QR creation and background removal.', 'Spotify, cámara, grabación, generación de imágenes, QR y eliminación de fondos.', 'Spotify, càmera, gravació, generació d\'imatges, QR i eliminació de fons.') },
    { title: l('Developer utility', 'Utilidades de desarrollo', 'Utilitats de desenvolupament'), body: l('Git, tests, JSON, regex, hashing, Base64, UUIDs and shell commands.', 'Git, tests, JSON, regex, hashes, Base64, UUID y comandos de terminal.', 'Git, tests, JSON, regex, hashes, Base64, UUID i ordres de terminal.') },
    { title: l('Resilient inference', 'Inferencia resiliente', 'Inferència resilient'), body: l('Multiple cloud models plus a fully local route keep the assistant useful when services fail.', 'Varios modelos cloud y una ruta totalmente local mantienen el asistente útil ante fallos.', 'Diversos models cloud i una ruta totalment local mantenen l\'assistent útil davant de fallades.') },
  ],
  decisionsTitle: l('What shaped the product', 'Decisiones que dieron forma al producto', 'Decisions que van donar forma al producte'),
  decisions: [
    { title: l('Tools set the ceiling', 'Las herramientas marcan el techo', 'Les eines marquen el sostre'), body: l('The largest quality gains came from clearer schemas, safer boundaries and better tool results, not from swapping the model.', 'Las mayores mejoras vinieron de esquemas claros, límites seguros y mejores resultados de herramienta, no de cambiar el modelo.', 'Les millores més grans van venir d\'esquemes clars, límits segurs i millors resultats d\'eina, no de canviar el model.') },
    { title: l('Fast when it can be', 'Rápido cuando puede serlo', 'Ràpid quan pot ser-ho'), body: l('Simple actions return directly. Only data-heavy results take a second model pass for narration.', 'Las acciones simples responden directamente. Solo los resultados densos pasan de nuevo por el modelo.', 'Les accions simples responen directament. Només els resultats densos tornen a passar pel model.') },
    { title: l('Local is a product feature', 'Lo local es una función', 'El local és una funció'), body: l('Ollama is not a demo mode: it is the continuity layer when cloud inference is unavailable.', 'Ollama no es un modo demo: es la capa de continuidad cuando la inferencia cloud no está disponible.', 'Ollama no és un mode demo: és la capa de continuïtat quan la inferència cloud no està disponible.') },
    { title: l('Voice needs restraint', 'La voz necesita contención', 'La veu necessita contenció'), body: l('Short answers, bounded memory and language-aware speech keep interaction natural instead of theatrical.', 'Respuestas breves, memoria acotada y voz adaptada al idioma mantienen la interacción natural.', 'Respostes breus, memòria acotada i veu adaptada a l\'idioma mantenen la interacció natural.') },
  ],
}

export const jeffreyRemoteDeepDive = {
  accent: '#38bdf8',
  eyebrow: l('NATIVE iOS COMMAND SURFACE', 'SUPERFICIE NATIVA DE CONTROL iOS', 'SUPERFÍCIE NATIVA DE CONTROL iOS'),
  statement: l(
    'Jeffrey Remote turns an iPhone into a direct command surface for a Mac: see what is happening, act with precision and keep control when both devices are in different places.',
    'Jeffrey Remote convierte un iPhone en una superficie de control directa para un Mac: ver qué ocurre, actuar con precisión y mantener el control cuando ambos dispositivos están lejos.',
    'Jeffrey Remote converteix un iPhone en una superfície de control directa per a un Mac: veure què passa, actuar amb precisió i mantenir el control quan els dos dispositius són lluny.'
  ),
  stats: [
    { value: '5', label: l('PRODUCT SURFACES', 'SUPERFICIES', 'SUPERFÍCIES'), detail: l('Remote, Controls, Media, Apps and Voice.', 'Remote, Controles, Multimedia, Apps y Voz.', 'Remote, Controls, Multimèdia, Apps i Veu.') },
    { value: '3', label: l('CONNECTION MODES', 'MODOS DE CONEXIÓN', 'MODES DE CONNEXIÓ'), detail: l('Wi-Fi, Personal Hotspot and Tailscale.', 'Wi-Fi, Punto de acceso personal y Tailscale.', 'Wi-Fi, Punt d\'accés personal i Tailscale.') },
    { value: 'TCP', label: l('DIRECT BRIDGE', 'PUENTE DIRECTO', 'PONT DIRECTE'), detail: l('Newline-delimited JSON over Network.framework.', 'JSON delimitado por líneas sobre Network.framework.', 'JSON delimitat per línies sobre Network.framework.') },
    { value: '6 a 16s', label: l('SMART TIMEOUTS', 'TIMEOUTS ADAPTATIVOS', 'TIMEOUTS ADAPTATIUS'), detail: l('Different budgets for commands, app lists and screenshots.', 'Tiempos distintos para comandos, apps y capturas.', 'Temps diferents per a ordres, apps i captures.') },
  ],
  flowTitle: l('A visible trust loop', 'Un ciclo de confianza visible', 'Un cicle de confiança visible'),
  flowLead: l('Remote control feels reliable when every action has a clear route and a visible result.', 'El control remoto se siente fiable cuando cada acción tiene una ruta clara y un resultado visible.', 'El control remot se sent fiable quan cada acció té una ruta clara i un resultat visible.'),
  flow: [
    { number: '01', title: l('Discover', 'Descubrir', 'Descobrir'), body: l('Bonjour finds the Mac nearby; Tailscale enables direct reach when away.', 'Bonjour encuentra el Mac cerca; Tailscale permite acceso directo a distancia.', 'Bonjour troba el Mac a prop; Tailscale permet accés directe a distància.') },
    { number: '02', title: l('Request', 'Solicitar', 'Demanar'), body: l('The app serializes each intent into a compact JSON command.', 'La app serializa cada intención en un comando JSON compacto.', 'L\'app serialitza cada intenció en una ordre JSON compacta.') },
    { number: '03', title: l('Execute', 'Ejecutar', 'Executar'), body: l('The bridge routes the command to Jeffrey or the native Mac control layer.', 'El puente envía el comando a Jeffrey o a la capa nativa de control del Mac.', 'El pont envia l\'ordre a Jeffrey o a la capa nativa de control del Mac.') },
    { number: '04', title: l('Return', 'Devolver', 'Retornar'), body: l('State, media data or a fresh screenshot travels back to the phone.', 'El estado, los datos multimedia o una captura nueva vuelven al móvil.', 'L\'estat, les dades multimèdia o una captura nova tornen al mòbil.') },
    { number: '05', title: l('Recover', 'Recuperar', 'Recuperar'), body: l('Health checks and reconnection keep the session alive across network changes.', 'Los health checks y la reconexión mantienen la sesión al cambiar de red.', 'Els health checks i la reconnexió mantenen la sessió quan canvia la xarxa.') },
  ],
  capabilitiesTitle: l('A control room in your pocket', 'Una sala de control en el bolsillo', 'Una sala de control a la butxaca'),
  capabilitiesLead: l('Each tab is designed around a distinct remote job instead of a generic list of commands.', 'Cada pestaña está diseñada para una tarea remota concreta, no como una lista genérica de comandos.', 'Cada pestanya està dissenyada per a una tasca remota concreta, no com una llista genèrica d\'ordres.'),
  capabilities: [
    { title: l('Remote canvas', 'Lienzo remoto', 'Llenç remot'), body: l('Live Mac preview, cursor movement, click, hold, double click, right click and scroll.', 'Vista en vivo del Mac, cursor, clic, mantener, doble clic, clic derecho y scroll.', 'Vista en directe del Mac, cursor, clic, mantenir, doble clic, clic dret i scroll.') },
    { title: l('Control Deck', 'Panel de control', 'Tauler de control'), body: l('Run any Jeffrey command, wake the Mac, switch desktops, launch workspaces and control power.', 'Ejecutar comandos, despertar el Mac, cambiar escritorios, abrir espacios y controlar energía.', 'Executar ordres, despertar el Mac, canviar escriptoris, obrir espais i controlar energia.') },
    { title: l('Media console', 'Consola multimedia', 'Consola multimèdia'), body: l('Playback, seek, volume, keyboard brightness and screen brightness in one surface.', 'Reproducción, posición, volumen y brillo de teclado y pantalla en una sola superficie.', 'Reproducció, posició, volum i brillantor de teclat i pantalla en una sola superfície.') },
    { title: l('Launch Board', 'Panel de apps', 'Tauler d\'apps'), body: l('Search installed Mac apps or launch curated workspaces with immediate visual feedback.', 'Buscar apps instaladas o abrir espacios favoritos con feedback visual inmediato.', 'Cercar apps instal·lades o obrir espais favorits amb feedback visual immediat.') },
    { title: l('Voice broadcast', 'Emisión de voz', 'Emissió de veu'), body: l('Send text to the Mac and speak it with automatic or manually selected language voices.', 'Enviar texto al Mac y reproducirlo con voz automática o idioma seleccionado.', 'Enviar text al Mac i reproduir-lo amb veu automàtica o idioma seleccionat.') },
    { title: l('Connection resilience', 'Conexión resiliente', 'Connexió resilient'), body: l('Health monitoring, reconnect, peer-to-peer discovery and task-specific timeout handling.', 'Monitorización, reconexión, descubrimiento peer-to-peer y timeouts por tarea.', 'Monitoratge, reconnexió, descobriment peer-to-peer i timeouts per tasca.') },
  ],
  galleryTitle: l('Built, not mocked', 'Construido, no simulado', 'Construït, no simulat'),
  galleryLead: l('Real screens from the native SwiftUI app running in the iPhone simulator.', 'Pantallas reales de la app nativa SwiftUI ejecutándose en el simulador de iPhone.', 'Pantalles reals de l\'app nativa SwiftUI executant-se al simulador d\'iPhone.'),
  decisionsTitle: l('Designing for distance', 'Diseñar para la distancia', 'Dissenyar per a la distància'),
  decisions: [
    { title: l('Direct, not abstract', 'Directo, no abstracto', 'Directe, no abstracte'), body: l('The phone talks to the Mac bridge directly. The architecture remains legible and debuggable.', 'El móvil habla directamente con el puente del Mac. La arquitectura sigue siendo legible y depurable.', 'El mòbil parla directament amb el pont del Mac. L\'arquitectura continua sent llegible i depurable.') },
    { title: l('Feedback is part of the command', 'El feedback forma parte del comando', 'El feedback forma part de l\'ordre'), body: l('Buttons acknowledge intent immediately while returned state confirms what actually happened.', 'Los botones reconocen la intención al instante y el estado devuelto confirma qué ocurrió.', 'Els botons reconeixen la intenció a l\'instant i l\'estat retornat confirma què ha passat.') },
    { title: l('Latency has a shape', 'La latencia tiene forma', 'La latència té forma'), body: l('Screenshots need more time than normal commands, so timeout budgets reflect the real cost of each operation.', 'Las capturas necesitan más tiempo que un comando; los timeouts reflejan el coste real de cada operación.', 'Les captures necessiten més temps que una ordre; els timeouts reflecteixen el cost real de cada operació.') },
    { title: l('Recovery is interaction design', 'Recuperar también es diseño', 'Recuperar també és disseny'), body: l('Discovery, health checks and reconnection reduce the number of dead ends the user has to understand.', 'Descubrimiento, health checks y reconexión reducen los callejones sin salida para el usuario.', 'Descobriment, health checks i reconnexió redueixen els carrerons sense sortida per a l\'usuari.') },
  ],
}
