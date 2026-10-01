"use client";

import { Star } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    text: "I wore my SUDHOM Katan saree on my wedding day. Every guest asked where it was from. The gold zari glows like liquid sunlight — nothing compares.",
    name: "Radha K.",
    role: "Patron · Chennai",
    stars: 5,
  },
  {
    text: "Collecting Banarasi sarees for 20 years. SUDHOM is the first brand that gives me the same feeling as buying directly from the weavers — authentic, soulful, flawless.",
    name: "Preeti A.",
    role: "Collector · Delhi",
    stars: 5,
  },
  {
    text: "The saree arrived wrapped in muslin with a handwritten note about the weaver. That personal touch combined with extraordinary silk quality — this is how luxury should feel.",
    name: "Ananya B.",
    role: "Patron · Kolkata",
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-card",
        { opacity: 0, y: 50, rotateX: -20, transformPerspective: 800 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(".testi-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#12050A" }}
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%,#E8B84B 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">

        {/* Header */}
        <div className="testi-header mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mb-2 text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
              style={{ color: "#C9973A" }}>
              From our Patrons
            </p>
            <h2
              className="font-serif font-semibold leading-tight tracking-tight text-ivory"
              style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)" }}
            >
              Woven Into{" "}
              <span className="italic" style={{ color: "#E8B84B" }}>
                Their Stories
              </span>
            </h2>
          </div>
          {/* Overall rating */}
          <div className="flex items-center gap-3 pb-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} style={{ fill: "#C9973A", color: "#C9973A" }} />
              ))}
            </div>
            <div>
              <p className="font-serif font-bold text-ivory text-sm">5.0 / 5.0</p>
              <p className="text-[11px] font-sans" style={{ color: "rgba(255,253,247,0.38)" }}>
                12,000+ verified patrons
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`testi-card relative flex flex-col justify-between rounded-2xl p-7 ${i === 1 ? "md:translate-y-8" : ""}`}
              style={{
                background: "rgba(255,253,247,0.04)",
                border: "1px solid rgba(201,151,58,0.12)",
                backdropFilter: "blur(8px)",
                minHeight: "340px",
              }}
            >
              {/* Big quote mark */}
              <span
                className="absolute top-4 left-5 font-serif font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: "5rem", color: "rgba(201,151,58,0.12)" }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={13} style={{ fill: "#C9973A", color: "#C9973A" }} />
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-serif italic text-[15px] leading-[1.9] flex-1"
                style={{ color: "rgba(255,253,247,0.72)" }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div
                className="mt-6 pt-5 flex items-center gap-3"
                style={{ borderTop: "1px solid rgba(201,151,58,0.1)" }}
              >
                {/* Monogram avatar */}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif font-semibold text-sm"
                  style={{ background: "rgba(155,28,28,0.25)", color: "#E8B84B", border: "1px solid rgba(201,151,58,0.2)" }}
                >
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-serif font-semibold text-ivory text-sm">{t.name}</p>
                  <p className="text-[11px] font-sans" style={{ color: "rgba(255,253,247,0.38)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sanskrit quote */}
        <div className="mt-14 text-center">
          <p className="font-serif italic text-sm" style={{ color: "rgba(201,151,58,0.4)" }}>
            "जो काशी में रहता है, वो मुक्त हो जाता है।"
          </p>
          <p className="mt-1 text-[10px] font-sans tracking-widest uppercase"
            style={{ color: "rgba(255,253,247,0.18)" }}>
            He who lives in Kashi is liberated — Ancient Vedic saying
          </p>
        </div>
      </div>
    </section>
  );
}
