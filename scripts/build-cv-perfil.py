#!/usr/bin/env python3
"""CV de perfil, ES / EN / CA, desde una sola fuente.

Evolución del CV general: mismo formato, columna lateral con foto, pero
"Cómo trabajo" reescrito en primera persona con un proyecto real detrás de
cada punto y el enlace a su repositorio, y una columna de habilidades con
barra de nivel.

Todo enlace va en rojo y subrayado para que se vea que se puede pulsar.
Los repos se comprobaron públicos contra la API de GitHub antes de entrar
aquí: un enlace a un repo privado le devuelve un 404 a quien lo pulse.

Regla de la casa, forzada por check(): ni guiones ni puntos y coma en la
prosa. Los guiones de pronoms febles del catalán son ortografía, no
puntuación, así que esos sí pasan.
"""
import os, re, io
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image

HERE   = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.normpath(os.path.join(HERE, "..", "public"))
PHOTO  = os.path.join(PUBLIC, "images", "about-event.jpg")

PHONE = "+34 686 585 368"
GH    = "https://github.com/xavibosch/"

PAPER  = Color(250/255, 249/255, 245/255)
INK    = HexColor("#111111")
# El gris de las descripciones estaba a 8.7:1 sobre el papel, que cumple de
# sobra en pantalla pero a 8pt y sobre todo impreso en blanco y negro se lee
# flojo. A 12.4:1 sigue distinguiéndose del negro de los titulares y aguanta
# una impresora mala. FAINT se queda solo para las líneas, nunca para texto.
MUTED  = HexColor("#2F2C28")
FOOTTX = HexColor("#6B675F")
FAINT  = HexColor("#C9C5BC")
ACCENT = HexColor("#D63022")

HN = "/System/Library/Fonts/HelveticaNeue.ttc"
pdfmetrics.registerFont(TTFont("Disp",   HN, subfontIndex=9))
pdfmetrics.registerFont(TTFont("Body",   HN, subfontIndex=0))
pdfmetrics.registerFont(TTFont("BodyMd", HN, subfontIndex=10))
pdfmetrics.registerFont(TTFont("BodyBd", HN, subfontIndex=1))
pdfmetrics.registerFont(TTFont("Mono", "/System/Library/Fonts/Menlo.ttc", subfontIndex=0))

W, H = 595.28, 841.89
ML, MR, MT = 46, 46, 44
SIDE_W, GUT = 178, 22
MAIN_X = ML + SIDE_W + GUT
MAIN_W = W - MR - MAIN_X
PH_H = 190
FOOT = 46

