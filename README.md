<div align="center">

# Xavi Bosch — Portfolio

**A portfolio that behaves like a system, not a page.**

A horizontal deck of four panels, driven by a 7,200-particle Canvas engine that
samples real photographs and morphs between them — then flies across the screen
to *become* the next section's content.

[**boschwebs.website**](https://boschwebs.website) · Interactive Product Design @ La Salle Barcelona

![React](https://img.shields.io/badge/React-18-20232A?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Canvas 2D](https://img.shields.io/badge/Canvas_2D-no_WebGL-D63022?style=flat-square)
![i18n](https://img.shields.io/badge/i18n-EN_·_ES_·_CA-F5F4EF?style=flat-square)

</div>

---

## Table of contents

- [What this is](#what-this-is)
- [The particle engine](#the-particle-engine)
- [The deck](#the-deck)
- [Interaction layer](#interaction-layer)
- [Trilingual content model](#trilingual-content-model)
- [Design system](#design-system)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Project structure](#project-structure)
- [Running it locally](#running-it-locally)
- [Debugging the particle engine](#debugging-the-particle-engine)
- [Featured work](#featured-work)
- [Deployment](#deployment)
- [License](#license)

---

## What this is

Most portfolios are a scroll. This one is a **deck**: four full-viewport panels
(`Intro → Work → About → Contact`) that slide horizontally, sharing a single
persistent particle field rendered on a fixed full-screen canvas underneath the
UI.

The particle field is not decoration bolted on top. It is **scene-aware**: it
reads the live DOM geometry of the panel you are on and re-targets itself, so
the same 7,200 particles that form a portrait on the intro panel physically
travel across the viewport and reassemble as the photograph in the About
section, then dissolve into handwritten script on Contact.

There is **no WebGL and no Three.js** — the whole thing is Canvas 2D with typed
arrays.

### Design direction

Swiss-brutalist: near-black `#0C0B09`, off-white `#F5F4EF`, one signal red
`#D63022`, zero border radius anywhere, hairline rules, condensed display type
set enormous against mono microcopy. A terminal-style boot overlay frames the
whole thing as "Portfolio OS" — leaning into the systems language of the actual
projects rather than pretending to be a design agency.

---

## The particle engine

`src/redesign/components/HeroParticleMorph.jsx` — the centerpiece. ~900 lines,
zero dependencies.

### Pipeline

```
9 source photos
      │
      ├─▶ draw to 360×240 offscreen canvas (aspect-preserving letterbox)
      │
      ├─▶ per-pixel luminance (Rec. 601) + local contrast + 5×5 neighbour density
      │
      ├─▶ classify each surviving pixel into one of four candidate pools
      │
      ├─▶ boustrophedon sort (serpentine, 48 horizontal bands)
      │
      └─▶ pack into Float32Array — 6 floats per particle: x, y, brightness, r, g, b
```

Each of the 9 images becomes one **shape**: a flat `Float32Array` of
`7200 × 6` floats. Runtime morphing is then pure arithmetic over typed arrays —
no per-frame image decoding, no allocation.

### Pixel classification

A naive "sample every Nth bright pixel" approach makes portraits read as grey
mush. Instead, every candidate pixel is scored on three signals and routed into
one of four pools, each with its own fixed particle budget:

| Pool | Budget | Selection criteria | Purpose |
|---|---:|---|---|
| **Core** | 55% | accent ∪ warm ∪ detail, sorted | Structural mass — the recognisable silhouette |
| **Accent** | 12% | `density ≥ 2`, strongly red-dominant | Saturated highlights; forced to signal-red and scaled ×1.45 on portrait frames |
| **Warm** | 18% | `density ≥ 2`, `r > g > b` | Skin and warm light — what makes a face read as a face |
| **Detail** | 15% | `density ≥ 3` and (`contrast > 14` or `brightness > 44`) | Edges and texture |

Pixels that are simultaneously dark *and* flat (`brightness < 18 && contrast < 13`)
are discarded outright, so particles never get wasted on empty background.

Each pool falls back gracefully: if a pool finds fewer than 12 candidates in a
given image, it borrows from a wider pool rather than collapsing to a point.

### Why the serpentine sort matters

Particle index `i` in shape A morphs to particle index `i` in shape B. If both
shapes are sorted in raster order, particles fly in long diagonal streaks. Both
are sorted **boustrophedon** — banded into 48 horizontal strips, alternating
left-to-right and right-to-left:

```js
candidates.sort((a, b) => {
  const bandA = Math.floor(a.y * 48);
  const bandB = Math.floor(b.y * 48);
  if (bandA !== bandB) return bandA - bandB;
  return bandA % 2 === 0 ? a.x - b.x : b.x - a.x;   // serpentine
});
```

Neighbouring indices end up spatially adjacent in *both* shapes, so the morph
reads as coherent local flow instead of chaos.

### Motion

Interpolation is **Catmull-Rom spline** across four keyframes
(`previous → from → to → next`), not linear lerp — so a particle passing through
three consecutive images follows one continuous curve with no velocity
discontinuity at the handover:

```js
nx = catmullRom(previousShape[o], fromX, toX, nextShape[o], progress)
   + Math.cos(angle) * drift      // per-particle orbital drift, peaks mid-transition
   + breathing;                   // shared low-frequency idle
```

Three motion layers stack on top:

- **Arc drift** — `sin(π · progress)` envelope, so particles bow outward at the
  midpoint of a transition and settle exactly on target at the ends. Amplitude
  is per-particle via a hash, so the cloud swells rather than sliding flat.
- **Breathing** — a slow shared sine keeps the field alive while holding a pose.
- **Micro-stillness** — when locked onto a scene target, drift drops to
  `0.00055` so the shape stays legible but never looks frozen.

### Timeline

```
1800ms  intro       scatter from off-screen edges → shape 0  (easeOutCubic)
   ↓
2600ms  transition  shape n → shape n+1                      (smoothstep)
2000ms  hold        on shapes 2, 5, 8 — the three "resolved" frames
   ↓
        loop
```

`HELD_SHAPES = [2, 5, 8]` pauses on the final frame of each of the three
photo triads (portrait / subject / laptop), so the loop has three legible
resting beats instead of morphing continuously.

### Scene targeting

The canvas is `position: fixed inset-0` and spans the viewport. The active panel
index is passed in as `scene`, and `getSceneRect()` resolves where the particles
should live:

| Scene | Panel | Target rect | Opacity | Notes |
|---:|---|---|---:|---|
| 0 | Intro | Right 62% of viewport | `1.0` | Fills the space beside the name |
| 1 | Work | Near-full-bleed | `0.18` | Drops to `z-index: 0` — behind the project list, becomes texture |
| 2 | About | `[data-particle-about-target]` | `0.94` | Queries the actual photo element's `getBoundingClientRect()` |
| 3 | Contact | `[data-particle-end-target]` | `0.94` | Morphs to *"The End"* rendered in Snell Roundhand script |

Scenes 2 and 3 are the interesting ones: rather than hardcoding coordinates, the
engine does a live DOM lookup and reads the target element's bounding box each
frame. Resize the window, change the layout, swap the language — the particles
still land exactly on the photo, because they are following the real element.

Scene changes snapshot current positions into `transitionFrom` and interpolate
over 1650ms with a smoothstep, so switching panels mid-morph never snaps.

### The About handoff

On the About panel the particle portrait and the real photograph occupy the
*same* rect and cross-fade with a synchronised vertical wipe every 3s:

- `AsciiPhoto` clips the `<img>` with `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`
- the canvas simultaneously clips the particles to the **inverse** region

Both use matched ~1.05s `cubic-bezier(0.76,0,0.24,1)` timing, so a single
horizontal edge sweeps down the frame with particles above it and photograph
below — the particles appear to *resolve into* the real image.

---

## The deck

`Deck` in `src/redesign/App.jsx`. A `translateX` track `count × 100vw` wide,
eased with `cubic-bezier(0.76,0,0.24,1)` over 950ms.

Three input methods, one shared 850ms lock so a single gesture never
double-advances:

| Input | Handling |
|---|---|
| Wheel / trackpad | Accumulates `max(|deltaY|, |deltaX|)`, fires past a 40px threshold, resets accumulator |
| Keyboard | `↑ ↓ ← →`, `PageUp`, `PageDown` |
| Touch | `touchstart`/`touchend` delta, 55px threshold |

Panels cross-fade their content independently of the track slide (`opacity` +
40px `translateX`, staggered 100–150ms) so the incoming panel resolves *after*
the slide rather than riding along with it.

---

## Interaction layer

**Custom cursor** (`Cursor.jsx`) — two layers:
- an 8px dot in `mix-blend-mode: difference`, so it inverts whatever it sits on
  and stays visible over both the near-black background and the off-white
  project hover fills
- a ring lagging behind at `lerp 0.16`, which grows to 96px and fills signal-red
  to display a contextual label

Any element opts in with `data-cursor="View"`. Native cursors are suppressed
globally (`cursor: none`), and the whole thing early-returns on
`(pointer: coarse)` so touch devices keep their native behaviour.

**Boot sequence** (`BootSequence.jsx`) — a terminal-style overlay counting
0→100% through five translated system lines, then wiping upward. It is driven by
`requestAnimationFrame`, which browsers throttle to zero in background tabs — so
there is a `setTimeout` failsafe at `duration + 1200ms` that force-completes the
boot. Without it, opening the site in a background tab (cmd-click, restored
session) would leave a visitor staring at a frozen overlay forever.

**Magnetic name** (`HeroName`) — `XAVI` and `BOSCH` counter-drift against the
pointer. Deliberately **not** React state: storing pointer position in state
re-rendered both `<h1>` elements plus their Motion wrappers at 60fps and made the
name stutter visibly. All motion is now direct `style.transform` writes inside a
single rAF loop with `lerp 0.08` smoothing, so React renders once and the loop
owns the animation.

**Scramble** (`Scramble.jsx`) — decodes text through random glyphs on first
intersection. Duration-based rather than per-character: a 20-character heading
and a 6-character one both finish in the same wall-clock time. The earlier
per-character implementation made long translated headings take ~20 seconds.

**Case-study overlays** (`ProjectOverlay.jsx`) — `clip-path` reveal, prev/next
navigation, keyboard shortcuts, and a nested fullscreen gallery with its own
thumbnail strip and arrow-key handling.

---

## Trilingual content model

English, Spanish and Catalan, switchable live from the nav with zero reload and
no route change.

Rather than external JSON bundles, translations are colocated with the content
they belong to via a two-character helper:

```js
const l = (en, es, ca) => ({ en, es, ca });

{
  id: "05",
  name: "Nevera Bosch",
  tagline: l(
    "The fridge is the app.",
    "La nevera es la app.",
    "La nevera és l'app."
  ),
  tags: ["NFC", "UX"],   // plain strings pass through untranslated
}
```

Rendering goes through one resolver with a fallback chain, which accepts *either*
a plain string or an `{en, es, ca}` object:

```js
export function t(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;    // proper nouns, tech names
  return value[lang] || value.en || value.es || value.ca || "";
}
```

This means technical terms (`iOS`, `NFC`, `SwiftUI`, `Java`) stay as bare
strings and never need triplicating, while prose gets full translations —
including the boot sequence lines, cursor labels, overlay chrome and nav.
Selection persists to `localStorage`.

---

## Design system

Tokens in `src/index.css`:

| Token | Value | Role |
|---|---|---|
| `--background` | `#0C0B09` | Near-black, warm-shifted |
| `--foreground` | `#F5F4EF` | Off-white |
| `--accent` | `#D63022` | Swiss red — the only chromatic colour in the UI |
| `--hairline` | `rgba(245,244,239,0.12)` | Every rule and border |
| `--radius` | `0rem` | Hard corners, no exceptions |

Type scale — three faces, each with one job:

| Face | Use |
|---|---|
| **Big Shoulders Display** 900 | Display. `clamp(4rem, 16vw, 17rem)` for the name |
| **Jost** 300–500 | Body copy |
| **DM Mono** 300–400 | Labels, metadata, timestamps, boot log |

Sizing is `clamp()`-based throughout so panels stay legible from 1280px laptops
to ultrawides without breakpoint jumps — necessary because every panel is height-
constrained to exactly `100vh` and cannot simply grow.

---

## Performance

The engine touches 7,200 particles per frame and holds 60fps. What makes that
possible:

**Bucketed batch rendering.** The obvious implementation calls `fillRect` 7,200
times per frame. Instead, colours are quantised into a 7-entry palette, and
particles are drawn as **7 batched paths** — one `beginPath()` / `fill()` per
colour bucket, each accumulating thousands of `rect()` calls:

```js
for (let bucket = 0; bucket < COLOR_PALETTE.length; bucket++) {
  context.beginPath();
  for (let p = 0; p < PARTICLE_COUNT; p++) {
    if (colorBuckets[p] !== bucket) continue;
    context.rect(x, y, size, size);
  }
  context.fillStyle = COLOR_PALETTE[bucket];
  context.fill();
}
```

That is **7 fill operations per frame instead of 7,200** — the single biggest win
in the whole renderer.

Everything else:

- **Zero per-frame allocation.** All buffers (`positions`, `previous`,
  `transitionFrom`, `sizes`, `colorBuckets`) are preallocated typed arrays,
  reused every frame. Nothing for the GC to collect, so no frame-time spikes.
- **DPR capped at 1.6.** Uncapped, a 3× Retina display would demand 9× the
  fill area for no perceptible gain.
- **Trails subsampled.** Motion-trail line segments are drawn for every 7th
  particle only (~1,030 segments), stroked as one path.
- **Scene 3 halves the draw.** The script-text pose skips 2 of every 3 particles
  — the glyphs read fine at a third of the density.
- **Additive compositing.** `globalCompositeOperation = "lighter"` gives overlap
  glow for free, no blur passes.
- **Shape sampling happens once**, at load, off the render path.
- **Desktop only.** The canvas is `hidden md:block` — mobile gets the static
  layout instead of a battery-draining particle field.

Production bundle: **~348 kB raw / ~113 kB gzipped**, one JS chunk, one CSS
chunk, no code splitting needed at this size.

---

## Accessibility

- The particle canvas is `aria-hidden="true"` and `pointer-events-none` — it is
  pure decoration and never traps focus or reaches a screen reader.
- `prefers-reduced-motion: reduce` collapses every CSS animation and transition
  to `0.01ms` globally — the deck slide, wipes, scramble and cursor easing all
  become instant.
- `:focus-visible` gets a 2px signal-red outline at 3px offset — the deck is
  fully keyboard-navigable.
- Tailwind's `hoverOnlyWhenSupported` gates all `hover:` variants behind
  `(hover: hover)`, so touch devices never get sticky hover states.
- The custom cursor and magnetic name both bail out entirely on
  `(pointer: coarse)`, restoring native touch behaviour.
- `color-scheme: dark` is declared so form controls and scrollbars match.

**Known limitations, honestly:**

- The particle engine's `requestAnimationFrame` loop is **not** gated behind
  `prefers-reduced-motion`. The CSS rule above stops every transition, but the
  canvas keeps animating. Anyone wanting to fix this properly should skip the
  render loop and paint a single static frame when the query matches.
- The deck's horizontal metaphor is unconventional. Wheel, arrow keys and touch
  all work, and the nav plus progress dots give direct random access to any
  panel — but it is a learned interaction, not a discovered one.

---

## Project structure

```
src/
├── main.jsx                    React root
├── App.jsx                     Mounts the redesign
├── index.css                   Design tokens, base layer, reduced-motion
│
├── redesign/                   ← the live site
│   ├── App.jsx                 Deck engine, nav, status rail, scene orchestration
│   ├── i18n.jsx                LanguageProvider, useLang, t() resolver
│   ├── data/
│   │   └── projects.js         8 case studies, trilingual via l()
│   └── components/
│       ├── HeroParticleMorph.jsx    ★ the particle engine
│       ├── sections.jsx             Hero / Work / About / Contact panels
│       ├── ProjectOverlay.jsx       Case-study overlay + fullscreen gallery
│       ├── AsciiPhoto.jsx           Photo layer, wipe-synced with the canvas
│       ├── BootSequence.jsx         Terminal boot overlay + rAF failsafe
│       ├── Cursor.jsx               Blend-difference cursor
│       ├── Scramble.jsx             Duration-based text decode
│       ├── BrandIcons.jsx           Inline GitHub / LinkedIn SVGs
│       └── figma/
│           └── ImageWithFallback.jsx
│
├── components/                 ← previous iteration, preserved for reference
├── hooks/                      ← previous iteration (useLenis, useReveal, useTheme)
├── data/                       ← previous iteration (deep-dive content)
└── i18n.jsx                    ← previous iteration's i18n
```

The site renders **only** from `src/redesign/`. The top-level `components/`,
`hooks/` and `data/` directories are the earlier scroll-based version of this
portfolio, kept in-tree as reference and not mounted — `src/App.jsx` is a
two-line file that renders the redesign and nothing else.

> `BrandIcons.jsx` exists because `lucide-react` v1 dropped its brand glyphs —
> `Github` and `Linkedin` are no longer exported (verified against all 6,013
> exports). They are reimplemented as inline SVGs with a matching prop API.

---

## Running it locally

```bash
git clone https://github.com/xavibosch/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open `http://localhost:5173`.

```bash
npm run build      # production build to dist/
npm run preview    # serve the built output
```

> **Note on paths:** `vite build` hangs indefinitely at `transforming...` if the
> project sits in a directory path containing emoji. If you hit a build that
> stalls at 0% CPU, check the absolute path first — it is not your code.

---

## Debugging the particle engine

Two dev-only query parameters make the engine inspectable without waiting
through the loop. Both are gated behind `import.meta.env.DEV` and stripped from
production builds.

```
?particleShape=4     freeze on shape index 4 (0–8)
?particleSeek=12000  start the timeline 12s in
```

The canvas also publishes live state to `data-*` attributes, readable from
devtools or an automated check:

```js
canvas.dataset.ready      // "true" once all 10 images are sampled, "error" on failure
canvas.dataset.particles  // "7200"
canvas.dataset.phase      // "intro" | "loop-3-4" | "hold-5" | "preview-2"
canvas.dataset.elapsed    // ms since timeline start        (DEV only)
canvas.dataset.progress   // 0.000–1.000 within transition  (DEV only)
```

`data-phase` is the useful one — it makes the current timeline position
assertable, so a headless check can verify the loop is actually advancing rather
than just confirming a canvas element exists.

---

## Featured work

Eight case studies, each with full trilingual copy, real screenshots and a
gallery:

| # | Project | What it is |
|---|---|---|
| 01 | **Jeffrey** | A local AI assistant that acts instead of answering — agent loop over Python + Ollama on macOS |
| 02 | **Jeffrey Remote** | Native SwiftUI client: Bonjour discovery, TCP/JSON bridge, Wi-Fi / Hotspot / Tailscale with health checks and reconnection |
| 03 | **Jeffrey Wake Station** | Hardware wake-word trigger — treating latency itself as interaction design |
| 04 | **Betsy** | Social sports betting with virtual points: private leagues, rankings, 1v1 arena duels. SwiftUI + Firebase |
| 05 | **Nevera Bosch** | Family shopping list that lives on the fridge — tap an NFC sticker, the shared list opens. React PWA, used daily |
| 06 | **Haptic Hunter** | A game playable with your eyes closed — accessibility through haptics |
| 07 | **Remote Robot Car** | One message travelling from a thumb to four wheels ([demo](https://youtu.be/cBed9lY9uKQ)) |
| 08 | **laSallefy** | Java audio project — no decoder, build the sound |

---

## Deployment

Vercel, aliased to [boschwebs.website](https://boschwebs.website).

```bash
npm run build
vercel --prod
```

---

## License

[MIT](LICENSE) for the code.

Photographs, project screenshots and written case-study content are **not**
covered — those are personal work. Take the particle engine, the deck, the i18n
pattern; leave my face and my projects.

---

<div align="center">

**Xavi Bosch** · Barcelona
[boschwebs.website](https://boschwebs.website) · [LinkedIn](https://www.linkedin.com/in/xavi-bosch-galilea-9b3876410) · bosch.xavii@gmail.com

*Open to internships and junior roles in product design & development.*

</div>
