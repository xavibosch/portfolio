/* Real copy and real screenshots, lifted straight from
   src/redesign/data/projects.js. Nothing here is invented: an empty field
   means that project has no honest answer to that question, and the case
   study simply omits that chapter rather than filling it in. */
window.PROJECTS = [
  {
    "id": "01",
    "name": "Jeffrey",
    "tagline": "An assistant that acts, not answers.",
    "builtFor": "Me, and anyone who wants an assistant that can touch their machine without shipping their desktop to a company.",
    "problem": "Chat assistants answer and stop. If I asked one to open a file, rename it and send it, it wrote me instructions for doing that myself.",
    "description": "Jeffrey listens, picks a route, calls the right tool, runs it on macOS and answers in the language it was asked in. One sentence in, an action out. Five systems coordinate behind it, and it keeps working with the network down because the local model is not a demo mode.",
    "changed": "My first instinct when Jeffrey picked the wrong action was that the model was not good enough. It was not the model. The tools I had handed it were vaguely described, so it was choosing between options that overlapped, and no amount of model quality fixes an ambiguous menu. Rewriting the tool definitions to be narrow and unambiguous fixed more than swapping models ever did.",
    "learning": "When the AI acts instead of answering, the tools matter more than the model. A weaker model with well shaped tools beat a stronger one with vague ones.",
    "research": "",
    "tech": [
      "Python",
      "Ollama",
      "macOS",
      "Agent loop"
    ],
    "images": [
      "/images/jeffrey.png"
    ]
  },
  {
    "id": "02",
    "name": "Jeffrey Remote",
    "tagline": "One assistant, many surfaces.",
    "builtFor": "Me, away from the desk. The moments an assistant is worth most are the ones where you are not sitting in front of it.",
    "problem": "Jeffrey only existed where the Mac was. Everything it was good at stopped the moment I left the room.",
    "description": "A native iOS surface for Jeffrey and the Mac: live preview, cursor, commands, media, apps and voice, over a connection built to survive a dropout. Each tab is shaped around one remote job rather than being a list of every command that exists.",
    "changed": "I built features first and the connection underneath them second, which meant each new one had to be taught how to survive a dropped link on its own. They did not survive it consistently, and every fix was the same fix written again. I stopped and rebuilt the channel layer as the foundation, and everything added after that was remote and resilient without asking.",
    "learning": "Building the connection layer first, before any feature, meant every feature added later was remote for free. Doing it the other way round would have meant retrofitting each one.",
    "research": "",
    "tech": [
      "Swift",
      "SwiftUI",
      "macOS bridge"
    ],
    "images": [
      "/images/jeffrey-remote.png",
      "/images/jeffrey-remote-apps.webp",
      "/images/jeffrey-remote-controls.webp"
    ]
  },
  {
    "id": "03",
    "name": "Jeffrey Wake Station",
    "tagline": "Latency is interaction design.",
    "builtFor": "Me, in a hallway with my hands full. Reaching for a keyboard to start something is a step that should not exist.",
    "problem": "Every way of triggering Jeffrey started with unlocking something. The assistant was fast, getting to it was not.",
    "description": "A desk that works as an input device. Motion, sound and a physical button travel from an Arduino MEGA to macOS and fire whole routines in under 200 milliseconds. Built for a hallway, not a keynote.",
    "changed": "The first build worked and still felt broken. The routine fired every time, just late enough that you had already started wondering whether it had heard you, and once you are wondering you press the button again. Chasing that delay through the serial path is what turned latency from a number I was optimising afterwards into the thing the whole design was actually about.",
    "learning": "Past roughly 200 ms between a gesture and the screen answering, it stops feeling like you caused it. Latency turned out to be the whole design, not a number to optimise later.",
    "research": "",
    "tech": [
      "Arduino MEGA",
      "Serial",
      "macOS"
    ],
    "images": [
      "/images/sensor-workspace.png"
    ]
  },
  {
    "id": "04",
    "name": "Betsy",
    "tagline": "All the tension of betting, zero real money.",
    "builtFor": "My own group of friends. We argue about football every week, and the only products that turn that into a game want your card details.",
    "problem": "Betting apps are built to take money from people who cannot afford to lose it. The part my friends actually want, being right in front of each other, needs none of that.",
    "description": "Betsy turns a group chat into a private league: real fixtures, virtual points, live rankings and 1v1 duels. Nothing is convertible into money, in either direction. The product is the argument between friends, and every system underneath exists to feed it.",
    "changed": "Writing the Firestore rules and the SwiftUI views at the same time is what exposed it: two people could settle the same bet, because nothing in a static screen says who owns that write. A wireframe cannot show you a race between two phones. The rules had to become the place where the truth lives, with the interface allowed to ask but never to decide.",
    "learning": "Writing the Firestore rules and the SwiftUI views at the same time surfaced product problems no wireframe had shown. A static screen cannot tell you that two people can settle the same bet twice.",
    "research": "The one project here with real research behind it. I ran user tests with the people it was for, mapped the customer journey, and defined the target users before building the screens. The interface started as coursework in Interface and Graphic Design and was reshaped by what the testing said, not by what I liked.",
    "tech": [
      "Swift",
      "SwiftUI",
      "Firestore"
    ],
    "images": [
      "/images/betsy-real-hero.jpg",
      "/images/betsy-real-league.png",
      "/images/betsy-real-markets.png",
      "/images/betsy-real-betslip.png"
    ]
  },
  {
    "id": "05",
    "name": "Nevera Bosch",
    "tagline": "The fridge is the app.",
    "builtFor": "My family. Four people, one shopping list, and nobody willing to install anything to use it.",
    "problem": "Every shared list we tried died the same way: someone had to remember the app existed, find it, and log in. The list only matters in the ten seconds you are standing at the fridge.",
    "description": "A sticker on the fridge door is the entire onboarding. Tap a phone against it and the family list opens: no store, no account, no password. The software is anchored to the object people already walk up to.",
    "changed": "The first version was a normal web app with a login, and it died the way every previous shared list had. Watching my own family not use it was the useful part: nobody refused, they just never got as far as opening it. The fix was not a better screen, it was removing the step before the screen. The NFC sticker exists because the app was never the problem, getting to the app was.",
    "learning": "Family is the hardest usability test there is, because nobody in it is being polite. If a parent holding shopping bags cannot use it in three seconds, the design is wrong, and they will tell you so.",
    "research": "",
    "tech": [
      "NFC",
      "Web",
      "Realtime DB"
    ],
    "images": [
      "/images/nevera-real-hero.jpg",
      "/images/nevera-real.png"
    ]
  },
  {
    "id": "06",
    "name": "Haptic Hunter",
    "tagline": "A game you can play with your eyes closed.",
    "builtFor": "Blind, deaf and low vision players, who are usually handed a separate accessible version of a game rather than the game everyone else is playing.",
    "problem": "Accessibility usually arrives as a mode you switch on at the end. By then the game already assumes you can see it, and the mode is a worse version of it.",
    "description": "You hunt invisible signals through haptics, dynamic sound and minimal visuals. The same game works on any combination of senses, because the three channels carry the same information rather than one carrying it and the others decorating.",
    "changed": "The haptics were the hard part, and not for the reason I expected. I designed and tuned them against the simulator, where a vibration is a line in a log rather than something you feel, so everything looked correct and none of it was. On a real device the patterns I had been most pleased with were the ones you could not tell apart in the hand. From then on nothing counted until it had been felt on hardware, which is slower and the only honest way to judge it.",
    "learning": "No simulator tells you how a haptic feels, so every judgement had to be made on a real device in the hand. Building the redundant channels first made accessibility a property of the system instead of a feature bolted on at the end.",
    "research": "",
    "tech": [
      "Core Haptics",
      "Spatial Audio",
      "Swift"
    ],
    "images": [
      "/images/haptic-real-hero.jpg",
      "/images/haptic-real-game.jpg",
      "/images/haptic-real-accessibility.jpg"
    ]
  },
  {
    "id": "07",
    "name": "Remote Robot Car",
    "tagline": "One message travelling from a thumb to four wheels.",
    "builtFor": "La Salle's Electronics course, and for me: the first thing I built where a mistake in the code moved something in the room.",
    "problem": "Driving it from a phone meant either a server I would have to keep alive, or being on the same network as the car. Neither is a robot you can actually use.",
    "description": "A four wheel ESP32 car driven from any phone through a public MQTT broker, with an autonomous layer that brakes, reverses and beeps when the world gets too close. Public broker, private robot.",
    "changed": "When the assembled car misbehaved I debugged the assembled car, which cost hours and told me almost nothing: with motors, sensors and the radio all live at once, any of them could have been the liar. Pulling the parts out and testing each one alone found it in minutes. Now I build the pieces so they can be run in isolation from the start, because a system you can only test as a whole is a system you cannot really test.",
    "learning": "Leaning on a public broker deleted a whole server from the project. Testing components in isolation found in minutes what debugging the assembled car had hidden for hours.",
    "research": "",
    "tech": [
      "ESP32",
      "MQTT",
      "Ultrasonic"
    ],
    "images": [
      "/images/cotxe-hero.jpg",
      "/images/cotxe-build.jpg",
      "/images/cotxe-wiring.jpg",
      "/images/cotxe-final.jpg"
    ]
  },
  {
    "id": "08",
    "name": "laSallefy",
    "tagline": "No decoder: build the sound.",
    "builtFor": "La Salle's object oriented programming course, built in a pair. The constraint was the point: no audio files allowed.",
    "problem": "A media player that reads files is a file browser with a play button. Without files, there is no shortcut: the architecture has to hold the whole thing up.",
    "description": "Every song is a sequence of frequencies synthesised in real time by four custom wave engines, inside strict layers. An AlbumGenerator assembles random albums filtered by mood and target length.",
    "changed": "Working in a pair, we kept blocking each other: one of us could not start until the other had finished the class underneath. The fix was not better coordination, it was agreeing the interfaces between the layers before either of us wrote anything behind them. After that we could both build against a contract instead of against each other's unfinished work.",
    "learning": "Strict layers are what made working in a pair possible: we could each build against an interface instead of waiting for the other. The constraint produced a cleaner architecture than a file based player ever would have.",
    "research": "",
    "tech": [
      "Java",
      "OOP",
      "DSP"
    ],
    "images": [
      "/images/sallefy-hero.svg"
    ]
  },
  {
    "id": "09",
    "name": "Gesture TV",
    "tagline": "The remote was the barrier, so I removed it.",
    "builtFor": "Someone I know who cannot use a television remote. Not a persona, not a user type: one person, whose hands the buttons were never designed for.",
    "problem": "Watching television meant asking someone else to press the buttons. The barrier was not the television, it was the twenty small keys you have to hit precisely to reach it.",
    "description": "Gesture TV replaces the remote completely. A clap turns the television on, a hand held inside a zone of the screen opens Netflix or YouTube or moves through the menu, and local voice commands cover the rest. No remote, no phone, and nobody to ask.",
    "changed": "The version that worked best technically was the one I threw away. Full shell access to the television made every feature easy, and it also meant a camera in someone's living room sat behind a door I had left open. I gave up the shell and rebuilt on Wake on LAN and a narrow command set, which cost me features. A system that exists to give someone independence cannot ask for their privacy as the price.",
    "learning": "Designing for one named person ends every abstract argument in seconds. The camera never writes a frame to disk, because a system that watches someone's living room to give them independence cannot charge them their privacy for it.",
    "research": "",
    "tech": [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Vosk",
      "Wake on LAN"
    ],
    "images": [
      "/images/sensor-workspace.png"
    ]
  },
  {
    "id": "10",
    "name": "Reps",
    "tagline": "Train without touching anything.",
    "builtFor": "Me, in a garage gym: one bench, one barbell, two dumbbells and thirty kilos of plates. No screen you want to touch with chalk on your hands.",
    "problem": "Between sets your hands are chalked or holding a bar, the phone has locked itself, and you have lost both the set count and the music. Every existing app assumes a free, clean hand.",
    "description": "One screen: the Spotify player, the rest timer, the exercise queue and the session panel. You point a finger at the camera and hold, and a ring fills before anything happens. It logs the set, starts the rest countdown, moves to the next exercise on its own, and ends with what you actually lifted. Runs as a Mac app so the camera opens on launch instead of asking every time.",
    "changed": "I built a swipe gesture to change exercise and it kept firing by accident. I added guards: only when the hand was armed, only when the index was extended, only past an axis ratio. It still fired. Then I understood why none of it could work: the index finger is the cursor, so a fast move to the right is identical to a swipe to the right. The gesture was ambiguous by construction, not badly tuned. I deleted it and left the job to the on screen arrows, which say what they do. Cutting the feature was the fix.",
    "learning": "A hand cursor was selecting buttons a couple of centimetres from where it was pointing. The cause was not the tracking: an ancestor with a CSS transform becomes the containing block for anything fixed inside it, so the dot was laid out in the scaled frame while the hit test read the real viewport. Rendering the cursor outside that frame put both back in the same coordinate system. Most of what looks like a tracking problem is a coordinate problem.",
    "research": "",
    "tech": [
      "React",
      "MediaPipe",
      "Spotify API",
      "Electron"
    ],
    "images": [
      "/images/reps-home.jpg",
      "/images/reps-session.jpg",
      "/images/reps-rest.jpg",
      "/images/reps-leave.jpg",
      "/images/reps-summary.jpg",
      "/images/reps-log.jpg",
      "/images/reps-run.jpg"
    ]
  }
];
