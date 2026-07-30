import { useEffect, useRef } from "react";

const SOURCES = [
  "/images/hero-sequence/inicio.jpg",
  "/images/hero-sequence/medio.jpg",
  "/images/hero-sequence/final.jpg",
  "/images/hero-sequence/xavi-inici.jpg",
  "/images/hero-sequence/xavi-meitat.jpg",
  "/images/hero-sequence/xavi-final.jpg",
  "/images/hero-sequence/laptop-inici.jpg",
  "/images/hero-sequence/laptop-mig.jpg",
  "/images/hero-sequence/laptop-final.jpg",
];

const PARTICLE_COUNT = 7200;
const BASE_PARTICLE_COUNT = Math.floor(PARTICLE_COUNT * 0.55);
const ACCENT_PARTICLE_COUNT = Math.floor(PARTICLE_COUNT * 0.12);
const WARM_PARTICLE_COUNT = Math.floor(PARTICLE_COUNT * 0.18);
const DETAIL_PARTICLE_COUNT =
  PARTICLE_COUNT -
  BASE_PARTICLE_COUNT -
  ACCENT_PARTICLE_COUNT -
  WARM_PARTICLE_COUNT;
const ACCENT_PARTICLE_START = BASE_PARTICLE_COUNT;
const POINT_STRIDE = 6;
const SAMPLE_WIDTH = 360;
const SAMPLE_HEIGHT = 240;
const INTRO_DURATION = 1800;
const TRANSITION_DURATION = 2600;
const IMAGE_HOLD_DURATION = 2000;
const HELD_SHAPES = [2, 5, 8];
const LOOP_DURATION =
  SOURCES.length * TRANSITION_DURATION +
  HELD_SHAPES.length * IMAGE_HOLD_DURATION;
