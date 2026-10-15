const IMG = "/images/";

// Small helper: { en, es, ca } object literal, read by t() in ../i18n.jsx.
const l = (en, es, ca) => ({ en, es, ca });

/**
 * Every project answers the same four questions, in this order:
 *
 *   builtFor  who it is for, named as concretely as is honestly possible
 *   problem   what was actually broken before it existed
 *   what      what the thing is, in plain words
 *   changed   what went wrong during the build, and what changed because of it
 *
 * The order matters. An earlier version of this file opened every project with
 * the solution and a quotable line about it, which read well and said nothing
 * about the work. `changed` is the field that costs something to write, so it
 * is only filled where there is a real answer: an invented failure is worse
 * than an admitted gap.
 *
 * `research` appears on one project only. Betsy is the one that went through
 * user testing, a customer journey and defined targets. Claiming that on the
 * others would collapse the first time anyone asked about the method.
 */

export const projects = [
  {
    id: "01",
    name: "Jeffrey Desk",
    tagline: l(
      "Everything you do, on one screen.",
      "Todo lo que haces, en una sola pantalla.",
      "Tot el que fas, en una sola pantalla."
    ),
    origin: l(
      "It started as a table. For an Intelligent Environments project I designed a desk that wakes up when you sit down: a projector above it, a camera tracking your hands, and the surface itself turning into the interface, greeting me with \"Welcome back, Mr. Bosch\" like something out of Iron Man. I built it, projected and touchable. Living with it every day is what changed the project: nearly everything I valued was the software, not the projection. So I moved the desk off the table and onto the Mac's screen, and kept the idea that mattered: one surface where the whole day lives.",
      "Empezó siendo una mesa. Para un proyecto de Intelligent Environments diseñé un escritorio que se despierta cuando te sientas: un proyector encima, una cámara que sigue las manos y la propia superficie convirtiéndose en la interfaz, saludándome con un \"Welcome back, Mr. Bosch\" sacado de Iron Man. Lo construí, proyectado y táctil. Usarlo cada día es lo que cambió el proyecto: casi todo lo que valoraba era el software, no la proyección. Así que saqué el escritorio de la mesa y lo llevé a la pantalla del Mac, y me quedé con la idea que importaba: una sola superficie donde vive el día entero.",
      "Va començar sent una taula. Per a un projecte d'Intelligent Environments vaig dissenyar un escriptori que es desperta quan t'hi asseus: un projector a sobre, una càmera que segueix les mans i la mateixa superfície convertint-se en la interfície, saludant-me amb un \"Welcome back, Mr. Bosch\" tret d'Iron Man. El vaig construir, projectat i tàctil. Fer-lo servir cada dia és el que va canviar el projecte: gairebé tot el que valorava era el software, no la projecció. Així que vaig treure l'escriptori de la taula i el vaig portar a la pantalla del Mac, i em vaig quedar amb la idea que importava: una sola superfície on viu el dia sencer."
    ),
    builtFor: l(
      "Me first: a student whose day was the campus, Netflix, an AI, Spotify, the calendar and the mail, all at once. Then anyone on a Mac who lives in fifteen tabs, because it is now a product with its own website, plans and installer.",
      "Primero para mí: un estudiante cuyo día era el campus, Netflix, una IA, Spotify, el calendario y el correo, todo a la vez. Después para cualquiera con un Mac que vive en quince pestañas, porque ahora es un producto con su web, sus planes y su instalador.",
      "Primer per a mi: un estudiant el dia del qual era el campus, Netflix, una IA, Spotify, el calendari i el correu, tot alhora. Després per a qualsevol amb un Mac que viu en quinze pestanyes, perquè ara és un producte amb la seva web, els seus plans i el seu instal·lador."
    ),
    problem: l(
      "My day was spread over a dozen apps and twice as many tabs. Every switch cost a little attention, the browser treated a film and an exam the same way, and nothing could see the whole day at once to help with it.",
      "Mi día estaba repartido entre una docena de apps y el doble de pestañas. Cada cambio costaba un poco de atención, el navegador trataba igual una película que un examen, y nada podía ver el día entero a la vez para ayudar con él.",
      "El meu dia estava repartit entre una dotzena d'apps i el doble de pestanyes. Cada canvi costava una mica d'atenció, el navegador tractava igual una pel·lícula que un examen, i res no podia veure el dia sencer alhora per ajudar-hi."
    ),
    description: l(
      "A macOS app that turns the screen into a desk: widgets where any site lives (Netflix, the campus, Gmail, Notion, your files), your day with its tasks and calendar, a timer, Spotify, and the Mac's own controls in a dock. An AI agent, Claude or Codex, sits inside it and acts: it can open a course and download a PDF, or play music and note a deadline. Encrypted video plays properly, through a certified Widevine build. One codebase ships two editions: the personal one I use every day and the product, which starts empty and is set up by whoever installs it.",
      "Una app de macOS que convierte la pantalla en un escritorio: viñetas donde vive cualquier web (Netflix, el campus, Gmail, Notion, tus archivos), tu día con sus tareas y su calendario, un temporizador, Spotify y los controles del propio Mac en un dock. Dentro hay un agente de IA, Claude o Codex, que actúa: puede entrar en una asignatura y descargar un PDF, o poner música y apuntar una entrega. El vídeo cifrado se reproduce de verdad, con una build de Widevine certificada. Un solo código sale en dos ediciones: la personal que uso cada día y el producto, que empieza vacío y lo monta quien lo instala.",
      "Una app de macOS que converteix la pantalla en un escriptori: vinyetes on viu qualsevol web (Netflix, el campus, Gmail, Notion, els teus fitxers), el teu dia amb les tasques i el calendari, un temporitzador, Spotify i els controls del mateix Mac en un dock. A dins hi ha un agent d'IA, Claude o Codex, que actua: pot entrar en una assignatura i baixar un PDF, o posar música i apuntar una entrega. El vídeo xifrat es reprodueix de debò, amb una build de Widevine certificada. Un sol codi surt en dues edicions: la personal que faig servir cada dia i el producte, que comença buit i el munta qui l'instal·la."
    ),
    changed: l(
      "The personal desk played Netflix by telling the platforms it was Chrome. For me that was a shortcut; the day I decided to sell it, the same trick became something no customer could be put at risk for, and so did the WhatsApp client and the things written into the code that only made sense for me. I rebuilt video on a certified Electron with production Widevine signing, so the desk says exactly what it is, and set one rule for the product: it must work exactly like mine, except that nothing comes set up. The second lesson was cheaper to learn and more embarrassing: working on the product in the same folder the personal app was serving broke my own desk twice, until the two editions got separate working trees.",
      "El escritorio personal reproducía Netflix diciéndoles a las plataformas que era Chrome. Para mí era un atajo; el día que decidí venderlo, ese mismo truco pasó a ser algo a lo que no podía exponer a ningún cliente, igual que el cliente de WhatsApp y las cosas escritas en el código que solo tenían sentido para mí. Rehíce el vídeo sobre un Electron certificado con firma de Widevine de producción, para que el escritorio diga exactamente lo que es, y puse una regla al producto: tiene que funcionar exactamente como el mío, salvo que nada viene montado. La segunda lección fue más barata y más vergonzosa: trabajar en el producto en la misma carpeta que servía la app personal me rompió mi propio escritorio dos veces, hasta que las dos ediciones tuvieron carpetas de trabajo separadas.",
      "L'escriptori personal reproduïa Netflix dient a les plataformes que era Chrome. Per a mi era una drecera; el dia que vaig decidir vendre'l, aquell mateix truc va passar a ser una cosa a la qual no podia exposar cap client, igual que el client de WhatsApp i les coses escrites al codi que només tenien sentit per a mi. Vaig refer el vídeo sobre un Electron certificat amb signatura de Widevine de producció, perquè l'escriptori digui exactament el que és, i vaig posar una regla al producte: ha de funcionar exactament com el meu, excepte que res no ve muntat. La segona lliçó va ser més barata i més vergonyosa: treballar en el producte a la mateixa carpeta que servia l'app personal em va trencar el meu propi escriptori dues vegades, fins que les dues edicions van tenir carpetes de treball separades."
    ),
    role: l("Product + Design + Engineering", "Producto + Diseño + Ingeniería", "Producte + Disseny + Enginyeria"),
    context: l("macOS app, from personal tool to product", "App de macOS, de herramienta personal a producto", "App de macOS, d'eina personal a producte"),
    age: 18,
    tags: [l("Product", "Producto", "Producte"), "macOS", l("AI Agent", "Agente IA", "Agent IA")],
    tech: ["Electron", "JavaScript", "Python", "Widevine", "Claude", "Cloudflare"],
    learning: l(
      "A tool for yourself and a product are different things even when the code is the same. What I could live with, someone else should never have to: every shortcut I took for me had to be paid back before a stranger could install it.",
      "Una herramienta para ti y un producto son cosas distintas aunque el código sea el mismo. Lo que yo podía tolerar, otra persona no debería tener que hacerlo: cada atajo que tomé para mí había que devolverlo antes de que un desconocido pudiera instalarlo.",
      "Una eina per a tu i un producte són coses diferents encara que el codi sigui el mateix. El que jo podia tolerar, una altra persona no ho hauria d'haver de fer: cada drecera que vaig prendre per a mi s'havia de tornar abans que un desconegut el pogués instal·lar."
    ),
    live: "https://jeffreydesk.com",
    images: [
      IMG + "jeffrey-desk-idea.jpg",
      IMG + "jeffrey-desk-concept.jpg",
      IMG + "jeffrey-desk-spotify.jpg",
      IMG + "jeffrey-desk-real.jpg",
      IMG + "jeffrey-desk-setup.jpg",
      IMG + "jeffrey-desk-web.jpg",
    ],
  },
  {
    id: "02",
    name: "Jeffrey",
    tagline: l(
      "An assistant that acts, not answers.",
      "Un asistente que actúa, no contesta.",
      "Un assistent que actua, no contesta."
    ),
    builtFor: l(
      "Me, and anyone who wants an assistant that can touch their machine without shipping their desktop to a company.",
      "Para mí, y para quien quiera un asistente que pueda tocar su ordenador sin mandar su escritorio a una empresa.",
      "Per a mi, i per a qui vulgui un assistent que pugui tocar el seu ordinador sense enviar el seu escriptori a una empresa."
    ),
    problem: l(
      "Chat assistants answer and stop. If I asked one to open a file, rename it and send it, it wrote me instructions for doing that myself.",
      "Los asistentes de chat contestan y se paran. Si le pedía a uno que abriera un archivo, lo renombrara y lo enviara, me escribía las instrucciones para hacerlo yo.",
      "Els assistents de xat contesten i s'aturen. Si li demanava a un que obrís un fitxer, el reanomenés i l'enviés, m'escrivia les instruccions per fer-ho jo."
    ),
    description: l(
      "Jeffrey listens, picks a route, calls the right tool, runs it on macOS and answers in the language it was asked in. One sentence in, an action out. Five systems coordinate behind it, and it keeps working with the network down because the local model is not a demo mode.",
      "Jeffrey escucha, elige una ruta, llama a la herramienta adecuada, la ejecuta en macOS y responde en el idioma en que se le habló. Entra una frase, sale una acción. Cinco sistemas se coordinan detrás, y sigue funcionando sin red porque el modelo local no es un modo demo.",
      "Jeffrey escolta, tria una ruta, crida l'eina adequada, l'executa a macOS i respon en l'idioma en què se li ha parlat. Entra una frase, surt una acció. Cinc sistemes es coordinen a sota, i segueix funcionant sense xarxa perquè el model local no és un mode demo."
    ),
    changed: l(
      "My first instinct when Jeffrey picked the wrong action was that the model was not good enough. It was not the model. The tools I had handed it were vaguely described, so it was choosing between options that overlapped, and no amount of model quality fixes an ambiguous menu. Rewriting the tool definitions to be narrow and unambiguous fixed more than swapping models ever did.",
      "Mi primer instinto cuando Jeffrey elegía la acción equivocada era que el modelo no daba para más. No era el modelo. Las herramientas que le había pasado estaban descritas de forma vaga, así que elegía entre opciones que se solapaban, y ninguna calidad de modelo arregla un menú ambiguo. Reescribir las definiciones de las herramientas para que fueran estrechas y sin ambigüedad arregló más que cambiar de modelo.",
      "El meu primer instint quan en Jeffrey triava l'acció equivocada era que el model no donava per a més. No era el model. Les eines que li havia passat estaven descrites de manera vaga, així que triava entre opcions que se superposaven, i cap qualitat de model arregla un menú ambigu. Reescriure les definicions de les eines perquè fossin estretes i sense ambigüitat va arreglar més que canviar de model."
    ),
    role: l("Design + Systems + Engineering", "Diseño + Sistemas + Ingeniería", "Disseny + Sistemes + Enginyeria"),
    context: l("Personal AI agent for macOS", "Agente de IA personal para macOS", "Agent d'IA personal per a macOS"),
    age: 18,
    tags: [l("AI Agent", "Agente IA", "Agent IA"), l("Systems", "Sistemas", "Sistemes")],
    tech: ["Python", "Ollama", "macOS", "Agent loop"],
    learning: l(
      "When the AI acts instead of answering, the tools matter more than the model. A weaker model with well shaped tools beat a stronger one with vague ones.",
      "Cuando la IA actúa en vez de contestar, las herramientas importan más que el modelo. Un modelo más flojo con herramientas bien definidas ganó a uno más potente con herramientas vagas.",
      "Quan la IA actua en comptes de contestar, les eines importen més que el model. Un model més fluix amb eines ben definides va guanyar a un de més potent amb eines vagues."
    ),
    repo: "https://github.com/xavibosch/jeffrey-ai-assistant",
    images: [IMG + "jeffrey.png"],
  },
  {
    id: "03",
    name: "Jeffrey Remote",
    tagline: l("My Mac, in my hand, from anywhere.", "Mi Mac, en la mano, desde cualquier sitio.", "El meu Mac, a la mà, des de qualsevol lloc."),
    builtFor: l(
      "Me, away from the desk. The moments a Mac is worth most from a phone are the ones where you are not sitting in front of it: on the sofa, in class, in another city.",
      "Para mí, lejos del escritorio. Los momentos en que el Mac vale más desde el móvil son aquellos en que no estás sentado delante: en el sofá, en clase, en otra ciudad.",
      "Per a mi, lluny de l'escriptori. Els moments en què el Mac val més des del mòbil són aquells en què no ets assegut al davant: al sofà, a classe, en una altra ciutat."
    ),
    problem: l(
      "Everything I had built on the Mac stopped the moment I left the room. The first version of this app fixed that on paper, but it had grown one feature at a time and nobody would call it pleasant to use.",
      "Todo lo que había construido en el Mac se acababa en cuanto salía de la habitación. La primera versión de esta app lo arreglaba sobre el papel, pero había crecido una función detrás de otra y nadie diría que era agradable de usar.",
      "Tot el que havia construït al Mac s'acabava en el moment que sortia de l'habitació. La primera versió d'aquesta app ho arreglava sobre el paper, però havia crescut una funció darrere l'altra i ningú diria que era agradable de fer servir."
    ),
    description: l(
      "Version 2 is a native iPhone app and a small menu bar app on the Mac, rebuilt from scratch. Two modes. Mac: the screen live, a real trackpad (one finger moves, two scroll with momentum, hold to select text), the keyboard, the Mac's apps with their own icons, and commands I compose myself, like opening a chosen set of apps on each desktop with one tap. Desk: Jeffrey Desk drawn on the phone, each widget a tile you tap to change what it shows, plus its video and Spotify. Paired once with a QR code, it reaches the Mac over the home Wi-Fi or Tailscale, whichever answers first.",
      "La versión 2 es una app nativa de iPhone y una pequeña app de la barra de menús del Mac, rehechas desde cero. Dos modos. Mac: la pantalla en directo, un trackpad de verdad (un dedo mueve, dos desplazan con inercia, mantener selecciona texto), el teclado, las apps del Mac con sus iconos y comandos que compongo yo, como abrir un conjunto de apps en cada escritorio con un toque. Desk: Jeffrey Desk dibujado en el móvil, cada viñeta una ficha que tocas para cambiar lo que muestra, más su vídeo y Spotify. Emparejada una vez con un código QR, llega al Mac por el wifi de casa o por Tailscale, lo que responda primero.",
      "La versió 2 és una app nativa d'iPhone i una petita app de la barra de menús del Mac, refetes de zero. Dos modes. Mac: la pantalla en directe, un trackpad de debò (un dit mou, dos desplacen amb inèrcia, mantenir selecciona text), el teclat, les apps del Mac amb les seves icones i ordres que componc jo, com obrir un conjunt d'apps a cada escriptori amb un toc. Desk: Jeffrey Desk dibuixat al mòbil, cada vinyeta una fitxa que toques per canviar el que mostra, més el seu vídeo i Spotify. Aparellada un cop amb un codi QR, arriba al Mac per la wifi de casa o per Tailscale, el que respongui primer."
    ),
    changed: l(
      "The first version said CONNECTED while nothing on the Mac was answering. Its helper had quietly stopped starting after a folder moved, and the app only checked that it had an address, not that anyone was home, so every button failed with a timeout that looked like bad Wi-Fi. Version 2 keeps one connection open, only shows green when the Mac has just replied, and reconnects by itself. The rebuild also taught me a smaller lesson twice: the number of a message and the id of the thing it is about must never share a name, or one quietly overwrites the other.",
      "La primera versión decía CONNECTED mientras nada en el Mac respondía. Su ayudante había dejado de arrancar sin avisar después de que se moviera una carpeta, y la app solo comprobaba que tenía una dirección, no que hubiera alguien en casa, así que cada botón fallaba con un timeout que parecía culpa del wifi. La versión 2 mantiene una sola conexión abierta, solo se pone verde cuando el Mac acaba de responder y se reconecta sola. Rehacerla también me enseñó dos veces una lección más pequeña: el número de un mensaje y el id de aquello de lo que habla nunca deben llamarse igual, o uno pisa al otro sin avisar.",
      "La primera versió deia CONNECTED mentre res al Mac no responia. El seu ajudant havia deixat d'arrencar sense avisar després que es mogués una carpeta, i l'app només comprovava que tenia una adreça, no que hi hagués algú a casa, així que cada botó fallava amb un timeout que semblava culpa de la wifi. La versió 2 manté una sola connexió oberta, només es posa verda quan el Mac acaba de respondre i es reconnecta sola. Refer-la també em va ensenyar dues vegades una lliçó més petita: el número d'un missatge i l'id d'allò de què parla mai no s'han de dir igual, o l'un trepitja l'altre sense avisar."
    ),
    role: l("Product Design + iOS + macOS", "Diseño de Producto + iOS + macOS", "Disseny de Producte + iOS + macOS"),
    context: l("Native remote for the Mac and Jeffrey Desk", "Mando nativo para el Mac y Jeffrey Desk", "Comandament natiu per al Mac i Jeffrey Desk"),
    age: 18,
    tags: ["iOS", "macOS", l("Product", "Producto", "Producte")],
    tech: ["Swift", "SwiftUI", "Network.framework", "ScreenCaptureKit", "Tailscale"],
    learning: l(
      "A status light is a promise. If it says connected without asking the other side, every failure after it looks like something else, and you lose an evening blaming the Wi-Fi.",
      "Un indicador de estado es una promesa. Si dice conectado sin preguntarle al otro lado, cada fallo posterior parece otra cosa, y pierdes una tarde culpando al wifi.",
      "Un indicador d'estat és una promesa. Si diu connectat sense preguntar-ho a l'altra banda, cada error posterior sembla una altra cosa, i perds una tarda culpant la wifi."
    ),
    repo: "https://github.com/xavibosch/jeffrey-remote",
    images: [IMG + "jeffrey-remote-2-control.jpg", IMG + "jeffrey-remote-2-apps.jpg", IMG + "jeffrey-remote-2-ordres.jpg"],
  },
  {
    id: "04",
    name: "Jeffrey Wake Station",
    tagline: l("Latency is interaction design.", "La latencia es diseño de interacción.", "La latència és disseny d'interacció."),
    builtFor: l(
      "Me, in a hallway with my hands full. Reaching for a keyboard to start something is a step that should not exist.",
      "Para mí, en un pasillo con las manos ocupadas. Ir a buscar un teclado para lanzar algo es un paso que no debería existir.",
      "Per a mi, en un passadís amb les mans ocupades. Anar a buscar un teclat per llançar alguna cosa és un pas que no hauria d'existir."
    ),
    problem: l(
      "Every way of triggering Jeffrey started with unlocking something. The assistant was fast, getting to it was not.",
      "Todas las formas de lanzar a Jeffrey empezaban desbloqueando algo. El asistente era rápido, llegar a él no.",
      "Totes les maneres de llançar en Jeffrey començaven desbloquejant alguna cosa. L'assistent era ràpid, arribar-hi no."
    ),
    description: l(
      "A desk that works as an input device. Motion, sound and a physical button travel from an Arduino MEGA to macOS and fire whole routines in under 200 milliseconds. Built for a hallway, not a keynote.",
      "Un escritorio que funciona como dispositivo de entrada. El movimiento, el sonido y un botón físico viajan de un Arduino MEGA a macOS y lanzan rutinas enteras en menos de 200 milisegundos. Hecho para un pasillo, no para una keynote.",
      "Un escriptori que funciona com a dispositiu d'entrada. El moviment, el so i un botó físic viatgen d'un Arduino MEGA a macOS i llancen rutines senceres en menys de 200 mil·lisegons. Fet per a un passadís, no per a una keynote."
    ),
    changed: l(
      "The first build worked and still felt broken. The routine fired every time, just late enough that you had already started wondering whether it had heard you, and once you are wondering you press the button again. Chasing that delay through the serial path is what turned latency from a number I was optimising afterwards into the thing the whole design was actually about.",
      "La primera versión funcionaba y aun así se sentía rota. La rutina se disparaba siempre, solo que lo bastante tarde como para que ya te hubieras preguntado si te había oído, y en cuanto te lo preguntas vuelves a pulsar el botón. Perseguir ese retraso por el camino serie es lo que convirtió la latencia de un número que optimizaba después en aquello de lo que iba el diseño entero.",
      "La primera versió funcionava i tot i així se sentia trencada. La rutina es disparava sempre, només que prou tard perquè ja t'haguessis preguntat si t'havia sentit, i quan t'ho preguntes tornes a prémer el botó. Perseguir aquell retard pel camí sèrie és el que va convertir la latència d'un número que optimitzava després en allò de què anava el disseny sencer."
    ),
    role: l("Hardware + Interaction", "Hardware + Interacción", "Hardware + Interacció"),
    context: l("Physical trigger for Jeffrey", "Disparador físico para Jeffrey", "Disparador físic per a Jeffrey"),
    age: 18,
    tags: ["Hardware", l("Interaction", "Interacción", "Interacció")],
    tech: ["Arduino MEGA", "Serial", "macOS"],
    learning: l(
      "Past roughly 200 ms between a gesture and the screen answering, it stops feeling like you caused it. Latency turned out to be the whole design, not a number to optimise later.",
      "Pasados unos 200 ms entre el gesto y la respuesta de la pantalla, deja de parecer que lo hayas provocado tú. La latencia resultó ser el diseño entero, no un número a optimizar luego.",
      "Passats uns 200 ms entre el gest i la resposta de la pantalla, deixa de semblar que ho hagis provocat tu. La latència va resultar ser el disseny sencer, no un número a optimitzar després."
    ),
    repo: "https://github.com/xavibosch/jeffrey-wake-station",
    images: [IMG + "sensor-workspace.png"],
  },
  {
    id: "05",
    name: "Betsy",
    tagline: l(
      "All the tension of betting, zero real money.",
      "Toda la tensión de apostar, cero dinero real.",
      "Tota la tensió d'apostar, zero diners reals."
    ),
    builtFor: l(
      "My own group of friends. We argue about football every week, and the only products that turn that into a game want your card details.",
      "Mi propio grupo de amigos. Discutimos de fútbol cada semana, y los únicos productos que convierten eso en un juego quieren los datos de tu tarjeta.",
      "El meu propi grup d'amics. Discutim de futbol cada setmana, i els únics productes que converteixen això en un joc volen les dades de la teva targeta."
    ),
    problem: l(
      "Betting apps are built to take money from people who cannot afford to lose it. The part my friends actually want, being right in front of each other, needs none of that.",
      "Las apps de apuestas están hechas para sacar dinero a gente que no puede permitirse perderlo. La parte que mis amigos quieren de verdad, tener razón delante de los demás, no necesita nada de eso.",
      "Les apps d'apostes estan fetes per treure diners a gent que no es pot permetre perdre'ls. La part que els meus amics volen de debò, tenir raó davant dels altres, no necessita res d'això."
    ),
    description: l(
      "Betsy turns a group chat into a private league: real fixtures, virtual points, live rankings and 1v1 duels. Nothing is convertible into money, in either direction. The product is the argument between friends, and every system underneath exists to feed it.",
      "Betsy convierte un grupo de chat en una liga privada: partidos reales, puntos virtuales, rankings en vivo y duelos 1v1. Nada es convertible en dinero, en ninguna dirección. El producto es la discusión entre amigos, y cada sistema de debajo existe para alimentarla.",
      "Betsy converteix un grup de xat en una lliga privada: partits reals, punts virtuals, rànquings en directe i duels 1v1. Res és convertible en diners, en cap direcció. El producte és la discussió entre amics, i cada sistema de sota existeix per alimentar-la."
    ),
    research: l(
      "The one project here with real research behind it. I ran user tests with the people it was for, mapped the customer journey, and defined the target users before building the screens. The interface started as coursework in Interface and Graphic Design and was reshaped by what the testing said, not by what I liked.",
      "El único proyecto de aquí con investigación real detrás. Hice tests de usuario con las personas a las que iba dirigido, mapeé el customer journey y definí los usuarios objetivo antes de construir las pantallas. La interfaz empezó como trabajo de Diseño de Interfaz y Gráfico y se rehízo según lo que decían los tests, no según lo que me gustaba a mí.",
      "L'únic projecte d'aquí amb recerca real al darrere. Vaig fer tests d'usuari amb les persones a qui anava dirigit, vaig mapar el customer journey i vaig definir els usuaris objectiu abans de construir les pantalles. La interfície va començar com a treball de Disseny d'Interfície i Gràfic i es va refer segons el que deien els tests, no segons el que m'agradava a mi."
    ),
    changed: l(
      "Writing the Firestore rules and the SwiftUI views at the same time is what exposed it: two people could settle the same bet, because nothing in a static screen says who owns that write. A wireframe cannot show you a race between two phones. The rules had to become the place where the truth lives, with the interface allowed to ask but never to decide.",
      "Escribir las reglas de Firestore y las vistas de SwiftUI a la vez fue lo que lo destapó: dos personas podían liquidar la misma apuesta, porque nada en una pantalla estática dice de quién es esa escritura. Un wireframe no te enseña una carrera entre dos móviles. Las reglas tuvieron que pasar a ser el sitio donde vive la verdad, con la interfaz pudiendo preguntar pero nunca decidir.",
      "Escriure les regles de Firestore i les vistes de SwiftUI alhora és el que ho va destapar: dues persones podien liquidar la mateixa aposta, perquè res en una pantalla estàtica diu de qui és aquella escriptura. Un wireframe no t'ensenya una cursa entre dos mòbils. Les regles van haver de passar a ser el lloc on viu la veritat, amb la interfície podent preguntar però mai decidir."
    ),
    role: l("Product Design + Research + iOS", "Diseño de Producto + Investigación + iOS", "Disseny de Producte + Recerca + iOS"),
    context: l("Social betting league app", "App social de ligas de apuestas", "App social de lligues d'apostes"),
    age: 18,
    tags: ["iOS", l("Research", "Investigación", "Recerca")],
    tech: ["Swift", "SwiftUI", "Firestore"],
    learning: l(
      "Writing the Firestore rules and the SwiftUI views at the same time surfaced product problems no wireframe had shown. A static screen cannot tell you that two people can settle the same bet twice.",
      "Escribir las reglas de Firestore y las vistas de SwiftUI a la vez sacó a la luz problemas de producto que ningún wireframe había mostrado. Una pantalla estática no te dice que dos personas pueden liquidar la misma apuesta dos veces.",
      "Escriure les regles de Firestore i les vistes de SwiftUI alhora va treure a la llum problemes de producte que cap wireframe havia mostrat. Una pantalla estàtica no et diu que dues persones poden liquidar la mateixa aposta dues vegades."
    ),
    repo: "https://github.com/xavibosch/betsy-ios",
    images: [IMG + "betsy-real-hero.jpg", IMG + "betsy-real-league.png", IMG + "betsy-real-markets.png", IMG + "betsy-real-betslip.png"],
  },
  {
    id: "06",
    name: "Nevera Bosch",
    tagline: l("The fridge is the app.", "La nevera es la app.", "La nevera és l'app."),
    builtFor: l(
      "My family. Four people, one shopping list, and nobody willing to install anything to use it.",
      "Mi familia. Cuatro personas, una lista de la compra, y nadie dispuesto a instalar nada para usarla.",
      "La meva família. Quatre persones, una llista de la compra, i ningú disposat a instal·lar res per fer-la servir."
    ),
    problem: l(
      "Every shared list we tried died the same way: someone had to remember the app existed, find it, and log in. The list only matters in the ten seconds you are standing at the fridge.",
      "Todas las listas compartidas que probamos murieron igual: alguien tenía que acordarse de que la app existía, encontrarla e iniciar sesión. La lista solo importa en los diez segundos en que estás delante de la nevera.",
      "Totes les llistes compartides que vam provar van morir igual: algú s'havia de recordar que l'app existia, trobar-la i iniciar sessió. La llista només importa en els deu segons en què ets davant de la nevera."
    ),
    description: l(
      "A sticker on the fridge door is the entire onboarding. Tap a phone against it and the family list opens: no store, no account, no password. The software is anchored to the object people already walk up to.",
      "Una pegatina en la puerta de la nevera es todo el onboarding. Acercas el móvil y se abre la lista familiar: sin store, sin cuenta, sin contraseña. El software está anclado al objeto al que la gente ya se acerca.",
      "Un adhesiu a la porta de la nevera és tot l'onboarding. Hi acostes el mòbil i s'obre la llista familiar: sense store, sense compte, sense contrasenya. El software està ancorat a l'objecte al qual la gent ja s'acosta."
    ),
    changed: l(
      "The first version was a normal web app with a login, and it died the way every previous shared list had. Watching my own family not use it was the useful part: nobody refused, they just never got as far as opening it. The fix was not a better screen, it was removing the step before the screen. The NFC sticker exists because the app was never the problem, getting to the app was.",
      "La primera versión era una web normal con login, y murió como habían muerto todas las listas compartidas anteriores. Ver a mi propia familia no usarla fue la parte útil: nadie se negó, simplemente nunca llegaban a abrirla. El arreglo no era una pantalla mejor, era quitar el paso anterior a la pantalla. La pegatina NFC existe porque la app nunca fue el problema, llegar a la app sí.",
      "La primera versió era una web normal amb login, i va morir com havien mort totes les llistes compartides anteriors. Veure la meva pròpia família no fer-la servir va ser la part útil: ningú s'hi va negar, simplement mai arribaven a obrir-la. L'arreglo no era una pantalla millor, era treure el pas anterior a la pantalla. L'adhesiu NFC existeix perquè l'app mai va ser el problema, arribar a l'app sí."
    ),
    role: l("UX + Web", "UX + Web", "UX + Web"),
    context: l("NFC-anchored family utility", "Utilidad familiar anclada a NFC", "Utilitat familiar ancorada a NFC"),
    age: 18,
    tags: ["NFC", "UX"], // universal abbreviations, no translation needed
    tech: ["NFC", "Web", "Realtime DB"],
    learning: l(
      "Family is the hardest usability test there is, because nobody in it is being polite. If a parent holding shopping bags cannot use it in three seconds, the design is wrong, and they will tell you so.",
      "La familia es el test de usabilidad más duro que existe, porque nadie en ella está siendo amable. Si un padre con bolsas de la compra no puede usarla en tres segundos, el diseño está mal, y te lo dirán.",
      "La família és el test d'usabilitat més dur que existeix, perquè ningú hi està sent amable. Si un pare amb bosses de la compra no pot fer-la servir en tres segons, el disseny està malament, i t'ho diran."
    ),
    repo: "https://github.com/xavibosch/nevera-bosch",
    images: [IMG + "nevera-real-hero.jpg", IMG + "nevera-real.png"],
  },
  {
    id: "07",
    name: "Haptic Hunter",
    tagline: l(
      "A game you can play with your eyes closed.",
      "Un juego que puedes jugar con los ojos cerrados.",
      "Un joc que pots jugar amb els ulls tancats."
    ),
    builtFor: l(
      "Blind, deaf and low vision players, who are usually handed a separate accessible version of a game rather than the game everyone else is playing.",
      "Jugadores ciegos, sordos y con baja visión, a quienes normalmente se les da una versión accesible aparte en vez del juego al que juegan los demás.",
      "Jugadors cecs, sords i amb baixa visió, a qui normalment se'ls dona una versió accessible a part en comptes del joc al qual juguen els altres."
    ),
    problem: l(
      "Accessibility usually arrives as a mode you switch on at the end. By then the game already assumes you can see it, and the mode is a worse version of it.",
      "La accesibilidad suele llegar como un modo que activas al final. Para entonces el juego ya da por hecho que lo ves, y el modo es una versión peor.",
      "L'accessibilitat sol arribar com un mode que actives al final. Aleshores el joc ja dona per fet que el veus, i el mode és una versió pitjor."
    ),
    description: l(
      "You hunt invisible signals through haptics, dynamic sound and minimal visuals. The same game works on any combination of senses, because the three channels carry the same information rather than one carrying it and the others decorating.",
      "Cazas señales invisibles mediante háptica, sonido dinámico y visuales mínimos. El mismo juego funciona con cualquier combinación de sentidos, porque los tres canales llevan la misma información en vez de uno llevarla y los otros decorar.",
      "Caces senyals invisibles mitjançant hàptica, so dinàmic i visuals mínims. El mateix joc funciona amb qualsevol combinació de sentits, perquè els tres canals porten la mateixa informació en comptes que un la porti i els altres decorin."
    ),
    changed: l(
      "The haptics were the hard part, and not for the reason I expected. I designed and tuned them against the simulator, where a vibration is a line in a log rather than something you feel, so everything looked correct and none of it was. On a real device the patterns I had been most pleased with were the ones you could not tell apart in the hand. From then on nothing counted until it had been felt on hardware, which is slower and the only honest way to judge it.",
      "La háptica fue la parte difícil, y no por lo que esperaba. La diseñé y la ajusté contra el simulador, donde una vibración es una línea en un log y no algo que sientes, así que todo parecía correcto y nada lo era. En un dispositivo real, los patrones de los que estaba más satisfecho eran justo los que no se distinguían en la mano. A partir de ahí nada contaba hasta haberlo sentido en hardware, que es más lento y la única forma honesta de juzgarlo.",
      "L'hàptica va ser la part difícil, i no pel que esperava. La vaig dissenyar i ajustar contra el simulador, on una vibració és una línia en un log i no res que sentis, així que tot semblava correcte i res ho era. En un dispositiu real, els patrons dels quals estava més satisfet eren justament els que no es distingien a la mà. A partir d'aquí res comptava fins haver-ho sentit en hardware, que és més lent i l'única manera honesta de jutjar-ho."
    ),
    role: l("Interaction + Accessibility", "Interacción + Accesibilidad", "Interacció + Accessibilitat"),
    context: l("Multisensory accessible game", "Juego accesible multisensorial", "Joc accessible multisensorial"),
    age: 18,
    tags: [l("Accessibility", "Accesibilidad", "Accessibilitat"), l("Haptics", "Háptica", "Hàptica")],
    tech: ["Core Haptics", "Spatial Audio", "Swift"],
    learning: l(
      "No simulator tells you how a haptic feels, so every judgement had to be made on a real device in the hand. Building the redundant channels first made accessibility a property of the system instead of a feature bolted on at the end.",
      "Ningún simulador te dice cómo se siente una vibración, así que cada decisión había que tomarla con el dispositivo real en la mano. Construir primero los canales redundantes hizo de la accesibilidad una propiedad del sistema en vez de una función añadida al final.",
      "Cap simulador et diu com se sent una vibració, així que cada decisió s'havia de prendre amb el dispositiu real a la mà. Construir primer els canals redundants va fer de l'accessibilitat una propietat del sistema en comptes d'una funció afegida al final."
    ),
    repo: "https://github.com/xavibosch/haptic-hunter",
    images: [IMG + "haptic-real-hero.jpg", IMG + "haptic-real-game.jpg", IMG + "haptic-real-accessibility.jpg"],
  },
  {
    id: "08",
    name: "Remote Robot Car",
    tagline: l(
      "One message travelling from a thumb to four wheels.",
      "Un mensaje viajando de un pulgar a cuatro ruedas.",
      "Un missatge viatjant d'un polze a quatre rodes."
    ),
    builtFor: l(
      "La Salle's Electronics course, and for me: the first thing I built where a mistake in the code moved something in the room.",
      "La asignatura de Electrónica de La Salle, y para mí: lo primero que construí donde un error en el código movía algo en la habitación.",
      "L'assignatura d'Electrònica de La Salle, i per a mi: la primera cosa que vaig construir on un error al codi movia alguna cosa a l'habitació."
    ),
    problem: l(
      "Driving it from a phone meant either a server I would have to keep alive, or being on the same network as the car. Neither is a robot you can actually use.",
      "Conducirlo desde el móvil implicaba o un servidor que tendría que mantener vivo, o estar en la misma red que el coche. Ninguna de las dos es un robot que puedas usar de verdad.",
      "Conduir-lo des del mòbil implicava o un servidor que hauria de mantenir viu, o ser a la mateixa xarxa que el cotxe. Cap de les dues és un robot que puguis fer servir de debò."
    ),
    description: l(
      "A four wheel ESP32 car driven from any phone through a public MQTT broker, with an autonomous layer that brakes, reverses and beeps when the world gets too close. Public broker, private robot.",
      "Un coche de cuatro ruedas con ESP32 conducido desde cualquier móvil a través de un broker MQTT público, con una capa autónoma que frena, retrocede y pita cuando el mundo se acerca demasiado. Broker público, robot privado.",
      "Un cotxe de quatre rodes amb ESP32 conduït des de qualsevol mòbil a través d'un broker MQTT públic, amb una capa autònoma que frena, retrocedeix i pita quan el món s'acosta massa. Broker públic, robot privat."
    ),
    changed: l(
      "When the assembled car misbehaved I debugged the assembled car, which cost hours and told me almost nothing: with motors, sensors and the radio all live at once, any of them could have been the liar. Pulling the parts out and testing each one alone found it in minutes. Now I build the pieces so they can be run in isolation from the start, because a system you can only test as a whole is a system you cannot really test.",
      "Cuando el coche montado fallaba, depuraba el coche montado, lo que costaba horas y no decía casi nada: con motores, sensores y radio activos a la vez, cualquiera podía ser el que mentía. Sacar las piezas y probar cada una por separado lo encontró en minutos. Ahora construyo las partes para poder ejecutarlas aisladas desde el principio, porque un sistema que solo puedes probar entero es un sistema que en realidad no puedes probar.",
      "Quan el cotxe muntat fallava, depurava el cotxe muntat, cosa que costava hores i no deia gairebé res: amb motors, sensors i ràdio actius alhora, qualsevol podia ser el que mentia. Treure les peces i provar cadascuna per separat ho va trobar en minuts. Ara construeixo les parts per poder executar-les aïllades des del principi, perquè un sistema que només pots provar sencer és un sistema que en realitat no pots provar."
    ),
    role: l("Hardware + Systems", "Hardware + Sistemas", "Hardware + Sistemes"),
    context: l("La Salle · Electronics course", "La Salle · Asignatura de Electrónica", "La Salle · Assignatura d'Electrònica"),
    age: 18,
    tags: [l("Robotics", "Robótica", "Robòtica"), l("Systems", "Sistemas", "Sistemes")],
    tech: ["ESP32", "MQTT", "Ultrasonic"],
    learning: l(
      "Leaning on a public broker deleted a whole server from the project. Testing components in isolation found in minutes what debugging the assembled car had hidden for hours.",
      "Apoyarme en un broker público borró un servidor entero del proyecto. Probar los componentes por separado encontró en minutos lo que depurar el coche montado había escondido durante horas.",
      "Recolzar-me en un broker públic va esborrar un servidor sencer del projecte. Provar els components per separat va trobar en minuts el que depurar el cotxe muntat havia amagat durant hores."
    ),
    repo: "https://github.com/xavibosch/remote-robot-car",
    video: "https://youtu.be/cBed9lY9uKQ",
    images: [IMG + "cotxe-hero.jpg", IMG + "cotxe-build.jpg", IMG + "cotxe-wiring.jpg", IMG + "cotxe-final.jpg"],
  },
  {
    id: "09",
    name: "laSallefy",
    tagline: l("No decoder: build the sound.", "Sin decodificador: crear el sonido.", "Sense descodificador: crear el so."),
    builtFor: l(
      "La Salle's object oriented programming course, built in a pair. The constraint was the point: no audio files allowed.",
      "La asignatura de programación orientada a objetos de La Salle, hecho en pareja. La restricción era el objetivo: nada de archivos de audio.",
      "L'assignatura de programació orientada a objectes de La Salle, fet en parella. La restricció era l'objectiu: res de fitxers d'àudio."
    ),
    problem: l(
      "A media player that reads files is a file browser with a play button. Without files, there is no shortcut: the architecture has to hold the whole thing up.",
      "Un reproductor que lee archivos es un explorador de archivos con un botón de play. Sin archivos no hay atajo: la arquitectura tiene que sostenerlo todo.",
      "Un reproductor que llegeix fitxers és un explorador de fitxers amb un botó de play. Sense fitxers no hi ha drecera: l'arquitectura ho ha de sostenir tot."
    ),
    description: l(
      "Every song is a sequence of frequencies synthesised in real time by four custom wave engines, inside strict layers. An AlbumGenerator assembles random albums filtered by mood and target length.",
      "Cada canción es una secuencia de frecuencias sintetizada en tiempo real por cuatro motores de onda propios, dentro de capas estrictas. Un AlbumGenerator monta álbumes aleatorios filtrados por mood y duración objetivo.",
      "Cada cançó és una seqüència de freqüències sintetitzada en temps real per quatre motors d'ona propis, dins de capes estrictes. Un AlbumGenerator munta àlbums aleatoris filtrats per mood i durada objectiu."
    ),
    changed: l(
      "Working in a pair, we kept blocking each other: one of us could not start until the other had finished the class underneath. The fix was not better coordination, it was agreeing the interfaces between the layers before either of us wrote anything behind them. After that we could both build against a contract instead of against each other's unfinished work.",
      "Trabajando en pareja nos bloqueábamos constantemente: uno no podía empezar hasta que el otro terminara la clase de debajo. El arreglo no fue coordinarnos mejor, fue acordar las interfaces entre capas antes de que ninguno escribiera nada detrás de ellas. A partir de ahí los dos podíamos construir contra un contrato en vez de contra el trabajo a medias del otro.",
      "Treballant en parella ens bloquejàvem constantment: un no podia començar fins que l'altre acabés la classe de sota. L'arreglo no va ser coordinar-nos millor, va ser acordar les interfícies entre capes abans que cap dels dos escrivís res al darrere. A partir d'aquí tots dos podíem construir contra un contracte en comptes de contra la feina a mitges de l'altre."
    ),
    role: l("Architecture + Engineering", "Arquitectura + Ingeniería", "Arquitectura + Enginyeria"),
    context: l("La Salle · OOP course (pair)", "La Salle · Asignatura de POO (en pareja)", "La Salle · Assignatura de POO (en parella)"),
    age: 18,
    tags: [l("Systems", "Sistemas", "Sistemes"), "Java"],
    tech: ["Java", "OOP", "DSP"],
    learning: l(
      "Strict layers are what made working in a pair possible: we could each build against an interface instead of waiting for the other. The constraint produced a cleaner architecture than a file based player ever would have.",
      "Las capas estrictas son lo que hizo posible trabajar en pareja: cada uno podía construir contra una interfaz en vez de esperar al otro. La restricción produjo una arquitectura más limpia de la que habría salido de un reproductor basado en archivos.",
      "Les capes estrictes són el que va fer possible treballar en parella: cadascú podia construir contra una interfície en comptes d'esperar l'altre. La restricció va produir una arquitectura més neta de la que hauria sortit d'un reproductor basat en fitxers."
    ),
    repo: "https://github.com/xavibosch/lasallefy-java",
    images: [IMG + "sallefy-hero.svg"],
  },
  {
    id: "10",
    name: "Gesture TV",
    tagline: l(
      "The remote was the barrier, so I removed it.",
      "El mando era la barrera, así que lo quité.",
      "El comandament era la barrera, així que el vaig treure."
    ),
    builtFor: l(
      "Someone I know who cannot use a television remote. Not a persona, not a user type: one person, whose hands the buttons were never designed for.",
      "Una persona que conozco y que no puede usar el mando de la televisión. No una persona ficticia, no un tipo de usuario: una persona, para cuyas manos los botones nunca se diseñaron.",
      "Una persona que conec i que no pot fer servir el comandament de la televisió. No una persona fictícia, no un tipus d'usuari: una persona, per a les mans de la qual els botons mai es van dissenyar."
    ),
    problem: l(
      "Watching television meant asking someone else to press the buttons. The barrier was not the television, it was the twenty small keys you have to hit precisely to reach it.",
      "Ver la televisión significaba pedirle a otra persona que pulsara los botones. La barrera no era la televisión, eran las veinte teclas pequeñas que hay que acertar para llegar a ella.",
      "Mirar la televisió volia dir demanar a una altra persona que premés els botons. La barrera no era la televisió, eren les vint tecles petites que has d'encertar per arribar-hi."
    ),
    description: l(
      "Gesture TV replaces the remote completely. A clap turns the television on, a hand held inside a zone of the screen opens Netflix or YouTube or moves through the menu, and local voice commands cover the rest. No remote, no phone, and nobody to ask.",
      "Gesture TV sustituye el mando por completo. Una palmada enciende la televisión, la mano dentro de una zona de la pantalla abre Netflix o YouTube o se mueve por el menú, y los comandos de voz locales cubren el resto. Sin mando, sin móvil y sin tener que pedírselo a nadie.",
      "Gesture TV substitueix el comandament del tot. Una palmada encén la televisió, la mà dins d'una zona de la pantalla obre Netflix o YouTube o es mou pel menú, i les ordres de veu locals cobreixen la resta. Sense comandament, sense mòbil i sense haver-ho de demanar a ningú."
    ),
    changed: l(
      "The version that worked best technically was the one I threw away. Full shell access to the television made every feature easy, and it also meant a camera in someone's living room sat behind a door I had left open. I gave up the shell and rebuilt on Wake on LAN and a narrow command set, which cost me features. A system that exists to give someone independence cannot ask for their privacy as the price.",
      "La versión que mejor funcionaba técnicamente es la que tiré. El acceso completo de shell a la televisión hacía cada función fácil, y también significaba que una cámara en el salón de alguien quedaba detrás de una puerta que yo había dejado abierta. Renuncié al shell y lo rehice sobre Wake on LAN y un conjunto reducido de comandos, lo que me costó funciones. Un sistema que existe para dar independencia a alguien no puede pedirle su privacidad a cambio.",
      "La versió que millor funcionava tècnicament és la que vaig llençar. L'accés complet de shell a la televisió feia cada funció fàcil, i també volia dir que una càmera al menjador d'algú quedava darrere d'una porta que jo havia deixat oberta. Vaig renunciar al shell i ho vaig refer sobre Wake on LAN i un conjunt reduït d'ordres, cosa que em va costar funcions. Un sistema que existeix per donar independència a algú no li pot demanar la privacitat a canvi."
    ),
    role: l("Interaction Design + Computer Vision", "Diseño de Interacción + Visión por Computador", "Disseny d'Interacció + Visió per Computador"),
    context: l("Hands free TV control", "Control de TV sin manos", "Control de TV sense mans"),
    age: 18,
    tags: [l("Accessibility", "Accesibilidad", "Accessibilitat"), l("Vision", "Visión", "Visió")],
    tech: ["Python", "OpenCV", "MediaPipe", "Vosk", "Wake on LAN"],
    learning: l(
      "Designing for one named person ends every abstract argument in seconds. The camera never writes a frame to disk, because a system that watches someone's living room to give them independence cannot charge them their privacy for it.",
      "Diseñar para una persona con nombre acaba con cualquier discusión abstracta en segundos. La cámara no guarda ni un fotograma, porque un sistema que mira el salón de alguien para darle independencia no puede cobrársela en privacidad.",
      "Dissenyar per a una persona amb nom acaba amb qualsevol discussió abstracta en segons. La càmera no desa ni un fotograma, perquè un sistema que mira el menjador d'algú per donar-li independència no li pot cobrar la privacitat a canvi."
    ),
    repo: "https://github.com/xavibosch/gesture-tv",
    images: [],
  },
  {
    id: "11",
    name: "Reps",
    tagline: l(
      "Train without touching anything.",
      "Entrenar sin tocar nada.",
      "Entrenar sense tocar res."
    ),
    builtFor: l(
      "Me, in a garage gym: one bench, one barbell, two dumbbells and thirty kilos of plates. No screen you want to touch with chalk on your hands.",
      "Para mí, en un gimnasio de garaje: un banco, una barra, dos mancuernas y treinta kilos de discos. Ninguna pantalla que quieras tocar con magnesio en las manos.",
      "Per a mi, en un gimnàs de garatge: un banc, una barra, dues manuelles i trenta quilos de discos. Cap pantalla que vulguis tocar amb magnesi a les mans."
    ),
    problem: l(
      "Between sets your hands are chalked or holding a bar, the phone has locked itself, and you have lost both the set count and the music. Every existing app assumes a free, clean hand.",
      "Entre series tienes las manos con magnesio o sujetando una barra, el móvil se ha bloqueado, y has perdido la cuenta de las series y la música. Todas las apps que existen dan por hecho una mano libre y limpia.",
      "Entre sèries tens les mans amb magnesi o aguantant una barra, el mòbil s'ha bloquejat, i has perdut el compte de les sèries i la música. Totes les apps que existeixen donen per fet una mà lliure i neta."
    ),
    description: l(
      "One screen: the Spotify player, the rest timer, the exercise queue and the session panel. You point a finger at the camera and hold, and a ring fills before anything happens. It logs the set, starts the rest countdown, moves to the next exercise on its own, and ends with what you actually lifted. Runs as a Mac app so the camera opens on launch instead of asking every time.",
      "Una pantalla: el reproductor de Spotify, el temporizador de descanso, la cola de ejercicios y el panel de sesión. Señalas con el dedo a la cámara y mantienes, y un anillo se llena antes de que pase nada. Registra la serie, arranca la cuenta atrás del descanso, pasa al siguiente ejercicio solo, y termina con lo que has levantado de verdad. Funciona como app de Mac para que la cámara se abra al iniciar en vez de preguntar cada vez.",
      "Una pantalla: el reproductor de Spotify, el temporitzador de descans, la cua d'exercicis i el panell de sessió. Assenyales amb el dit a la càmera i mantens, i un anell s'omple abans que passi res. Registra la sèrie, arrenca el compte enrere del descans, passa al següent exercici sol, i acaba amb el que has aixecat de debò. Funciona com a app de Mac perquè la càmera s'obri en arrencar en comptes de preguntar cada vegada."
    ),
    changed: l(
      "I built a swipe gesture to change exercise and it kept firing by accident. I added guards: only when the hand was armed, only when the index was extended, only past an axis ratio. It still fired. Then I understood why none of it could work: the index finger is the cursor, so a fast move to the right is identical to a swipe to the right. The gesture was ambiguous by construction, not badly tuned. I deleted it and left the job to the on screen arrows, which say what they do. Cutting the feature was the fix.",
      "Hice un gesto de swipe para cambiar de ejercicio y se disparaba solo. Añadí condiciones: solo con la mano armada, solo con el índice extendido, solo pasado un ratio de ejes. Seguía disparándose. Entonces entendí por qué nada de eso podía funcionar: el índice es el cursor, así que un movimiento rápido a la derecha es idéntico a un swipe a la derecha. El gesto era ambiguo por construcción, no mal calibrado. Lo borré y dejé el trabajo a las flechas en pantalla, que dicen lo que hacen. Quitar la función era el arreglo.",
      "Vaig fer un gest de swipe per canviar d'exercici i es disparava sol. Hi vaig afegir condicions: només amb la mà armada, només amb l'índex estirat, només passat un ratio d'eixos. Seguia disparant-se. Aleshores vaig entendre per què res d'allò podia funcionar: l'índex és el cursor, així que un moviment ràpid a la dreta és idèntic a un swipe a la dreta. El gest era ambigu per construcció, no mal calibrat. El vaig esborrar i vaig deixar la feina a les fletxes de pantalla, que diuen el que fan. Treure la funció era l'arreglo."
    ),
    role: l("Product Design + Engineering", "Diseño de Producto + Ingeniería", "Disseny de Producte + Enginyeria"),
    context: l("Hands free gym dashboard", "Panel de gimnasio sin manos", "Panell de gimnàs sense mans"),
    age: 18,
    tags: [l("Vision", "Visión", "Visió"), l("Product", "Producto", "Producte")],
    tech: ["React", "MediaPipe", "Spotify API", "Electron"],
    learning: l(
      "A hand cursor was selecting buttons a couple of centimetres from where it was pointing. The cause was not the tracking: an ancestor with a CSS transform becomes the containing block for anything fixed inside it, so the dot was laid out in the scaled frame while the hit test read the real viewport. Rendering the cursor outside that frame put both back in the same coordinate system. Most of what looks like a tracking problem is a coordinate problem.",
      "Un cursor de mano seleccionaba botones a un par de centímetros de donde apuntaba. La causa no era el tracking: un ancestro con transform de CSS se convierte en el bloque contenedor de todo lo fixed que haya dentro, así que el punto se colocaba en el marco escalado mientras el hit test leía el viewport real. Sacar el cursor de ese marco devolvió a ambos al mismo sistema de coordenadas. Casi todo lo que parece un problema de tracking es un problema de coordenadas.",
      "Un cursor de mà seleccionava botons a un parell de centímetres d'on apuntava. La causa no era el tracking: un ancestre amb transform de CSS es converteix en el bloc contenidor de tot el que sigui fixed a dins, així que el punt es col·locava al marc escalat mentre el hit test llegia el viewport real. Treure el cursor d'aquell marc va tornar tots dos al mateix sistema de coordenades. Gairebé tot el que sembla un problema de tracking és un problema de coordenades."
    ),
    live: "https://home-gym-nine.vercel.app",
    repo: "https://github.com/xavibosch/reps",
    images: [
      IMG + "reps-home.jpg",
      IMG + "reps-session.jpg",
      IMG + "reps-rest.jpg",
      IMG + "reps-leave.jpg",
      IMG + "reps-summary.jpg",
      IMG + "reps-log.jpg",
      IMG + "reps-run.jpg",
    ],
  },
];

export const techMarquee = [
  "Swift", "SwiftUI", "Python", "Ollama", "Arduino", "ESP32",
  "MQTT", "NFC", "Core Haptics", "Firestore", "Java", "macOS",
  "React", "MediaPipe", "Electron", "Widevine",
  "Interaction Design", "Systems Thinking", "Prototyping",
];