ES = dict(
    out="Xavi-Bosch-CV-Perfil-ES.pdf", tag="ES", city="Barcelona",
    role="DISEÑO Y DESARROLLO DE PRODUCTO INTERACTIVO   ·   18",
    degree_url="https://www.salleurl.edu/es/estudios/grado-en-diseno-y-creacion-de-productos-interactivos-mencion-en-videojuegos",
    who_label="Quién soy",
    profile=(
        "Estudiante de segundo curso de Diseño y Creación de Productos Interactivos en "
        "La Salle. Lo que me gusta de verdad es la parte donde el diseño y el código se "
        "tocan: pensar cómo tiene que sentirse algo y después construirlo yo, de la "
        "interfaz al modelo de datos y, cuando hace falta, a la electrónica. Casi todo lo "
        "que sé lo he aprendido haciendo cosas y repitiéndolas hasta que funcionan, a "
        "base de práctica y de insistir, no en un curso. Me interesa sobre todo quitar "
        "pasos entre lo que alguien quiere hacer y hacerlo, y cuando algo se me escapa me "
        "quedo con ello hasta entenderlo."
    ),
    how_label="Cómo trabajo",
    how=[
        ("Cuando algo falla, lo desmonto antes de tocarlo", "remote-robot-car",
         "Con el coche teledirigido me pasé horas depurando el conjunto entero, con los "
         "motores, los sensores y la radio funcionando a la vez, y no saqué nada. En "
         "cuanto probé cada pieza por separado encontré el fallo en minutos."),
        ("Empiezo por la base y no por lo que se ve", "jeffrey-remote",
         "En el mando a distancia de Jeffrey hice las funciones primero y la conexión "
         "después, así que cada una tenía que aguantar sola una caída de red. Rehice la "
         "capa de conexión desde abajo y todo lo que añadí a partir de ahí ya funcionaba "
         "en remoto sin pedirlo."),
        ("Investigo antes de dibujar pantallas", "betsy-ios",
         "En Betsy definí a quién iba dirigido, mapeé el recorrido del usuario e hice "
         "pruebas con gente real antes de montar la interfaz. Lo que salió de ahí cambió "
         "el diseño bastante más que cualquier idea mía."),
        ("No doy nada por bueno hasta probarlo en el aparato de verdad", "haptic-hunter",
         "Ajusté las vibraciones de Haptic Hunter en el simulador, donde una vibración es "
         "una línea en un registro. En el móvil real, los patrones que más me gustaban "
         "eran justo los que no se distinguían con la mano."),
        ("A veces arreglar algo es quitarlo", "reps",
         "En Reps hice un gesto para cambiar de ejercicio que se disparaba solo. Le puse "
         "condiciones y seguía fallando, hasta que entendí que el dedo que desliza es el "
         "mismo que hace de cursor, así que el gesto era indistinguible por diseño. Lo "
         "borré y lo dejé en botones."),
        ("En equipo estoy cómodo, y lo primero es ponerse de acuerdo", "lasallefy-java",
         "laSallefy lo hicimos entre dos y al principio nos bloqueábamos, porque ninguno "
         "podía empezar hasta que el otro acabara su parte. Nos sentamos a decidir cómo "
         "se iban a hablar las piezas entre ellas y desde ahí cada uno pudo avanzar sin "
         "esperar al otro."),
        ("Uso IA todos los días, pero no a ciegas", "",
         "La IA es una herramienta más y me hace ir mucho más rápido, pero no doy nada "
         "por bueno sin entenderlo. Si no sé por qué funciona algo me paro hasta "
         "saberlo, porque lo que no entiendo no lo puedo arreglar el día que se rompa."),
    ],
    open_label="Disponible para",
    open_text=(
        "Prácticas y trabajo júnior en diseño de producto interactivo, desarrollo front "
        "end y producto, en Barcelona o fuera."
    ),
    soft_label="Competencias",
    soft_text=("Trabajo en equipo, aprendizaje autónomo, constancia, resolución de "
               "problemas, comunicación con las personas que van a usar lo que hago, "
               "diseño accesible e inclusivo."),
    main_label="Tecnologías principales",
    main_tech=("Swift y SwiftUI, Python, React y TypeScript, JavaScript, Firebase con "
               "Firestore y reglas de seguridad, OpenCV y MediaPipe, herramientas de IA, "
               "Git y GitHub, Figma."),
    other_label="Otros conocimientos",
    other_tech=("Java y orientación a objetos, UML, Electron, Vite, Vosk, Core Haptics, "
                "MQTT, Vercel, Ollama para modelos locales, Arduino y ESP32, Illustrator, "
                "Maya, ZBrush, Premiere."),
    contact_label="Contacto", edu_label="Formación", lang_label="Idiomas",
    edu_title=["Grado en Diseño y Creación", "de Productos Interactivos"],
    edu_link="salleurl.edu",
    edu_body="La Salle, Universitat Ramon Llull, Barcelona. Primer curso completo, 60 ECTS. Segundo curso desde septiembre de 2026.",
    langs=["Catalán  ·  nativo", "Castellano  ·  nativo", "Inglés  ·  C1 avanzado"],
    foot="CASOS COMPLETOS, EN INGLÉS, ESPAÑOL Y CATALÁN",
)

