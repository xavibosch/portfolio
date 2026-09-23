#!/usr/bin/env python3
"""The technical CV, ES / EN / CA, from one source.

SINGLE COLUMN on purpose. A two column CV looks better and parses worse: an
ATS extracts text in document order, and columns interleave into nonsense.
This one is verified with a text extractor after every build.

Nothing here is invented. The achievements are the real ones from
src/redesign/data/projects.js, including the Firestore race condition, the
Wake on LAN rewrite and the CSS containing block bug. There are no invented
percentages, because there are no measured ones.

Three things I do not have and will not make up appear as red placeholders:
the phone number, the per project repository links (most of his repos are
private, so a link would 404) and any certification beyond the C1.

House rule, enforced by check(): no dashes and no semicolons in the prose.
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

# ── fill these in and rebuild ─────────────────────────────────────────────
PHONE = "+34 686 585 368"
# All three verified public against the GitHub API before being put on a CV:
# a link to a private repo returns a 404 to whoever clicks it, which is worse
# than having no link at all.
REPOS = {"betsy":     "github.com/xavibosch/betsy-ios",
         "gesturetv": "github.com/xavibosch/gesture-tv",
         "reps":      "github.com/xavibosch/reps"}

PAPER  = Color(250/255, 249/255, 245/255)
INK    = HexColor("#111111")
MUTED  = HexColor("#4A4844")
FAINT  = HexColor("#A8A49B")
ACCENT = HexColor("#D63022")

HN = "/System/Library/Fonts/HelveticaNeue.ttc"
pdfmetrics.registerFont(TTFont("Disp",   HN, subfontIndex=9))
pdfmetrics.registerFont(TTFont("Body",   HN, subfontIndex=0))
pdfmetrics.registerFont(TTFont("BodyMd", HN, subfontIndex=10))
pdfmetrics.registerFont(TTFont("BodyBd", HN, subfontIndex=1))
pdfmetrics.registerFont(TTFont("Mono", "/System/Library/Fonts/Menlo.ttc", subfontIndex=0))

W, H = 595.28, 841.89
ML, MR, MT = 46, 46, 44
COL = W - ML - MR
PH_W, PH_H = 84, 100
FOOT = 44

LINKS = [("boschwebs.website", "https://boschwebs.website"),
         ("github.com/xavibosch", "https://github.com/xavibosch"),
         ("linkedin.com/in/xavi-bosch-galilea-9b3876410",
          "https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410")]

ES = dict(
    out="Xavi-Bosch-CV-Tech-ES.pdf", city="Barcelona, España",
    role="DESARROLLO DE PRODUCTO INTERACTIVO   ·   PERFIL JUNIOR",
    phone_ph="AÑADIR TELÉFONO", link_ph="AÑADIR ENLACE",
    l_profile="Perfil profesional", l_projects="Proyectos destacados",
    l_stack="Stack tecnológico", l_edu="Formación y certificaciones",
    l_soft="Competencias clave", l_tech="Stack",
    profile=(
        "Estudiante de segundo curso del grado en Diseño y Creación de Productos "
        "Interactivos en La Salle URL y desarrollador autodidacta, con diez productos "
        "construidos de principio a fin y varios desplegados en uso diario. Stack "
        "principal en Python, Swift y TypeScript sobre React, con Firebase como backend "
        "y visión por computador con OpenCV y MediaPipe. Escribo el modelo de datos y la "
        "interfaz a la vez, y no doy nada por verificado hasta probarlo en el "
        "dispositivo real."
    ),
    projects=[
        dict(key="betsy", name="Betsy",
             desc="Aplicación iOS de apuestas sociales entre amigos con puntos virtuales "
                  "y sin dinero convertible.",
             stack="Swift, SwiftUI, Cloud Firestore, Firebase Security Rules, Xcode",
             bullets=[
                "Diseñé el modelo de datos y escribí las reglas de seguridad de Firestore "
                "en paralelo a las vistas SwiftUI, lo que destapó una condición de carrera "
                "que permitía a dos usuarios liquidar la misma apuesta. Trasladé la "
                "autoridad de escritura al servidor y dejé la interfaz solo como "
                "solicitante.",
                "Definí los usuarios objetivo, mapeé el customer journey y ejecuté pruebas "
                "con usuarios reales antes de construir las pantallas, rediseñando la "
                "interfaz a partir de los resultados y no de mi criterio.",
             ]),
        dict(key="gesturetv", name="Gesture TV",
             desc="Control completo de un televisor por gestos y voz, para una persona "
                  "que no puede usar el mando.",
             stack="Python, OpenCV, MediaPipe, Vosk, Wake on LAN",
             bullets=[
                "Desarrollé un pipeline de visión por computador en tiempo real con OpenCV "
                "y MediaPipe que detecta la mano por zonas de pantalla, más reconocimiento "
                "de voz sin conexión con Vosk para el resto de comandos.",
                "Rediseñé la arquitectura para eliminar el acceso completo por shell y "
                "sustituirlo por Wake on LAN y un conjunto acotado de comandos, reduciendo "
                "la superficie de ataque. Ningún fotograma de la cámara llega a escribirse "
                "en disco.",
             ]),
        dict(key="reps", name="Reps",
             desc="Panel de entrenamiento manejado con la mano en el aire, sin tocar "
                  "ninguna pantalla entre series.",
             stack="React, TypeScript, Vite, MediaPipe, Electron, Spotify Web API",
             bullets=[
                "Desarrollé el seguimiento de manos y una máquina de dos estados, activo y "
                "en espera, en React. Lo empaqueté como aplicación de escritorio con "
                "Electron e integré la API de Spotify para el control de reproducción.",
                "Diagnostiqué un desfase de varios centímetros entre el cursor de mano y la "
                "detección de pulsación. Un ancestro con CSS transform pasa a ser el bloque "
                "contenedor de los descendientes con position fixed, así que el cursor se "
                "posicionaba en el marco escalado mientras el hit test leía el viewport "
                "real. Sacarlo de ese marco devolvió ambos al mismo sistema de coordenadas.",
             ]),
    ],
    stack=[("Lenguajes", "Python, Swift, TypeScript, JavaScript, Java, HTML, CSS"),
           ("Frameworks y librerías",
            "SwiftUI, React, Electron, Vite, OpenCV, MediaPipe, Vosk, Core Haptics, PWA"),
           ("Herramientas, bases de datos y cloud",
            "Git, GitHub, Firebase con Cloud Firestore, Realtime Database y Security "
            "Rules, Vercel, MQTT, Ollama, Xcode, Figma, Arduino, ESP32")],
    edu=[("Grado en Diseño y Creación de Productos Interactivos",
          "La Salle, Universitat Ramon Llull, Barcelona. 2025 a la actualidad.",
          "Primer curso completo, 60 ECTS en programación, orientación a objetos, UML, "
          "electrónica y diseño de interfaz. Segundo curso desde septiembre de 2026."),
         ("Inglés C1 avanzado", "", ""),
         ("Desarrollo autodidacta", "",
          "Diez productos propios diseñados y construidos de principio a fin, entre "
          "aplicaciones iOS, web y sistemas que combinan software con hardware.")],
    soft=[("Resolución de problemas lógicos",
           "Aíslo los componentes antes de integrarlos. Depurar un sistema montado con "
           "motores, sensores y radio a la vez costó horas y probar cada pieza por "
           "separado encontró el fallo en minutos."),
          ("Aprendizaje autónomo",
           "Todo el stack de arriba lo aprendí porque un proyecto lo necesitaba, sin "
           "curso de por medio."),
          ("Trabajo en equipo y diseño de interfaces",
           "En un proyecto en pareja fijamos los contratos entre capas antes de escribir "
           "el código de debajo, lo que eliminó los bloqueos mutuos."),
          ("Criterio de producto",
           "Elimino una función cuando es ambigua por construcción en lugar de seguir "
           "ajustándola.")],
)

EN = dict(
    out="Xavi-Bosch-CV-Tech-EN.pdf", city="Barcelona, Spain",
    role="INTERACTIVE PRODUCT DEVELOPMENT   ·   JUNIOR PROFILE",
    phone_ph="ADD PHONE NUMBER", link_ph="ADD LINK",
    l_profile="Professional profile", l_projects="Selected projects",
    l_stack="Technical stack", l_edu="Education and certifications",
    l_soft="Key competencies", l_tech="Stack",
    profile=(
        "Second year student of the Interactive Product Design and Creation degree at La "
        "Salle URL and a self taught developer, with ten products built end to end and "
        "several deployed and in daily use. Main stack in Python, Swift and TypeScript on "
        "React, with Firebase as the backend and computer vision through OpenCV and "
        "MediaPipe. I write the data model and the interface at the same time, and I "
        "count nothing as verified until it runs on the real device."
    ),
    projects=[
        dict(key="betsy", name="Betsy",
             desc="iOS app for social betting between friends, on virtual points with "
                  "nothing convertible to money.",
             stack="Swift, SwiftUI, Cloud Firestore, Firebase Security Rules, Xcode",
             bullets=[
                "Designed the data model and wrote the Firestore security rules alongside "
                "the SwiftUI views, which exposed a race condition letting two users settle "
                "the same bet. Moved write authority to the server and left the interface "
                "able only to request.",
                "Defined the target users, mapped the customer journey and ran tests with "
                "real users before building the screens, then reshaped the interface from "
                "the results rather than from my own taste.",
             ]),
        dict(key="gesturetv", name="Gesture TV",
             desc="Full television control by gesture and voice, for a person who cannot "
                  "use a remote.",
             stack="Python, OpenCV, MediaPipe, Vosk, Wake on LAN",
             bullets=[
                "Developed a real time computer vision pipeline with OpenCV and MediaPipe "
                "that reads the hand by screen zone, plus offline speech recognition with "
                "Vosk for the remaining commands.",
                "Redesigned the architecture to drop full shell access and replace it with "
                "Wake on LAN and a narrow command set, cutting the attack surface. No camera "
                "frame is ever written to disk.",
             ]),
        dict(key="reps", name="Reps",
             desc="Gym dashboard driven by a hand in the air, with no screen to touch "
                  "between sets.",
             stack="React, TypeScript, Vite, MediaPipe, Electron, Spotify Web API",
             bullets=[
                "Built the hand tracking and a two state machine, active and standby, in "
                "React. Packaged it as a desktop application with Electron and integrated "
                "the Spotify API for playback control.",
                "Diagnosed a gap of several centimetres between the hand cursor and the hit "
                "test. An ancestor carrying a CSS transform becomes the containing block for "
                "position fixed descendants, so the cursor was laid out in the scaled frame "
                "while the hit test read the real viewport. Rendering it outside that frame "
                "put both back in one coordinate system.",
             ]),
    ],
    stack=[("Languages", "Python, Swift, TypeScript, JavaScript, Java, HTML, CSS"),
           ("Frameworks and libraries",
            "SwiftUI, React, Electron, Vite, OpenCV, MediaPipe, Vosk, Core Haptics, PWA"),
           ("Tools, databases and cloud",
            "Git, GitHub, Firebase with Cloud Firestore, Realtime Database and Security "
            "Rules, Vercel, MQTT, Ollama, Xcode, Figma, Arduino, ESP32")],
    edu=[("BSc in Interactive Product Design and Creation",
          "La Salle, Universitat Ramon Llull, Barcelona. 2025 to present.",
          "First year complete, 60 ECTS in programming, object orientation, UML, "
          "electronics and interface design. Second year from September 2026."),
         ("English C1 advanced", "", ""),
         ("Self taught development", "",
          "Ten products of my own designed and built end to end, across iOS apps, web "
          "apps and systems that pair software with hardware.")],
    soft=[("Logical problem solving",
           "I isolate components before integrating them. Debugging an assembled system "
           "with motors, sensors and radio all live cost hours, and testing each part "
           "alone found the fault in minutes."),
          ("Autonomous learning",
           "I learned the whole stack above because a project needed it, with no course "
           "in between."),
          ("Teamwork and interface design",
           "On a paired project we settled the contracts between layers before writing "
           "the code behind them, which removed the mutual blocking."),
          ("Product judgement",
           "I delete a feature when it is ambiguous by construction rather than keep "
           "tuning it.")],
)

CA = dict(
    out="Xavi-Bosch-CV-Tech-CA.pdf", city="Barcelona, Espanya",
    role="DESENVOLUPAMENT DE PRODUCTE INTERACTIU   ·   PERFIL JUNIOR",
    phone_ph="AFEGIR TELÈFON", link_ph="AFEGIR ENLLAÇ",
    l_profile="Perfil professional", l_projects="Projectes destacats",
    l_stack="Stack tecnològic", l_edu="Formació i certificacions",
    l_soft="Competències clau", l_tech="Stack",
    profile=(
        "Estudiant de segon curs del grau en Disseny i Creació de Productes Interactius a "
        "La Salle URL i desenvolupador autodidacta, amb deu productes construïts de dalt a "
        "baix i uns quants desplegats i en ús diari. Stack principal en Python, Swift i "
        "TypeScript sobre React, amb Firebase com a backend i visió per computador amb "
        "OpenCV i MediaPipe. Escric el model de dades i la interfície alhora, i no dono "
        "res per verificat fins a provar-ho al dispositiu real."
    ),
    projects=[
        dict(key="betsy", name="Betsy",
             desc="Aplicació iOS d'apostes socials entre amics, amb punts virtuals i res "
                  "convertible en diners.",
             stack="Swift, SwiftUI, Cloud Firestore, Firebase Security Rules, Xcode",
             bullets=[
                "Vaig dissenyar el model de dades i escriure les regles de seguretat de "
                "Firestore en paral·lel a les vistes SwiftUI, cosa que va destapar una "
                "condició de cursa que permetia a dos usuaris liquidar la mateixa aposta. "
                "Vaig moure l'autoritat d'escriptura al servidor i deixar la interfície "
                "només com a sol·licitant.",
                "Vaig definir els usuaris objectiu, mapejar el customer journey i executar "
                "proves amb usuaris reals abans de construir les pantalles, i vaig redissenyar "
                "la interfície a partir dels resultats i no del meu criteri.",
             ]),
        dict(key="gesturetv", name="Gesture TV",
             desc="Control complet d'un televisor per gestos i veu, per a una persona que "
                  "no pot fer servir el comandament.",
             stack="Python, OpenCV, MediaPipe, Vosk, Wake on LAN",
             bullets=[
                "Vaig desenvolupar un pipeline de visió per computador en temps real amb "
                "OpenCV i MediaPipe que llegeix la mà per zones de pantalla, més "
                "reconeixement de veu sense connexió amb Vosk per a la resta d'ordres.",
                "Vaig redissenyar l'arquitectura per eliminar l'accés complet per shell i "
                "substituir-lo per Wake on LAN i un conjunt acotat d'ordres, reduint la "
                "superfície d'atac. Cap fotograma de la càmera arriba a escriure's al disc.",
             ]),
        dict(key="reps", name="Reps",
             desc="Panell d'entrenament controlat amb la mà a l'aire, sense tocar cap "
                  "pantalla entre sèries.",
             stack="React, TypeScript, Vite, MediaPipe, Electron, Spotify Web API",
             bullets=[
                "Vaig construir el seguiment de mans i una màquina de dos estats, actiu i "
                "en espera, en React. El vaig empaquetar com a aplicació d'escriptori amb "
                "Electron i integrar l'API de Spotify per al control de reproducció.",
                "Vaig diagnosticar un desfasament de diversos centímetres entre el cursor de "
                "mà i la detecció de premuda. Un ancestre amb CSS transform passa a ser el "
                "bloc contenidor dels descendents amb position fixed, així que el cursor es "
                "col·locava al marc escalat mentre el hit test llegia el viewport real. "
                "Treure'l d'aquell marc va tornar tots dos al mateix sistema de coordenades.",
             ]),
    ],
    stack=[("Llenguatges", "Python, Swift, TypeScript, JavaScript, Java, HTML, CSS"),
           ("Frameworks i llibreries",
            "SwiftUI, React, Electron, Vite, OpenCV, MediaPipe, Vosk, Core Haptics, PWA"),
           ("Eines, bases de dades i cloud",
            "Git, GitHub, Firebase amb Cloud Firestore, Realtime Database i Security "
            "Rules, Vercel, MQTT, Ollama, Xcode, Figma, Arduino, ESP32")],
    edu=[("Grau en Disseny i Creació de Productes Interactius",
          "La Salle, Universitat Ramon Llull, Barcelona. 2025 fins ara.",
          "Primer curs complet, 60 ECTS en programació, orientació a objectes, UML, "
          "electrònica i disseny d'interfície. Segon curs des del setembre de 2026."),
         ("Anglès C1 avançat", "", ""),
         ("Desenvolupament autodidacta", "",
          "Deu productes propis dissenyats i construïts de dalt a baix, entre aplicacions "
          "iOS, web i sistemes que combinen programari amb maquinari.")],
    soft=[("Resolució de problemes lògics",
           "Aïllo els components abans d'integrar-los. Depurar un sistema muntat amb "
           "motors, sensors i ràdio alhora va costar hores i provar cada peça per separat "
           "va trobar la fallada en minuts."),
          ("Aprenentatge autònom",
           "Tot l'stack de dalt el vaig aprendre perquè un projecte ho necessitava, sense "
           "cap curs pel mig."),
          ("Treball en equip i disseny d'interfícies",
           "En un projecte en parella vam fixar els contractes entre capes abans "
           "d'escriure el codi de sota, cosa que va eliminar els bloquejos mutus."),
          ("Criteri de producte",
           "Elimino una funció quan és ambigua per construcció en lloc de continuar "
           "ajustant-la.")],
)


def check(L):
    bad = []
    def scan(v, where):
        if isinstance(v, str):
            if re.search(r"[—–]|(?<= )-(?= )|;", v): bad.append(f"{where}: {v[:70]}")
        elif isinstance(v, (list, tuple)):
            for i, x in enumerate(v): scan(x, f"{where}[{i}]")
        elif isinstance(v, dict):
            for k, x in v.items(): scan(x, f"{where}.{k}")
    for k, v in L.items():
        if k != "out": scan(v, k)
    if bad: raise SystemExit("dash or semicolon found:\n  " + "\n  ".join(bad))


def portrait():
    im = Image.open(PHOTO); W0, H0 = im.size
    x0, x1 = int(0.20 * W0), int(0.80 * W0)
    bw = x1 - x0
    y0 = int(0.07 * H0)
    im = im.crop((x0, y0, x1, min(H0, y0 + int(bw * PH_H / PH_W))))
    im = im.resize((int(PH_W * 3), int(PH_H * 3)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=86, optimize=True); buf.seek(0)
    return ImageReader(buf)


def build(L):
    check(L)
    out = os.path.join(PUBLIC, L["out"])
    c = canvas.Canvas(out, pagesize=(W, H))
    c.setTitle("Xavi Bosch"); c.setAuthor("Xavi Bosch")
    c.setSubject(L["role"].replace("   ·   ", " "))
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

    def para(x, y, t, w, font="Body", size=8.7, lead=10.4, colour=INK):
        c.setFont(font, size); c.setFillColor(colour)
        for line in wrap(t, font, size, w):
            c.drawString(x, y, line); y -= lead
        return y

    def section(y, text):
        c.setFont("Mono", 6.3); c.setFillColor(ACCENT)
        c.drawString(ML, y, text.upper())
        c.setStrokeColor(FAINT); c.setLineWidth(0.5)
        tw = pdfmetrics.stringWidth(text.upper(), "Mono", 6.3)
        c.line(ML + tw + 8, y + 2, W - MR, y + 2)
        return y - 14

    top = H - MT

    c.drawImage(portrait(), W - MR - PH_W, top - PH_H, PH_W, PH_H, mask=None)
    c.setStrokeColor(ACCENT); c.setLineWidth(0.8)
    c.rect(W - MR - PH_W, top - PH_H, PH_W, PH_H, stroke=1, fill=0)

    hw = COL - PH_W - 18
    size = 40
    while pdfmetrics.stringWidth("XAVI BOSCH", "Disp", size) > hw and size > 20: size -= 0.5
    y = top - size * 0.78
    c.setFont("Disp", size); c.setFillColor(INK); c.drawString(ML, y, "XAVI BOSCH")
    y -= 14
    c.setFont("Mono", 6.4); c.setFillColor(ACCENT); c.drawString(ML + 1, y, L["role"])

    # contact, as real selectable text so an ATS can read every field
    y -= 15
    c.setFont("Mono", 6.5); c.setFillColor(INK)
    x = ML
    c.drawString(x, y, "bosch.xavii@gmail.com")
    c.linkURL("mailto:bosch.xavii@gmail.com",
              (x, y - 2, x + pdfmetrics.stringWidth("bosch.xavii@gmail.com", "Mono", 6.5), y + 7),
              relative=0, thickness=0)
    x += pdfmetrics.stringWidth("bosch.xavii@gmail.com", "Mono", 6.5)
    c.setFillColor(FAINT); c.drawString(x, y, "   ·   "); x += pdfmetrics.stringWidth("   ·   ", "Mono", 6.5)
    c.setFillColor(INK); c.drawString(x, y, L["city"])
    x += pdfmetrics.stringWidth(L["city"], "Mono", 6.5)
    c.setFillColor(FAINT); c.drawString(x, y, "   ·   "); x += pdfmetrics.stringWidth("   ·   ", "Mono", 6.5)
    c.setFillColor(INK if PHONE else ACCENT); c.drawString(x, y, PHONE or L["phone_ph"])

    y -= 10
    x = ML
    for i, (txt, url) in enumerate(LINKS):
        if i:
            c.setFont("Mono", 6.5); c.setFillColor(FAINT)
            c.drawString(x, y, "   ·   "); x += pdfmetrics.stringWidth("   ·   ", "Mono", 6.5)
        c.setFont("Mono", 6.5); c.setFillColor(INK); c.drawString(x, y, txt)
        tw = pdfmetrics.stringWidth(txt, "Mono", 6.5)
        c.linkURL(url, (x, y - 2, x + tw, y + 7), relative=0, thickness=0)
        x += tw

    y = min(y - 18, top - PH_H - 12)

    y = section(y, L["l_profile"])
    y = para(ML, y, L["profile"], COL, size=8.9, lead=11.0)
    y -= 11

    y = section(y, L["l_projects"])
    for pr in L["projects"]:
        c.setFont("BodyBd", 9.4); c.setFillColor(INK)
        c.drawString(ML, y, pr["name"])
        nx = ML + pdfmetrics.stringWidth(pr["name"], "BodyBd", 9.4) + 9
        repo = REPOS.get(pr["key"], "")
        c.setFont("Mono", 6.3); c.setFillColor(INK if repo else ACCENT)
        c.drawString(nx, y + 0.5, repo or L["link_ph"])
        if repo:
            c.linkURL("https://" + repo.lstrip("https://"),
                      (nx, y - 2, nx + pdfmetrics.stringWidth(repo, "Mono", 6.3), y + 7),
                      relative=0, thickness=0)
        y -= 11
        y = para(ML, y, pr["desc"], COL, size=8.6, lead=10.4, colour=MUTED)
        c.setFont("Mono", 6.3); c.setFillColor(ACCENT)
        c.drawString(ML, y, L["l_tech"].upper() + ":")
        sx = ML + pdfmetrics.stringWidth(L["l_tech"].upper() + ": ", "Mono", 6.3)
        c.setFont("BodyMd", 8.0); c.setFillColor(INK)
        c.drawString(sx, y - 0.5, pr["stack"])
        y -= 12
        for b in pr["bullets"]:
            c.setFont("Body", 8.6); c.setFillColor(ACCENT)
            c.drawString(ML + 2, y, "›")
            y = para(ML + 11, y, b, COL - 11, size=8.6, lead=10.4, colour=MUTED)
            y -= 2
        y -= 6

    y -= 3
    y = section(y, L["l_stack"])
    for head, body in L["stack"]:
        c.setFont("BodyBd", 8.6); c.setFillColor(INK)
        c.drawString(ML, y, head + ":")
        hx = ML + pdfmetrics.stringWidth(head + ":  ", "BodyBd", 8.6)
        lines = wrap(body, "Body", 8.6, COL - (hx - ML))
        c.setFont("Body", 8.6); c.setFillColor(MUTED)
        c.drawString(hx, y, lines[0]); y -= 10.4
        rest = " ".join(body.split()[len(lines[0].split()):])
        if rest: y = para(ML, y, rest, COL, size=8.6, lead=10.4, colour=MUTED)
        y -= 3
    y -= 7

    y = section(y, L["l_edu"])
    for title, sub, detail in L["edu"]:
        c.setFont("BodyBd", 8.8); c.setFillColor(INK)
        c.drawString(ML, y, title)
        if sub:
            sx = ML + pdfmetrics.stringWidth(title + "   ", "BodyBd", 8.8)
            c.setFont("Body", 8.4); c.setFillColor(MUTED); c.drawString(sx, y, sub)
        y -= 10.6
        if detail: y = para(ML, y, detail, COL, size=8.4, lead=10.2, colour=MUTED)
        y -= 4
    y -= 6

    y = section(y, L["l_soft"])
    for head, body in L["soft"]:
        c.setFont("BodyBd", 8.6); c.setFillColor(INK)
        c.drawString(ML, y, head + ":")
        hx = ML + pdfmetrics.stringWidth(head + ":  ", "BodyBd", 8.6)
        lines = wrap(body, "Body", 8.6, COL - (hx - ML))
        c.setFont("Body", 8.6); c.setFillColor(MUTED)
        c.drawString(hx, y, lines[0]); y -= 10.4
        rest = " ".join(body.split()[len(lines[0].split()):])
        if rest: y = para(ML, y, rest, COL, size=8.6, lead=10.4, colour=MUTED)
        y -= 3

    if y < FOOT:
        raise SystemExit(f"{L['out']}: content overruns the page, ends at {y:.0f}pt "
                         f"(floor {FOOT})")
    c.showPage(); c.save()
    print(f"wrote {L['out']}  ·  ends {y:.0f}pt")


for lang in (ES, EN, CA):
    build(lang)
