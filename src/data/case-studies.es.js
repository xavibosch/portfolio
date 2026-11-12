// Spanish version of src/case-studies.js. Same shape; editing notes and
// placeholders stay in English because only Xavi sees them.
import { text, claims, media, gallery, options, decision, stack, checks, testPlan, note, placeholder, image } from './case-blocks.js';

export default {
  'jeffrey-desk': {
    oneLiner: 'Un espacio de trabajo para Mac que reúne en una sola ventana los servicios web, los archivos, el calendario y la IA que uso cada día, con un agente que puede actuar sobre ellos.',
    role: 'Diseño de producto, diseño de interacción y desarrollo de escritorio',
    type: 'Producto por iniciativa propia',
    team: 'Proyecto individual',
    timeline: '',
    timelineNote: 'Add the period: when the projected desk started (Intelligent Environments) and when the Mac version began.',
    status: 'En uso diario por mí. La edición de producto está en desarrollo activo, con la versión 0.1.29 lista para publicar',
    stack: ['Electron (castLabs)', 'HTML, CSS y JavaScript', 'Python', 'whisper.cpp', 'Widevine'],
    links: [['jeffreydesk.com', 'https://jeffreydesk.com']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 to 30 second product walkthrough. Open the app, switch panels, ask the AI to do one real task.', 'video'),
    heroFallback: image('/assets/jeffrey-desk-real.webp', 'Jeffrey Desk funcionando: cuatro paneles con servicios de streaming, una conversación con Codex y una barra de controles del Mac abajo.', 'El escritorio funcionando, paneles en marcha', 'screenshot'),
    sections: {
      context: [
        text(
          'Jeffrey Desk empezó como una mesa proyectada y táctil para la asignatura de Intelligent Environments de La Salle: el día proyectado sobre el escritorio, con una cámara siguiendo mi mano.',
          'Convivir con ella dejó algo claro. Casi todo lo que valoraba era el software, no la proyección. Así que llevé el escritorio al Mac, donde podía usarlo cada día y no solo en una habitación a oscuras.',
          'Más tarde decidí convertirlo en algo que otras personas pudieran instalar. Esa es la parte que más cambió el proyecto, y en la que más se detiene este caso de estudio.',
        ),
        note('content', 'Add one or two sentences on why the course brief led to a desk, and when you decided to move it to the Mac.'),
      ],
      problem: [
        text('Mi día estaba repartido entre una docena de apps y el doble de pestañas: el campus, Netflix, una IA, Spotify, el calendario y el correo, todo a la vez. Cada cambio costaba un poco de atención, el navegador trataba igual una película que un examen, y nada podía ver el día entero para ayudarme con él.'),
        text('La IA que usaba podía responder, pero no actuar. Podía explicarme cómo descargar el primer PDF de una asignatura. No podía abrir el campus y hacerlo.'),
        claims(
          ['observed', 'La fricción es mía: cambiar entre los mismos servicios cada día.'],
          ['not-validated', 'Si otros estudiantes sienten esa fricción con la fuerza suficiente para cambiar su forma de trabajar.'],
        ),
      ],
      audience: [
        text('Jeffrey Desk empezó como un producto por iniciativa propia, diseñado alrededor de mi forma de trabajar. Su viabilidad técnica está demostrada, porque lo uso cada día. Su usabilidad para un público más amplio todavía tiene que validarse con otras personas que usen Mac.'),
        claims(
          ['observed', 'Yo: un estudiante cuyo día es el campus, el streaming, una IA, la música, el calendario y el correo.'],
          ['assumed', 'Otras personas con Mac que viven entre muchas pestañas, empezando por estudiantes universitarios, por eso la integración del campus funciona con cualquier Moodle.'],
          ['not-validated', 'Que otra persona pueda montar un escritorio vacío por su cuenta y seguir usándolo.'],
        ),
      ],
      evidence: [
        text('No hubo una investigación de usuarios formal. Empezó como una observación de mi propio comportamiento, y después como un concepto para la asignatura.'),
        gallery(
          image('/assets/jeffrey-desk-idea.webp', 'Panel conceptual de un escritorio inteligente proyectado que enumera proyector, cámara, sensores piezoeléctricos, Raspberry Pi y ESP32.', 'Panel conceptual del escritorio proyectado. Un render, no una fotografía', 'concept'),
          placeholder('16/10', 'PLACEHOLDER: screenshot of the fragmented workflow before the desk, the real tabs and apps open on a normal day.', 'photo'),
        ),
        note('evidence', 'A photograph of the real projected prototype, if one exists. The current image is a concept render.'),
      ],
      assumptions: [
        claims(
          ['known', 'Un agente puede actuar dentro de páginas web incrustadas y sobre el Mac a la vez. Construido y en uso diario.'],
          ['observed', 'Lo que usaba no era la proyección. Era el software.'],
          ['assumed', 'Una persona nueva puede entender los paneles, la rueda de servicios y los nombres sin que se los expliquen.'],
          ['assumed', 'La gente dejará que una IA lea sus páginas y carpetas si los permisos son concretos y visibles.'],
          ['known', 'Incrustar servicios de terceros es donde el producto podría fallar: las condiciones de las plataformas, el vídeo cifrado y la prohibición de WhatsApp a los clientes de terceros.'],
          ['not-validated', 'Si alguien pagará por él. Los planes existen en el código, pero nunca se ha probado que alguien pague.'],
        ),
        note('content', 'Confirm the last line: is anything on sale yet, and has anyone installed the product edition?'),
      ],
      exploration: [
        options(
          { title: 'Un escritorio proyectado y táctil', solving: 'Una sola superficie para todo el día, con la mano como entrada.', pros: 'Memorable. Usaba el propio escritorio.', cons: 'Necesita un proyector, una cámara y una habitación a oscuras, el tacto es impreciso y no se puede enviar a nadie.', verdict: 'discarded', why: 'Me quedé con el software y lo llevé al Mac. El seguimiento de la mano solo sobrevive en mi edición personal.' },
          { title: 'Vídeo con el Picture in Picture de Safari', solving: 'Reproducir vídeo cifrado dentro de un panel sin licencia.', pros: 'No hacía falta certificación.', cons: 'Demasiadas piezas frágiles sujetas entre sí.', verdict: 'discarded', why: 'Lo sustituí por Widevine en una app certificada, usado tal como está diseñado.' },
          { title: 'Hacerse pasar por Chrome', solving: 'Que el streaming y WhatsApp cargaran en el escritorio personal.', pros: 'Funciona.', cons: 'Incumple las condiciones de las plataformas y lo convierte en saltarse un control de acceso. No es algo que se pueda vender.', verdict: 'discarded', why: 'El producto se identifica con honestidad como JeffreyDesk/0.1. Si una plataforma lo quiere bloquear, puede.' },
          { title: 'Una sola carpeta para las dos ediciones', solving: 'Trabajar en el producto sin una segunda copia.', pros: 'Sencillo.', cons: 'La app personal instalada sirve en directo los archivos de su carpeta, así que editar el producto reescribía la página que estaba sirviendo. Se rompió dos veces.', verdict: 'discarded', why: 'Dos worktrees de git del mismo repositorio: historial compartido, archivos separados.' },
        ),
        gallery(
          image('/assets/jeffrey-desk-concept-empty.webp', 'Render conceptual de un escritorio vacío: cuatro paneles que dicen toca para añadir una app, con una fila de controles del Mac debajo.', 'Exploración visual: el estado vacío. Un render conceptual, no la interfaz publicada', 'concept'),
          image('/assets/jeffrey-desk-concept-configured.webp', 'Render conceptual de un escritorio configurado con Notion, una web de noticias, el correo y un calendario en cuatro paneles.', 'Exploración visual: un escritorio montado. Un render conceptual, no la interfaz publicada', 'concept'),
        ),
        note('decision', 'Voice commands were removed on 10 October 2026 and only dictation stayed. Explain why: it is a strong decision to show.'),
      ],
      decision: [
        decision({
          title: 'Una base de código, dos ediciones',
          situation: 'El escritorio personal era bueno y no se podía vender tal como estaba. Mi horario, mi campus, mi nombre y mis servicios estaban escritos dentro. WhatsApp y hacerse pasar por Chrome no se podían vender. La mitad de la interfaz existía para un proyector.',
          options: ['Publicar el escritorio personal con una pantalla de ajustes para cambiar lo que estaba escrito en el código.', 'Hacer un producto aparte y dejar que los dos se separaran.', 'Mantener una sola base de código y describir cada edición en un archivo, separando lo que una edición puede ofrecer de lo que el usuario ha puesto en su escritorio.'],
          decision: 'La tercera. La regla que escribí para ella: el producto tiene que funcionar exactamente igual que el personal. La única diferencia es que no viene nada montado.',
          reasoning: 'Las mejoras siguen pasando de uno a otro con un merge normal de git, mi escritorio sigue funcionando mientras el producto cambia, y una instalación nueva empieza vacía en lugar de enseñar la vida de otra persona.',
          tradeoff: 'Cada función tiene que saber en qué edición está, y hay dos apps que construir y probar. La comprobación automática ahora recorre toda la app en cada plan y compara 86 pantallas.',
          consequence: 'El producto perdió WhatsApp, el disfraz de Chrome, el horario escrito en el código, mi nombre, el seguimiento de la mano y los controles del proyector. Ganó una configuración en cuatro pasos y hasta 48 servicios propios, cada uno limitado a su dominio.',
        }),
      ],
      interaction: [
        text(
          'Una fila de información arriba (reloj, tiempo, las tareas del día, una agenda semanal, un temporizador, Spotify), tres paneles grandes con dos visibles a la vez, y una barra abajo que controla el propio Mac.',
          'Un panel vacío enseña un botón grande. Abre una configuración en cuatro pasos: cómo se llama cada panel, qué va dentro y el campus si lo hay. Elegir un servicio es una rueda que giras con el trackpad o arrastrando, con el logo real de cada servicio. Después, el botón más de cualquier panel abre el mismo catálogo, y una vista de organizar deja arrastrar las tarjetas de un panel a otro.',
          'Las dos conversaciones con IA funcionan a través de las herramientas de línea de órdenes de Claude y Codex que ya tienes. Solo pueden leer y editar archivos dentro de las carpetas que has abierto, nunca más de cinco y nunca carpetas privadas. La cuota que queda siempre está a la vista, y cuando una se acaba el escritorio pasa a la otra.',
          'Las entregas de las asignaturas aparecen solas en la lista del día. El escritorio pregunta al propio servicio de calendario de Moodle en lugar de leer la pantalla, así que no se rompe cuando la universidad cambia el tema.',
        ),
        gallery(
          image('/assets/jeffrey-desk-setup.webp', 'El selector de widgets en la web del producto, con los logos de los servicios en una rueda.', 'Elegir qué va en un panel', 'screenshot'),
          image('/assets/jeffrey-desk-spotify.webp', 'El widget de Spotify dentro del escritorio durante una sesión real.', 'Spotify, controlado desde el escritorio', 'screenshot'),
          placeholder('16/10', 'PLACEHOLDER: short recording of the four-step set-up, from an empty panel to a filled one.', 'video'),
          placeholder('16/10', 'PLACEHOLDER: the waiting, error and empty states side by side.', 'screenshot'),
        ),
        note('content', 'Explain how the desk shows waiting, failure and success, for example when a service is blocked or the AI is busy.'),
      ],
      implementation: [
        text('Tres piezas: la página, un puente local y la carcasa de Electron. La separación existe para que incrustar webs de otros no sea una puerta abierta.'),
        stack(
          ['Electron, versión de castLabs', 'Abre la ventana, arranca el puente y vigila cada vista web incrustada. Cada servicio tiene su sesión sellada y su propia lista de dominios permitidos. La versión de castLabs está porque puede reproducir vídeo cifrado con Widevine una vez la app está certificada.'],
          ['HTML, CSS y JavaScript, sin framework', 'Una sola página sin paso de compilación. Empezó como un único archivo de unas 5.800 líneas y después se dividió en módulos sin cambiar ni un byte de comportamiento, comprobado con un test que rehace la página y la compara.'],
          ['Puente en Python, solo con la biblioteca estándar', 'Un servidor pequeño en 127.0.0.1. La página no puede tocar el disco ni ejecutar nada, tiene que pedírselo al puente, que solo conoce una lista cerrada de acciones. También explica por qué 127.0.0.1 y no un archivo: el inicio de sesión de Spotify tiene que volver a una dirección registrada.'],
          ['whisper.cpp', 'El dictado se transcribe en el Mac. No se sube nada.'],
          ['Widevine', 'Descifra el vídeo de streaming dentro del módulo de Google. La app nunca ve la clave y no puede grabar. La certificación la da castLabs EVS.'],
        ),
        claims(
          ['known', 'La seguridad forma parte de la arquitectura: el puente comprueba las cabeceras Host y Origin, cada script en línea solo se ejecuta si su hash está en la política de seguridad de contenido, y ningún renderer tiene Node.'],
          ['known', 'Todavía no está notarizada. Sin una firma Developer ID no se abre en otro Mac, y cada compilación reinicia el permiso de Accesibilidad de macOS.'],
          ['planned', 'Una revisión legal de las cuestiones del vídeo y de las suscripciones antes de cobrar.'],
        ),
        text('Dos lecciones que costaron horas. Probar en una pestaña del navegador en lugar de dentro de Electron se salta media app sin avisar. Y un gestor de errores en línea, rechazado por la política de seguridad, llegó a esconder 613 errores.'),
        media(placeholder('16/9', 'PLACEHOLDER: architecture diagram of page, bridge and shell, drawn from the README diagram.', 'diagram')),
      ],
      accessibility: [
        checks(
          ['done', 'Teclado y VoiceOver en todas las ventanas, según las notas de la versión 0.1.29.'],
          ['done', 'El seguimiento de la mano es opcional y solo existe en la edición personal. Todo funciona con ratón, trackpad o teclado.'],
          ['done', 'El consumo de energía en reposo se ha reducido a un tercio, algo que importa en un portátil abierto todo el día.'],
          ['missing', 'Todavía no hay una auditoría de contraste.'],
          ['missing', 'No se ha comprobado el movimiento reducido con el ajuste del sistema.'],
        ),
        note('validation', 'Record a short VoiceOver and keyboard-only pass to back up the first line.'),
      ],
      validation: [
        claims(
          ['tested', 'Una comprobación automática recorre toda la app en cada plan contra un puente temporal y compara 86 pantallas con una referencia conocida.'],
          ['observed', 'Uso la edición personal cada día.'],
          ['not-validated', 'No se ha observado a nadie más montando o usando la edición de producto.'],
        ),
        testPlan({
          participants: 'Cinco estudiantes con Mac que durante el día pasan del campus al correo, al streaming y a una IA.',
          tasks: ['Instalar la app y montar dos paneles sin ayuda.', 'Añadir una web propia.', 'Pedir a la IA que descargue el primer PDF de una asignatura.', 'Encontrar las entregas de esta semana.'],
          questions: ['¿Qué esperabas que pasara al girar la rueda?', '¿Qué crees que puede y no puede tocar la IA en tu Mac?', '¿Qué seguirías haciendo en un navegador normal?'],
          observe: ['Dónde dudan durante la configuración.', 'Si ponen nombre a los paneles o dejan los de por defecto.', 'Si confían a la IA un archivo real.'],
          success: ['Configuración terminada sin preguntarme.', 'Saben explicar con sus palabras los límites de la IA.', 'Deciden dejarlo abierto al día siguiente.'],
          priorities: ['Un desconocido puede montarlo solo.', 'La gente acepta que una IA actúe sobre sus archivos cuando los límites son visibles.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Una app de Mac que funciona y que uso cada día.'],
          ['known', 'Una edición de producto instalable con su propia web, un proceso de configuración, planes y un actualizador. La versión 0.1.29 está lista para publicar.'],
          ['planned', 'La notarización, y después los primeros usuarios de fuera.'],
        ),
        media(image('/assets/jeffrey-desk-web.webp', 'La web del producto jeffreydesk.com.', 'jeffreydesk.com, la web del producto', 'screenshot')),
        note('content', 'Add the number of installs or people on the waiting list, if you have them.'),
      ],
      reflection: [
        text(
          'La decisión más importante fue separar lo que una edición puede ofrecer de lo que alguien ha puesto en su escritorio. Antes de eso, cada cambio para el producto podía romper el escritorio del que dependo.',
          'Lo que haría distinto: construir para un escritorio vacío desde el principio. Cada atajo que tomé para mí tuve que pagarlo antes de que un desconocido pudiera instalarlo.',
          'Lo que no funcionó: la cuadrícula. Viene de la mesa proyectada, y una app de Mac no tiene por qué tener la misma forma. Es lo próximo que hay que repensar.',
          'Lo que todavía no sé: si alguien más lo montará y lo mantendrá. Esa es la pregunta que tiene que responder la próxima ronda de pruebas.',
        ),
      ],
    },
    next: { slug: 'reps', line: 'Si Jeffrey Desk va del alcance de un producto, Reps va de una sola interacción bajo una restricción dura: manos que no están libres.' },
  },

  reps: {
    oneLiner: 'Una pantalla de entrenamiento para un gimnasio de garaje que se controla señalando la cámara, para que unas manos con magnesio nunca tengan que tocarla.',
    role: 'Diseño de interacción y desarrollo frontend',
    type: 'Prototipo personal',
    team: 'Proyecto individual',
    timeline: '',
    timelineNote: 'Add the period you built and used it.',
    status: 'Prototipo que funciona, instalado como app de Mac y usado en mis propias sesiones',
    stack: ['React', 'TypeScript', 'MediaPipe', 'Electron', 'Spotify Connect'],
    links: [['Código en GitHub', 'https://github.com/xavibosch/reps']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second video of one real set: point, hold, the ring fills, rest timer starts.', 'video'),
    heroFallback: image('/assets/reps-session.webp', 'Reps en plena sesión: el ejercicio actual, el peso y las series con controles redondos grandes.', 'En plena sesión, serie en curso', 'screenshot'),
    sections: {
      context: [
        text(
          'Entreno en un garaje: un banco, una barra, dos mancuernas y treinta kilos de discos. Entre series tengo las manos con magnesio o todavía en la barra.',
          'Todas las apps de entrenamiento que probé daban por hecho una mano libre y limpia. Cuando iba a por el móvil ya se había bloqueado, y había perdido la cuenta de las series y la música.',
        ),
      ],
      problem: [
        text('Registrar una serie, empezar el descanso y cambiar la música significaba tocar una pantalla justo en el momento en que menos podía hacerlo con las manos.'),
        claims(
          ['observed', 'En mis propias sesiones el móvil se bloqueaba entre series, y perdía la cuenta de las series y la música.'],
          ['not-validated', 'Si a otras personas que entrenan en casa les pasa lo mismo.'],
        ),
      ],
      audience: [
        text('Reps está hecho para una persona y una habitación: yo, en mi garaje. Eso hace que las decisiones de diseño sean concretas y las conclusiones, limitadas.'),
        claims(
          ['observed', 'Yo, entrenando en casa con un portátil y su cámara mirando al banco.'],
          ['assumed', 'Cualquiera que entrene en casa con una pantalla cerca tiene el mismo problema de manos ocupadas.'],
          ['not-validated', 'Otros cuerpos, habitaciones, luces y distancias a la cámara.'],
        ),
      ],
      evidence: [
        text('No fue una investigación formal. Empezó como una observación de mi propio comportamiento entre series.'),
        gallery(
          placeholder('4/3', 'PLACEHOLDER: photograph of the garage set-up, showing where the screen and camera sit relative to the bench.', 'photo'),
          placeholder('4/3', 'PLACEHOLDER: photograph of chalked hands on the bar, the reason the screen cannot be touched.', 'photo'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'El seguimiento de la mano es lo bastante fiable a la distancia del gimnasio y con la luz del garaje.'],
          ['assumed', 'Mantener un momento es lo bastante rápido para no frenar una sesión.'],
          ['not-validated', 'Que deslizar resultaría natural para cambiar de ejercicio. Resultó ser falso, como se ve más abajo.'],
          ['known', 'Una pestaña del navegador no guarda el permiso de la cámara en Safari, así que el seguimiento nunca empezaría solo.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Deslizar para cambiar de ejercicio', solving: 'Una forma rápida de avanzar sin apuntar.', pros: 'En teoría parece natural.', cons: 'El índice también es el cursor, así que un movimiento rápido a la derecha es lo mismo que deslizar a la derecha. Las condiciones sobre el estado de la mano y la dirección lo redujeron pero nunca lo eliminaron.', verdict: 'discarded', why: 'Ambiguo por diseño, no mal ajustado. Las flechas de la pantalla y el teclado hacen ese trabajo sin ambigüedad.' },
          { title: 'Doble toque de los AirPods como mando', solving: 'Un control que no necesita una mano delante de la cámara.', pros: 'Ya los llevo puestos.', cons: 'Los toques nunca llegan al sistema como teclas multimedia. Reclamar la sesión multimedia funcionaba, pero Spotify la recuperaba en milisegundos cada vez.', verdict: 'discarded', why: 'Tres intentos, todos suposiciones sobre cómo viaja el evento. La lección fue comprobar en el registro del sistema el camino real del evento antes de escribir código.' },
          { title: 'Una pestaña del navegador', solving: 'Usar Reps sin instalar nada.', pros: 'No hay nada que instalar.', cons: 'Safari pide la cámara cada vez, así que el seguimiento nunca arranca solo.', verdict: 'kept as a fallback', why: 'Una pequeña carcasa de Electron responde al permiso web en el código. Un solo aviso de macOS, una vez.' },
          { title: 'El reproductor web de Spotify', solving: 'Música dentro de la app.', pros: 'Todo en un mismo sitio.', cons: 'No funciona en iOS y necesita un dispositivo de reproducción dentro de la página.', verdict: 'discarded', why: 'Spotify Connect controla el cliente que ya está sonando, sin servidor.' },
        ),
      ],
      decision: [
        decision({
          title: 'Cada control se confirma manteniendo',
          situation: 'Un cursor que sigue la mano no tiene clic, y de camino a un botón pasa por encima de otros.',
          options: ['Pellizcar para hacer clic.', 'Deslizamientos y gestos dedicados.', 'Mantener para confirmar en cada control, con un anillo que se llena antes de que pase nada.'],
          decision: 'Mantener para confirmar en todas partes. El cursor envía eventos de puntero normales, así que los mismos controles funcionan con la mano, un ratón, un trackpad o una pantalla táctil. Un toque rápido sigue funcionando como atajo con el ratón.',
          reasoning: 'Un solo contrato de interacción para cualquier entrada, y el anillo es la señal de que el sistema ha entendido antes de actuar. La espera solo empieza cuando la mano ha frenado, así que pasar por encima del panel no pulsa nada.',
          tradeoff: 'Cada acción cuesta unos 0,6 segundos de espera, más lento que un clic.',
          consequence: 'El deslizamiento desapareció. Cambiar de ejercicio es una flecha que mantienes, o una tecla.',
        }),
        note('content', 'Your newer version adds an active and a standby mode (both hands open to wake) and a fingertip touch to complete a set. They are not in the public repository yet. Push them, then describe them here as a second decision.'),
      ],
      interaction: [
        text(
          'Eliges un entrenamiento y una sola pantalla contiene la sesión: el ejercicio y la serie, el temporizador de descanso, la cola y la música. Señalas un control y mantienes. El control crece y se llena un anillo mientras mantienes, y si te apartas antes de que se llene no pasa nada.',
          'Terminar una serie empieza la cuenta atrás del descanso. La última serie pasa sola al siguiente ejercicio, y la sesión acaba con un resumen de lo que has levantado de verdad. Un registro guarda un calendario de sesiones y una racha, y las carreras se apuntan a mano.',
          'La música solo empieza al elegir un entrenamiento, nunca al abrir la app, y Spotify aparece detrás de la pantalla de entrenamiento en lugar de taparla.',
        ),
        gallery(
          image('/assets/reps-home.webp', 'Selector de entrenamientos con baldosas grandes que se eligen manteniendo.', 'Elegir un entrenamiento', 'screenshot'),
          image('/assets/reps-rest.webp', 'Temporizador de descanso en cuenta atrás con la canción de Spotify debajo.', 'Temporizador de descanso con Spotify', 'screenshot'),
          image('/assets/reps-leave.webp', 'Diálogo que pide confirmación antes de salir de una sesión.', 'Salir de una sesión pide confirmación', 'screenshot'),
          image('/assets/reps-summary.webp', 'Resumen de final de sesión con los ejercicios y los pesos levantados.', 'Resumen de la sesión', 'screenshot'),
        ),
        media(placeholder('16/9', 'PLACEHOLDER: 10 second recording of a hold being cancelled by moving away, the recovery from a mistake.', 'video')),
        note('content', 'Describe what the screen shows when the camera fails or no hand is found.'),
      ],
      implementation: [
        stack(
          ['React y TypeScript', 'La interfaz. Todos los controles comparten un mismo hook de mantener para confirmar, así que el contrato no puede variar de un botón a otro.'],
          ['Puntos de la mano de MediaPipe', 'Encuentra la punta del índice. La mano solo cubre cómodamente el centro de la imagen de la cámara, así que esa zona central se estira hasta llenar la pantalla.'],
          ['Escritura directa en el DOM para el cursor', 'El punto se mueve escribiendo su transform dentro del bucle de seguimiento, no a través del estado de React. El estado pinta un fotograma por detrás de la detección, así que el punto que ves y el botón que se pulsa no coincidían por decenas de píxeles.'],
          ['Carcasa de Electron', 'Existe solo para que el permiso de la cámara se mantenga. Carga la web publicada para que el inicio de sesión de Spotify vuelva a la dirección correcta.'],
          ['Spotify Connect con PKCE', 'Controla la app de Spotify que ya está abierta, sin un servidor propio.'],
        ),
        text(
          'Que el cursor cayera un par de centímetros desviado no era un problema de seguimiento. Un ancestro con un transform de CSS se convierte en el bloque contenedor de cualquier elemento fixed que tenga dentro, así que el punto se dibujaba en el marco escalado mientras la detección leía la ventana real. Dibujarlo fuera de ese marco lo arregló. Casi todos los problemas de seguimiento que encontré eran problemas de coordenadas.',
          'El peor error congelaba el Mac entero. Al despertar de la suspensión, la pista de la cámara se acaba, y un catch silencioso alrededor de la detección lo reintentaba en cada fotograma para siempre. Ahora cuenta los fallos y se para, comprueba si la pista ha terminado y suelta la cámara antes de que el Mac se suspenda.',
        ),
      ],
      accessibility: [
        checks(
          ['done', 'Los gestos nunca son la única vía. Cada control también funciona con ratón, trackpad o pantalla táctil, y el teclado cubre la sesión: Espacio o Intro terminan una serie, las flechas avanzan y cambian el peso, y Escape cierra los paneles.'],
          ['done', 'La respuesta no depende solo del color: el control crece y el anillo se llena mientras mantienes.'],
          ['done', 'Botones redondos grandes, pensados para una mano imprecisa a distancia.'],
          ['missing', 'No se ha probado con un lector de pantalla. Primero los controles necesitan nombres adecuados.'],
          ['missing', 'No hay opción de movimiento reducido ni auditoría de contraste del rojo sobre negro.'],
        ),
      ],
      validation: [
        claims(
          ['observed', 'Usado en mis propias sesiones en el garaje.'],
          ['not-validated', 'Nadie más ha entrenado con él.'],
        ),
        note('content', 'Add how many sessions are in the log and over what period.'),
        testPlan({
          participants: 'De tres a cinco personas que entrenan en casa con un portátil o una pantalla cerca.',
          tasks: ['Completar una sesión de tres ejercicios sin tocar nada.', 'Pausar la música durante un descanso.', 'Recuperarse después de mantener el control equivocado.'],
          questions: ['¿Cómo sabías que el sistema te había entendido?', '¿Cuándo has querido tocar la pantalla igualmente?', '¿Se te ha hecho lento mantener?'],
          observe: ['Activaciones no deseadas.', 'Cómo se colocan delante de la cámara.', 'Si acaban yendo al teclado.'],
          success: ['Una sesión entera sin ninguna acción no deseada.', 'Saben decir qué significa el anillo que se llena sin que se lo expliquen.'],
          priorities: ['El seguimiento aguanta en otras habitaciones y con otra luz.', 'Mantener para confirmar es lo bastante rápido en mitad de un entrenamiento.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Un prototipo que funciona, instalado como app de Mac, con una versión web publicada.'],
          ['known', 'El código es público en GitHub.'],
          ['planned', 'Actualizar el repositorio público con el modo de reposo y la corrección del bloqueo.'],
        ),
      ],
      reflection: [
        text(
          'La decisión más importante fue dejar que la mano generara eventos de puntero normales. Así, el trabajo de gestos nunca tuvo que tocar la interfaz, y el ratón siguió funcionando todo el tiempo.',
          'Quitar el deslizamiento me enseñó a distinguir un diseño ambiguo de uno mal ajustado. Las condiciones solo podían reducirlo.',
          'Lo que haría distinto: comprobar cómo viaja de verdad un evento por el sistema antes de construir encima. Los tres intentos con los AirPods eran suposiciones.',
          'Lo que todavía no sé: si funciona para el cuerpo, la habitación y la luz de otra persona. Hasta ahora todo se ha probado en un solo garaje.',
        ),
      ],
    },
    next: { slug: 'betsy', line: 'Betsy pasa de una persona y una habitación a un grupo de amigos, donde lo difícil es que un juego se sienta justo.' },
  },

  betsy: {
    oneLiner: 'Una liga privada en la que los amigos compiten con partidos de fútbol reales y puntos virtuales, diseñada para que nadie pueda hacer trampa a los demás.',
    role: 'Investigación UX, diseño de interfaz, diseño de producto y desarrollo iOS',
    type: 'Proyecto de la universidad que se convirtió en un producto personal',
    team: 'Individual',
    teamNote: 'Confirm whether the coursework phase (Interface and Graphic Design) had teammates, and who did what.',
    timeline: '',
    timelineNote: 'Add when the coursework happened and how long you have worked on it since.',
    status: 'Prototipo sobre un backend real. No está en la App Store',
    stack: ['SwiftUI', 'Firebase Auth', 'Reglas de Firestore', 'The Odds API', 'Next.js'],
    links: [['Código en GitHub', 'https://github.com/xavibosch/betsy-ios'], ['Web del producto', 'https://betsy-web-rho.vercel.app']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second walkthrough: join a league, place a pick, see the ranking move.', 'video'),
    heroFallback: image('/assets/betsy-v2-league.webp', 'Una liga privada de Betsy en el iPhone: clasificación, saldo, posición y el botón de apostar.', 'Clasificación de una liga privada, versión real', 'screenshot', '9/16'),
    sections: {
      context: [
        text(
          'Mi grupo de amigos discute de fútbol cada semana. Las predicciones, las capturas y los “ya te lo dije” viven en un chat de WhatsApp, y ahí desaparecen.',
          'Los únicos productos que convierten eso en un juego son las apps de apuestas, y te piden la tarjeta. Betsy empezó como trabajo de la asignatura de Diseño de Interfaces y Gráfico, en la que investigué para quién era y probé la primera interfaz con esas personas.',
        ),
      ],
      problem: [
        text('Las apps de apuestas están hechas para quitarle dinero a gente que no se puede permitir perderlo. Lo que mis amigos quieren de verdad, tener razón delante de los demás, no necesita nada de eso. Lo que sí necesita es estructura: reglas que todos acepten, resultados que nadie pueda discutir y una clasificación que signifique algo.'),
        claims(
          ['observed', 'Las predicciones del chat de mis amigos están repartidas entre mensajes, sin un marcador.'],
          ['assumed', 'Los puntos virtuales generan bastante tensión sin dinero.'],
        ),
      ],
      audience: [
        text('Betsy es el único proyecto en el que investigué con las personas para las que era antes de diseñar las pantallas: probé la interfaz con ellas, dibujé su recorrido y definí los usuarios objetivo.'),
        claims(
          ['observed', 'Mi propio grupo de amigos, que sigue el fútbol y ya compite de manera informal.'],
          ['assumed', 'Aficionados al deporte a los que les gusta predecir y quieren que se mida su acierto.'],
          ['assumed', 'Comunidades pequeñas, un grupo de la universidad o un equipo del trabajo, que quieren su propia liga.'],
        ),
        note('content', 'Add how many people took part in the coursework tests and one thing that changed because of them.'),
      ],
      evidence: [
        text('De la asignatura salieron un customer journey, unos usuarios objetivo y sesiones de prueba con el público previsto.'),
        gallery(
          placeholder('16/10', 'PLACEHOLDER: the customer journey map from Interface and Graphic Design.', 'diagram'),
          placeholder('16/10', 'PLACEHOLDER: early wireframes or the first tested interface, next to the current one.', 'screenshot'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'Un límite diario de apuestas lo hace estratégico en lugar de repetitivo.'],
          ['assumed', 'Los duelos uno contra uno dan a la gente un motivo para volver entre jornadas.'],
          ['known', 'Un juego con forma de apuesta necesita cuidado aunque no haya dinero, así que la app incluye una hoja de juego responsable y está prevista una calificación de 17+.'],
          ['not-validated', 'Si una liga se mantiene activa durante una temporada entera.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Primero, resultados simulados', solving: 'Probar jornadas enteras sin gastar créditos de la API ni esperar a los partidos reales.', pros: 'Cada flujo se podía probar de principio a fin en minutos.', cons: 'Un resultado falso no demuestra nada sobre liquidar apuestas reales.', verdict: 'kept for testing', why: 'En el producto lo sustituyó la liquidación real con los marcadores finales. Los mercados sin fuente de resultado se liquidan con una regla con semilla que da la misma respuesta en todos los móviles.' },
          { title: 'Enseñar la apuesta del rival en un duelo', solving: 'Transparencia entre dos jugadores.', pros: 'Parece abierto.', cons: 'El segundo jugador podía copiar la cuota y ganar en caso de empate.', verdict: 'discarded', why: 'La apuesta y la cuota del rival no se enseñan nunca.' },
          { title: 'Ganan los dos si los dos aciertan', solving: 'Una regla generosa para los empates.', pros: 'Nadie pierde.', cons: 'No hay nada en juego, así que un duelo deja de significar algo.', verdict: 'discarded', why: 'Ahora en un empate gana la cuota combinada más alta, y si los dos fallan, los dos recuperan sus puntos.' },
          { title: 'El mismo partido de duelo para todos cada día', solving: 'Un partido del día compartido.', pros: 'Sencillo y social.', cons: 'Un segundo duelo el mismo día repetía el mismo partido.', verdict: 'discarded', why: 'Cada duelo sortea un partido aleatorio, nunca el anterior.' },
        ),
      ],
      decision: [
        decision({
          title: 'La justicia vive en las reglas, no en la pantalla',
          situation: 'Escribir a la vez las reglas de Firestore y las vistas en SwiftUI lo destapó: dos móviles podían liquidar la misma apuesta y pagarla dos veces, porque nada en una pantalla dice quién es dueño de esa escritura.',
          options: ['Confiar en la app y esperar que dos móviles nunca liquiden a la vez.', 'Llevar la liquidación a un servidor, lo que necesita el plan de pago de Firebase.', 'Proteger ya cada pago con una transacción de la base de datos y un registro por apuesta que no se puede cambiar nunca, y pasar a un servidor más adelante.'],
          decision: 'La tercera. La interfaz puede pedir que se liquide una apuesta, pero solo las reglas pueden decidirlo.',
          reasoning: 'Cerró el pago doble sin pagar infraestructura mientras la app tiene un puñado de usuarios.',
          tradeoff: 'Los puntos todavía se pueden escribir desde el cliente, así que alguien que use directamente las herramientas de la base de datos podría hacer trampa en la clasificación. La solución de verdad necesita el servidor.',
          consequence: 'Probado contra el emulador de Firestore: todos los tests de las reglas pasaron, y liquidar la misma apuesta una y otra vez la abonó exactamente una vez.',
        }),
      ],
      interaction: [
        text(
          'Creas una liga o te unes a una con un código. Cada liga define sus reglas: competiciones, saldo inicial, apuestas por día y la ventana de apuestas. Eliges partidos, montas un boleto, eliges cuánto apostar y confirmas. Los resultados actualizan tu saldo y la clasificación.',
          'Un duelo es un flujo de tres pasos que acaba en una ruleta que sortea el partido. La persona retada ve las reglas antes de aceptar: los dos apostáis lo mismo, la cuota del rival queda oculta, si los dos acertáis gana la cuota más alta y si los dos falláis se devuelven los puntos. Tiene cinco horas para responder.',
          'Una apuesta contradictoria se bloquea antes de llegar al boleto. Antes del inicio del partido se puede retirar una apuesta manteniendo un botón. Todo existe en castellano y en inglés.',
        ),
        gallery(
          image('/assets/betsy-v2-create.webp', 'Creación de una liga de Betsy en el iPhone: hora de la jornada, saldo inicial y las reglas de la jornada.', 'Crear una liga, versión real', 'screenshot', '9/16'),
          image('/assets/betsy-v2-markets.webp', 'Mercados de un partido, con las apuestas que contradicen la elegida marcadas en rojo.', 'Las apuestas contradictorias se bloquean', 'screenshot', '9/16'),
          image('/assets/betsy-v2-betslip.webp', 'Boleto con dos apuestas de dos partidos, fichas de importe, cuota combinada, posible premio y saldo después.', 'Un boleto de dos partidos', 'screenshot', '9/16'),
          image('/assets/betsy-v2-history.webp', 'Una apuesta abierta de dos selecciones en el historial, con un botón para retirarla manteniendo antes del partido.', 'Retirar una apuesta es mantener el botón', 'screenshot', '9/16'),
          placeholder('9/16', 'PLACEHOLDER: the incoming duel screen with its rules explained.', 'screenshot'),
        ),
      ],
      implementation: [
        stack(
          ['SwiftUI', 'Una app nativa de iOS dividida por funciones: bienvenida, inicio, jugar, liga, apuestas, duelos y perfil.'],
          ['Firebase Auth y Firestore', 'Cuentas, ligas, miembros y duelos. Las reglas de seguridad son donde se impone la justicia.'],
          ['The Odds API', 'Partidos, cuotas y marcadores finales reales, detrás de una capa que puede cambiarlos por datos simulados. En el plan gratuito, un control para las peticiones automáticas antes de que se acabe el presupuesto mensual compartido.'],
          ['Next.js', 'La web de presentación, soporte y textos legales.'],
        ),
        claims(
          ['known', 'Una revisión de seguridad cerró un agujero que permitía enumerar correos: cualquier usuario con sesión podía leer los perfiles, y ahora son privados.'],
          ['known', 'Cuando se acaban los créditos gratuitos de la API, los resultados dejan de llegar hasta que empieza el mes siguiente. Ahora una segunda clave toma el relevo automáticamente.'],
          ['planned', 'Puntos y liquidación en el servidor, que necesitan el plan de pago de Firebase.'],
        ),
      ],
      accessibility: [
        checks(
          ['reviewed', 'WCAG 2.2 AA es el objetivo declarado de cada cambio, y los objetivos táctiles se han comprobado contra el tamaño mínimo cuando se han redimensionado.'],
          ['done', 'Todas las pantallas en castellano y en inglés.'],
          ['missing', 'No hay ninguna prueba grabada con VoiceOver ni con Dynamic Type.'],
        ),
        note('validation', 'Run VoiceOver through placing a bet and record it.'),
      ],
      validation: [
        claims(
          ['tested', 'Las pruebas de la asignatura con los usuarios previstos.'],
          ['tested', 'Las reglas y la lógica de pagos contra el emulador de Firestore.'],
          ['observed', 'Una apuesta real se liquidó correctamente en un móvil real con marcadores reales.'],
          ['not-validated', 'Si un grupo sigue jugando durante una temporada entera, y si las reglas del duelo le parecen justas a quien pierde.'],
        ),
        testPlan({
          participants: 'Dos grupos de amigos de cuatro a seis personas, durante una jornada completa.',
          tasks: ['Unirse a una liga con un código.', 'Hacer una apuesta de dos selecciones.', 'Retar a alguien a un duelo y responder a uno.'],
          questions: ['¿Quién crees que ha ganado el duelo y por qué?', '¿Te parece justo que la cuota del rival esté oculta?', '¿Qué te ha hecho volver a abrir la app?'],
          observe: ['Dónde se malinterpreta el importe o el premio.', 'Discusiones que las reglas no resolvieron.'],
          success: ['Cada resultado de un duelo se entiende sin que yo lo explique.', 'Cada grupo apuesta en más de un día.'],
          priorities: ['Los puntos virtuales generan bastante tensión.', 'Los duelos hacen volver a la gente entre jornadas.'],
        }),
      ],
      result: [
        claims(
          ['known', 'Un prototipo de iOS que funciona sobre un backend real de Firebase, con partidos reales y liquidación real.'],
          ['known', 'Código público y una web del producto.'],
          ['planned', 'TestFlight y la App Store, que necesitan una cuenta de desarrollador de Apple.'],
        ),
        note('content', 'Is your friends’ league still running on it? Say how many people and since when.'),
      ],
      reflection: [
        text(
          'La decisión más importante fue tratar las reglas como parte de la interfaz. Casi todo lo que hace que Betsy se sienta justo es invisible: las cuotas ocultas, la devolución cuando los dos fallan, un pago que solo puede ocurrir una vez.',
          'Un wireframe no puede enseñar una carrera entre dos móviles. Diseñar las pantallas y las reglas de la base de datos a la vez sacó a la luz problemas de producto que ninguna pantalla estática habría enseñado.',
          'Lo que todavía no sé: si los puntos virtuales mantienen a un grupo jugando más allá de las primeras semanas, y si todas estas mecánicas tienen sentido en un juego entre amigos.',
        ),
        note('decision', 'You added rewarded ads that give points. Decide whether to talk about it here: it is a real product tension worth owning, or leave it out.'),
      ],
    },
    next: { slug: 'jeffrey-desk', line: 'De vuelta a Jeffrey Desk, el que llegó más lejos: de una herramienta personal a algo que un desconocido puede instalar.' },
  },
};