EN = dict(
    out="Xavi-Bosch-CV-Perfil-EN.pdf", tag="EN", city="Barcelona",
    role="INTERACTIVE PRODUCT DESIGN AND DEVELOPMENT   ·   18",
    degree_url="https://www.salleurl.edu/en/education/bachelor-design-and-creation-interactive-products-minor-video-games",
    who_label="Who I am",
    profile=(
        "Second year student of Interactive Product Design and Creation at La Salle. What "
        "I actually like is the part where design and code meet: working out how a thing "
        "should feel and then building it myself, from the interface to the data model "
        "and, when it is needed, the electronics. Almost everything I know I learned by "
        "making things and repeating them until they worked, through practice and "
        "stubbornness rather than a course. What interests me most is removing steps "
        "between wanting to do something and doing it, and when something is beyond me I "
        "stay with it until I understand it."
    ),
    how_label="How I work",
    how=[
        ("When something breaks, I take it apart before touching it", "remote-robot-car",
         "With the remote controlled car I spent hours debugging the whole thing, with "
         "the motors, the sensors and the radio all running at once, and got nowhere. As "
         "soon as I tested each part on its own I found the fault in minutes."),
        ("I start with the base, not with what you can see", "jeffrey-remote",
         "On Jeffrey's remote I built the features first and the connection afterwards, "
         "so each one had to survive a dropped network on its own. I rebuilt the "
         "connection layer from the bottom and everything I added after that already "
         "worked remotely without asking."),
        ("I do the research before drawing any screens", "betsy-ios",
         "On Betsy I defined who it was for, mapped the user journey and ran tests with "
         "real people before building the interface. What came out of that changed the "
         "design far more than any idea of my own."),
        ("I trust nothing until I have tried it on the real device", "haptic-hunter",
         "I tuned the vibrations in Haptic Hunter on the simulator, where a vibration is "
         "a line in a log. On a real phone the patterns I liked most were exactly the "
         "ones you could not tell apart in your hand."),
        ("Sometimes fixing something means removing it", "reps",
         "In Reps I built a gesture to change exercise and it kept firing on its own. I "
         "added conditions and it still failed, until I understood that the finger doing "
         "the swipe is the same one acting as the cursor, so the gesture was "
         "indistinguishable by design. I deleted it and left buttons."),
        ("I am comfortable on a team, and step one is agreeing", "lasallefy-java",
         "laSallefy was built by two of us and at the start we kept blocking each other, "
         "because neither could begin until the other finished their part. We sat down "
         "to decide how the pieces would talk to each other and from there we could each "
         "move without waiting."),
        ("I use AI every day, but never blindly", "",
         "AI is one more tool and it makes me a lot faster, but I take nothing as good "
         "without understanding it. If I do not know why something works I stop until I "
         "do, because what I do not understand I cannot fix the day it breaks."),
    ],
    open_label="Open to",
    open_text=(
        "Internships and junior work in interactive product design, front end development "
        "and product, in Barcelona or abroad."
    ),
    soft_label="Competencies",
    soft_text=("Teamwork, autonomous learning, persistence, problem solving, talking to "
               "the people who will actually use what I make, accessible and inclusive "
               "design."),
    main_label="Core technologies",
    main_tech=("Swift and SwiftUI, Python, React and TypeScript, JavaScript, Firebase "
               "with Firestore and security rules, OpenCV and MediaPipe, AI tooling, Git "
               "and GitHub, Figma."),
    other_label="Also worked with",
    other_tech=("Java and object orientation, UML, Electron, Vite, Vosk, Core Haptics, "
                "MQTT, Vercel, Ollama for local models, Arduino and ESP32, Illustrator, "
                "Maya, ZBrush, Premiere."),
    contact_label="Contact", edu_label="Education", lang_label="Languages",
    edu_title=["BSc in Interactive Product", "Design and Creation"],
    edu_link="salleurl.edu",
    edu_body="La Salle, Universitat Ramon Llull, Barcelona. First year complete, 60 ECTS. Second year from September 2026.",
    langs=["Catalan  ·  native", "Spanish  ·  native", "English  ·  C1 advanced"],
    foot="FULL CASE STUDIES, IN ENGLISH, SPANISH AND CATALAN",
)

