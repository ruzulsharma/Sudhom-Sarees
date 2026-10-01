"use client";

import { useEffect, useState } from "react";

/*
  SUDHOM Preloader
  ────────────────
  • Two-layer sunflower / Banarasi buti mandala
    – Outer 16 pointed petals  (clockwise spin)
    – Mid  12 lotus petals     (counter-clockwise, slower)
    – Clean jewelled centre disc (static)
  • Progress bar 0 → 100 over 2 s
  • Whole screen fades out on completion
*/

/* ── Sunflower mandala ────────────────────────────────────── */
function SunflowerMandala() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>

      {/* Layer 1 — outer 16 pointed petals, spins CW */}
      <svg
        width="160" height="160"
        viewBox="0 0 160 160"
        fill="none"
        className="absolute inset-0"
        style={{ animation: "spin 12s linear infinite" }}
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad   = (angle * Math.PI) / 180;
          // Diamond petal: base near center, tip far out
          const inner = 44, outer = 72, side = 7;
          const perp  = (angle + 90) * Math.PI / 180;
          const bx    = 80 + inner * Math.cos(rad);
          const by    = 80 + inner * Math.sin(rad);
          const tx    = 80 + outer * Math.cos(rad);
          const ty    = 80 + outer * Math.sin(rad);
          const mx    = 80 + ((inner + outer) / 2) * Math.cos(rad);
          const my    = 80 + ((inner + outer) / 2) * Math.sin(rad);
          const lx    = mx + side * Math.cos(perp);
          const ly    = my + side * Math.sin(perp);
          const rx    = mx - side * Math.cos(perp);
          const ry    = my - side * Math.sin(perp);
          return (
            <path
              key={i}
              d={`M ${bx} ${by} L ${lx} ${ly} L ${tx} ${ty} L ${rx} ${ry} Z`}
              fill={i % 2 === 0 ? "#C9973A" : "#E8B84B"}
              opacity={i % 2 === 0 ? "0.85" : "0.5"}
            />
          );
        })}
        {/* Outer dashed ring */}
        <circle cx="80" cy="80" r="70" stroke="#C9973A" strokeWidth="0.6"
          strokeDasharray="4 6" opacity="0.2" fill="none" />
      </svg>

      {/* Layer 2 — 12 rounded lotus petals, spins CCW slower */}
      <svg
        width="160" height="160"
        viewBox="0 0 160 160"
        fill="none"
        className="absolute inset-0"
        style={{ animation: "spin 18s linear infinite reverse" }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          const rad   = (angle * Math.PI) / 180;
          const cx    = 80 + 30 * Math.cos(rad);
          const cy    = 80 + 30 * Math.sin(rad);
          return (
            <ellipse
              key={i}
              cx={cx} cy={cy}
              rx="10" ry="4.5"
              fill="#E8B84B"
              opacity="0.7"
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
        {/* Mid ring */}
        <circle cx="80" cy="80" r="38" stroke="#E8B84B" strokeWidth="0.5"
          strokeDasharray="3 5" opacity="0.18" fill="none" />
      </svg>

      {/* Layer 3 — static centre jewel (does NOT spin) */}
      <svg
        width="160" height="160"
        viewBox="0 0 160 160"
        fill="none"
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="centreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8B84B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Soft glow halo */}
        <circle cx="80" cy="80" r="18" fill="url(#centreGlow)" />
        {/* Single clean gold disc */}
        <circle cx="80" cy="80" r="9" fill="#C9973A" />
        <circle cx="80" cy="80" r="5" fill="#E8B84B" />
      </svg>
    </div>
  );
}

/* ── Main preloader ───────────────────────────────────────── */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hiding,   setHiding]   = useState(false);
  const [hidden,   setHidden]   = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start    = performance.now();
    const duration = 2200;
    let raf;
    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHiding(true), 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!hiding) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(t);
  }, [hiding]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6"
      style={{
        background: "#12050A",
        opacity:    hiding ? 0 : 1,
        transform:  hiding ? "scale(1.03)" : "scale(1)",
        transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1), transform 800ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Ambient glow behind mandala */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "320px", height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)",
        }}
      />

      {/* The sunflower mandala */}
      <SunflowerMandala />

      {/* Brand text — fades in with a slight delay */}
      <div
        className="flex flex-col items-center gap-1 text-center"
        style={{ animation: "fadeUp 0.9s 0.3s ease both" }}
      >
        <h1
          className="font-serif font-semibold tracking-[0.35em] uppercase"
          style={{ fontSize: "clamp(1.6rem,5vw,2.6rem)", color: "#FFFDF7" }}
        >
          Sudhom
        </h1>
        <p
          className="text-[10px] tracking-[0.55em] uppercase font-sans"
          style={{ color: "#C9973A" }}
        >
          Banaras · Est. 1947
        </p>
      </div>

      {/* Gold zari progress bar */}
      <div style={{ animation: "fadeUp 0.8s 0.5s ease both" }}>
        <div
          className="overflow-hidden rounded-full"
          style={{ width: "180px", height: "2px", background: "rgba(201,151,58,0.12)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #9A6F2A, #E8B84B, #C9973A)",
              transition: "width 80ms linear",
            }}
          />
        </div>
        <p
          className="mt-2 text-center text-[10px] font-sans tabular-nums"
          style={{ color: "rgba(255,253,247,0.25)" }}
        >
          {progress}%
        </p>
      </div>
    </div>
  );
}
