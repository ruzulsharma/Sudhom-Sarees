"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/*
  "LATEST TRENDS" — matches screenshots #16 & #17:
  - Left: "LATEST TRENDS" in huge bold type + short description + CTA
  - Right: tall editorial model photo
  - Below: "Explore the Range" quick link list
*/

const RANGE_LINKS = [
  { label: "Banarasi",  href: "/collections/banarasi" },
  { label: "Georgette", href: "/collections/georgette" },
  { label: "Katan",     href: "/collections/katan" },
  { label: "Tussar",    href: "/collections/tussar" },
  { label: "Bridal",    href: "/collections/bridal" },
];

export default function LatestTrends() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        }
      );
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: 50, scale: 1.04 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        }
      );
      // Subtle parallax on image
      gsap.to(imgRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{ background: "#FFFDF7" }}
    >
      {/* ── Wave top ─── */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 48" className="w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,24 Q360,48 720,24 Q1080,0 1440,24 L1440,0 L0,0 Z" fill="#12050A" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-16">

          {/* ── Left: giant type ───────────────────────── */}
          <div ref={textRef} className="flex flex-col justify-between gap-10">
            <div>
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-10" style={{ background: "#9B1C1C" }} />
                <span className="text-[10px] tracking-[0.4em] font-sans font-semibold uppercase"
                  style={{ color: "#9B1C1C" }}>
                  Current Drops
                </span>
              </div>

              {/* BIG headline */}
              <h2
                className="font-serif font-bold leading-[0.88] tracking-tighter uppercase"
                style={{
                  fontSize: "clamp(3.5rem,9vw,7.5rem)",
                  color: "#12050A",
                }}
              >
                Latest
                <br />
                <span
                  className="italic"
                  style={{
                    WebkitTextStroke: "2px #9B1C1C",
                    color: "transparent",
                  }}
                >
                  Trends
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-sm font-sans text-base leading-relaxed"
                style={{ color: "rgba(12,5,10,0.55)" }}>
                Stories behind the drape — the finest new weaves from Banaras, curated for modern patrons who honour tradition.
              </p>

              {/* CTA */}
              <Link
                href="/collections/new"
                className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-sans text-sm font-semibold tracking-wide text-ivory transition-all hover:scale-[1.02]"
                style={{ background: "#9B1C1C" }}
              >
                Discover Now
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  →
                </span>
              </Link>
            </div>

            {/* Explore the Range quick-links */}
            <div>
              <p className="mb-4 text-xs font-sans font-semibold tracking-[0.2em] uppercase"
                style={{ color: "rgba(12,5,10,0.35)" }}>
                Explore the Range
              </p>
              <ul className="flex flex-col gap-0">
                {RANGE_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between border-t py-3 font-serif text-lg font-medium transition-colors hover:text-crimson"
                      style={{ borderColor: "rgba(12,5,10,0.08)", color: "#12050A" }}
                    >
                      {l.label}
                      <span className="text-xs text-current opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: editorial model photo ──────────── */}
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-3xl"
            style={{ minHeight: "500px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=85"
              alt="Latest Trends — Banarasi Saree"
              className="absolute inset-0 h-full w-full object-cover object-top"
              draggable={false}
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent 60%, rgba(12,5,10,0.5) 100%)" }} />
          </div>
        </div>
      </div>

      {/* ── Wave bottom ─── */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 48" className="w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 L0,48 Z" fill="#12050A" />
        </svg>
      </div>
    </section>
  );
}
