const l = (en, es, ca) => ({ en, es, ca })

export const betsyDeepDive = {
  accent: '#4ade80',
  eyebrow: l('SOCIAL SPORTS ARENA', 'ARENA SOCIAL DEPORTIVA', 'ARENA SOCIAL ESPORTIVA'),
  statement: l(
    'Betsy turns a group of friends into a private league: real fixtures, virtual points, live rankings and 1v1 duels: all the tension of betting with zero real money.',
    'Betsy convierte un grupo de amigos en una liga privada: partidos reales, puntos virtuales, rankings en vivo y duelos 1v1: toda la tensión de apostar sin dinero real.',
    'Betsy converteix un grup d\'amics en una lliga privada: partits reals, punts virtuals, rànquings en directe i duels 1v1: tota la tensió d\'apostar sense diners reals.'
  ),
  stats: [
    { value: '0€', label: l('REAL MONEY', 'DINERO REAL', 'DINERS REALS'), detail: l('Virtual points only. Pride is the currency.', 'Solo puntos virtuales. El orgullo es la moneda.', 'Només punts virtuals. L\'orgull és la moneda.') },
    { value: '1v1', label: l('ARENA DUELS', 'DUELOS ARENA', 'DUELS ARENA'), detail: l('Direct head-to-head challenges inside the league.', 'Desafíos directos dentro de la liga.', 'Desafiaments directes dins la lliga.') },
    { value: 'LIVE', label: l('SETTLEMENT', 'RESOLUCIÓN', 'RESOLUCIÓ'), detail: l('Real match scores settle every bet automatically.', 'Los resultados reales resuelven cada apuesta automáticamente.', 'Els resultats reals resolen cada aposta automàticament.') },
    { value: '3', label: l('CORE LOOPS', 'BUCLES CLAVE', 'BUCLES CLAU'), detail: l('Bet on fixtures, climb the ranking, duel your rivals.', 'Apostar, escalar el ranking y batirte en duelo.', 'Apostar, escalar el rànquing i batre\'t en duel.') },
  ],
  flowTitle: l('One matchday, one loop', 'Una jornada, un ciclo', 'Una jornada, un cicle'),
  flowLead: l('The product is the tension between friends. Every system exists to feed it.', 'El producto es la tensión entre amigos. Cada sistema existe para alimentarla.', 'El producte és la tensió entre amics. Cada sistema existeix per alimentar-la.'),
  flow: [
    { number: '01', title: l('Pick', 'Elegir', 'Triar'), body: l('Real fixtures from live football data land in the league feed.', 'Partidos reales de datos de fútbol en vivo llegan al feed de la liga.', 'Partits reals de dades de futbol en directe arriben al feed de la lliga.') },
    { number: '02', title: l('Bet', 'Apostar', 'Apostar'), body: l('Members place virtual-point bets before kick-off. Odds shape the risk.', 'Los miembros apuestan puntos virtuales antes del inicio. Las cuotas marcan el riesgo.', 'Els membres aposten punts virtuals abans de l\'inici. Les quotes marquen el risc.') },
    { number: '03', title: l('Play', 'Jugar', 'Jugar'), body: l('The match happens in the real world. The app just waits: honestly.', 'El partido ocurre en el mundo real. La app solo espera: honestamente.', 'El partit passa al món real. L\'app només espera: honestament.') },
    { number: '04', title: l('Settle', 'Resolver', 'Resoldre'), body: l('Final scores resolve every bet with no human input at all.', 'Los resultados finales resuelven cada apuesta sin intervención humana.', 'Els resultats finals resolen cada aposta sense intervenció humana.') },
    { number: '05', title: l('Rank', 'Clasificar', 'Classificar'), body: l('The leaderboard shifts, duels resolve, and the group chat ignites.', 'El ranking cambia, los duelos se resuelven y el chat del grupo arde.', 'El rànquing canvia, els duels es resolen i el xat del grup s\'encén.') },
  ],
  capabilitiesTitle: l('A league in your pocket', 'Una liga en el bolsillo', 'Una lliga a la butxaca'),
  capabilitiesLead: l('Every surface is built for a closed circle of friends, not an anonymous crowd.', 'Cada superficie está pensada para un círculo cerrado de amigos, no para una multitud anónima.', 'Cada superfície està pensada per a un cercle tancat d\'amics, no per a una multitud anònima.'),
  capabilities: [
    { title: l('Private leagues', 'Ligas privadas', 'Lligues privades'), body: l('Invite-only circles with their own point economy and history.', 'Círculos por invitación con su propia economía de puntos e historial.', 'Cercles per invitació amb la seva pròpia economia de punts i historial.') },
    { title: l('Virtual economy', 'Economía virtual', 'Economia virtual'), body: l('Balances, odds and payouts tuned so no one is ever out of the game.', 'Saldos, cuotas y pagos ajustados para que nadie quede fuera del juego.', 'Saldos, quotes i pagaments ajustats perquè ningú quedi fora del joc.') },
    { title: l('Live rankings', 'Rankings en vivo', 'Rànquings en directe'), body: l('A leaderboard that updates the moment matches end.', 'Una clasificación que se actualiza al acabar cada partido.', 'Una classificació que s\'actualitza en acabar cada partit.') },
    { title: l('Arena duels', 'Duelos de arena', 'Duels d\'arena'), body: l('Challenge one rival to a head-to-head over a single match.', 'Reta a un rival a un cara a cara en un solo partido.', 'Repta un rival a un cara a cara en un sol partit.') },
    { title: l('World Cup mode', 'Modo Mundial', 'Mode Mundial'), body: l('Special competitions layered on top of big tournaments.', 'Competiciones especiales sobre los grandes torneos.', 'Competicions especials sobre els grans tornejos.') },
    { title: l('Quota-safe backend', 'Backend con límites', 'Backend amb límits'), body: l('Firebase Functions guard the free-tier football API so the league never dies mid-season.', 'Firebase Functions protege la API gratuita para que la liga nunca muera a mitad de temporada.', 'Firebase Functions protegeix l\'API gratuïta perquè la lliga no mori mai a mitja temporada.') },
  ],
  decisionsTitle: l('What shaped Betsy', 'Decisiones que formaron Betsy', 'Decisions que van formar Betsy'),
  decisions: [
    { title: l('No real money, by design', 'Sin dinero real, por diseño', 'Sense diners reals, per disseny'), body: l('Removing money removes the darkness of gambling and keeps only the social tension: which was the fun part all along.', 'Quitar el dinero elimina lo oscuro de las apuestas y deja solo la tensión social: que siempre fue la parte divertida.', 'Treure els diners elimina la part fosca de les apostes i deixa només la tensió social: que sempre va ser la part divertida.') },
    { title: l('Settlement must be trustless', 'La resolución no puede depender de nadie', 'La resolució no pot dependre de ningú'), body: l('If a human settles bets, arguments follow. Real score data resolving everything automatically is what makes the league feel fair.', 'Si una persona resuelve las apuestas, llegan las discusiones. Los datos reales resolviéndolo todo hacen que la liga sea justa.', 'Si una persona resol les apostes, arriben les discussions. Les dades reals resolent-ho tot fan que la lliga sigui justa.') },
    { title: l('Backend and UI grow together', 'Backend y UI crecen juntos', 'Backend i UI creixen junts'), body: l('Building Firestore rules and SwiftUI views in parallel surfaced product problems no wireframe ever showed.', 'Construir reglas de Firestore y vistas SwiftUI en paralelo reveló problemas que ningún wireframe mostró.', 'Construir regles de Firestore i vistes SwiftUI en paral·lel va revelar problemes que cap wireframe va mostrar.') },
    { title: l('Pride is the retention loop', 'El orgullo es la retención', 'L\'orgull és la retenció'), body: l('People come back to defend a ranking position against friends, not to earn anything. Social stakes beat rewards.', 'La gente vuelve para defender su posición ante amigos, no para ganar nada. Lo social vence al premio.', 'La gent torna per defensar la seva posició davant amics, no per guanyar res. El social venç el premi.') },
  ],
}