const COLOR_PALETTE = [
  "rgba(247,245,238,0.92)",
  "rgba(241,213,187,0.95)",
  "rgba(229,165,111,0.97)",
  "rgba(195,112,67,0.97)",
  "rgba(244,96,41,0.98)",
  "rgba(255,48,27,1)",
  "rgba(174,190,198,0.86)",
];

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const easeOutCubic = (value) => {
  const t = clamp01(value);
  return 1 - Math.pow(1 - t, 3);
};
const catmullRom = (a, b, c, d, value) => {
  const t2 = value * value;
  const t3 = t2 * value;
  return (
    0.5 *
    (2 * b +
      (-a + c) * value +
      (2 * a - 5 * b + 4 * c - d) * t2 +
      (-a + 3 * b - 3 * c + d) * t3)
  );
};
const getPathState = (timeline, rawProgress, easing = smoothstep) => {
  const pathPosition =
    easing(rawProgress) * (timeline.length - 1);
  const segment = Math.min(
    timeline.length - 2,
    Math.floor(pathPosition)
  );

  return {
    fromShape: timeline[segment],
    toShape: timeline[segment + 1],
    previousShape: timeline[Math.max(0, segment - 1)],
    nextShape: timeline[Math.min(timeline.length - 1, segment + 2)],
    progress: clamp01(pathPosition - segment),
    segment,
  };
};
const getLoopPathState = (timeline, loopElapsed) => {
  let remaining = loopElapsed;

  for (let segment = 0; segment < timeline.length; segment += 1) {
    const nextSegment = (segment + 1) % timeline.length;

    if (remaining < TRANSITION_DURATION) {
      return {
        fromShape: timeline[segment],
        toShape: timeline[nextSegment],
        previousShape:
          timeline[(segment - 1 + timeline.length) % timeline.length],
        nextShape: timeline[(segment + 2) % timeline.length],
        progress: smoothstep(remaining / TRANSITION_DURATION),
        segment,
        holding: false,
      };
    }

    remaining -= TRANSITION_DURATION;
    if (HELD_SHAPES.includes(nextSegment)) {
      if (remaining < IMAGE_HOLD_DURATION) {
        return {
          fromShape: timeline[nextSegment],
          toShape: timeline[nextSegment],
          previousShape: timeline[nextSegment],
          nextShape: timeline[nextSegment],
          progress: 0,
          segment: nextSegment,
          holding: true,
        };
      }
      remaining -= IMAGE_HOLD_DURATION;
    }
  }

  return {
    fromShape: timeline[0],
    toShape: timeline[1],
    previousShape: timeline[timeline.length - 1],
    nextShape: timeline[2],
    progress: 0,
    segment: 0,
    holding: false,
  };
};
const hash = (value) => {
  const x = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const getColorBucket = (red, green, blue, brightness, particle) => {
  if (particle % 149 === 0) return 5;
  if (red > green * 1.45 && red > blue * 1.6) {
    return green < 0.18 ? 5 : 4;
  }
  if (red > green * 1.08 && green > blue * 1.05) {
    if (brightness > 0.62) return 1;
    if (brightness > 0.34) return 2;
    return 3;
  }
  if (blue > red * 1.08) return 6;
  if (brightness < 0.3 && red > green) return 3;
  return 0;
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function sampleShape(image, sourceIndex, normalizeToImage = false) {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_WIDTH;
  canvas.height = SAMPLE_HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return new Float32Array(PARTICLE_COUNT * POINT_STRIDE);

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const sampleRatio = SAMPLE_WIDTH / SAMPLE_HEIGHT;
  const drawWidth =
    imageRatio > sampleRatio ? SAMPLE_WIDTH : SAMPLE_HEIGHT * imageRatio;
  const drawHeight =
    imageRatio > sampleRatio ? SAMPLE_WIDTH / imageRatio : SAMPLE_HEIGHT;
  const drawX = (SAMPLE_WIDTH - drawWidth) * 0.5;
  const drawY = (SAMPLE_HEIGHT - drawHeight) * 0.5;
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  const pixels = context.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT).data;
  const luminance = new Float32Array(SAMPLE_WIDTH * SAMPLE_HEIGHT);
  const accentCandidates = [];
  const warmCandidates = [];
  const detailCandidates = [];
  const ambientCandidates = [];

  for (let pixel = 0; pixel < luminance.length; pixel += 1) {
    const offset = pixel * 4;
    luminance[pixel] =
      pixels[offset] * 0.299 +
      pixels[offset + 1] * 0.587 +
      pixels[offset + 2] * 0.114;
  }

  for (let y = 2; y < SAMPLE_HEIGHT - 2; y += 1) {
    for (let x = 2; x < SAMPLE_WIDTH - 2; x += 1) {
      const index = (y * SAMPLE_WIDTH + x) * 4;
      const pixelIndex = y * SAMPLE_WIDTH + x;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const normalizedX = normalizeToImage
        ? clamp01((x + 0.5 - drawX) / drawWidth)
        : (x + 0.5) / SAMPLE_WIDTH;
      const normalizedY = normalizeToImage
        ? clamp01((y + 0.5 - drawY) / drawHeight)
        : (y + 0.5) / SAMPLE_HEIGHT;
      const brightness = luminance[pixelIndex];
      const leftBrightness = luminance[pixelIndex - 1];
      const upperBrightness = luminance[pixelIndex - SAMPLE_WIDTH];
      const contrast = Math.max(
        Math.abs(brightness - leftBrightness),
        Math.abs(brightness - upperBrightness)
      );
      let density = 0;
      for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
        for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
          if (offsetX === 0 && offsetY === 0) continue;
          const neighbor =
            (y + offsetY) * SAMPLE_WIDTH + x + offsetX;
          if (luminance[neighbor] > 18) density += 1;
        }
      }
      const usesCanFocus = sourceIndex >= 3 && sourceIndex <= 5;
      const insideCan =
        normalizedX > 0.38 &&
        normalizedX < 0.56 &&
        normalizedY > 0.48 &&
        normalizedY < 0.74;
      const isAccent =
        density >= 2 &&
        red > 60 &&
        green < red * 0.48 &&
        blue < red * 0.52 &&
        (!usesCanFocus || insideCan);
      const isWarm =
        density >= 2 &&
        red > 38 &&
        red > green * 1.06 &&
        green > blue * 1.03;

      if (brightness < 18 && contrast < 13 && !isAccent && !isWarm) continue;

      const point = {
        x: normalizedX,
        y: normalizedY,
        brightness: clamp01(brightness / 220),
        red: red / 255,
        green: green / 255,
        blue: blue / 255,
      };

      if (isAccent) accentCandidates.push(point);
      else if (isWarm) warmCandidates.push(point);
      else if (
        density >= 3 &&
        (contrast > 14 || brightness > 44)
      ) {
        detailCandidates.push(point);
      }
      else ambientCandidates.push(point);
    }
  }

  const sortCandidates = (candidates) => {
    candidates.sort((a, b) => {
      const bandA = Math.floor(a.y * 48);
      const bandB = Math.floor(b.y * 48);
      if (bandA !== bandB) return bandA - bandB;
      return bandA % 2 === 0 ? a.x - b.x : b.x - a.x;
    });
    return candidates;
  };

  const allCandidates = sortCandidates([
    ...accentCandidates,
    ...warmCandidates,
    ...detailCandidates,
    ...ambientCandidates,
  ]);
  const coreCandidates = sortCandidates([
    ...accentCandidates,
    ...warmCandidates,
    ...detailCandidates,
  ]);
  sortCandidates(accentCandidates);
  sortCandidates(warmCandidates);
  sortCandidates(detailCandidates);
  sortCandidates(ambientCandidates);

  const points = new Float32Array(PARTICLE_COUNT * POINT_STRIDE);
  const fallbackPoint = {
    x: 0.5,
    y: 0.5,
    brightness: 0,
    red: 0.9,
    green: 0.9,
    blue: 0.9,
  };
  const writeGroup = (group, fallback, start, count) => {
    const source = group.length > 12 ? group : fallback;
    const available = Math.max(1, source.length);

    for (let index = 0; index < count; index += 1) {
      const particle = start + index;
      const sourceIndex = Math.min(
        available - 1,
        Math.floor(((index + 0.5) / count) * available)
      );
      const point = source[sourceIndex] ?? fallbackPoint;
      const repeated = count > available;
      const jitterX = repeated
        ? (hash(particle * 1.91) - 0.5) / SAMPLE_WIDTH
        : 0;
      const jitterY = repeated
        ? (hash(particle * 2.73 + 5) - 0.5) / SAMPLE_HEIGHT
        : 0;
      const offset = particle * POINT_STRIDE;
      points[offset] = point.x + jitterX;
      points[offset + 1] = point.y + jitterY;
      points[offset + 2] = point.brightness;
      points[offset + 3] = point.red;
      points[offset + 4] = point.green;
      points[offset + 5] = point.blue;
    }
  };

  const detailFallback =
    detailCandidates.length > 12 ? detailCandidates : allCandidates;

  writeGroup(
    coreCandidates,
    allCandidates,
    0,
    BASE_PARTICLE_COUNT
  );
  writeGroup(
    accentCandidates,
    detailFallback,
    ACCENT_PARTICLE_START,
    ACCENT_PARTICLE_COUNT
  );
  writeGroup(
    warmCandidates,
    detailFallback,
    ACCENT_PARTICLE_START + ACCENT_PARTICLE_COUNT,
    WARM_PARTICLE_COUNT
  );
  writeGroup(
    detailCandidates,
    allCandidates,
    ACCENT_PARTICLE_START +
      ACCENT_PARTICLE_COUNT +
      WARM_PARTICLE_COUNT,
    DETAIL_PARTICLE_COUNT
  );

  return points;
}

