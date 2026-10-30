// Catalan version of src/case-studies.js. Same shape; editing notes and
// placeholders stay in English because only Xavi sees them.
import { text, claims, media, gallery, options, decision, stack, checks, testPlan, note, placeholder, image } from './case-blocks.js';

export default {
  'jeffrey-desk': {
    oneLiner: 'Un espai de treball per a Mac que reuneix en una sola finestra els serveis web, els arxius, el calendari i la IA que faig servir cada dia, amb un agent que hi pot actuar.',
    role: 'Disseny de producte, disseny d’interacció i desenvolupament d’escriptori',
    type: 'Producte per iniciativa pròpia',
    team: 'Projecte individual',
    timeline: '',
    timelineNote: 'Add the period: when the projected desk started (Intelligent Environments) and when the Mac version began.',
    status: 'En ús diari per mi. L’edició de producte està en desenvolupament actiu, amb la versió 0.1.29 a punt per publicar',
    stack: ['Electron (castLabs)', 'HTML, CSS i JavaScript', 'Python', 'whisper.cpp', 'Widevine'],
    links: [['jeffreydesk.com', 'https://jeffreydesk.com']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 to 30 second product walkthrough. Open the app, switch panels, ask the AI to do one real task.', 'video'),
    heroFallback: image('/assets/jeffrey-desk-real.webp', 'Jeffrey Desk funcionant: quatre panells amb serveis de streaming, una conversa amb Codex i una barra de controls del Mac a baix.', 'L’escriptori funcionant, panells en marxa', 'screenshot'),
    sections: {
      context: [
        text(
          'Jeffrey Desk va començar com una taula projectada i tàctil per a l’assignatura d’Intelligent Environments de La Salle: el dia projectat sobre l’escriptori, amb una càmera seguint la meva mà.',
          'Conviure-hi va deixar una cosa clara. Gairebé tot el que valorava era el programari, no la projecció. Així que vaig portar l’escriptori al Mac, on el podia fer servir cada dia i no només en una habitació a les fosques.',
          'Més endavant vaig decidir convertir-lo en una cosa que altres persones poguessin instal·lar. Aquesta és la part que més va canviar el projecte, i en la qual més s’atura aquest cas d’estudi.',
        ),
        note('content', 'Add one or two sentences on why the course brief led to a desk, and when you decided to move it to the Mac.'),
      ],
      problem: [
        text('El meu dia estava repartit entre una dotzena d’apps i el doble de pestanyes: el campus, Netflix, una IA, Spotify, el calendari i el correu, tot alhora. Cada canvi costava una mica d’atenció, el navegador tractava igual una pel·lícula que un examen, i res podia veure el dia sencer per ajudar-me amb ell.'),
        text('La IA que feia servir podia respondre, però no actuar. Em podia explicar com descarregar el primer PDF d’una assignatura. No podia obrir el campus i fer-ho.'),
        claims(
          ['observed', 'La fricció és meva: canviar entre els mateixos serveis cada dia.'],
          ['not-validated', 'Si altres estudiants senten aquesta fricció amb prou força per canviar la manera de treballar.'],
        ),
      ],
      audience: [
        text('Jeffrey Desk va començar com un producte per iniciativa pròpia, dissenyat al voltant de la meva manera de treballar. La seva viabilitat tècnica està demostrada, perquè el faig servir cada dia. La seva usabilitat per a un públic més ampli encara s’ha de validar amb altres persones que facin servir Mac.'),
        claims(
          ['observed', 'Jo: un estudiant el dia del qual és el campus, el streaming, una IA, la música, el calendari i el correu.'],
          ['assumed', 'Altres persones amb Mac que viuen entre moltes pestanyes, començant per estudiants universitaris, per això la integració del campus funciona amb qualsevol Moodle.'],
          ['not-validated', 'Que una altra persona pugui muntar un escriptori buit pel seu compte i continuar fent-lo servir.'],
        ),
      ],
      evidence: [
        text('No hi va haver una recerca d’usuaris formal. Va començar com una observació del meu propi comportament, i després com un concepte per a l’assignatura.'),
        gallery(
          image('/assets/jeffrey-desk-idea.webp', 'Panell conceptual d’un escriptori intel·ligent projectat que enumera projector, càmera, sensors piezoelèctrics, Raspberry Pi i ESP32.', 'Panell conceptual de l’escriptori projectat. Un render, no una fotografia', 'concept'),
          placeholder('16/10', 'PLACEHOLDER: screenshot of the fragmented workflow before the desk, the real tabs and apps open on a normal day.', 'photo'),
        ),
        note('evidence', 'A photograph of the real projected prototype, if one exists. The current image is a concept render.'),
      ],
      assumptions: [
        claims(
          ['known', 'Un agent pot actuar dins de pàgines web incrustades i sobre el Mac alhora. Construït i en ús diari.'],
          ['observed', 'El que feia servir no era la projecció. Era el programari.'],
          ['assumed', 'Una persona nova pot entendre els panells, la roda de serveis i els noms sense que l’hi expliquin.'],
          ['assumed', 'La gent deixarà que una IA llegeixi les seves pàgines i carpetes si els permisos són concrets i visibles.'],
          ['known', 'Incrustar serveis de tercers és on el producte podria fallar: les condicions de les plataformes, el vídeo xifrat i la prohibició de WhatsApp als clients de tercers.'],
          ['not-validated', 'Si algú hi pagarà. Els plans existeixen al codi, però mai s’ha provat que algú pagui.'],
        ),
        note('content', 'Confirm the last line: is anything on sale yet, and has anyone installed the product edition?'),
      ],
      exploration: [
        options(
          { title: 'Un escriptori projectat i tàctil', solving: 'Una sola superfície per a tot el dia, amb la mà com a entrada.', pros: 'Memorable. Feia servir el mateix escriptori.', cons: 'Necessita un projector, una càmera i una habitació a les fosques, el tacte és imprecís i no es pot enviar a ningú.', verdict: 'discarded', why: 'Em vaig quedar el programari i el vaig portar al Mac. El seguiment de la mà només sobreviu a la meva edició personal.' },
          { title: 'Vídeo amb el Picture in Picture de Safari', solving: 'Reproduir vídeo xifrat dins d’un panell sense llicència.', pros: 'No calia certificació.', cons: 'Massa peces fràgils subjectes entre si.', verdict: 'discarded', why: 'El vaig substituir per Widevine en una app certificada, fet servir tal com està dissenyat.' },
          { title: 'Fer-se passar per Chrome', solving: 'Que el streaming i WhatsApp carreguessin a l’escriptori personal.', pros: 'Funciona.', cons: 'Incompleix les condicions de les plataformes i ho converteix en saltar-se un control d’accés. No és una cosa que es pugui vendre.', verdict: 'discarded', why: 'El producte s’identifica amb honestedat com a JeffreyDesk/0.1. Si una plataforma el vol bloquejar, pot.' },
          { title: 'Una sola carpeta per a les dues edicions', solving: 'Treballar en el producte sense una segona còpia.', pros: 'Senzill.', cons: 'L’app personal instal·lada serveix en directe els arxius de la seva carpeta, així que editar el producte reescrivia la pàgina que estava servint. Es va trencar dues vegades.', verdict: 'discarded', why: 'Dos worktrees de git del mateix repositori: historial compartit, arxius separats.' },
        ),
        gallery(
          image('/assets/jeffrey-desk-concept-empty.webp', 'Render conceptual d’un escriptori buit: quatre panells que diuen toca per afegir una app, amb una fila de controls del Mac a sota.', 'Exploració visual: l’estat buit. Un render conceptual, no la interfície publicada', 'concept'),
          image('/assets/jeffrey-desk-concept-configured.webp', 'Render conceptual d’un escriptori configurat amb Notion, una web de notícies, el correu i un calendari en quatre panells.', 'Exploració visual: un escriptori muntat. Un render conceptual, no la interfície publicada', 'concept'),
        ),
        note('decision', 'Voice commands were removed on 10 October 2026 and only dictation stayed. Explain why: it is a strong decision to show.'),
      ],
      decision: [
        decision({
          title: 'Una base de codi, dues edicions',
          situation: 'L’escriptori personal era bo i no es podia vendre tal com era. El meu horari, el meu campus, el meu nom i els meus serveis hi estaven escrits a dins. WhatsApp i fer-se passar per Chrome no es podien vendre. La meitat de la interfície existia per a un projector.',
          options: ['Publicar l’escriptori personal amb una pantalla d’ajustos per canviar el que estava escrit al codi.', 'Fer un producte a part i deixar que els dos se separessin.', 'Mantenir una sola base de codi i descriure cada edició en un arxiu, separant el que una edició pot oferir del que l’usuari ha posat al seu escriptori.'],
          decision: 'La tercera. La regla que vaig escriure per a ella: el producte ha de funcionar exactament igual que el personal. L’única diferència és que no ve res muntat.',
          reasoning: 'Les millores continuen passant d’un a l’altre amb un merge normal de git, el meu escriptori continua funcionant mentre el producte canvia, i una instal·lació nova comença buida en lloc d’ensenyar la vida d’una altra persona.',
          tradeoff: 'Cada funció ha de saber en quina edició és, i hi ha dues apps per construir i provar. La comprovació automàtica ara recorre tota l’app en cada pla i compara 86 pantalles.',
          consequence: 'El producte va perdre WhatsApp, la disfressa de Chrome, l’horari escrit al codi, el meu nom, el seguiment de la mà i els controls del projector. Va guanyar una configuració en quatre passos i fins a 48 serveis propis, cadascun limitat al seu domini.',
        }),
      ],
      interaction: [
        text(
          'Una fila d’informació a dalt (rellotge, temps, les tasques del dia, una agenda setmanal, un temporitzador, Spotify), tres panells grans amb dos visibles alhora, i una barra a baix que controla el mateix Mac.',
          'Un panell buit ensenya un botó gran. Obre una configuració en quatre passos: com es diu cada panell, què hi va a dins i el campus si n’hi ha. Triar un servei és una roda que gires amb el trackpad o arrossegant, amb el logo real de cada servei. Després, el botó més de qualsevol panell obre el mateix catàleg, i una vista d’organitzar deixa arrossegar les targetes d’un panell a un altre.',
          'Les dues converses amb IA funcionen a través de les eines de línia d’ordres de Claude i Codex que ja tens. Només poden llegir i editar arxius dins de les carpetes que has obert, mai més de cinc i mai carpetes privades. La quota que queda sempre és a la vista, i quan una s’acaba l’escriptori passa a l’altra.',
          'Les entregues de les assignatures apareixen soles a la llista del dia. L’escriptori pregunta al mateix servei de calendari de Moodle en lloc de llegir la pantalla, així que no es trenca quan la universitat canvia el tema.',
        ),
        gallery(
          image('/assets/jeffrey-desk-setup.webp', 'El selector de widgets a la web del producte, amb els logos dels serveis en una roda.', 'Triar què va en un panell', 'screenshot'),
          image('/assets/jeffrey-desk-spotify.webp', 'El widget de Spotify dins de l’escriptori durant una sessió real.', 'Spotify, controlat des de l’escriptori', 'screenshot'),
          placeholder('16/10', 'PLACEHOLDER: short recording of the four-step set-up, from an empty panel to a filled one.', 'video'),
          placeholder('16/10', 'PLACEHOLDER: the waiting, error and empty states side by side.', 'screenshot'),
        ),
        note('content', 'Explain how the desk shows waiting, failure and success, for example when a service is blocked or the AI is busy.'),
      ],
      implementation: [
        text('Tres peces: la pàgina, un pont local i la carcassa d’Electron. La separació existeix perquè incrustar webs d’altres no sigui una porta oberta.'),
        stack(
          ['Electron, versió de castLabs', 'Obre la finestra, arrenca el pont i vigila cada vista web incrustada. Cada servei té la seva sessió segellada i la seva pròpia llista de dominis permesos. La versió de castLabs hi és perquè pot reproduir vídeo xifrat amb Widevine un cop l’app està certificada.'],
          ['HTML, CSS i JavaScript, sense framework', 'Una sola pàgina sense pas de compilació. Va començar com un únic arxiu d’unes 5.800 línies i després es va dividir en mòduls sense canviar ni un byte de comportament, comprovat amb un test que refà la pàgina i la compara.'],
          ['Pont en Python, només amb la biblioteca estàndard', 'Un servidor petit a 127.0.0.1. La pàgina no pot tocar el disc ni executar res, li ho ha de demanar al pont, que només coneix una llista tancada d’accions. També explica per què 127.0.0.1 i no un arxiu: l’inici de sessió de Spotify ha de tornar a una adreça registrada.'],
          ['whisper.cpp', 'El dictat es transcriu al Mac. No es puja res.'],
          ['Widevine', 'Desxifra el vídeo de streaming dins del mòdul de Google. L’app mai veu la clau i no pot gravar. La certificació la dona castLabs EVS.'],
        ),
        claims(
          ['known', 'La seguretat forma part de l’arquitectura: el pont comprova les capçaleres Host i Origin, cada script en línia només s’executa si el seu hash és a la política de seguretat de contingut, i cap renderer té Node.'],
          ['known', 'Encara no està notaritzada. Sense una signatura Developer ID no s’obre en un altre Mac, i cada compilació reinicia el permís d’Accessibilitat de macOS.'],
          ['planned', 'Una revisió legal de les qüestions del vídeo i de les subscripcions abans de cobrar.'],
        ),
        text('Dues lliçons que van costar hores. Provar en una pestanya del navegador en lloc de dins d’Electron se salta mitja app sense avisar. I un gestor d’errors en línia, rebutjat per la política de seguretat, va arribar a amagar 613 errors.'),
        media(placeholder('16/9', 'PLACEHOLDER: architecture diagram of page, bridge and shell, drawn from the README diagram.', 'diagram')),
      ],
      accessibility: [
        checks(
          ['done', 'Teclat i VoiceOver a totes les finestres, segons les notes de la versió 0.1.29.'],
          ['done', 'El seguiment de la mà és opcional i només existeix a l’edició personal. Tot funciona amb ratolí, trackpad o teclat.'],
          ['done', 'El consum d’energia en repòs s’ha reduït a un terç, una cosa que importa en un portàtil obert tot el dia.'],
          ['missing', 'Encara no hi ha una auditoria de contrast.'],
          ['missing', 'No s’ha comprovat el moviment reduït amb l’ajust del sistema.'],
        ),
        note('validation', 'Record a short VoiceOver and keyboard-only pass to back up the first line.'),
      ],
      validation: [
        claims(
          ['tested', 'Una comprovació automàtica recorre tota l’app en cada pla contra un pont temporal i compara 86 pantalles amb una referència coneguda.'],
          ['observed', 'Faig servir l’edició personal cada dia.'],
          ['not-validated', 'No s’ha observat ningú més muntant o fent servir l’edició de producte.'],
        ),
        testPlan({
          participants: 'Cinc estudiants amb Mac que durant el dia passen del campus al correu, al streaming i a una IA.',
          tasks: ['Instal·lar l’app i muntar dos panells sense ajuda.', 'Afegir una web pròpia.', 'Demanar a la IA que descarregui el primer PDF d’una assignatura.', 'Trobar les entregues d’aquesta setmana.'],
          questions: ['Què esperaves que passés en girar la roda?', 'Què creus que pot i no pot tocar la IA al teu Mac?', 'Què continuaries fent en un navegador normal?'],
          observe: ['On dubten durant la configuració.', 'Si posen nom als panells o deixen els de per defecte.', 'Si confien a la IA un arxiu real.'],
          success: ['Configuració acabada sense preguntar-me.', 'Saben explicar amb les seves paraules els límits de la IA.', 'Decideixen deixar-lo obert l’endemà.'],
          priorities: ['Un desconegut el pot muntar sol.', 'La gent accepta que una IA actuï sobre els seus arxius quan els límits són visibles.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Una app de Mac que funciona i que faig servir cada dia.'],
          ['known', 'Una edició de producte instal·lable amb la seva pròpia web, un procés de configuració, plans i un actualitzador. La versió 0.1.29 està a punt per publicar.'],
          ['planned', 'La notarització, i després els primers usuaris de fora.'],
        ),
        media(image('/assets/jeffrey-desk-web.webp', 'La web del producte jeffreydesk.com.', 'jeffreydesk.com, la web del producte', 'screenshot')),
        note('content', 'Add the number of installs or people on the waiting list, if you have them.'),
      ],
      reflection: [
        text(
          'La decisió més important va ser separar el que una edició pot oferir del que algú ha posat al seu escriptori. Abans d’això, cada canvi per al producte podia trencar l’escriptori del qual depenc.',
          'El que faria diferent: construir per a un escriptori buit des del principi. Cada drecera que vaig agafar per a mi la vaig haver de pagar abans que un desconegut el pogués instal·lar.',
          'El que no va funcionar: la quadrícula. Ve de la taula projectada, i una app de Mac no té per què tenir la mateixa forma. És el següent que cal repensar.',
          'El que encara no sé: si algú més el muntarà i el mantindrà. Aquesta és la pregunta que ha de respondre la propera ronda de proves.',
        ),
      ],
    },
    next: { slug: 'reps', line: 'Si Jeffrey Desk va de l’abast d’un producte, Reps va d’una sola interacció sota una restricció dura: mans que no estan lliures.' },
  },

  reps: {
    oneLiner: 'Una pantalla d’entrenament per a un gimnàs de garatge que es controla assenyalant la càmera, perquè unes mans amb magnesi no l’hagin de tocar mai.',
    role: 'Disseny d’interacció i desenvolupament frontend',
    type: 'Prototip personal',
    team: 'Projecte individual',
    timeline: '',
    timelineNote: 'Add the period you built and used it.',
    status: 'Prototip que funciona, instal·lat com a app de Mac i fet servir a les meves pròpies sessions',
    stack: ['React', 'TypeScript', 'MediaPipe', 'Electron', 'Spotify Connect'],
    links: [['Codi a GitHub', 'https://github.com/xavibosch/reps']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second video of one real set: point, hold, the ring fills, rest timer starts.', 'video'),
    heroFallback: image('/assets/reps-session.webp', 'Reps en plena sessió: l’exercici actual, el pes i les sèries amb controls rodons grans.', 'En plena sessió, sèrie en curs', 'screenshot'),
    sections: {
      context: [
        text(
          'Entreno en un garatge: un banc, una barra, dues manuelles i trenta quilos de discos. Entre sèries tinc les mans amb magnesi o encara a la barra.',
          'Totes les apps d’entrenament que vaig provar donaven per fet una mà lliure i neta. Quan anava a buscar el mòbil ja s’havia bloquejat, i havia perdut el compte de les sèries i la música.',
        ),
      ],
      problem: [
        text('Registrar una sèrie, començar el descans i canviar la música volia dir tocar una pantalla just en el moment en què menys ho podia fer amb les mans.'),
        claims(
          ['observed', 'A les meves pròpies sessions el mòbil es bloquejava entre sèries, i perdia el compte de les sèries i la música.'],
          ['not-validated', 'Si a altres persones que entrenen a casa els passa el mateix.'],
        ),
      ],
      audience: [
        text('Reps està fet per a una persona i una habitació: jo, al meu garatge. Això fa que les decisions de disseny siguin concretes i les conclusions, limitades.'),
        claims(
          ['observed', 'Jo, entrenant a casa amb un portàtil i la seva càmera mirant al banc.'],
          ['assumed', 'Qualsevol que entreni a casa amb una pantalla a prop té el mateix problema de mans ocupades.'],
          ['not-validated', 'Altres cossos, habitacions, llums i distàncies a la càmera.'],
        ),
      ],
      evidence: [
        text('No va ser una recerca formal. Va començar com una observació del meu propi comportament entre sèries.'),
        gallery(
          placeholder('4/3', 'PLACEHOLDER: photograph of the garage set-up, showing where the screen and camera sit relative to the bench.', 'photo'),
          placeholder('4/3', 'PLACEHOLDER: photograph of chalked hands on the bar, the reason the screen cannot be touched.', 'photo'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'El seguiment de la mà és prou fiable a la distància del gimnàs i amb la llum del garatge.'],
          ['assumed', 'Mantenir un moment és prou ràpid per no frenar una sessió.'],
          ['not-validated', 'Que lliscar seria natural per canviar d’exercici. Va resultar ser fals, com es veu més avall.'],
          ['known', 'Una pestanya del navegador no guarda el permís de la càmera a Safari, així que el seguiment mai començaria sol.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Lliscar per canviar d’exercici', solving: 'Una manera ràpida d’avançar sense apuntar.', pros: 'En teoria sembla natural.', cons: 'L’índex també és el cursor, així que un moviment ràpid a la dreta és el mateix que lliscar a la dreta. Les condicions sobre l’estat de la mà i la direcció ho van reduir però mai ho van eliminar.', verdict: 'discarded', why: 'Ambigu per disseny, no mal ajustat. Les fletxes de la pantalla i el teclat fan aquesta feina sense ambigüitat.' },
          { title: 'Doble toc dels AirPods com a comandament', solving: 'Un control que no necessita una mà davant de la càmera.', pros: 'Ja els porto posats.', cons: 'Els tocs mai arriben al sistema com a tecles multimèdia. Reclamar la sessió multimèdia funcionava, però Spotify la recuperava en mil·lisegons cada vegada.', verdict: 'discarded', why: 'Tres intents, tots suposicions sobre com viatja l’esdeveniment. La lliçó va ser comprovar al registre del sistema el camí real de l’esdeveniment abans d’escriure codi.' },
          { title: 'Una pestanya del navegador', solving: 'Fer servir Reps sense instal·lar res.', pros: 'No hi ha res a instal·lar.', cons: 'Safari demana la càmera cada vegada, així que el seguiment mai arrenca sol.', verdict: 'kept as a fallback', why: 'Una petita carcassa d’Electron respon al permís web al codi. Un sol avís de macOS, una vegada.' },
          { title: 'El reproductor web de Spotify', solving: 'Música dins de l’app.', pros: 'Tot en un mateix lloc.', cons: 'No funciona a iOS i necessita un dispositiu de reproducció dins de la pàgina.', verdict: 'discarded', why: 'Spotify Connect controla el client que ja està sonant, sense servidor.' },
        ),
      ],
      decision: [
        decision({
          title: 'Cada control es confirma mantenint',
          situation: 'Un cursor que segueix la mà no té clic, i de camí a un botó passa per sobre d’altres.',
          options: ['Pessigar per fer clic.', 'Lliscaments i gestos dedicats.', 'Mantenir per confirmar a cada control, amb un anell que s’omple abans que passi res.'],
          decision: 'Mantenir per confirmar a tot arreu. El cursor envia esdeveniments de punter normals, així que els mateixos controls funcionen amb la mà, un ratolí, un trackpad o una pantalla tàctil. Un toc ràpid continua funcionant com a drecera amb el ratolí.',
          reasoning: 'Un sol contracte d’interacció per a qualsevol entrada, i l’anell és el senyal que el sistema ha entès abans d’actuar. L’espera només comença quan la mà ha frenat, així que passar per sobre del panell no prem res.',
          tradeoff: 'Cada acció costa uns 0,6 segons d’espera, més lent que un clic.',
          consequence: 'El lliscament va desaparèixer. Canviar d’exercici és una fletxa que mantens, o una tecla.',
        }),
        note('content', 'Your newer version adds an active and a standby mode (both hands open to wake) and a fingertip touch to complete a set. They are not in the public repository yet. Push them, then describe them here as a second decision.'),
      ],
      interaction: [
        text(
          'Tries un entrenament i una sola pantalla conté la sessió: l’exercici i la sèrie, el temporitzador de descans, la cua i la música. Assenyales un control i mantens. El control creix i s’omple un anell mentre mantens, i si t’aparteu abans que s’ompli no passa res.',
          'Acabar una sèrie comença el compte enrere del descans. L’última sèrie passa sola al següent exercici, i la sessió acaba amb un resum del que has aixecat de debò. Un registre guarda un calendari de sessions i una ratxa, i les curses s’apunten a mà.',
          'La música només comença en triar un entrenament, mai en obrir l’app, i Spotify apareix darrere de la pantalla d’entrenament en lloc de tapar-la.',
        ),
        gallery(
          image('/assets/reps-home.webp', 'Selector d’entrenaments amb rajoles grans que es trien mantenint.', 'Triar un entrenament', 'screenshot'),
          image('/assets/reps-rest.webp', 'Temporitzador de descans en compte enrere amb la cançó de Spotify a sota.', 'Temporitzador de descans amb Spotify', 'screenshot'),
          image('/assets/reps-leave.webp', 'Diàleg que demana confirmació abans de sortir d’una sessió.', 'Sortir d’una sessió demana confirmació', 'screenshot'),
          image('/assets/reps-summary.webp', 'Resum de final de sessió amb els exercicis i els pesos aixecats.', 'Resum de la sessió', 'screenshot'),
        ),
        media(placeholder('16/9', 'PLACEHOLDER: 10 second recording of a hold being cancelled by moving away, the recovery from a mistake.', 'video')),
        note('content', 'Describe what the screen shows when the camera fails or no hand is found.'),
      ],
      implementation: [
        stack(
          ['React i TypeScript', 'La interfície. Tots els controls comparteixen un mateix hook de mantenir per confirmar, així que el contracte no pot variar d’un botó a un altre.'],
          ['Punts de la mà de MediaPipe', 'Troba la punta de l’índex. La mà només cobreix còmodament el centre de la imatge de la càmera, així que aquesta zona central s’estira fins a omplir la pantalla.'],
          ['Escriptura directa al DOM per al cursor', 'El punt es mou escrivint el seu transform dins del bucle de seguiment, no a través de l’estat de React. L’estat pinta un fotograma per darrere de la detecció, així que el punt que veus i el botó que es prem no coincidien per desenes de píxels.'],
          ['Carcassa d’Electron', 'Existeix només perquè el permís de la càmera es mantingui. Carrega la web publicada perquè l’inici de sessió de Spotify torni a l’adreça correcta.'],
          ['Spotify Connect amb PKCE', 'Controla l’app de Spotify que ja està oberta, sense un servidor propi.'],
        ),
        text(
          'Que el cursor caigués un parell de centímetres desviat no era un problema de seguiment. Un avantpassat amb un transform de CSS es converteix en el bloc contenidor de qualsevol element fixed que tingui a dins, així que el punt es dibuixava al marc escalat mentre la detecció llegia la finestra real. Dibuixar-lo fora d’aquest marc ho va arreglar. Gairebé tots els problemes de seguiment que vaig trobar eren problemes de coordenades.',
          'El pitjor error congelava el Mac sencer. En despertar de la suspensió, la pista de la càmera s’acaba, i un catch silenciós al voltant de la detecció ho reintentava a cada fotograma per sempre. Ara compta els errors i s’atura, comprova si la pista ha acabat i deixa anar la càmera abans que el Mac se suspengui.',
        ),
      ],
      accessibility: [
        checks(
          ['done', 'Els gestos mai són l’única via. Cada control també funciona amb ratolí, trackpad o pantalla tàctil, i el teclat cobreix la sessió: Espai o Retorn acaben una sèrie, les fletxes avancen i canvien el pes, i Escape tanca els panells.'],
          ['done', 'La resposta no depèn només del color: el control creix i l’anell s’omple mentre mantens.'],
          ['done', 'Botons rodons grans, pensats per a una mà imprecisa a distància.'],
          ['missing', 'No s’ha provat amb un lector de pantalla. Primer els controls necessiten noms adequats.'],
          ['missing', 'No hi ha opció de moviment reduït ni auditoria de contrast del vermell sobre negre.'],
        ),
      ],
      validation: [
        claims(
          ['observed', 'Fet servir a les meves pròpies sessions al garatge.'],
          ['not-validated', 'Ningú més hi ha entrenat.'],
        ),
        note('content', 'Add how many sessions are in the log and over what period.'),
        testPlan({
          participants: 'De tres a cinc persones que entrenen a casa amb un portàtil o una pantalla a prop.',
          tasks: ['Completar una sessió de tres exercicis sense tocar res.', 'Pausar la música durant un descans.', 'Recuperar-se després de mantenir el control equivocat.'],
          questions: ['Com sabies que el sistema t’havia entès?', 'Quan has volgut tocar la pantalla igualment?', 'T’ha semblat lent mantenir?'],
          observe: ['Activacions no desitjades.', 'Com es col·loquen davant de la càmera.', 'Si acaben anant al teclat.'],
          success: ['Una sessió sencera sense cap acció no desitjada.', 'Saben dir què significa l’anell que s’omple sense que els ho expliquin.'],
          priorities: ['El seguiment aguanta en altres habitacions i amb una altra llum.', 'Mantenir per confirmar és prou ràpid enmig d’un entrenament.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Un prototip que funciona, instal·lat com a app de Mac, amb una versió web publicada.'],
          ['known', 'El codi és públic a GitHub.'],
          ['planned', 'Actualitzar el repositori públic amb el mode de repòs i la correcció del bloqueig.'],
        ),
      ],
      reflection: [
        text(
          'La decisió més important va ser deixar que la mà generés esdeveniments de punter normals. Així, la feina de gestos mai va haver de tocar la interfície, i el ratolí va continuar funcionant tot el temps.',
          'Treure el lliscament em va ensenyar a distingir un disseny ambigu d’un de mal ajustat. Les condicions només el podien reduir.',
          'El que faria diferent: comprovar com viatja de debò un esdeveniment pel sistema abans de construir-hi a sobre. Els tres intents amb els AirPods eren suposicions.',
          'El que encara no sé: si funciona per al cos, l’habitació i la llum d’una altra persona. Fins ara tot s’ha provat en un sol garatge.',
        ),
      ],
    },
    next: { slug: 'betsy', line: 'Betsy passa d’una persona i una habitació a un grup d’amics, on el difícil és que un joc se senti just.' },
  },

  betsy: {
    oneLiner: 'Una lliga privada en què els amics competeixen amb partits de futbol reals i punts virtuals, dissenyada perquè ningú pugui fer trampa als altres.',
    role: 'Recerca UX, disseny d’interfície, disseny de producte i desenvolupament iOS',
    type: 'Projecte de la universitat que es va convertir en un producte personal',
    team: 'Individual',
    teamNote: 'Confirm whether the coursework phase (Interface and Graphic Design) had teammates, and who did what.',
    timeline: '',
    timelineNote: 'Add when the coursework happened and how long you have worked on it since.',
    status: 'Prototip sobre un backend real. No és a l’App Store',
    stack: ['SwiftUI', 'Firebase Auth', 'Regles de Firestore', 'The Odds API', 'Next.js'],
    links: [['Codi a GitHub', 'https://github.com/xavibosch/betsy-ios'], ['Web del producte', 'https://betsy-web-rho.vercel.app']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second walkthrough: join a league, place a pick, see the ranking move.', 'video'),
    heroFallback: image('/assets/betsy-v2-league.webp', 'Una lliga privada de Betsy a l’iPhone: classificació, saldo, posició i el botó d’apostar.', 'Classificació d’una lliga privada, versió real', 'screenshot', '9/16'),
    sections: {
      context: [
        text(
          'El meu grup d’amics discuteix de futbol cada setmana. Les prediccions, les captures i els “ja t’ho vaig dir” viuen en un xat de WhatsApp, i allà desapareixen.',
          'Els únics productes que converteixen això en un joc són les apps d’apostes, i et demanen la targeta. Betsy va començar com a treball de l’assignatura de Disseny d’Interfícies i Gràfic, en la qual vaig investigar per a qui era i vaig provar la primera interfície amb aquestes persones.',
        ),
      ],
      problem: [
        text('Les apps d’apostes estan fetes per treure diners a gent que no es pot permetre perdre’ls. El que els meus amics volen de debò, tenir raó davant dels altres, no necessita res d’això. El que sí que necessita és estructura: regles que tothom accepti, resultats que ningú pugui discutir i una classificació que signifiqui alguna cosa.'),
        claims(
          ['observed', 'Les prediccions del xat dels meus amics estan repartides entre missatges, sense un marcador.'],
          ['assumed', 'Els punts virtuals generen prou tensió sense diners.'],
        ),
      ],
      audience: [
        text('Betsy és l’únic projecte en què vaig investigar amb les persones per a les quals era abans de dissenyar les pantalles: vaig provar la interfície amb elles, vaig dibuixar el seu recorregut i vaig definir els usuaris objectiu.'),
        claims(
          ['observed', 'El meu propi grup d’amics, que segueix el futbol i ja competeix de manera informal.'],
          ['assumed', 'Aficionats a l’esport als quals els agrada predir i volen que se’n mesuri l’encert.'],
          ['assumed', 'Comunitats petites, un grup de la universitat o un equip de la feina, que volen la seva pròpia lliga.'],
        ),
        note('content', 'Add how many people took part in the coursework tests and one thing that changed because of them.'),
      ],
      evidence: [
        text('De l’assignatura en van sortir un customer journey, uns usuaris objectiu i sessions de prova amb el públic previst.'),
        gallery(
          placeholder('16/10', 'PLACEHOLDER: the customer journey map from Interface and Graphic Design.', 'diagram'),
          placeholder('16/10', 'PLACEHOLDER: early wireframes or the first tested interface, next to the current one.', 'screenshot'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'Un límit diari d’apostes el fa estratègic en lloc de repetitiu.'],
          ['assumed', 'Els duels un contra un donen a la gent un motiu per tornar entre jornades.'],
          ['known', 'Un joc amb forma d’aposta necessita cura encara que no hi hagi diners, així que l’app inclou un full de joc responsable i està prevista una qualificació de 17+.'],
          ['not-validated', 'Si una lliga es manté activa durant una temporada sencera.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Primer, resultats simulats', solving: 'Provar jornades senceres sense gastar crèdits de l’API ni esperar els partits reals.', pros: 'Cada flux es podia provar de principi a fi en minuts.', cons: 'Un resultat fals no demostra res sobre liquidar apostes reals.', verdict: 'kept for testing', why: 'Al producte el va substituir la liquidació real amb els marcadors finals. Els mercats sense font de resultat es liquiden amb una regla amb llavor que dona la mateixa resposta a tots els mòbils.' },
          { title: 'Ensenyar l’aposta del rival en un duel', solving: 'Transparència entre dos jugadors.', pros: 'Sembla obert.', cons: 'El segon jugador podia copiar la quota i guanyar en cas d’empat.', verdict: 'discarded', why: 'L’aposta i la quota del rival no s’ensenyen mai.' },
          { title: 'Guanyen tots dos si tots dos encerten', solving: 'Una regla generosa per als empats.', pros: 'Ningú perd.', cons: 'No hi ha res en joc, així que un duel deixa de significar alguna cosa.', verdict: 'discarded', why: 'Ara en un empat guanya la quota combinada més alta, i si tots dos fallen, tots dos recuperen els seus punts.' },
          { title: 'El mateix partit de duel per a tothom cada dia', solving: 'Un partit del dia compartit.', pros: 'Senzill i social.', cons: 'Un segon duel el mateix dia repetia el mateix partit.', verdict: 'discarded', why: 'Cada duel sorteja un partit aleatori, mai l’anterior.' },
        ),
      ],
      decision: [
        decision({
          title: 'La justícia viu a les regles, no a la pantalla',
          situation: 'Escriure alhora les regles de Firestore i les vistes en SwiftUI ho va destapar: dos mòbils podien liquidar la mateixa aposta i pagar-la dues vegades, perquè res en una pantalla diu qui és amo d’aquesta escriptura.',
          options: ['Confiar en l’app i esperar que dos mòbils mai liquidin alhora.', 'Portar la liquidació a un servidor, cosa que necessita el pla de pagament de Firebase.', 'Protegir ja cada pagament amb una transacció de la base de dades i un registre per aposta que no es pot canviar mai, i passar a un servidor més endavant.'],
          decision: 'La tercera. La interfície pot demanar que es liquidi una aposta, però només les regles ho poden decidir.',
          reasoning: 'Va tancar el pagament doble sense pagar infraestructura mentre l’app té un grapat d’usuaris.',
          tradeoff: 'Els punts encara es poden escriure des del client, així que algú que faci servir directament les eines de la base de dades podria fer trampa a la classificació. La solució de debò necessita el servidor.',
          consequence: 'Provat contra l’emulador de Firestore: tots els tests de les regles van passar, i liquidar la mateixa aposta una vegada i una altra la va abonar exactament una vegada.',
        }),
      ],
      interaction: [
        text(
          'Crees una lliga o t’hi uneixes amb un codi. Cada lliga defineix les seves regles: competicions, saldo inicial, apostes per dia i la finestra d’apostes. Tries partits, muntes un butlletí, tries quant apostar i confirmes. Els resultats actualitzen el teu saldo i la classificació.',
          'Un duel és un flux de tres passos que acaba en una ruleta que sorteja el partit. La persona reptada veu les regles abans d’acceptar: tots dos aposteu el mateix, la quota del rival queda amagada, si tots dos encerteu guanya la quota més alta i si tots dos falleu es retornen els punts. Té cinc hores per respondre.',
          'Una aposta contradictòria es bloqueja abans d’arribar al butlletí. Abans de l’inici del partit es pot retirar una aposta mantenint un botó. Tot existeix en castellà i en anglès.',
        ),
        gallery(
          image('/assets/betsy-v2-create.webp', 'Creació d’una lliga de Betsy a l’iPhone: hora de la jornada, saldo inicial i les regles de la jornada.', 'Crear una lliga, versió real', 'screenshot', '9/16'),
          image('/assets/betsy-v2-markets.webp', 'Mercats d’un partit, amb les apostes que contradiuen l’escollida marcades en vermell.', 'Les apostes contradictòries es bloquegen', 'screenshot', '9/16'),
          image('/assets/betsy-v2-betslip.webp', 'Butlletí amb dues apostes de dos partits, fitxes d’import, quota combinada, possible premi i saldo després.', 'Un butlletí de dos partits', 'screenshot', '9/16'),
          image('/assets/betsy-v2-history.webp', 'Una aposta oberta de dues seleccions a l’historial, amb un botó per retirar-la mantenint abans del partit.', 'Retirar una aposta és mantenir el botó', 'screenshot', '9/16'),
          placeholder('9/16', 'PLACEHOLDER: the incoming duel screen with its rules explained.', 'screenshot'),
        ),
      ],
      implementation: [
        stack(
          ['SwiftUI', 'Una app nativa d’iOS dividida per funcions: benvinguda, inici, jugar, lliga, apostes, duels i perfil.'],
          ['Firebase Auth i Firestore', 'Comptes, lligues, membres i duels. Les regles de seguretat són on s’imposa la justícia.'],
          ['The Odds API', 'Partits, quotes i marcadors finals reals, darrere d’una capa que els pot canviar per dades simulades. Al pla gratuït, un control per a les peticions automàtiques abans que s’acabi el pressupost mensual compartit.'],
          ['Next.js', 'La web de presentació, suport i textos legals.'],
        ),
        claims(
          ['known', 'Una revisió de seguretat va tancar un forat que permetia enumerar correus: qualsevol usuari amb sessió podia llegir els perfils, i ara són privats.'],
          ['known', 'Quan s’acaben els crèdits gratuïts de l’API, els resultats deixen d’arribar fins que comença el mes següent. Ara una segona clau pren el relleu automàticament.'],
          ['planned', 'Punts i liquidació al servidor, que necessiten el pla de pagament de Firebase.'],
        ),
      ],
      accessibility: [
        checks(
          ['reviewed', 'WCAG 2.2 AA és l’objectiu declarat de cada canvi, i els objectius tàctils s’han comprovat contra la mida mínima quan s’han redimensionat.'],
          ['done', 'Totes les pantalles en castellà i en anglès.'],
          ['missing', 'No hi ha cap prova gravada amb VoiceOver ni amb Dynamic Type.'],
        ),
        note('validation', 'Run VoiceOver through placing a bet and record it.'),
      ],
      validation: [
        claims(
          ['tested', 'Les proves de l’assignatura amb els usuaris previstos.'],
          ['tested', 'Les regles i la lògica de pagaments contra l’emulador de Firestore.'],
          ['observed', 'Una aposta real es va liquidar correctament en un mòbil real amb marcadors reals.'],
          ['not-validated', 'Si un grup continua jugant durant una temporada sencera, i si les regles del duel li semblen justes a qui perd.'],
        ),
        testPlan({
          participants: 'Dos grups d’amics de quatre a sis persones, durant una jornada completa.',
          tasks: ['Unir-se a una lliga amb un codi.', 'Fer una aposta de dues seleccions.', 'Reptar algú a un duel i respondre’n un.'],
          questions: ['Qui creus que ha guanyat el duel i per què?', 'Et sembla just que la quota del rival estigui amagada?', 'Què t’ha fet tornar a obrir l’app?'],
          observe: ['On es malinterpreta l’import o el premi.', 'Discussions que les regles no van resoldre.'],
          success: ['Cada resultat d’un duel s’entén sense que jo l’expliqui.', 'Cada grup aposta en més d’un dia.'],
          priorities: ['Els punts virtuals generen prou tensió.', 'Els duels fan tornar la gent entre jornades.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Un prototip d’iOS que funciona sobre un backend real de Firebase, amb partits reals i liquidació real.'],
          ['known', 'Codi públic i una web del producte.'],
          ['planned', 'TestFlight i l’App Store, que necessiten un compte de desenvolupador d’Apple.'],
        ),
        note('content', 'Is your friends’ league still running on it? Say how many people and since when.'),
      ],
      reflection: [
        text(
          'La decisió més important va ser tractar les regles com a part de la interfície. Gairebé tot el que fa que Betsy se senti just és invisible: les quotes amagades, la devolució quan tots dos fallen, un pagament que només pot passar una vegada.',
          'Un wireframe no pot ensenyar una cursa entre dos mòbils. Dissenyar les pantalles i les regles de la base de dades alhora va treure a la llum problemes de producte que cap pantalla estàtica hauria ensenyat.',
          'El que encara no sé: si els punts virtuals mantenen un grup jugant més enllà de les primeres setmanes, i si totes aquestes mecàniques tenen sentit en un joc entre amics.',
        ),
        note('decision', 'You added rewarded ads that give points. Decide whether to talk about it here: it is a real product tension worth owning, or leave it out.'),
      ],
    },
    next: { slug: 'jeffrey-desk', line: 'De tornada a Jeffrey Desk, el que va arribar més lluny: d’una eina personal a una cosa que un desconegut pot instal·lar.' },
  },
};