export const hapticHunterDeepDive = {
  accent: '#fb923c',
  eyebrow: l('EYES-FREE ARCADE GAME', 'JUEGO ARCADE SIN VISTA', 'JOC ARCADE SENSE VISTA'),
  statement: l(
    'Haptic Hunter is a hunting game you can play with your eyes closed: direction, distance and impact travel through touch, sound and light in parallel: so blind, deaf and sighted players share the exact same game.',
    'Haptic Hunter es un juego de caza que puedes jugar con los ojos cerrados: dirección, distancia e impacto viajan por tacto, sonido y luz en paralelo: jugadores ciegos, sordos y videntes comparten el mismo juego.',
    'Haptic Hunter és un joc de caça que pots jugar amb els ulls tancats: direcció, distància i impacte viatgen per tacte, so i llum en paral·lel: jugadors cecs, sords i vidents comparteixen el mateix joc.'
  ),
  stats: [
    { value: '3', label: l('FEEDBACK LAYERS', 'CAPAS DE FEEDBACK', 'CAPES DE FEEDBACK'), detail: l('Haptics, spatial audio and minimal visuals carry identical information.', 'Háptica, audio espacial y visuales mínimos llevan información idéntica.', 'Hàptica, àudio espacial i visuals mínims porten informació idèntica.') },
    { value: '4', label: l('GAME MODES', 'MODOS DE JUEGO', 'MODES DE JOC'), detail: l('Blind, Visual, Precision and a Daily Challenge.', 'Ciego, Visual, Precisión y un Reto Diario.', 'Cec, Visual, Precisió i un Repte Diari.') },
    { value: '0', label: l('VISUALS REQUIRED', 'VISUALES NECESARIOS', 'VISUALS NECESSARIS'), detail: l('Fully playable with the screen off: that is the point.', 'Jugable con la pantalla apagada: esa es la idea.', 'Jugable amb la pantalla apagada: aquesta és la idea.') },
    { value: '1', label: l('SHARED CORE', 'NÚCLEO COMPARTIDO', 'NUCLI COMPARTIT'), detail: l('One gameplay loop for every combination of senses.', 'Un mismo gameplay para cualquier combinación de sentidos.', 'Un mateix gameplay per a qualsevol combinació de sentits.') },
  ],
  flowTitle: l('A hunt you can feel', 'Una caza que se siente', 'Una caça que se sent'),
  flowLead: l('The signal is invisible. Your body becomes the radar.', 'La señal es invisible. Tu cuerpo se convierte en el radar.', 'El senyal és invisible. El teu cos es converteix en el radar.'),
  flow: [
    { number: '01', title: l('Spawn', 'Aparecer', 'Aparèixer'), body: l('A target spawns somewhere around you, silent and unseen.', 'Un objetivo aparece a tu alrededor, silencioso e invisible.', 'Un objectiu apareix al teu voltant, silenciós i invisible.') },
    { number: '02', title: l('Sweep', 'Barrer', 'Escombrar'), body: l('You rotate the phone; haptic pulses sharpen as you point closer.', 'Giras el móvil; los pulsos hápticos se afinan al apuntar mejor.', 'Gires el mòbil; els polsos hàptics s\'afinen en apuntar millor.') },
    { number: '03', title: l('Lock', 'Fijar', 'Fixar'), body: l('Pulse rate, pitch and glow converge: every sense says "now".', 'La frecuencia, el tono y el brillo convergen: cada sentido dice "ahora".', 'La freqüència, el to i la brillantor convergeixen: cada sentit diu "ara".') },
    { number: '04', title: l('Strike', 'Disparar', 'Disparar'), body: l('You fire. The game resolves the shot against the true bearing.', 'Disparas. El juego resuelve el tiro contra la dirección real.', 'Dispares. El joc resol el tret contra la direcció real.') },
    { number: '05', title: l('Confirm', 'Confirmar', 'Confirmar'), body: l('Hit or miss returns through all three channels at once.', 'Acierto o fallo vuelve por los tres canales a la vez.', 'Encert o errada torna pels tres canals alhora.') },
  ],
  capabilitiesTitle: l('Accessibility as the engine', 'La accesibilidad como motor', 'L\'accessibilitat com a motor'),
  capabilitiesLead: l('Not an accessibility mode bolted on top: redundant sensory channels are the architecture.', 'No es un modo de accesibilidad añadido: los canales sensoriales redundantes son la arquitectura.', 'No és un mode d\'accessibilitat afegit: els canals sensorials redundants són l\'arquitectura.'),
  capabilities: [
    { title: l('Haptic radar', 'Radar háptico', 'Radar hàptic'), body: l('Core Haptics patterns encode bearing and distance into your palm.', 'Core Haptics codifica dirección y distancia en la palma de tu mano.', 'Core Haptics codifica direcció i distància al palmell de la mà.') },
    { title: l('Spatial audio', 'Audio espacial', 'Àudio espacial'), body: l('AVAudio pitch and pan mirror exactly what the haptics say.', 'El tono y el paneo de AVAudio reflejan exactamente lo que dice la háptica.', 'El to i el panning d\'AVAudio reflecteixen exactament el que diu l\'hàptica.') },
    { title: l('Minimal visuals', 'Visuales mínimos', 'Visuals mínims'), body: l('A glow layer for deaf players: the same data, drawn instead of felt.', 'Una capa de brillo para jugadores sordos: los mismos datos, dibujados en vez de sentidos.', 'Una capa de brillantor per a jugadors sords: les mateixes dades, dibuixades en lloc de sentides.') },
    { title: l('Blind mode', 'Modo ciego', 'Mode cec'), body: l('Screen fully off. The purest version of the game.', 'Pantalla apagada. La versión más pura del juego.', 'Pantalla apagada. La versió més pura del joc.') },
    { title: l('Daily challenge', 'Reto diario', 'Repte diari'), body: l('One shared hunt per day with online leaderboards.', 'Una caza compartida al día con clasificaciones online.', 'Una caça compartida al dia amb classificacions en línia.') },
    { title: l('Tuned by hand', 'Ajustado a mano', 'Ajustat a mà'), body: l('Every haptic curve play-tested with the screen covered until it felt right.', 'Cada curva háptica probada con la pantalla tapada hasta sentirse bien.', 'Cada corba hàptica provada amb la pantalla tapada fins a sentir-se bé.') },
  ],
  decisionsTitle: l('What the game taught me', 'Lo que me enseñó el juego', 'El que em va ensenyar el joc'),
  decisions: [
    { title: l('Accessibility is architecture', 'La accesibilidad es arquitectura', 'L\'accessibilitat és arquitectura'), body: l('Designing the redundant-channel core first made every later feature accessible for free.', 'Diseñar primero el núcleo de canales redundantes hizo accesible cada función posterior sin coste.', 'Dissenyar primer el nucli de canals redundants va fer accessible cada funció posterior sense cost.') },
    { title: l('Identical, not equivalent', 'Idéntico, no equivalente', 'Idèntic, no equivalent'), body: l('Each channel carries the same information, not a simplified version. Anything less feels like a lesser game.', 'Cada canal lleva la misma información, no una versión simplificada. Menos que eso se siente un juego menor.', 'Cada canal porta la mateixa informació, no una versió simplificada. Menys que això se sent un joc menor.') },
    { title: l('Constraints sharpened everyone\'s game', 'Los límites mejoraron el juego de todos', 'Els límits van millorar el joc de tothom'), body: l('The eyes-free version forced clarity that made the sighted version better too.', 'La versión sin vista exigió una claridad que también mejoró la versión con vista.', 'La versió sense vista va exigir una claredat que també va millorar la versió amb vista.') },
    { title: l('Test with the screen covered', 'Probar con la pantalla tapada', 'Provar amb la pantalla tapada'), body: l('No simulator can tell you how a haptic feels. Physical playtesting was the only honest signal.', 'Ningún simulador te dice cómo se siente una vibración. Probar en físico era la única señal honesta.', 'Cap simulador et diu com se sent una vibració. Provar en físic era l\'únic senyal honest.') },
  ],
}