function createScatter() {
  const points = new Float32Array(PARTICLE_COUNT * POINT_STRIDE);
  for (let particle = 0; particle < PARTICLE_COUNT; particle += 1) {
    const offset = particle * POINT_STRIDE;
    const edge = particle % 10;
    const horizontal = hash(particle * 1.17);
    const vertical = hash(particle * 2.31 + 4);

    if (edge < 6) {
      points[offset] = -0.08 + horizontal * 1.16;
      points[offset + 1] = 1.08 + vertical * 0.26;
    } else if (edge < 8) {
      points[offset] = -0.08 - horizontal * 0.24;
      points[offset + 1] = -0.08 + vertical * 1.16;
    } else if (edge < 9) {
      points[offset] = 1.08 + horizontal * 0.24;
      points[offset + 1] = -0.08 + vertical * 1.16;
    } else {
      points[offset] = -0.08 + horizontal * 1.16;
      points[offset + 1] = -0.08 - vertical * 0.2;
    }

    points[offset + 2] = 0.25 + hash(particle * 3.07 + 8) * 0.4;
    points[offset + 3] = particle % 149 === 0 ? 0.82 : 0.92;
    points[offset + 4] = particle % 149 === 0 ? 0.18 : 0.9;
    points[offset + 5] = particle % 149 === 0 ? 0.12 : 0.86;
  }
  return points;
}

