"use client";

interface Props {
  className?: string;
}

export default function AnimatedBlobs({ className = "" }: Props) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Blob 1 — Red-orange, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          top: "-15%",
          left: "-10%",
          background: "#DB4A2B",
          filter: "blur(140px)",
          mixBlendMode: "multiply",
          opacity: 0.65,
          animation: "blob 12s ease-in-out infinite",
        }}
      />
      {/* Blob 2 — Warm orange, center-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "20%",
          right: "-5%",
          background: "#F8A348",
          filter: "blur(140px)",
          mixBlendMode: "multiply",
          opacity: 0.55,
          animation: "blob 15s ease-in-out infinite reverse",
        }}
      />
      {/* Blob 3 — Pink accent, bottom-center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: 600,
          maxHeight: 600,
          bottom: "0%",
          left: "30%",
          background: "#FF89A9",
          filter: "blur(140px)",
          mixBlendMode: "multiply",
          opacity: 0.4,
          animation: "blob 13s ease-in-out infinite 4s",
        }}
      />
    </div>
  );
}
