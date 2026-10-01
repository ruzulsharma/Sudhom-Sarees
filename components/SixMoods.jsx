"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/*
  "SIX MOODS" — arched portrait cards matching screenshot #5.
  Each card has an arch-clipped top, full-bleed model image, label below.
  Real Unsplash saree editorial photos (free licence).
*/
const MOODS = [
  {
    key: "bridal",
    label: "The Bride",
    sub: "Katan Silk",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    accent: "#9B1C1C",
  },
  {
    key: "festive",
    label: "Festive Glow",
    sub: "Brocade",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    accent: "#C9973A",
  },
  {
    key: "serene",
    label: "Morning Puja",
    sub: "Organza",
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    accent: "#C9973A",
  },
  {
    key: "editorial",
    label: "The Edit",
    sub: "Tanchoi",
    img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=600&q=80",
    accent: "#9B1C1C",
  },
  {
    key: "heritage",
    label: "Heritage",
    sub: "Tussar",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    accent: "#C9973A",
  },
  {
    key: "modern",
    label: "New Drape",
    sub: "Georgette",
    img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=600&q=80",
    accent: "#9B1C1C",
  },
];

export default function SixMoods() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mood-card",
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(".moods-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden py-20 md:py-28"
      style={{ background: "#12050A" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">

        {/* Header */}
        <div className="moods-header mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
              style={{ color: "#C9973A" }}>
              Dress for every chapter
            </p>
            <h2
              className="font-serif font-semibold leading-none tracking-tight text-ivory"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
            >
              SIX MOODS.
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors hover:text-gold"
            style={{ color: "rgba(255,253,247,0.4)" }}
          >
            View All Collections →
          </Link>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {MOODS.map((mood) => (
            <Link
              key={mood.key}
              href={`/collections/${mood.key}`}
              className="mood-card group flex flex-col gap-3"
            >
              {/* Arched card */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "9999px 9999px 16px 16px",
                  aspectRatio: "1 / 1.65",
                }}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mood.img}
                  alt={mood.label}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  draggable={false}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,5,10,0.75) 100%)" }}
                />
                {/* Top gold accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${mood.accent}, #E8B84B)` }}
                />
              </div>

              {/* Label */}
              <div className="px-1">
                <p className="font-serif text-sm font-semibold text-ivory leading-tight group-hover:text-gold transition-colors">
                  {mood.label}
                </p>
                <p className="mt-0.5 text-[10px] font-sans tracking-wide"
                  style={{ color: "rgba(201,151,58,0.65)" }}>
                  {mood.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