function createTextShape() {
  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 260;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return createScatter();

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font =
    "italic 900 190px 'Snell Roundhand', 'Brush Script MT', cursive";
  context.fillText("The End", canvas.width * 0.5, canvas.height * 0.5);

  const pixels = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data;
  const candidates = [];

  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      const alpha = pixels[(y * canvas.width + x) * 4 + 3];
      if (alpha < 30) continue;
      candidates.push({
        x: (x + 0.5) / canvas.width,
        y: (y + 0.5) / canvas.height,
        brightness: alpha / 255,
      });
    }
  }

  const points = new Float32Array(PARTICLE_COUNT * POINT_STRIDE);
  const available = Math.max(1, candidates.length);
  for (let particle = 0; particle < PARTICLE_COUNT; particle += 1) {
    const point =
      candidates[
        Math.min(
          available - 1,
          Math.floor(((particle + 0.5) / PARTICLE_COUNT) * available)
        )
      ] ?? { x: 0.5, y: 0.5, brightness: 0.5 };
    const repeated = PARTICLE_COUNT > available;
    const offset = particle * POINT_STRIDE;
    points[offset] =
      point.x + (repeated ? (hash(particle * 1.31) - 0.5) / 480 : 0);
    points[offset + 1] =
      point.y + (repeated ? (hash(particle * 2.17) - 0.5) / 130 : 0);
    points[offset + 2] = 0.55 + point.brightness * 0.45;
    const accent = particle % 83 === 0;
    points[offset + 3] = accent ? 1 : 0.96;
    points[offset + 4] = accent ? 0.18 : 0.93;
    points[offset + 5] = accent ? 0.09 : 0.88;
  }
  return points;
}

function fitShapeToRect(rect, sourceRatio) {
  const rectRatio = rect.width / rect.height;
  const drawWidth =
    rectRatio > sourceRatio ? rect.height * sourceRatio : rect.width;
  const drawHeight =
    rectRatio > sourceRatio ? rect.height : rect.width / sourceRatio;
  return {
    x: rect.x + (rect.width - drawWidth) * 0.5,
    y: rect.y + (rect.height - drawHeight) * 0.5,
    width: drawWidth,
    height: drawHeight,
  };
}

