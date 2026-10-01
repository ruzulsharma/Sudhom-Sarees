"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  "/others/669c6ab97e3cd98666f855a198ec26d1.jpg",
  "/others/14411b388e42a556faf51faa50522971.jpg",
  "/others/8028e4627b84d16f84581f0bc379e0ad.jpg",
  "/others/517ffdbc33620528524824c768da0933.jpg",
  "/others/f3ad03722e2a8cdb3bfbd672040769f5.jpg",
  "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
  "/others/b2f7544149fa722f719bf29e515c1de4.jpg",
  "/others/9e63a89253fd2a7372e9e4732a586374.jpg",
];
const loopedGallery = [...gallery, ...gallery];

/* Scalloped top/bottom dividers — inspired by temple arch motifs */
function TempleArch({ flip }) {
  return (
    <svg
      viewBox="0 0 100 18"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 z-20 h-12 w-full sm:h-14 md:h-20 ${
        flip ? "bottom-0 rotate-180" : "top-0"
      }`}
      style={{ filter: "drop-shadow(0 4px 4px rgba(139,26,26,0.06))" }}
    >
      {/* Temple arch scallop */}
      <path d="M0,0 L100,0 L100,10 Q87.5,2 75,10 Q62.5,18 50,10 Q37.5,2 25,10 Q12.5,18 0,10 Z"
        fill="#F7F0E3" />
    </svg>
  );
}

/* The 5 pillars of Banarasi craft */
const pillars = [
  { num: "01", title: "Pure Mulberry Silk", body: "Sourced from Karnataka and Madhya Pradesh, reeled into fine threads in Banaras." },
  { num: "02", title: "Real Zari Threads",  body: "Gold and silver drawn over silk cores — tested for purity with nitric acid." },
  { num: "03", title: "Pit Loom Weaving",   body: "Master weavers sit in earth-pit looms; one saree takes 15–45 days to complete." },
  { num: "04", title: "GI Certified",        body: "Every SUDHOM saree carries the Geographical Indication tag from the GoI." },
  { num: "05", title: "Heirloom Grade",      body: "Built to be worn, treasured, and passed down through generations." },
];

export default function IdentityShowcase() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".identity-reveal",
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      /* Pillar cards stagger */
      gsap.fromTo(".pillar-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".pillars-section", start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F7F0E3 0%, #FAF3E7 100%)" }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="identity-reveal mx-auto max-w-3xl px-6 pt-16 pb-12 text-center md:pt-24">
        {/* Ornamental top bar */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/70 text-sm font-sans">✦</span>
          <span className="text-[10px] tracking-[0.4em] text-gold-deep uppercase font-sans font-semibold">
            Kashi · Banaras · Varanasi
          </span>
          <span className="text-gold/70 text-sm font-sans">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
          The City Where Craft<br />
          <span className="italic text-crimson">Becomes Sacred</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/55 md:text-base font-sans">
          Banaras — the oldest living city on earth — has woven silk for over 2,000 years.
          Lord Shiva's favourite city. The Ganga's holiest bank. SUDHOM carries
          this living tradition into every thread.
        </p>

        {/* Sanskrit shloka */}
        <div className="mt-6 inline-block rounded-2xl border border-gold/20 bg-ivory/60 px-6 py-3 shadow-gold-sm">
          <p className="font-serif italic text-base text-gold-deep">
            "वाराणस्यां कृतं पुण्यम्"
          </p>
          <p className="mt-1 text-xs text-ink/40 font-sans tracking-wide">
            Merit earned in Varanasi is everlasting.
          </p>
        </div>
      </div>

      {/* ── Marquee gallery ─────────────────────────────────── */}
      <div className="identity-reveal relative h-[260px] w-screen overflow-hidden sm:h-[320px] md:h-[440px]"
        style={{ background: "linear-gradient(160deg, #2C0F0F 0%, #1A0A00 100%)" }}>
        <TempleArch />

        <div className="flex h-full w-max gap-2 animate-marquee md:gap-3">
          {loopedGallery.map((src, i) => (
            <div key={`${src}-${i}`}
              className="relative h-full w-[120px] shrink-0 sm:w-[160px] md:w-[200px] overflow-hidden">
              <img src={src} alt="" draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              {/* Warm tint overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent 50%, rgba(139,26,26,0.35) 100%)" }} />
            </div>
          ))}
        </div>

        {/* Gold shimmer overlays on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: "linear-gradient(90deg, rgba(44,15,15,0.9) 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(-90deg, rgba(44,15,15,0.9) 0%, transparent 100%)" }} />

        <TempleArch flip />
      </div>

      {/* ── 5 Pillars of craft ──────────────────────────────── */}
      <div className="pillars-section mx-auto max-w-6xl px-6 py-16 md:px-14 md:py-20">
        <div className="identity-reveal mb-10 text-center">
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-semibold mb-2">
            Why SUDHOM
          </p>
          <h3 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            The Five Pillars of Banarasi Excellence
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {pillars.map((p) => (
            <div key={p.num}
              className="pillar-card flex flex-col gap-3 rounded-2xl border border-gold/15 bg-ivory p-5 shadow-warm transition-all hover:border-gold/35 hover:shadow-gold-sm">
              <span className="font-serif text-3xl font-light text-gold/40">{p.num}</span>
              <div className="h-px bg-gold/15" />
              <p className="font-serif text-sm font-semibold text-ink">{p.title}</p>
              <p className="text-xs text-ink/50 font-sans leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA strip ────────────────────────────────── */}
      <div className="identity-reveal mx-auto mt-4 flex max-w-5xl flex-col items-center justify-between gap-8 px-6 pb-16 sm:flex-row md:pb-20">
        {/* Avatar stack */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {["#8B1A1A", "#C9973A", "#1A4A35"].map((hex, i) => (
              <span key={hex} className="h-9 w-9 rounded-full border-2 border-parchment"
                style={{ backgroundColor: hex, zIndex: 3 - i }} />
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink font-serif">12,000+ Patrons</p>
            <p className="text-xs text-ink/45 font-sans">Across 40+ countries</p>
          </div>
        </div>

        <a href="#shop"
          className="text-xs font-semibold tracking-[0.25em] text-gold underline underline-offset-4 transition-colors hover:text-gold-deep font-sans uppercase">
          Explore Collections
        </a>

        {/* Scroll indicator */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-gold/40">
            <path id="scrollCirclePath"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none" />
            <text fontSize="7" letterSpacing="1.5" fill="currentColor">
              <textPath href="#scrollCirclePath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-ivory shadow-warm">
            <ArrowDown size={13} />
          </span>
        </div>
      </div>
    </section>
  );
}