export const robotCarDeepDive = {
  accent: '#facc15',
  eyebrow: l('ESP32 + MQTT ROBOT', 'ROBOT ESP32 + MQTT', 'ROBOT ESP32 + MQTT'),
  statement: l(
    'A 4-wheel robot car driven from any phone through a public MQTT broker, with an autonomous safety layer that stops, backs up and beeps when the world gets too close.',
    'Un coche robot de 4 ruedas conducido desde cualquier móvil a través de un broker MQTT público, con una capa autónoma que frena, retrocede y pita cuando el mundo se acerca demasiado.',
    'Un cotxe robot de 4 rodes conduït des de qualsevol mòbil a través d\'un broker MQTT públic, amb una capa autònoma que frena, retrocedeix i pita quan el món s\'acosta massa.'
  ),
  stats: [
    { value: '8', label: l('MQTT COMMANDS', 'COMANDOS MQTT', 'ORDRES MQTT'), detail: l('slow, normal, fast, turbo, forward, back, left, right: one topic.', 'slow, normal, fast, turbo, forward, back, left, right: un solo topic.', 'slow, normal, fast, turbo, forward, back, left, right: un sol topic.') },
    { value: '4', label: l('SPEED LEVELS', 'VELOCIDADES', 'VELOCITATS'), detail: l('PWM from 100 to 255: a speed command is also a motion command.', 'PWM de 100 a 255: una orden de velocidad también es de movimiento.', 'PWM de 100 a 255: una ordre de velocitat també és de moviment.') },
    { value: '50ms', label: l('SENSOR CYCLE', 'CICLO DEL SENSOR', 'CICLE DEL SENSOR'), detail: l('Ultrasonic sweep with a 3-read filter against electrical noise.', 'Barrido ultrasónico con filtro de 3 lecturas contra el ruido eléctrico.', 'Escombrat ultrasònic amb filtre de 3 lectures contra el soroll elèctric.') },
    { value: '<10cm', label: l('AUTO-STOP', 'PARADA AUTÓNOMA', 'PARADA AUTÒNOMA'), detail: l('Stops, reverses ~5cm and beeps for two seconds. No command needed.', 'Frena, retrocede ~5cm y pita dos segundos. Sin orden alguna.', 'Frena, retrocedeix ~5cm i pita dos segons. Sense cap ordre.') },
  ],
  flowTitle: l('Phone to motors in five hops', 'Del móvil a los motores en cinco saltos', 'Del mòbil als motors en cinc salts'),
  flowLead: l('The whole system is one message travelling from a thumb to four wheels.', 'Todo el sistema es un mensaje viajando de un pulgar a cuatro ruedas.', 'Tot el sistema és un missatge viatjant d\'un polze a quatre rodes.'),
  flow: [
    { number: '01', title: l('Publish', 'Publicar', 'Publicar'), body: l('The phone publishes a plain-text command to casa/esp32/car.', 'El móvil publica un comando de texto en casa/esp32/car.', 'El mòbil publica una ordre de text a casa/esp32/car.') },
    { number: '02', title: l('Route', 'Enrutar', 'Encaminar'), body: l('broker.emqx.io relays it: no personal server, no port forwarding.', 'broker.emqx.io lo reenvía: sin servidor propio ni abrir puertos.', 'broker.emqx.io el reenvia: sense servidor propi ni obrir ports.') },
    { number: '03', title: l('Interpret', 'Interpretar', 'Interpretar'), body: l('The ESP32 maps the command to direction pins and PWM duty.', 'El ESP32 traduce el comando a pines de dirección y ciclo PWM.', 'L\'ESP32 tradueix l\'ordre a pins de direcció i cicle PWM.') },
    { number: '04', title: l('Drive', 'Mover', 'Moure'), body: l('The L298N H-bridge powers four DC motors in two paired channels.', 'El puente H L298N alimenta cuatro motores DC en dos canales.', 'El pont H L298N alimenta quatre motors DC en dos canals.') },
    { number: '05', title: l('Guard', 'Vigilar', 'Vigilar'), body: l('The HC-SR04 watches the road and can override everything.', 'El HC-SR04 vigila el camino y puede anular cualquier orden.', 'L\'HC-SR04 vigila el camí i pot anul·lar qualsevol ordre.') },
  ],
  capabilitiesTitle: l('Small robot, real engineering', 'Robot pequeño, ingeniería real', 'Robot petit, enginyeria real'),
  capabilitiesLead: l('Every convenience in the demo hides a hardware problem that had to be solved first.', 'Cada comodidad de la demo esconde un problema de hardware resuelto antes.', 'Cada comoditat de la demo amaga un problema de hardware resolt abans.'),
  capabilities: [
    { title: l('Remote drive', 'Conducción remota', 'Conducció remota'), body: l('Any phone with an MQTT app becomes the controller: nothing to install on the car side.', 'Cualquier móvil con una app MQTT es el mando: nada que instalar en el coche.', 'Qualsevol mòbil amb una app MQTT és el comandament: res a instal·lar al cotxe.') },
    { title: l('One-tap speeds', 'Velocidades de un toque', 'Velocitats d\'un toc'), body: l('Sending "slow" both sets the speed and starts moving. One tap, not two.', 'Enviar "slow" fija la velocidad y arranca a la vez. Un toque, no dos.', 'Enviar "slow" fixa la velocitat i arrenca alhora. Un toc, no dos.') },
    { title: l('Obstacle autonomy', 'Autonomía ante obstáculos', 'Autonomia davant obstacles'), body: l('Stop, reverse and warn: while still listening for your next command.', 'Frenar, retroceder y avisar: sin dejar de escuchar la siguiente orden.', 'Frenar, retrocedir i avisar: sense deixar d\'escoltar la següent ordre.') },
    { title: l('Noise filtering', 'Filtrado de ruido', 'Filtratge de soroll'), body: l('Three consecutive readings under 10cm required: ghost obstacles eliminated.', 'Tres lecturas seguidas bajo 10cm: obstáculos fantasma eliminados.', 'Tres lectures seguides sota 10cm: obstacles fantasma eliminats.') },
    { title: l('Brownout survival', 'Sobrevivir al brownout', 'Sobreviure al brownout'), body: l('Motor current spikes reset the ESP32 until power routing and the detector were tamed.', 'Los picos de corriente reseteaban el ESP32 hasta domar la alimentación y el detector.', 'Els pics de corrent resetejaven l\'ESP32 fins a domar l\'alimentació i el detector.') },
    { title: l('Zero infrastructure', 'Cero infraestructura', 'Zero infraestructura'), body: l('A public broker and a phone hotspot: the entire network stack.', 'Un broker público y el hotspot del móvil: toda la infraestructura de red.', 'Un broker públic i el hotspot del mòbil: tota la infraestructura de xarxa.') },
  ],
  decisionsTitle: l('Lessons from the workshop', 'Lecciones del taller', 'Lliçons del taller'),
  decisions: [
    { title: l('Hardware bugs come first', 'Los bugs de hardware van primero', 'Els bugs de hardware van primer'), body: l('Most failures were cables, ground and power: not code. Verify the physical layer before blaming the program.', 'La mayoría de fallos eran cables, masa y alimentación: no código. Verifica lo físico antes de culpar al programa.', 'La majoria de fallades eren cables, massa i alimentació: no codi. Verifica el físic abans de culpar el programa.') },
    { title: l('Filter the physics', 'Filtra la física', 'Filtra la física'), body: l('Sensors lie under electrical noise. Confirmation filters turn a jumpy signal into a trustworthy one.', 'Los sensores mienten bajo ruido eléctrico. Los filtros de confirmación vuelven fiable una señal nerviosa.', 'Els sensors menteixen sota soroll elèctric. Els filtres de confirmació fan fiable un senyal nerviós.') },
    { title: l('Public broker, private robot', 'Broker público, robot privado', 'Broker públic, robot privat'), body: l('Using broker.emqx.io removed a whole server from the project and taught real pub/sub architecture.', 'Usar broker.emqx.io eliminó un servidor entero del proyecto y enseñó arquitectura pub/sub real.', 'Usar broker.emqx.io va eliminar un servidor sencer del projecte i va ensenyar arquitectura pub/sub real.') },
    { title: l('Test one pin at a time', 'Prueba pin a pin', 'Prova pin a pin'), body: l('Isolated component tests found in minutes what full-system debugging missed for hours.', 'Las pruebas aisladas encontraron en minutos lo que el debugging completo no vio en horas.', 'Les proves aïllades van trobar en minuts el que el debugging complet no va veure en hores.') },
  ],
}