CA = dict(
    out="Xavi-Bosch-CV-Perfil-CA.pdf", tag="CA", city="Barcelona",
    role="DISSENY I DESENVOLUPAMENT DE PRODUCTE INTERACTIU   ·   18",
    degree_url="https://www.salleurl.edu/ca/estudis/grau-en-disseny-i-creacio-de-productes-interactius-mencio-en-videojocs",
    who_label="Qui sóc",
    profile=(
        "Estudiant de segon curs de Disseny i Creació de Productes Interactius a La "
        "Salle. El que m'agrada de veritat és la part on el disseny i el codi es toquen: "
        "pensar com ha de sentir-se una cosa i després construir-la jo, de la interfície "
        "al model de dades i, quan cal, a l'electrònica. Gairebé tot el que sé ho he "
        "après fent coses i repetint-les fins que funcionen, a base de pràctica i "
        "d'insistir, no en cap curs. El que més m'interessa és treure passos entre el que "
        "algú vol fer i fer-ho, i quan alguna cosa se m'escapa m'hi quedo fins a "
        "entendre-la."
    ),
    how_label="Com treballo",
    how=[
        ("Quan alguna cosa falla, la desmunto abans de tocar-la", "remote-robot-car",
         "Amb el cotxe teledirigit vaig passar hores depurant el conjunt sencer, amb els "
         "motors, els sensors i la ràdio funcionant alhora, i no en vaig treure res. Així "
         "que vaig provar cada peça per separat vaig trobar la fallada en minuts."),
        ("Començo per la base i no pel que es veu", "jeffrey-remote",
         "Al comandament del Jeffrey vaig fer les funcions primer i la connexió després, "
         "així que cadascuna havia d'aguantar sola una caiguda de xarxa. Vaig refer la "
         "capa de connexió des de baix i tot el que hi vaig afegir després ja funcionava "
         "en remot sense demanar-ho."),
        ("Investigo abans de dibuixar cap pantalla", "betsy-ios",
         "A Betsy vaig definir a qui anava dirigit, mapejar el recorregut de l'usuari i "
         "fer proves amb gent real abans de muntar la interfície. El que en va sortir va "
         "canviar el disseny bastant més que cap idea meva."),
        ("No dono res per bo fins a provar-ho a l'aparell de debò", "haptic-hunter",
         "Vaig ajustar les vibracions del Haptic Hunter al simulador, on una vibració és "
         "una línia en un registre. Al mòbil real, els patrons que més m'agradaven eren "
         "justament els que no es distingien amb la mà."),
        ("De vegades arreglar una cosa és treure-la", "reps",
         "A Reps vaig fer un gest per canviar d'exercici que es disparava sol. Li vaig "
         "posar condicions i continuava fallant, fins que vaig entendre que el dit que "
         "llisca és el mateix que fa de cursor, així que el gest era indistingible per "
         "disseny. El vaig esborrar i ho vaig deixar en botons."),
        ("En equip hi estic còmode, i el primer és posar-se d'acord", "lasallefy-java",
         "laSallefy el vam fer entre dos i al principi ens bloquejàvem, perquè cap dels "
         "dos podia començar fins que l'altre acabés la seva part. Ens vam asseure a "
         "decidir com es parlarien les peces entre elles i des d'aquí cadascú va poder "
         "avançar sense esperar l'altre."),
        ("Faig servir IA cada dia, però no a cegues", "",
         "La IA és una eina més i em fa anar molt més ràpid, però no dono res per bo "
         "sense entendre-ho. Si no sé per què funciona una cosa m'aturo fins a saber-ho, "
         "perquè el que no entenc no ho puc arreglar el dia que es trenqui."),
    ],
    open_label="Disponible per a",
    open_text=(
        "Pràctiques i feina júnior en disseny de producte interactiu, desenvolupament "
        "front end i producte, a Barcelona o fora."
    ),
    soft_label="Competències",
    soft_text=("Treball en equip, aprenentatge autònom, constància, resolució de "
               "problemes, comunicació amb les persones que faran servir el que faig, "
               "disseny accessible i inclusiu."),
    main_label="Tecnologies principals",
    main_tech=("Swift i SwiftUI, Python, React i TypeScript, JavaScript, Firebase amb "
               "Firestore i regles de seguretat, OpenCV i MediaPipe, eines d'IA, Git i "
               "GitHub, Figma."),
    other_label="Altres coneixements",
    other_tech=("Java i orientació a objectes, UML, Electron, Vite, Vosk, Core Haptics, "
                "MQTT, Vercel, Ollama per a models locals, Arduino i ESP32, Illustrator, "
                "Maya, ZBrush, Premiere."),
    contact_label="Contacte", edu_label="Formació", lang_label="Idiomes",
    edu_title=["Grau en Disseny i Creació", "de Productes Interactius"],
    edu_link="salleurl.edu",
    edu_body="La Salle, Universitat Ramon Llull, Barcelona. Primer curs complet, 60 ECTS. Segon curs des del setembre de 2026.",
    langs=["Català  ·  natiu", "Castellà  ·  natiu", "Anglès  ·  C1 avançat"],
    foot="CASOS COMPLETS, EN ANGLÈS, ESPANYOL I CATALÀ",
)


