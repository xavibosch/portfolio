import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AsciiPhoto({
  src,
  alt,
  fitHeight = false,
  photoVisible = false,
}) {
  const [ratio, setRatio] = useState(1.25);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setRatio(image.height / image.width);
    image.src = src;
  }, [src]);

  return (
    <div
      data-particle-about-target
      className="relative overflow-hidden select-none"
      style={{
        aspectRatio: `${1 / ratio}`,
        width: fitHeight ? "auto" : "100%",
        height: fitHeight ? "100%" : "auto",
        maxWidth: "100%",
        background: "#0C0B09",
        border: "1px solid rgba(245,244,239,0.14)",
      }}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "50% 50%",
          clipPath: photoVisible
            ? "inset(0 0 0 0)"
            : "inset(0 0 100% 0)",
          transition: "clip-path 1.05s cubic-bezier(0.76,0,0.24,1)",
        }}
      />

      <div
        className="absolute bottom-3 left-3 z-10 flex items-center gap-2"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(245,244,239,0.7)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "#D63022",
            animation: "xb-blink 3s infinite",
          }}
        />
        {photoVisible ? "PHOTO" : "PARTICLE_MODE"}
      </div>
    </div>
  );
}
