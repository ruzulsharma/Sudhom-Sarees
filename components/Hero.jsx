"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import Navbar from "./Navbar";
import PromoBanner from "./PromoBanner";

gsap.registerPlugin(ScrollTrigger);

/* Text overlay data — cycles while video plays */
const CAPTIONS = [
  {
    line1: "More Than",
    line2: "a Saree.",
    sub:   "Tradition meets tomorrow. Handloomed in Banaras.",
  },
  {
    line1: "Woven in",
    line2: "Kashi.",
    sub:   "Six weavers, one thread, months of patient hands.",
  },
  {
    line1: "Zari catches",
    line2: "every light.",
    sub:   "Real gold zari. Real mulberry silk. Real Banaras.",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const overlayRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);

  const [muted,   setMuted]   = useState(true);
  const [caption, setCaption] = useState(0);

  /* Cycle captions every 5 s */
  useEffect(() => {
    const t = setInterval(
      () => setCaption((c) => (c + 1) % CAPTIONS.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(videoRef.current,
          { scale: 1.08 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .fromTo(overlayRef.current,
          { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0)
        .fromTo(line1Ref.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }, 0.6)
        .fromTo(line2Ref.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }, 0.75)
        .fromTo(subRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.1)
        .fromTo(ctaRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.25);

      /* Parallax — video moves slower than scroll */
      gsap.to(videoRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Re-animate text when caption changes */
  useLayoutEffect(() => {
    if (!line1Ref.current) return;
    gsap.fromTo(
      [line1Ref.current, line2Ref.current, subRef.current],
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out" }
    );
  }, [caption]);

  const slide = CAPTIONS[caption];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Full-bleed video background ───────────────────── */}
      <div ref={videoRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          loop
          playsInline
          muted={muted}
          className="h-full w-full object-cover object-center"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* ── Gradient overlays ────────────────────────────── */}
      <div ref={overlayRef} className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, rgba(12,5,10,0.86) 0%, rgba(12,5,10,0.55) 50%, rgba(12,5,10,0.1) 100%)" }}
      />
      {/* Bottom fade for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(12,5,10,0.92) 0%, transparent 100%)" }}
      />

      {/* ── Mute / unmute button ─────────────────────────── */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-20 right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold hover:text-gold md:right-10"
        style={{
          borderColor: "rgba(255,253,247,0.2)",
          background: "rgba(12,5,10,0.45)",
          color: "rgba(255,253,247,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* ── Caption progress pills ───────────────────────── */}
      <div className="absolute bottom-20 left-6 z-20 flex gap-1.5 md:left-14 lg:left-20">
        {CAPTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCaption(i)}
            aria-label={`Caption ${i + 1}`}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: caption === i ? "28px" : "8px",
              background: caption === i
                ? "linear-gradient(90deg,#C9973A,#E8B84B)"
                : "rgba(255,253,247,0.25)",
            }}
          />
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col">
        <Navbar transparent />

        <div className="flex flex-1 flex-col justify-end px-6 pb-28 md:px-14 md:pb-32 lg:px-20">

          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(201,151,58,0.6)" }} />
            <span className="badge badge-gold">Tradition Meets Tomorrow</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-semibold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#FFFDF7" }}
          >
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block">{slide.line1}</span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line2Ref}
                className="block italic"
                style={{ WebkitTextStroke: "1px #C9973A", color: "transparent" }}
              >
                {slide.line2}
              </span>
            </span>
          </h1>

          {/* Subline */}
          <p ref={subRef}
            className="mt-6 max-w-sm font-sans text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(255,253,247,0.65)" }}>
            {slide.sub}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/collections"
              className="group flex items-center gap-3 rounded-full px-7 py-3.5 font-sans text-sm font-semibold tracking-wide transition-all"
              style={{ background: "#9B1C1C", border: "1px solid rgba(201,151,58,0.3)", color: "#FFFDF7" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#B91C1C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#9B1C1C")}
            >
              Explore Collection
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
                <ArrowRight size={13} />
              </span>
            </a>

            <button
              onClick={() => setMuted(false)}
              className="flex items-center gap-3 font-sans text-sm font-medium transition-colors"
              style={{ color: "rgba(255,253,247,0.65)" }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border"
                style={{ borderColor: "rgba(201,151,58,0.35)", background: "rgba(201,151,58,0.08)" }}
              >
                <Play size={12} fill="currentColor" className="ml-0.5" style={{ color: "#C9973A" }} />
              </span>
              Watch with Sound
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-10 flex items-center gap-3">
            <span className="h-5 w-px animate-bounce block"
              style={{ background: "linear-gradient(180deg,#C9973A,transparent)" }} />
            <span className="text-[10px] tracking-[0.4em] font-sans uppercase"
              style={{ color: "rgba(255,253,247,0.3)" }}>
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Bottom ticker */}
        <PromoBanner variant="dark" />
      </div>
    </section>
  );
}
