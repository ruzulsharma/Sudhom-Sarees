"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowLeft, Search } from "lucide-react";

/* ── Spinning mandala (same 2-layer design from preloader) ── */
function MandalaSVG({ size = 160, speed = 12 }) {
  const outerPetals = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    const rad   = (angle * Math.PI) / 180;
    const cx    = size / 2;
    const inner = size * 0.275, outer = size * 0.45, side = size * 0.044;
    const perp  = (angle + 90) * Math.PI / 180;
    const bx = cx + inner * Math.cos(rad), by = cx + inner * Math.sin(rad);
    const tx = cx + outer * Math.cos(rad), ty = cx + outer * Math.sin(rad);
    const mx = cx + ((inner + outer) / 2) * Math.cos(rad);
    const my = cx + ((inner + outer) / 2) * Math.sin(rad);
    const lx = mx + side * Math.cos(perp), ly = my + side * Math.sin(perp);
    const rx = mx - side * Math.cos(perp), ry = my - side * Math.sin(perp);
    return { i, bx, by, tx, ty, lx, ly, rx, ry, angle };
  });

  const midPetals = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 360) / 12;
    const rad   = (angle * Math.PI) / 180;
    const r     = size * 0.1875;
    return { i, cx: size/2 + r * Math.cos(rad), cy: size/2 + r * Math.sin(rad), angle };
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,151,58,0.18) 0%, transparent 70%)" }} />

      {/* Outer petals – CW */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
        className="absolute inset-0"
        style={{ animation: `spin ${speed}s linear infinite` }}>
        {outerPetals.map(({ i, bx, by, tx, ty, lx, ly, rx, ry }) => (
          <path key={i}
            d={`M ${bx} ${by} L ${lx} ${ly} L ${tx} ${ty} L ${rx} ${ry} Z`}
            fill={i % 2 === 0 ? "#C9973A" : "#E8B84B"}
            opacity={i % 2 === 0 ? 0.88 : 0.52}
          />
        ))}
        <circle cx={size/2} cy={size/2} r={size*0.44}
          stroke="#C9973A" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.15" fill="none" />
      </svg>

      {/* Mid lotus petals – CCW */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
        className="absolute inset-0"
        style={{ animation: `spin ${speed * 1.5}s linear infinite reverse` }}>
        {midPetals.map(({ i, cx, cy, angle }) => (
          <ellipse key={i} cx={cx} cy={cy}
            rx={size * 0.063} ry={size * 0.028}
            fill="#E8B84B" opacity="0.72"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        ))}
        <circle cx={size/2} cy={size/2} r={size*0.24}
          stroke="#E8B84B" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.14" fill="none" />
      </svg>

      {/* Static centre jewel */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
        className="absolute inset-0">
        <defs>
          <radialGradient id="cg404" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={size*0.11} fill="url(#cg404)" />
        <circle cx={size/2} cy={size/2} r={size*0.057} fill="#C9973A" />
        <circle cx={size/2} cy={size/2} r={size*0.032} fill="#E8B84B" />
      </svg>
    </div>
  );
}

/* ── Quick-nav links ─────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Collections",  href: "/collections" },
  { label: "New Arrivals", href: "/collections/new" },
  { label: "Bridal Edit",  href: "/collections/bridal" },
  { label: "Cart",         href: "/cart" },
];

export default function NotFound() {
  const wrapRef    = useRef(null);
  const mandalRef  = useRef(null);
  const textRef    = useRef(null);
  const linksRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(mandalRef.current,
          { scale: 0.5, opacity: 0, rotation: -90 },
          { scale: 1,   opacity: 1, rotation: 0, duration: 1.1, ease: "back.out(1.5)" })
        .fromTo(textRef.current,
          { y: 40, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".link-item",
          { y: 20, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.3");
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "#12050A" }}
    >
      {/* ── Large ghosted 404 bg text ──────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold"
          style={{
            fontSize: "clamp(18rem, 40vw, 40rem)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,151,58,0.07)",
          }}
        >
          404
        </span>
      </div>

      {/* ── Radial gold glow ───────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,151,58,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ── Mandala ────────────────────────────────────── */}
      <div ref={mandalRef} className="relative z-10 mb-8">
        <MandalaSVG size={160} speed={14} />
      </div>

      {/* ── Text block ─────────────────────────────────── */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center gap-4 text-center max-w-lg">

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "#C9973A", opacity: 0.5 }} />
          <span className="text-[10px] tracking-[0.45em] uppercase font-sans font-semibold"
            style={{ color: "#C9973A" }}>
            Page Not Found
          </span>
          <div className="h-px w-8" style={{ background: "#C9973A", opacity: 0.5 }} />
        </div>

        {/* Headline */}
        <h1
          className="font-serif font-semibold leading-tight tracking-tight"
          style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", color: "#FFFDF7" }}
        >
          The thread<br />
          <span className="italic" style={{ WebkitTextStroke: "1px #C9973A", color: "transparent" }}>
            was lost.
          </span>
        </h1>

        {/* Body */}
        <p className="font-sans text-sm leading-relaxed max-w-sm"
          style={{ color: "rgba(255,253,247,0.48)" }}>
          The page you're looking for has moved, or never existed. Even the finest Banarasi weave
          has a knot or two — let us guide you back.
        </p>

        {/* Sanskrit */}
        <p className="font-serif italic text-xs mt-1"
          style={{ color: "rgba(201,151,58,0.45)" }}>
          "भटका हुआ राही, वापस आ।" — The wanderer returns.
        </p>

        {/* ── CTAs ───────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/"
            className="flex items-center gap-2.5 rounded-full px-6 py-3 font-sans text-sm font-semibold text-ivory transition-all hover:scale-[1.03]"
            style={{ background: "#9B1C1C" }}>
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <Link href="/collections"
            className="flex items-center gap-2.5 rounded-full border px-6 py-3 font-sans text-sm font-semibold transition-all hover:border-gold hover:text-gold"
            style={{ borderColor: "rgba(201,151,58,0.3)", color: "rgba(255,253,247,0.65)" }}>
            <Search size={14} />
            Browse Collections
          </Link>
        </div>
      </div>

      {/* ── Quick links ────────────────────────────────── */}
      <div ref={linksRef}
        className="relative z-10 mt-16 flex flex-wrap justify-center gap-3">
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href}
            className="link-item rounded-full border px-4 py-2 font-sans text-xs font-medium transition-all hover:border-gold hover:text-gold"
            style={{
              borderColor: "rgba(255,253,247,0.08)",
              color: "rgba(255,253,247,0.38)",
            }}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* ── Bottom brand mark ──────────────────────────── */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1">
        <div className="h-px w-24"
          style={{ background: "linear-gradient(90deg,transparent,rgba(201,151,58,0.25),transparent)" }} />
        <p className="font-serif italic text-[11px]"
          style={{ color: "rgba(201,151,58,0.22)" }}>
          हर हर महादेव
        </p>
      </div>
    </div>
  );
}