export const sallefyDeepDive = {
  accent: '#60a5fa',
  eyebrow: l('JAVA AUDIO SYNTHESIZER', 'SINTETIZADOR DE AUDIO EN JAVA', 'SINTETITZADOR D\'ÀUDIO EN JAVA'),
  statement: l(
    'laSallefy is a music player with no audio files: every song is a sequence of frequencies synthesized in real time by four hand-built waveform engines, wrapped in a strict layered OOP architecture.',
    'laSallefy es un reproductor sin archivos de audio: cada canción es una secuencia de frecuencias sintetizada en tiempo real por cuatro motores de onda propios, dentro de una arquitectura por capas estricta.',
    'laSallefy és un reproductor sense fitxers d\'àudio: cada cançó és una seqüència de freqüències sintetitzada en temps real per quatre motors d\'ona propis, dins d\'una arquitectura per capes estricta.'
  ),
  stats: [
    { value: '4', label: l('WAVEFORMS', 'FORMAS DE ONDA', 'FORMES D\'ONA'), detail: l('Sine, square, triangle and sawtooth: one abstract class, four subclasses.', 'Seno, cuadrada, triangular y sierra: una clase abstracta, cuatro subclases.', 'Sinus, quadrada, triangular i serra: una classe abstracta, quatre subclasses.') },
    { value: '0', label: l('AUDIO FILES', 'ARCHIVOS DE AUDIO', 'FITXERS D\'ÀUDIO'), detail: l('No MP3, no WAV. Sound is computed sample by sample at runtime.', 'Sin MP3 ni WAV. El sonido se calcula muestra a muestra en ejecución.', 'Sense MP3 ni WAV. El so es calcula mostra a mostra en execució.') },
    { value: '5', label: l('LAYERS', 'CAPAS', 'CAPES'), detail: l('View, Controller, Manager, DAO and Model: each knows only its neighbor.', 'View, Controller, Manager, DAO y Model: cada una conoce solo a su vecina.', 'View, Controller, Manager, DAO i Model: cadascuna coneix només la veïna.') },
    { value: '2', label: l('PERSON TEAM', 'PERSONAS', 'PERSONES'), detail: l('Built in pair for La Salle\'s OOP course: layers made parallel work possible.', 'Hecho en pareja para POO en La Salle: las capas permitieron trabajar en paralelo.', 'Fet en parella per a POO a La Salle: les capes van permetre treballar en paral·lel.') },
  ],
  flowTitle: l('From triplet to speaker', 'De la tripleta al altavoz', 'De la tripleta a l\'altaveu'),
  flowLead: l('A song is just data until the synthesizer turns math into pressure waves.', 'Una canción es solo datos hasta que el sintetizador convierte matemáticas en ondas de presión.', 'Una cançó és només dades fins que el sintetitzador converteix matemàtiques en ones de pressió.'),
  flow: [
    { number: '01', title: l('Read', 'Leer', 'Llegir'), body: l('Gson deserializes songs and playlists from JSON into the model.', 'Gson deserializa canciones y playlists desde JSON al modelo.', 'Gson deserialitza cançons i playlists des de JSON al model.') },
    { number: '02', title: l('Select', 'Seleccionar', 'Seleccionar'), body: l('The PlaybackManager maps each note\'s timbre to its synthesizer.', 'El PlaybackManager asocia el timbre de cada nota a su sintetizador.', 'El PlaybackManager associa el timbre de cada nota al seu sintetitzador.') },
    { number: '03', title: l('Compute', 'Calcular', 'Calcular'), body: l('The chosen SoundSynth generates the waveform for frequency and duration.', 'El SoundSynth elegido genera la onda para esa frecuencia y duración.', 'El SoundSynth triat genera l\'ona per a aquesta freqüència i durada.') },
    { number: '04', title: l('Stream', 'Emitir', 'Emetre'), body: l('javax.sound.sampled pushes the raw samples to the audio line.', 'javax.sound.sampled envía las muestras crudas a la línea de audio.', 'javax.sound.sampled envia les mostres crues a la línia d\'àudio.') },
    { number: '05', title: l('Ring', 'Sonar', 'Sonar'), body: l('The speakers play a song that never existed as a file.', 'Los altavoces reproducen una canción que nunca existió como archivo.', 'Els altaveus reprodueixen una cançó que mai va existir com a fitxer.') },
  ],
  capabilitiesTitle: l('A console Spotify, from scratch', 'Un Spotify de consola, desde cero', 'Un Spotify de consola, des de zero'),
  capabilitiesLead: l('Every feature a player needs, rebuilt at the lowest level the JVM allows.', 'Cada función de un reproductor, reconstruida al nivel más bajo que permite la JVM.', 'Cada funció d\'un reproductor, reconstruïda al nivell més baix que permet la JVM.'),
  capabilities: [
    { title: l('Real-time synthesis', 'Síntesis en tiempo real', 'Síntesi en temps real'), body: l('Waveforms computed on the fly: the sound engine is the product.', 'Ondas calculadas al vuelo: el motor de sonido es el producto.', 'Ones calculades al vol: el motor de so és el producte.') },
    { title: l('Song library', 'Biblioteca', 'Biblioteca'), body: l('Create, list and delete songs defined as playable note sequences.', 'Crear, listar y borrar canciones definidas como secuencias de notas.', 'Crear, llistar i esborrar cançons definides com a seqüències de notes.') },
    { title: l('Playlists', 'Playlists', 'Playlists'), body: l('Reference-based playlists that survive song edits without duplication.', 'Playlists por referencia que sobreviven a ediciones sin duplicar datos.', 'Playlists per referència que sobreviuen a edicions sense duplicar dades.') },
    { title: l('Mood albums', 'Álbumes por mood', 'Àlbums per mood'), body: l('An AlbumGenerator builds random albums filtered by mood and target length.', 'Un AlbumGenerator crea álbumes aleatorios por mood y duración objetivo.', 'Un AlbumGenerator crea àlbums aleatoris per mood i durada objectiu.') },
    { title: l('JSON persistence', 'Persistencia JSON', 'Persistència JSON'), body: l('Gson with pretty printing keeps the data files human-readable.', 'Gson con pretty printing mantiene los datos legibles para humanos.', 'Gson amb pretty printing manté les dades llegibles per a humans.') },
    { title: l('GRASP by the book', 'GRASP aplicado', 'GRASP aplicat'), body: l('Information Expert, Creator, Controller and Low Coupling: named and enforced.', 'Information Expert, Creator, Controller y Low Coupling: aplicados con nombre.', 'Information Expert, Creator, Controller i Low Coupling: aplicats amb nom.') },
  ],
  decisionsTitle: l('Why it is built this way', 'Por qué está hecho así', 'Per què està fet així'),
  decisions: [
    { title: l('No decoder: build the sound', 'Sin decodificador: crear el sonido', 'Sense descodificador: crear el so'), body: l('Skipping audio files forced us to understand what sound actually is: frequency, duration and shape.', 'Evitar archivos de audio nos obligó a entender qué es el sonido: frecuencia, duración y forma.', 'Evitar fitxers d\'àudio ens va obligar a entendre què és el so: freqüència, durada i forma.') },
    { title: l('Layers enable parallel work', 'Las capas permiten trabajar en paralelo', 'Les capes permeten treballar en paral·lel'), body: l('With clean boundaries, two people touched the same codebase daily without breaking each other.', 'Con límites claros, dos personas tocaron el mismo código a diario sin romperse nada.', 'Amb límits clars, dues persones van tocar el mateix codi cada dia sense trencar-se res.') },
    { title: l('Abstract class as a contract', 'La clase abstracta como contrato', 'La classe abstracta com a contracte'), body: l('One makeSound() signature means a new timbre is a new subclass: nothing else changes.', 'Una sola firma makeSound() hace que un timbre nuevo sea solo una subclase: nada más cambia.', 'Una sola signatura makeSound() fa que un timbre nou sigui només una subclasse: res més canvia.') },
    { title: l('Console UI keeps the focus', 'La consola mantiene el foco', 'La consola manté el focus'), body: l('No GUI meant every hour went into the engine and the architecture: the parts that teach.', 'Sin GUI, cada hora fue al motor y la arquitectura: las partes que enseñan.', 'Sense GUI, cada hora va anar al motor i l\'arquitectura: les parts que ensenyen.') },
  ],
}

