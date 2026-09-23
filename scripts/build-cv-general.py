#!/usr/bin/env python3
"""The general CV, in Spanish and English, from one source.

What it is NOT: a list of projects. The old CV was a catalogue with a
paragraph per project. This one argues from method and capability, and the
work is referred to once, in aggregate.

Every claim comes from src/redesign/data/{projects,skills}.js or from the
previous CV. Nothing is invented. In particular only ONE project has real
user research behind it and the wording keeps that distinction.

House rule, enforced below: no dashes and no semicolons anywhere in the
prose. Dashes are the tell that gives away a machine, and he asked for them
gone, so a check fails the build rather than trusting me to remember.
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

# palette sampled off the previous CV so the two stay one family
PAPER  = Color(250/255, 249/255, 245/255)
INK    = HexColor("#111111")
MUTED  = HexColor("#5C5A55")
FAINT  = HexColor("#A8A49B")
ACCENT = HexColor("#D63022")

HN = "/System/Library/Fonts/HelveticaNeue.ttc"
pdfmetrics.registerFont(TTFont("Disp",   HN, subfontIndex=9))     # Condensed Black
pdfmetrics.registerFont(TTFont("Body",   HN, subfontIndex=0))
pdfmetrics.registerFont(TTFont("BodyMd", HN, subfontIndex=10))
pdfmetrics.registerFont(TTFont("BodyBd", HN, subfontIndex=1))
pdfmetrics.registerFont(TTFont("Mono", "/System/Library/Fonts/Menlo.ttc", subfontIndex=0))

W, H  = 595.28, 841.89
ML, MR, MT = 48, 48, 46
SIDE_W, GUT = 176, 24
MAIN_X = ML + SIDE_W + GUT
MAIN_W = W - MR - MAIN_X
PHOTO_H = 196
FOOT_TOP = 62

CONTACT = [
    ("bosch.xavii@gmail.com", "mailto:bosch.xavii@gmail.com"),
    ("boschwebs.website", "https://boschwebs.website"),
    ("github.com/xavibosch", "https://github.com/xavibosch"),
    ("linkedin.com/in/xavi-bosch-galilea-9b3876410",
     "https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410"),
]

ES = dict(
    out="Xavi-Bosch-CV-ES.pdf",
    role="DISEÑO Y CREACIÓN DE PRODUCTOS INTERACTIVOS   ·   18   ·   BARCELONA",
    profile=(
        "Diseño y construyo productos interactivos de principio a fin: investigación, "
        "interfaz, código, modelo de datos y, cuando la cosa lo necesita, la "
        "electrónica. Trabajo rápido, lo pongo delante de alguien y después lo sigo "
        "usando yo, que es donde aparecen los problemas que de verdad importan, "
        "bastante después de darlo por terminado."
    ),
    how_label="Cómo trabajo",
    how=[
        ("Primero los cimientos, después las funciones.",
         "Construí las funciones antes que la conexión de debajo, así que cada una tenía "
         "que sobrevivir sola a una caída del enlace. Reconstruir antes la capa del "
         "canal hizo que todo lo añadido después aguantara solo."),
        ("Comprobar sobre lo real y no sobre el sustituto.",
         "Ajusté los hápticos contra un simulador, donde una vibración es una línea en "
         "un registro. En un dispositivo real, los patrones de los que estaba más "
         "orgulloso eran los que no se distinguían en la mano."),
        ("Aislar antes de integrar.",
         "Depurar la máquina montada, con motores, sensores y radio a la vez, costó horas "
         "y no demostró nada. Probar cada pieza por separado encontró el fallo en "
         "minutos."),
        ("Quitar una función también es un resultado.",
         "Un gesto de deslizar se disparaba solo y ninguna guarda lo arreglaba. El dedo "
         "que deslizaba era también el cursor, así que el gesto era ambiguo por "
         "construcción y no por mal ajuste. Lo borré."),
        ("La verdad vive en los datos, no en la pantalla.",
         "Dos personas podían liquidar la misma apuesta, porque nada en una pantalla "
         "estática dice quién es dueño de esa escritura. Las reglas deciden y la "
         "interfaz solo puede preguntar."),
        ("Acordar el contrato antes de construir detrás.",
         "Trabajando en pareja nos bloqueábamos: ninguno podía empezar hasta que el "
         "otro terminara la clase de debajo. Fijar primero las interfaces entre capas "
         "nos dejó construir contra un contrato y no contra el trabajo a medias del otro."),
        ("El acceso no vale la privacidad de nadie.",
         "El acceso total a la shell hacía fácil cualquier función y dejaba una cámara "
         "en el salón de alguien detrás de una puerta que yo había abierto. Lo "
         "reconstruí sobre un conjunto estrecho de comandos y perdí funciones."),
    ],
    from_label="De dónde sale esto",
    from_text=(
        "Diez productos diseñados y construidos de principio a fin, y ninguno es una "
        "maqueta. Varios están desplegados y en uso diario. Uno es la única forma en "
        "que alguien a quien conozco puede manejar su televisión. Varios combinan "
        "software con hardware que cableé yo mismo. Uno se dio forma con pruebas de "
        "usuario reales: sesiones, customer journey mapeado y usuarios objetivo "
        "definidos. El resto se construyeron para personas a las que puedo poner "
        "nombre."
    ),
    open_label="Disponible para",
    open_text=(
        "Prácticas y trabajo júnior en diseño de producto interactivo, desarrollo front "
        "end y producto, en Barcelona o fuera. Cómodo siendo la persona que decide qué "
        "construir y después lo construye."
    ),
    contact_label="Contacto",
    edu_label="Formación",
    edu_title=["Diseño y Creación de", "Productos Interactivos"],
    edu_body=["La Salle, Universitat Ramon Llull, Barcelona.",
              "Primer curso completo, 60 ECTS. Segundo curso desde septiembre de 2026."],
    lang_label="Idiomas",
    langs=["Catalán  ·  nativo", "Castellano  ·  nativo", "Inglés  ·  C1 avanzado"],
    tools_label="Herramientas",
    tools=[
        ("Código",
         "Swift, SwiftUI, Python, Java, JavaScript, React, Electron, Git, UML."),
        ("Datos y servicios",
         "Firebase con Firestore, Realtime Database y reglas de seguridad. MQTT. "
         "Ollama para modelos locales."),
        ("Sensores e interacción",
         "OpenCV, MediaPipe, Vosk para voz sin conexión, Core Haptics, audio espacial, "
         "NFC, Wake on LAN."),
        ("Hardware",
         "Arduino, ESP32, sensores y actuadores, ADC, puerto serie."),
        ("Diseño y medios",
         "Figma, Illustrator, Maya, ZBrush, Premiere."),
    ],
    deg_label="Cubierto en la carrera",
    degrees=["Diseño de experiencia", "Diseño inclusivo",
             "Diseño de interfaz y gráfico", "Programación",
             "Electrónica", "3D, animación e historia"],
    foot="CASOS COMPLETOS, EN INGLÉS, ESPAÑOL Y CATALÁN   ·   BOSCHWEBS.WEBSITE",
)

EN = dict(
    out="Xavi-Bosch-CV-General.pdf",
    role="INTERACTIVE PRODUCT DESIGN AND CREATION   ·   18   ·   BARCELONA",
    profile=(
        "I design and build interactive products end to end: research, interface, "
        "code, data model and, when the thing needs one, the electronics. I work fast, "
        "put it in front of someone, then keep using it myself, which is where the "
        "problems that actually matter turn up, long after the thing was called "
        "finished."
    ),
    how_label="How I work",
    how=[
        ("Foundations before features.",
         "I built the features before the connection underneath them, so each one had "
         "to survive a dropped link on its own. Rebuilding the channel layer first made "
         "everything added after it hold up without being asked."),
        ("Verify on the real thing, not the stand in.",
         "I tuned haptics against a simulator, where a vibration is a line in a log. On "
         "a real device the patterns I was proudest of were the ones you could not tell "
         "apart in the hand."),
        ("Isolate before integrating.",
         "Debugging an assembled machine, with motors, sensors and radio all live at "
         "once, cost hours and proved nothing. Testing each part alone found the fault "
         "in minutes."),
        ("Cutting a feature is a result.",
         "A swipe gesture kept firing by accident and no guard fixed it. The finger "
         "doing the swiping was also the cursor, so the gesture was ambiguous by "
         "construction rather than badly tuned. I deleted it."),
        ("The truth belongs in the data, not the screen.",
         "Two people could settle the same bet, because nothing in a static screen says "
         "who owns that write. The rules decide and the interface is only allowed to "
         "ask."),
        ("Agree the contract before building behind it.",
         "Working in a pair we kept blocking each other: neither could start until the "
         "other had finished the class underneath. Settling the interfaces between the "
         "layers first let us both build against a contract instead of against each "
         "other's unfinished work."),
        ("Access is not worth someone's privacy.",
         "Full shell access made every feature easy and left a camera in someone's "
         "living room behind a door I had opened. I rebuilt on a narrow set of commands "
         "and lost features for it."),
    ],
    from_label="Where this comes from",
    from_text=(
        "Ten products designed and built end to end, and none of them is a mockup. "
        "Several are deployed and in daily use. One is the only way somebody I know can "
        "operate their television. Several pair software with hardware I wired myself. "
        "One was shaped by real user testing: sessions, a mapped customer journey and "
        "defined target users. The rest were built for people I can name."
    ),
    open_label="Open to",
    open_text=(
        "Internships and junior work in interactive product design, front end "
        "development and product, in Barcelona or abroad. Comfortable being the person "
        "who decides what to build and then builds it."
    ),
    contact_label="Contact",
    edu_label="Education",
    edu_title=["Interactive Product Design", "and Creation"],
    edu_body=["La Salle, Universitat Ramon Llull, Barcelona.",
              "First year complete, 60 ECTS. Second year from September 2026."],
    lang_label="Languages",
    langs=["Catalan  ·  native", "Spanish  ·  native", "English  ·  C1 advanced"],
    tools_label="Tools",
    tools=[
        ("Code",
         "Swift, SwiftUI, Python, Java, JavaScript, React, Electron, Git, UML."),
        ("Data and services",
         "Firebase with Firestore, Realtime Database and security rules. MQTT. "
         "Ollama for local models."),
        ("Sensing and interaction",
         "OpenCV, MediaPipe, Vosk offline speech, Core Haptics, spatial audio, NFC, "
         "Wake on LAN."),
        ("Hardware",
         "Arduino, ESP32, sensors and actuators, ADC, serial."),
        ("Design and media",
         "Figma, Illustrator, Maya, ZBrush, Premiere."),
    ],
    deg_label="Covered in the degree",
    degrees=["Experience design", "Inclusive design",
             "Interface and graphic design", "Programming",
             "Electronics", "3D, animation and story"],
    foot="FULL CASE STUDIES, IN ENGLISH, SPANISH AND CATALAN   ·   BOSCHWEBS.WEBSITE",
)


def check_no_dashes(lang):
    """He asked for no dashes and no semicolons. Hyphens inside a URL are not
    punctuation, so only the prose is checked."""
    bad = []
    def scan(v, where):
        if isinstance(v, str):
            if re.search(r"[—–]|(?<= )-(?= )|;", v):
                bad.append(f"{where}: {v[:70]}")
        elif isinstance(v, (list, tuple)):
            for i, x in enumerate(v): scan(x, f"{where}[{i}]")
    for k, v in lang.items():
        if k != "out": scan(v, k)
    if bad:
        raise SystemExit("dash or semicolon found:\n  " + "\n  ".join(bad))


def portrait(width_pt, height_pt):
    """Crop the portrait to the slot, keeping the head in the upper third."""
    im = Image.open(PHOTO); W0, H0 = im.size
    x0, x1 = int(0.20 * W0), int(0.80 * W0)
    box_w = x1 - x0
    box_h = int(box_w * height_pt / width_pt)
    y0 = int(0.07 * H0)
    im = im.crop((x0, y0, x1, min(H0, y0 + box_h)))
    im = im.resize((int(width_pt * 2.6), int(height_pt * 2.6)), Image.LANCZOS)
    # re-encode as JPEG rather than handing reportlab raw samples, which it
    # stores Flate-compressed and turns a 90 KB CV into a 600 KB one
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=86, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def build(L):
    check_no_dashes(L)
    out = os.path.join(PUBLIC, L["out"])
    c = canvas.Canvas(out, pagesize=(W, H))
    c.setTitle("Xavi Bosch"); c.setAuthor("Xavi Bosch")

    c.setFillColor(PAPER); c.rect(0, 0, W, H, stroke=0, fill=1)

    def wrap(text, font, size, width):
        words, lines, cur = text.split(), [], ""
        for w_ in words:
            t = (cur + " " + w_).strip()
            if pdfmetrics.stringWidth(t, font, size) <= width: cur = t
            else:
                if cur: lines.append(cur)
                cur = w_
        if cur: lines.append(cur)
        return lines

    def para(x, y, text, width, font="Body", size=8.8, lead=11.0, colour=INK):
        c.setFont(font, size); c.setFillColor(colour)
        for line in wrap(text, font, size, width):
            c.drawString(x, y, line); y -= lead
        return y

    def label(x, y, text, size=6.2):
        c.setFont("Mono", size); c.setFillColor(ACCENT)
        c.drawString(x, y, text.upper())
        return y - 12

    top = H - MT

    # ── portrait, with the hairline the old CV used ──────────────────────
    c.drawImage(portrait(SIDE_W, PHOTO_H), ML, top - PHOTO_H,
                SIDE_W, PHOTO_H, mask=None)
    c.setStrokeColor(ACCENT); c.setLineWidth(0.8)
    c.rect(ML, top - PHOTO_H, SIDE_W, PHOTO_H, stroke=1, fill=0)

    # ── name, beside the portrait rather than over the page ──────────────
    size = 46
    while pdfmetrics.stringWidth("XAVI BOSCH", "Disp", size) > MAIN_W and size > 20:
        size -= 0.5
    ny = top - size * 0.78
    c.setFont("Disp", size); c.setFillColor(INK)
    c.drawString(MAIN_X, ny, "XAVI BOSCH")
    ry = ny - 15
    c.setFont("Mono", 6.4); c.setFillColor(ACCENT)
    c.drawString(MAIN_X + 2, ry, L["role"])
    c.setStrokeColor(FAINT); c.setLineWidth(0.5)
    c.line(MAIN_X, ry - 13, W - MR, ry - 13)

    # ── main column ──────────────────────────────────────────────────────
    my = ry - 33
    my = para(MAIN_X, my, L["profile"], MAIN_W, size=9.3, lead=12.5)
    my -= 19

    my = label(MAIN_X, my, L["how_label"])
    for head, body in L["how"]:
        c.setFont("BodyBd", 9.2); c.setFillColor(INK)
        c.drawString(MAIN_X, my, head); my -= 11.5
        my = para(MAIN_X, my, body, MAIN_W, size=8.8, lead=11.0, colour=MUTED)
        my -= 8.5

    my -= 5
    my = label(MAIN_X, my, L["from_label"])
    my = para(MAIN_X, my, L["from_text"], MAIN_W)

    my -= 18
    my = label(MAIN_X, my, L["open_label"])
    my = para(MAIN_X, my, L["open_text"], MAIN_W)

    # ── sidebar ──────────────────────────────────────────────────────────
    sy = top - PHOTO_H - 26
    sy = label(ML, sy, L["contact_label"])
    for txt, url in CONTACT:
        s = 6.6
        while pdfmetrics.stringWidth(txt, "Mono", s) > SIDE_W and s > 4.8: s -= 0.1
        c.setFont("Mono", s); c.setFillColor(INK)
        c.drawString(ML, sy, txt)
        c.linkURL(url, (ML, sy - 2, ML + SIDE_W, sy + 7), relative=0, thickness=0)
        sy -= 11
    sy -= 9

    sy = label(ML, sy, L["edu_label"])
    c.setFont("BodyMd", 8.6); c.setFillColor(INK)
    for line in L["edu_title"]:
        c.drawString(ML, sy, line); sy -= 11
    sy -= 1
    for line in L["edu_body"]:
        sy = para(ML, sy, line, SIDE_W, size=7.8, lead=10.2, colour=MUTED) - 1
    sy -= 9

    sy = label(ML, sy, L["lang_label"])
    c.setFont("Body", 8.4); c.setFillColor(INK)
    for lang in L["langs"]:
        c.drawString(ML, sy, lang); sy -= 11.4
    sy -= 10

    sy = label(ML, sy, L["tools_label"])
    for head, body in L["tools"]:
        c.setFont("BodyBd", 8.0); c.setFillColor(INK)
        c.drawString(ML, sy, head); sy -= 10.2
        sy = para(ML, sy, body, SIDE_W, size=7.7, lead=10.0, colour=MUTED)
        sy -= 8

    sy -= 2
    sy = label(ML, sy, L["deg_label"])
    c.setFont("Body", 8.2); c.setFillColor(INK)
    for d in L["degrees"]:
        c.drawString(ML, sy, d); sy -= 11.2

    # ── foot ─────────────────────────────────────────────────────────────
    c.setStrokeColor(FAINT); c.setLineWidth(0.5)
    c.line(ML, FOOT_TOP, W - ML - MR + ML, FOOT_TOP)
    c.setFont("Mono", 6.4); c.setFillColor(FAINT)
    c.drawString(ML, FOOT_TOP - 12, L["foot"])
    c.linkURL("https://boschwebs.website", (ML, FOOT_TOP - 16, ML + 340, FOOT_TOP - 4),
              relative=0, thickness=0)

    if min(sy, my) < FOOT_TOP + 8:
        raise SystemExit(f"{L['out']}: columns overrun the footer "
                         f"(sidebar {sy:.0f}, main {my:.0f}, footer {FOOT_TOP})")
    c.showPage(); c.save()
    print(f"wrote {L['out']}  ·  sidebar ends {sy:.0f}pt, main ends {my:.0f}pt")


for lang in (ES, EN):
    build(lang)