export function HeroParticleMorph({
  scene = 0,
  restartToken = 0,
  aboutPhotoVisible = false,
}) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(scene);
  const restartRef = useRef(restartToken);
  const aboutPhotoVisibleRef = useRef(aboutPhotoVisible);

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    restartRef.current = restartToken;
  }, [restartToken]);

  useEffect(() => {
    aboutPhotoVisibleRef.current = aboutPhotoVisible;
  }, [aboutPhotoVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let cancelled = false;
    let animationFrame = 0;
    let resizeObserver;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let shapes = [];
    let aboutShape = null;
    let textShape = null;
    let lastPhase = "";
    let currentScene = sceneRef.current;
    let seenRestart = restartRef.current;
    let sceneChangedAt = 0;
    let lastPhotoVisible = aboutPhotoVisibleRef.current;
    let photoWipeStartedAt = 0;
    let visiblePhotoFraction = lastPhotoVisible ? 1 : 0;
    let currentOpacity = currentScene === 1 ? 0.18 : 1;
    let aboutTarget;
    let endTarget;
    const positions = new Float32Array(PARTICLE_COUNT * 2);
    const previous = new Float32Array(PARTICLE_COUNT * 2);
    const transitionFrom = new Float32Array(PARTICLE_COUNT * 2);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colorBuckets = new Uint8Array(PARTICLE_COUNT);
    const scatter = createScatter();
    const previewShapeParam = import.meta.env.DEV
      ? new URLSearchParams(window.location.search).get("particleShape")
      : null;
    const previewShape =
      previewShapeParam === null ? -1 : Number(previewShapeParam);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
    };

    const getSceneRect = (activeScene) => {
      if (activeScene === 0) {
        return fitShapeToRect(
          {
            x: width * 0.4,
            y: height * 0.05,
            width: width * 0.62,
            height: height * 0.88,
          },
          SAMPLE_WIDTH / SAMPLE_HEIGHT
        );
      }

      if (activeScene === 1) {
        return fitShapeToRect(
          {
            x: width * 0.02,
            y: height * 0.035,
            width: width * 0.96,
            height: height * 0.93,
          },
          SAMPLE_WIDTH / SAMPLE_HEIGHT
        );
      }

      if (activeScene === 2) {
        aboutTarget ??= document.querySelector(
          "[data-particle-about-target]"
        );
        const rect = aboutTarget?.getBoundingClientRect();
        if (rect?.width) {
          return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          };
        }
      }

      if (activeScene === 3) {
        endTarget ??= document.querySelector("[data-particle-end-target]");
        const rect = endTarget?.getBoundingClientRect();
        if (rect?.width) {
          return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          };
        }
      }

      return {
        x: width * 0.58,
        y: height * 0.22,
        width: width * 0.34,
        height: height * 0.58,
      };
    };

    const render = (now, clock) => {
      if (
        cancelled ||
        shapes.length !== SOURCES.length ||
        !aboutShape ||
        !textShape
      ) {
        return;
      }

      const requestedScene = sceneRef.current;
      const requestedRestart = restartRef.current;
      if (
        requestedScene !== currentScene ||
        requestedRestart !== seenRestart
      ) {
        transitionFrom.set(positions);
        currentScene = requestedScene;
        sceneChangedAt = now;
        if (requestedRestart !== seenRestart) {
          clock.startedAt = now;
        }
        seenRestart = requestedRestart;
      }

      const requestedPhotoVisible = aboutPhotoVisibleRef.current;
      if (requestedPhotoVisible !== lastPhotoVisible) {
        lastPhotoVisible = requestedPhotoVisible;
        photoWipeStartedAt = now;
      }
      if (photoWipeStartedAt) {
        const wipeProgress = smoothstep(
          (now - photoWipeStartedAt) / 1050
        );
        visiblePhotoFraction = lastPhotoVisible
          ? wipeProgress
          : 1 - wipeProgress;
      }

      const elapsed = now - clock.startedAt;
      let pathState;
      let phase;
      let warmPortrait = false;

      if (
        Number.isInteger(previewShape) &&
        previewShape >= 0 &&
        previewShape < shapes.length
      ) {
        pathState = getPathState(
          [shapes[previewShape], shapes[previewShape]],
          0
        );
        phase = `preview-${previewShape}`;
        warmPortrait = previewShape >= 3 && previewShape <= 5;
      } else if (elapsed < INTRO_DURATION) {
        pathState = getPathState(
          [scatter, shapes[0]],
          elapsed / INTRO_DURATION,
          easeOutCubic
        );
        phase = "intro";
      } else {
        const loopElapsed =
          (elapsed - INTRO_DURATION) % LOOP_DURATION;
        pathState = getLoopPathState(shapes, loopElapsed);
        const nextSegment = (pathState.segment + 1) % shapes.length;
        phase = pathState.holding
          ? `hold-${pathState.segment}`
          : `loop-${pathState.segment}-${nextSegment}`;
        warmPortrait =
          pathState.segment >= 3 && pathState.segment <= 5;
      }

      const {
        fromShape,
        toShape,
        previousShape,
        nextShape,
        progress,
      } = pathState;

      if (phase !== lastPhase) {
        canvas.dataset.phase = phase;
        lastPhase = phase;
      }
      if (import.meta.env.DEV) {
        canvas.dataset.elapsed = String(Math.round(elapsed));
        canvas.dataset.progress = progress.toFixed(3);
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const targetShape =
        currentScene === 2
          ? aboutShape
          : currentScene === 3
            ? textShape
            : null;
      const rect = getSceneRect(currentScene);
      const sceneProgress = sceneChangedAt
        ? smoothstep((now - sceneChangedAt) / 1650)
        : 1;
      const arcStrength = Math.sin(Math.PI * progress);
      for (let particle = 0; particle < PARTICLE_COUNT; particle += 1) {
        const shapeOffset = particle * POINT_STRIDE;
        const positionOffset = particle * 2;
        const seed = hash(particle * 0.73 + 1);
        let nx;
        let ny;
        let brightness;
        let red;
        let green;
        let blue;

        if (targetShape) {
          nx = targetShape[shapeOffset];
          ny = targetShape[shapeOffset + 1];
          const stillness = currentScene === 2 ? 0.00055 : 0.00022;
          nx +=
            Math.cos(now * 0.0007 + particle * 0.013) * stillness;
          ny +=
            Math.sin(now * 0.00065 + particle * 0.017) * stillness;
          brightness = targetShape[shapeOffset + 2];
          red = targetShape[shapeOffset + 3];
          green = targetShape[shapeOffset + 4];
          blue = targetShape[shapeOffset + 5];
          warmPortrait = currentScene === 2;
        } else {
          const fromX = fromShape[shapeOffset];
          const fromY = fromShape[shapeOffset + 1];
          const toX = toShape[shapeOffset];
          const toY = toShape[shapeOffset + 1];
          const angle =
            seed * Math.PI * 8 + now * (0.00016 + seed * 0.00008);
          const drift = arcStrength * (0.004 + seed * 0.014);
          const breathing =
            Math.sin(now * 0.0011 + particle * 0.017) * 0.00065;
          nx =
            catmullRom(
              previousShape[shapeOffset],
              fromX,
              toX,
              nextShape[shapeOffset],
              progress
            ) +
            Math.cos(angle) * drift +
            breathing;
          ny =
            catmullRom(
              previousShape[shapeOffset + 1],
              fromY,
              toY,
              nextShape[shapeOffset + 1],
              progress
            ) +
            Math.sin(angle) * drift +
            breathing;
          brightness =
            fromShape[shapeOffset + 2] +
            (toShape[shapeOffset + 2] - fromShape[shapeOffset + 2]) *
              progress;
          red =
            fromShape[shapeOffset + 3] +
            (toShape[shapeOffset + 3] - fromShape[shapeOffset + 3]) *
              progress;
          green =
            fromShape[shapeOffset + 4] +
            (toShape[shapeOffset + 4] - fromShape[shapeOffset + 4]) *
              progress;
          blue =
            fromShape[shapeOffset + 5] +
            (toShape[shapeOffset + 5] - fromShape[shapeOffset + 5]) *
              progress;
        }

        const targetX = rect.x + nx * rect.width;
        const targetY = rect.y + ny * rect.height;
        positions[positionOffset] =
          transitionFrom[positionOffset] +
          (targetX - transitionFrom[positionOffset]) * sceneProgress;
        positions[positionOffset + 1] =
          transitionFrom[positionOffset + 1] +
          (targetY - transitionFrom[positionOffset + 1]) * sceneProgress;
        sizes[particle] =
          currentScene === 3
            ? 0.5 + brightness * 1.05
            : 0.72 + brightness * 1.48;
        let colorBucket = getColorBucket(
          red,
          green,
          blue,
          brightness,
          particle
        );
        if (
          warmPortrait &&
          particle >= ACCENT_PARTICLE_START &&
          particle < ACCENT_PARTICLE_START + ACCENT_PARTICLE_COUNT
        ) {
          colorBucket = 5;
          sizes[particle] *= 1.45;
        }
        if (
          warmPortrait &&
          colorBucket === 0 &&
          particle % 5 !== 0
        ) {
          const warmth = hash(particle * 0.41 + 2);
          colorBucket =
            brightness > 0.54 ? 1 : warmth > 0.54 ? 2 : 3;
        }
        colorBuckets[particle] = colorBucket;
      }

      const targetOpacity =
        currentScene === 1
          ? 0.18
          : currentScene === 2
            ? 0.94
            : currentScene === 3
              ? 0.94
              : 1;
      currentOpacity += (targetOpacity - currentOpacity) * 0.075;
      context.globalAlpha = currentOpacity;

      const clipAboutParticles = currentScene === 2;
      if (clipAboutParticles) {
        const remaining = clamp01(1 - visiblePhotoFraction);
        context.save();
        context.beginPath();
        context.rect(
          rect.x,
          rect.y + rect.height * visiblePhotoFraction,
          rect.width,
          rect.height * remaining
        );
        context.clip();
      }

      context.beginPath();
      for (let particle = 0; particle < PARTICLE_COUNT; particle += 7) {
        const offset = particle * 2;
        const oldX = previous[offset];
        const oldY = previous[offset + 1];
        if (oldX || oldY) {
          context.moveTo(oldX, oldY);
          context.lineTo(positions[offset], positions[offset + 1]);
        }
      }
      context.strokeStyle = currentScene === 3
        ? "rgba(214,48,34,0.16)"
        : warmPortrait
        ? "rgba(218,164,120,0.13)"
        : "rgba(245,244,239,0.09)";
      context.lineWidth = 0.55;
      context.stroke();

      for (let bucket = 0; bucket < COLOR_PALETTE.length; bucket += 1) {
        context.beginPath();
        for (let particle = 0; particle < PARTICLE_COUNT; particle += 1) {
          if (colorBuckets[particle] !== bucket) continue;
          if (currentScene === 3 && particle % 3 !== 0) continue;
          const positionOffset = particle * 2;
          const size = sizes[particle];
          context.rect(
            positions[positionOffset] - size * 0.5,
            positions[positionOffset + 1] - size * 0.5,
            size,
            size
          );
        }
        context.fillStyle = COLOR_PALETTE[bucket];
        context.fill();
      }

      if (clipAboutParticles) context.restore();
      previous.set(positions);
      animationFrame = requestAnimationFrame((time) => render(time, clock));
    };

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    Promise.all([...SOURCES, "/images/about-event.jpg"].map(loadImage))
      .then((images) => {
        if (cancelled) return;
        shapes = images
          .slice(0, SOURCES.length)
          .map((image, index) => sampleShape(image, index));
        aboutShape = sampleShape(
          images[SOURCES.length],
          SOURCES.length,
          true
        );
        textShape = createTextShape();
        canvas.dataset.particles = String(PARTICLE_COUNT);
        canvas.dataset.ready = "true";
        const previewOffset = import.meta.env.DEV
          ? Number(
              new URLSearchParams(window.location.search).get("particleSeek")
            ) || 0
          : 0;
        const clock = {
          startedAt: performance.now() - previewOffset,
        };
        animationFrame = requestAnimationFrame((time) => render(time, clock));
      })
      .catch(() => {
        canvas.dataset.ready = "error";
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-renderer="particle-morph"
      className="fixed inset-0 hidden md:block pointer-events-none select-none"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: scene === 1 ? 0 : 20,
        transition: "z-index 0s linear",
      }}
    />
  );
}