export const neveraDeepDive = {
  accent: '#2dd4bf',
  eyebrow: l('NFC FAMILY SHOPPING LIST', 'LISTA FAMILIAR CON NFC', 'LLISTA FAMILIAR AMB NFC'),
  statement: l(
    'Nevera Bosch is a shared shopping list that lives on the fridge: tap your phone against an NFC sticker and the family list opens instantly: no app store, no accounts, no friction.',
    'Nevera Bosch es una lista de la compra compartida que vive en la nevera: acercas el móvil a una pegatina NFC y la lista familiar se abre al instante: sin app store, sin cuentas, sin fricción.',
    'Nevera Bosch és una llista de la compra compartida que viu a la nevera: acostes el mòbil a un adhesiu NFC i la llista familiar s\'obre a l\'instant: sense app store, sense comptes, sense fricció.'
  ),
  stats: [
    { value: '1', label: l('NFC TAG', 'ETIQUETA NFC', 'ETIQUETA NFC'), detail: l('A sticker on the fridge door is the entire onboarding.', 'Una pegatina en la puerta de la nevera es todo el onboarding.', 'Un adhesiu a la porta de la nevera és tot l\'onboarding.') },
    { value: 'RT', label: l('REALTIME SYNC', 'SYNC EN TIEMPO REAL', 'SYNC EN TEMPS REAL'), detail: l('Firestore pushes every change to every phone in the house instantly.', 'Firestore envía cada cambio a todos los móviles de la casa al instante.', 'Firestore envia cada canvi a tots els mòbils de la casa a l\'instant.') },
    { value: '4', label: l('FAMILY USERS', 'USUARIOS', 'USUARIS'), detail: l('The hardest QA team I have ever shipped for.', 'El equipo de QA más duro para el que he lanzado algo.', 'L\'equip de QA més dur per al qual he llançat res.') },
    { value: '0', label: l('INSTALLS', 'INSTALACIONES', 'INSTAL·LACIONS'), detail: l('A PWA added to the home screen: no store, instant updates.', 'Una PWA en la pantalla de inicio: sin tienda, actualizaciones al momento.', 'Una PWA a la pantalla d\'inici: sense botiga, actualitzacions al moment.') },
  ],
  flowTitle: l('From fridge door to synced list', 'De la puerta de la nevera a la lista', 'De la porta de la nevera a la llista'),
  flowLead: l('The fridge is where you notice something is missing: so the fridge is the interface.', 'La nevera es donde notas que falta algo: así que la nevera es la interfaz.', 'La nevera és on notes que falta alguna cosa: així que la nevera és la interfície.'),
  flow: [
    { number: '01', title: l('Tap', 'Tocar', 'Tocar'), body: l('Phone touches the NFC sticker; the PWA URL opens directly.', 'El móvil toca la pegatina NFC; la URL de la PWA se abre directamente.', 'El mòbil toca l\'adhesiu NFC; l\'URL de la PWA s\'obre directament.') },
    { number: '02', title: l('Unlock', 'Desbloquear', 'Desbloquejar'), body: l('A short family PIN gates the list from strangers.', 'Un PIN familiar corto protege la lista de extraños.', 'Un PIN familiar curt protegeix la llista d\'estranys.') },
    { number: '03', title: l('Add', 'Añadir', 'Afegir'), body: l('Type or tap frequent items; everything lands in one shared list.', 'Escribe o toca productos frecuentes; todo cae en una lista común.', 'Escriu o toca productes freqüents; tot cau en una llista comuna.') },
    { number: '04', title: l('Sync', 'Sincronizar', 'Sincronitzar'), body: l('Firestore listeners update every open phone in real time.', 'Los listeners de Firestore actualizan cada móvil abierto en tiempo real.', 'Els listeners de Firestore actualitzen cada mòbil obert en temps real.') },
    { number: '05', title: l('Shop', 'Comprar', 'Comprar'), body: l('At the store, items get checked off and vanish for everyone at once.', 'En la tienda, los productos se marcan y desaparecen para todos a la vez.', 'A la botiga, els productes es marquen i desapareixen per a tothom alhora.') },
  ],
  capabilitiesTitle: l('Designed for a hallway, not a keynote', 'Diseñada para un pasillo, no para una keynote', 'Dissenyada per a un passadís, no per a una keynote'),
  capabilitiesLead: l('Every decision optimizes for a family member with one free hand and three seconds of patience.', 'Cada decisión optimiza para un familiar con una mano libre y tres segundos de paciencia.', 'Cada decisió optimitza per a un familiar amb una mà lliure i tres segons de paciència.'),
  capabilities: [
    { title: l('Physical entry point', 'Punto de entrada físico', 'Punt d\'entrada físic'), body: l('The NFC tag beats any app icon: the trigger lives where the need appears.', 'La etiqueta NFC gana a cualquier icono: el disparador vive donde surge la necesidad.', 'L\'etiqueta NFC guanya qualsevol icona: el disparador viu on sorgeix la necessitat.') },
    { title: l('One shared list', 'Una lista compartida', 'Una llista compartida'), body: l('No per-user lists, no merging. The family sees one truth.', 'Sin listas por usuario ni fusiones. La familia ve una sola verdad.', 'Sense llistes per usuari ni fusions. La família veu una sola veritat.') },
    { title: l('PIN, not accounts', 'PIN, no cuentas', 'PIN, no comptes'), body: l('A shared PIN replaced signup entirely: the right auth for a household.', 'Un PIN compartido sustituyó el registro: la autenticación justa para un hogar.', 'Un PIN compartit va substituir el registre: l\'autenticació justa per a una llar.') },
    { title: l('Frequent items', 'Productos frecuentes', 'Productes freqüents'), body: l('The staples the family always buys are one tap away.', 'Los básicos de siempre están a un toque.', 'Els bàsics de sempre són a un toc.') },
    { title: l('Home-screen PWA', 'PWA en pantalla de inicio', 'PWA a pantalla d\'inici'), body: l('Vite + React + manifest: native feel, zero distribution cost.', 'Vite + React + manifest: sensación nativa, coste de distribución cero.', 'Vite + React + manifest: sensació nativa, cost de distribució zero.') },
    { title: l('Realtime backend', 'Backend en tiempo real', 'Backend en temps real'), body: l('Firestore rules keep writes safe while sync stays instant.', 'Las reglas de Firestore protegen las escrituras con sync instantáneo.', 'Les regles de Firestore protegeixen les escriptures amb sync instantani.') },
  ],
  decisionsTitle: l('What a fridge taught me about UX', 'Lo que una nevera me enseñó de UX', 'El que una nevera em va ensenyar d\'UX'),
  decisions: [
    { title: l('The trigger belongs to the context', 'El disparador pertenece al contexto', 'El disparador pertany al context'), body: l('People forget apps but never forget the fridge. Anchoring software to a physical object made usage automatic.', 'La gente olvida apps pero nunca la nevera. Anclar el software a un objeto físico hizo el uso automático.', 'La gent oblida apps però mai la nevera. Ancorar el software a un objecte físic va fer l\'ús automàtic.') },
    { title: l('Family is the hardest user test', 'La familia es el test más duro', 'La família és el test més dur'), body: l('If a parent with shopping bags cannot use it in three seconds, the design is wrong: no excuses accepted.', 'Si un padre con bolsas no puede usarla en tres segundos, el diseño está mal: sin excusas.', 'Si un pare amb bosses no pot usar-la en tres segons, el disseny està malament: sense excuses.') },
    { title: l('A PWA was enough', 'Con una PWA bastaba', 'Amb una PWA n\'hi havia prou'), body: l('No App Store review, instant updates for everyone, one codebase. Native would have added cost and zero value here.', 'Sin revisión de App Store, actualizaciones instantáneas, un solo código. Nativo habría añadido coste y cero valor aquí.', 'Sense revisió d\'App Store, actualitzacions instantànies, un sol codi. Natiu hauria afegit cost i zero valor aquí.') },
    { title: l('Friction kills shared tools', 'La fricción mata las herramientas compartidas', 'La fricció mata les eines compartides'), body: l('Every removed step: login, install, navigation: multiplied real adoption inside the house.', 'Cada paso eliminado: login, instalación, navegación: multiplicó la adopción real en casa.', 'Cada pas eliminat: login, instal·lació, navegació: va multiplicar l\'adopció real a casa.') },
  ],
}