def check(L):
    bad = []
    def scan(v, where):
        if isinstance(v, str):
            if v.startswith("http"): return
            if re.search(r"[—–]|(?<= )-(?= )|;", v): bad.append(f"{where}: {v[:70]}")
        elif isinstance(v, (list, tuple)):
            for i, x in enumerate(v): scan(x, f"{where}[{i}]")
        elif isinstance(v, dict):
            for k, x in v.items(): scan(x, f"{where}.{k}")
    for k, v in L.items():
        if k not in ("out", "degree_url"): scan(v, k)
    if bad: raise SystemExit("guion o punto y coma:\n  " + "\n  ".join(bad))


def portrait(w, h):
    im = Image.open(PHOTO); W0, H0 = im.size
    x0, x1 = int(0.20 * W0), int(0.80 * W0)
    y0 = int(0.07 * H0)
    im = im.crop((x0, y0, x1, min(H0, y0 + int((x1 - x0) * h / w))))
    im = im.resize((int(w * 2.6), int(h * 2.6)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=86, optimize=True); buf.seek(0)
    return ImageReader(buf)


# El retrato se prepara una sola vez: reportlab reutiliza la misma imagen
# incrustada si le vuelve a llegar el mismo ImageReader, así que la versión de
# tres páginas no pesa tres veces.
PORTRAIT = None

def draw(c, L, switcher=None):
    """Dibuja una página. switcher, si viene, es la lista de idiomas para el
    selector de arriba a la derecha."""
    check(L)
    c.setFillColor(PAPER); c.rect(0, 0, W, H, stroke=0, fill=1)

    def wrap(t, f, s, w):
        lines, cur = [], ""
        for word in t.split():
            trial = (cur + " " + word).strip()
            if pdfmetrics.stringWidth(trial, f, s) <= w: cur = trial
            else:
                if cur: lines.append(cur)
                cur = word
        if cur: lines.append(cur)
        return lines

    def para(x, y, t, w, font="Body", size=8.8, lead=11.1, colour=INK):
        c.setFont(font, size); c.setFillColor(colour)
        for line in wrap(t, font, size, w):
            c.drawString(x, y, line); y -= lead
        return y

    def label(x, y, t, size=6.2):
        c.setFont("Mono", size); c.setFillColor(ACCENT)
        c.drawString(x, y, t.upper())
        return y - 12

    def link(x, y, text, url, font="Mono", size=6.6):
        """Red and underlined, so it is obvious it can be clicked."""
        c.setFont(font, size); c.setFillColor(ACCENT)
        c.drawString(x, y, text)
        tw = pdfmetrics.stringWidth(text, font, size)
        c.setStrokeColor(ACCENT); c.setLineWidth(0.4)
        c.line(x, y - 1.6, x + tw, y - 1.6)
        c.linkURL(url, (x, y - 3, x + tw, y + size), relative=0, thickness=0)
        return tw

    top = H - MT

    # ── retrato ──────────────────────────────────────────────────────────
    global PORTRAIT
    if PORTRAIT is None: PORTRAIT = portrait(SIDE_W, PH_H)
    c.drawImage(PORTRAIT, ML, top - PH_H, SIDE_W, PH_H, mask=None)
    c.setStrokeColor(ACCENT); c.setLineWidth(0.8)
    c.rect(ML, top - PH_H, SIDE_W, PH_H, stroke=1, fill=0)

    # ── nombre ───────────────────────────────────────────────────────────
    size = 46
    while pdfmetrics.stringWidth("XAVI BOSCH", "Disp", size) > MAIN_W and size > 20:
        size -= 0.5
    ny = top - size * 0.78
    c.setFont("Disp", size); c.setFillColor(INK); c.drawString(MAIN_X, ny, "XAVI BOSCH")
    ry = ny - 14
    c.setFont("Mono", 6.2); c.setFillColor(ACCENT); c.drawString(MAIN_X + 2, ry, L["role"])

    if switcher:
        # de derecha a izquierda, para que el bloque acabe pegado al margen
        x = W - MR
        for tag in reversed(switcher):
            tw = pdfmetrics.stringWidth(tag, "Mono", 7.4)
            x -= tw + 9
            if tag == L["tag"]:
                c.setFillColor(ACCENT)
                c.roundRect(x - 4, ry - 3.4, tw + 8, 13, 2.5, stroke=0, fill=1)
                c.setFillColor(PAPER); c.setFont("Mono", 7.4)
                c.drawString(x, ry, tag)
            else:
                c.setFont("Mono", 7.4); c.setFillColor(MUTED)
                c.drawString(x, ry, tag)
                c.setStrokeColor(MUTED); c.setLineWidth(0.4)
                c.line(x, ry - 2.2, x + tw, ry - 2.2)
                c.linkAbsolute(tag, "lang_" + tag,
                               (x - 4, ry - 3.4, x + tw + 4, ry + 10))

    c.setStrokeColor(FAINT); c.setLineWidth(0.5); c.line(MAIN_X, ry - 12, W - MR, ry - 12)

    # ── columna principal ────────────────────────────────────────────────
    my = ry - 29
    my = label(MAIN_X, my, L["who_label"])
    my = para(MAIN_X, my, L["profile"], MAIN_W, size=9.1, lead=12.3)
    my -= 16

    my = label(MAIN_X, my, L["how_label"])
    for head, repo, body in L["how"]:
        c.setFont("BodyBd", 9.0); c.setFillColor(INK)
        c.drawString(MAIN_X, my, head)
        if repo:
            hx = MAIN_X + pdfmetrics.stringWidth(head, "BodyBd", 9.0) + 8
            link(hx, my + 0.5, repo, GH + repo, size=6.1)
        my -= 11.4
        my = para(MAIN_X, my, body, MAIN_W, size=8.8, lead=11.1, colour=MUTED)
        my -= 8.5

    my -= 4
    my = label(MAIN_X, my, L["open_label"])
    my = para(MAIN_X, my, L["open_text"], MAIN_W, size=8.8, lead=11.1)

    # ── columna lateral ──────────────────────────────────────────────────
    sy = top - PH_H - 24
    sy = label(ML, sy, L["contact_label"])
    for txt, url in [("bosch.xavii@gmail.com", "mailto:bosch.xavii@gmail.com"),
                     ("boschwebs.website", "https://boschwebs.website"),
                     ("github.com/xavibosch", "https://github.com/xavibosch"),
                     ("linkedin.com/in/xavi-bosch-galilea-9b3876410",
                      "https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410")]:
        s = 6.6
        while pdfmetrics.stringWidth(txt, "Mono", s) > SIDE_W and s > 4.8: s -= 0.1
        link(ML, sy, txt, url, size=s)
        sy -= 11.4
    c.setFont("Mono", 6.6); c.setFillColor(INK)
    c.drawString(ML, sy, PHONE); sy -= 11.4
    c.drawString(ML, sy, L["city"]); sy -= 20

    sy = label(ML, sy, L["edu_label"])
    c.setFont("BodyMd", 8.5); c.setFillColor(INK)
    for line in L["edu_title"]:
        c.drawString(ML, sy, line); sy -= 10.8
    link(ML, sy, L["edu_link"], L["degree_url"], size=6.5); sy -= 12
    sy = para(ML, sy, L["edu_body"], SIDE_W, size=7.9, lead=10.3, colour=MUTED)
    sy -= 15

    sy = label(ML, sy, L["lang_label"])
    c.setFont("Body", 8.3); c.setFillColor(INK)
    for lang in L["langs"]:
        c.drawString(ML, sy, lang); sy -= 11.2
    sy -= 12

    # Sin barras de nivel. Un 70% de Python no significa nada a nadie y a un
    # reclutador técnico le dice menos que el nombre solo, así que la única
    # jerarquía que queda es la que sí es verificable: lo que uso en proyectos
    # de verdad frente a lo que he tocado.
    sy = label(ML, sy, L["main_label"])
    sy = para(ML, sy, L["main_tech"], SIDE_W, size=7.9, lead=10.3)
    sy -= 15
    sy = label(ML, sy, L["other_label"])
    sy = para(ML, sy, L["other_tech"], SIDE_W, size=7.9, lead=10.3, colour=MUTED)
    sy -= 15
    sy = label(ML, sy, L["soft_label"])
    sy = para(ML, sy, L["soft_text"], SIDE_W, size=7.9, lead=10.3)

    # ── pie ──────────────────────────────────────────────────────────────
    c.setStrokeColor(FAINT); c.setLineWidth(0.5); c.line(ML, FOOT, W - MR, FOOT)
    c.setFont("Mono", 6.3); c.setFillColor(FOOTTX)
    c.drawString(ML, FOOT - 12, L["foot"] + "   ·   ")
    link(ML + pdfmetrics.stringWidth(L["foot"] + "   ·   ", "Mono", 6.3), FOOT - 12,
         "BOSCHWEBS.WEBSITE", "https://boschwebs.website", size=6.3)

    return sy, my


def build_single(L):
    global PORTRAIT
    PORTRAIT = None
    out = os.path.join(PUBLIC, L["out"])
    c = canvas.Canvas(out, pagesize=(W, H))
    c.setTitle("Xavi Bosch"); c.setAuthor("Xavi Bosch")
    sy, my = draw(c, L)
    if min(sy, my) < FOOT + 12:
        raise SystemExit(f"{L['out']}: se sale de la página "
                         f"(lateral {sy:.0f}, principal {my:.0f}, pie {FOOT})")
    c.showPage(); c.save()
    print(f"wrote {L['out']}  ·  lateral {sy:.0f}pt, principal {my:.0f}pt")


def build_multi(langs, name="Xavi-Bosch-CV-Perfil-Multi.pdf"):
    """Un PDF, tres páginas, con un selector de idioma arriba.

    Los botones son enlaces internos GoTo a una página con nombre, NO
    JavaScript de PDF ni capas opcionales. Es la única de las tres formas que
    funciona en todas partes: Vista Previa de macOS, Chrome, Safari, Firefox,
    el móvil y Acrobat. El JavaScript de formulario solo lo ejecuta Acrobat, y
    las capas opcionales no se pueden conmutar desde Vista Previa ni desde el
    visor de Chrome, así que el botón estaría muerto justo donde más gente lo
    va a abrir.
    """
    global PORTRAIT
    PORTRAIT = None
    out = os.path.join(PUBLIC, name)
    c = canvas.Canvas(out, pagesize=(W, H))
    c.setTitle("Xavi Bosch"); c.setAuthor("Xavi Bosch")
    tags = [l["tag"] for l in langs]
    for L in langs:
        c.bookmarkPage("lang_" + L["tag"])
        sy, my = draw(c, L, switcher=tags)
        if min(sy, my) < FOOT + 12:
            raise SystemExit(f"{name} ({L['tag']}): se sale de la página "
                             f"(lateral {sy:.0f}, principal {my:.0f})")
        c.showPage()
    c.save()
    print(f"wrote {name}  ·  {len(langs)} páginas, selector {' '.join(tags)}")


for lang in (ES, EN, CA):
    build_single(lang)
build_multi([ES, EN, CA])