export const wakeStationDeepDive = {
  accent: '#a78bfa',
  eyebrow: l('PHYSICAL COMPUTING FOR MACOS', 'COMPUTACIÓN FÍSICA PARA MACOS', 'COMPUTACIÓ FÍSICA PER A MACOS'),
  statement: l(
    'Jeffrey Wake Station makes the desk an input device. Motion, sound and a physical button cross from an Arduino MEGA into macOS and launch complete workspace routines in under 200 milliseconds.',
    'Jeffrey Wake Station convierte el escritorio en un dispositivo de entrada. El movimiento, el sonido y un botón físico pasan de un Arduino MEGA a macOS y lanzan rutinas completas en menos de 200 milisegundos.',
    'Jeffrey Wake Station converteix l\'escriptori en un dispositiu d\'entrada. El moviment, el so i un botó físic passen d\'un Arduino MEGA a macOS i llancen rutines completes en menys de 200 mil·lisegons.'
  ),
  stats: [
    { value: '3', label: l('PHYSICAL INPUTS', 'ENTRADAS FÍSICAS', 'ENTRADES FÍSIQUES'), detail: l('PIR motion, sound level and a real trigger button.', 'Movimiento PIR, nivel de sonido y un botón real.', 'Moviment PIR, nivell de so i un botó real.') },
    { value: '<200ms', label: l('TOTAL LATENCY', 'LATENCIA TOTAL', 'LATÈNCIA TOTAL'), detail: l('Measured from a physical event to the visible Mac response.', 'Medida desde el evento físico hasta la respuesta visible del Mac.', 'Mesurada des de l\'esdeveniment físic fins a la resposta visible del Mac.') },
    { value: '1', label: l('SERIAL BRIDGE', 'PUENTE SERIAL', 'PONT SÈRIE'), detail: l('A small listener translates hardware events into system intent.', 'Un listener pequeño traduce eventos físicos en intención del sistema.', 'Un listener petit tradueix esdeveniments físics en intenció del sistema.') },
    { value: '4+', label: l('APPS PER ROUTINE', 'APPS POR RUTINA', 'APPS PER RUTINA'), detail: l('One gesture can open apps, start music and arrange the workspace.', 'Un gesto puede abrir apps, iniciar música y ordenar el escritorio.', 'Un gest pot obrir apps, iniciar música i ordenar l\'escriptori.') },
  ],
  flowTitle: l('From room signal to Mac action', 'De la señal física a la acción del Mac', 'Del senyal físic a l\'acció del Mac'),
  flowLead: l('Each layer has one job, keeping the physical interaction fast and debuggable.', 'Cada capa tiene una función para mantener la interacción rápida y depurable.', 'Cada capa té una funció per mantenir la interacció ràpida i depurable.'),
  flow: [
    { number: '01', title: l('Sense', 'Detectar', 'Detectar'), body: l('PIR, microphone level or the physical button catches an event.', 'El PIR, el nivel del micrófono o el botón físico detecta un evento.', 'El PIR, el nivell del micròfon o el botó físic detecta un esdeveniment.') },
    { number: '02', title: l('Filter', 'Filtrar', 'Filtrar'), body: l('Thresholds, cooldowns and debouncing reject noise and repeated triggers.', 'Umbrales, pausas y antirrebote rechazan ruido y repeticiones.', 'Llindars, pauses i antirebot rebutgen soroll i repeticions.') },
    { number: '03', title: l('Transmit', 'Transmitir', 'Transmetre'), body: l('The Arduino sends a compact event over USB serial.', 'El Arduino envía un evento compacto por USB serial.', 'L\'Arduino envia un esdeveniment compacte per USB sèrie.') },
    { number: '04', title: l('Interpret', 'Interpretar', 'Interpretar'), body: l('A persistent Mac listener maps the event to a named routine.', 'Un listener persistente del Mac asigna el evento a una rutina.', 'Un listener persistent del Mac assigna l\'esdeveniment a una rutina.') },
    { number: '05', title: l('Act', 'Actuar', 'Actuar'), body: l('AppleScript launches apps, controls music and arranges the workspace.', 'AppleScript abre apps, controla música y organiza el escritorio.', 'AppleScript obre apps, controla música i organitza l\'escriptori.') },
  ],
  capabilitiesTitle: l('One desk, several ways to speak', 'Un escritorio, varias formas de hablar', 'Un escriptori, diverses formes de parlar'),
  capabilitiesLead: l('The same system supports ambient automation and deliberate control.', 'El mismo sistema combina automatización ambiental y control deliberado.', 'El mateix sistema combina automatització ambiental i control deliberat.'),
  capabilities: [
    { title: l('Presence input', 'Entrada de presencia', 'Entrada de presència'), body: l('PIR can start or restore a workspace when someone arrives.', 'El PIR puede iniciar o restaurar el escritorio al llegar.', 'El PIR pot iniciar o restaurar l\'escriptori en arribar.') },
    { title: l('Sound input', 'Entrada de sonido', 'Entrada de so'), body: l('A tuned threshold turns a clap into a dependable trigger.', 'Un umbral calibrado convierte una palmada en un trigger fiable.', 'Un llindar calibrat converteix una palmellada en un trigger fiable.') },
    { title: l('Physical override', 'Control físico', 'Control físic'), body: l('The button provides explicit control when sensors should stay quiet.', 'El botón ofrece control explícito cuando los sensores deben callar.', 'El botó ofereix control explícit quan els sensors han de callar.') },
    { title: l('Serial protocol', 'Protocolo serial', 'Protocol sèrie'), body: l('Readable event messages make every hardware state easy to inspect.', 'Los mensajes legibles hacen fácil inspeccionar cada estado.', 'Els missatges llegibles faciliten inspeccionar cada estat.') },
    { title: l('Mac service', 'Servicio del Mac', 'Servei del Mac'), body: l('The listener stays ready without coupling automation to Arduino code.', 'El listener siempre está listo sin acoplar la automatización al Arduino.', 'El listener sempre està llest sense acoblar l\'automatització a l\'Arduino.') },
    { title: l('Workspace routines', 'Rutinas de escritorio', 'Rutines d\'escriptori'), body: l('AppleScript composes app launching, media and window actions.', 'AppleScript combina apertura de apps, multimedia y ventanas.', 'AppleScript combina obertura d\'apps, multimèdia i finestres.') },
  ],
  decisionsTitle: l('What made the physical interaction feel instant', 'Qué hizo que la interacción física se sintiera instantánea', 'Què va fer que la interacció física se sentís instantània'),
  decisions: [
    { title: l('Latency is interaction design', 'La latencia es diseño de interacción', 'La latència és disseny d\'interacció'), body: l('Above 200 milliseconds the gesture feels disconnected from the screen. Tuning was product work, not just optimization.', 'Por encima de 200 milisegundos el gesto se separa de la pantalla. Ajustar fue trabajo de producto.', 'Per sobre de 200 mil·lisegons el gest se separa de la pantalla. Ajustar va ser feina de producte.') },
    { title: l('Filter at the source', 'Filtrar en el origen', 'Filtrar a l\'origen'), body: l('Debouncing and cooldowns on the Arduino keep noisy inputs out of the Mac workflow.', 'Antirrebote y pausas en el Arduino mantienen el ruido fuera del flujo del Mac.', 'Antirebot i pauses a l\'Arduino mantenen el soroll fora del flux del Mac.') },
    { title: l('Keep the bridge simple', 'Mantener simple el puente', 'Mantenir simple el pont'), body: l('Plain serial messages were faster to debug than a complex protocol and more than enough for three inputs.', 'Mensajes seriales simples fueron más rápidos de depurar y suficientes para tres entradas.', 'Missatges sèrie simples van ser més ràpids de depurar i suficients per a tres entrades.') },
    { title: l('Separate sensing from action', 'Separar detección y acción', 'Separar detecció i acció'), body: l('Arduino detects. The Mac decides. That boundary lets either side evolve without rewriting the other.', 'Arduino detecta. El Mac decide. Ese límite permite evolucionar cada lado por separado.', 'Arduino detecta. El Mac decideix. Aquest límit permet evolucionar cada costat per separat.') },
  ],
}
