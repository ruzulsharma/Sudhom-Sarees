"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    key: "bridal",
    label: "Bridal Sarees",
    sub: "Katan Silk · Kadwa Weave",
    image: "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
    focus: "center 20%",
    tag: "Heritage",
    accent: "#8B1A1A",
  },
  {
    key: "festive",
    label: "Festive & Puja",
    sub: "Velvet Brocade · Meenakari",
    image: "/offer/18c0af0c-f4a1-484f-9141-297401d80cbf.png",
    focus: "center",
    tag: "Festive",
    accent: "#C9973A",
  },
  {
    key: "everyday",
    label: "Everyday Luxury",
    sub: "Tanchoi · Tussar Silk",
    image: "/others/8028e4627b84d16f84581f0bc379e0ad.jpg",
    focus: "center 15%",
    tag: "Everyday",
    accent: "#1A4A35",
  },
  {
    key: "gifting",
    label: "Gifting & Trousseau",
    sub: "Curated sets · Custom boxes",
    image: "/others/cc9c75a9eb7c6e5cee1975ceedb0d9a0.jpg",
    focus: "center",
    tag: "Gift",
    accent: "#D4622A",
  },
];

/* Lotus petal corner ornament */
function CornerLotus() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
      className="absolute top-3 right-3 opacity-70">
      <path d="M16 2 C16 2 10 8 10 16 C10 20 12 24 16 26 C20 24 22 20 22 16 C22 8 16 2 16 2Z"
        fill="white" opacity="0.3" />
      <path d="M2 16 C2 16 8 10 16 10 C20 10 24 12 26 16 C24 20 20 22 16 22 C8 22 2 16 2 16Z"
        fill="white" opacity="0.3" />
      <circle cx="16" cy="16" r="3" fill="white" opacity="0.6" />
    </svg>
  );
}

function CategoryCard({ item, className }) {
  return (
    <div className={`cat-reveal ${className}`}>
      <TiltCard tiltAmount={3}
        className="group relative overflow-hidden rounded-2xl h-full w-full cursor-pointer">
        {/* Image */}
        <img
          src={item.image} alt={item.label}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: item.focus }}
          draggable={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(26,10,0,0.15) 0%, rgba(26,10,0,0.75) 100%)" }} />

        {/* Gold top border on hover */}
        <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: "linear-gradient(90deg, #9A6F2A, #E8B84B, #9A6F2A)" }} />

        <CornerLotus />

        {/* Tag pill */}
        <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide text-ivory border border-white/20 bg-white/10 backdrop-blur-sm">
          {item.tag}
        </span>

        <div className="relative flex h-full flex-col justify-end p-5">
          <p className="font-serif text-lg font-semibold text-ivory md:text-xl leading-snug">
            {item.label}
          </p>
          <p className="mt-1 text-xs text-ivory/65 font-sans">{item.sub}</p>

          {/* CTA */}
          <button type="button"
            className="mt-4 flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-ink">
            <span>Explore</span>
            <span className="text-[10px]">›</span>
          </button>
        </div>
      </TiltCard>
    </div>
  );
}

export default function CategoryGrid() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cat-reveal").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8, delay: i * 0.07, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="w-full px-6 pt-14 pb-20 md:px-14 md:pt-20 md:pb-28"
      style={{ background: "linear-gradient(180deg, #FAF3E7 0%, #F7F0E3 100%)" }}>

      {/* Header */}
      <div className="cat-reveal mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold/50" />
            <span className="text-[10px] font-semibold tracking-[0.35em] text-gold uppercase font-sans">
              Shop by Occasion
            </span>
            <div className="h-px w-8 bg-gold/50" />
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Our Collections
          </h2>
        </div>
        <p className="text-sm text-ink/45 font-sans max-w-[260px] leading-relaxed">
          Every occasion deserves a saree woven with intention.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:h-[600px] md:grid-cols-2">
        {/* Large left card */}
        <CategoryCard item={categories[0]} className="h-[340px] md:h-full" />

        {/* Right 3-card stack */}
        <div className="grid grid-rows-2 gap-4">
          <CategoryCard item={categories[1]} className="h-[240px] md:h-full" />
          <div className="grid grid-cols-2 gap-4">
            <CategoryCard item={categories[2]} className="h-[220px] md:h-full" />
            <CategoryCard item={categories[3]} className="h-[220px] md:h-full" />
          </div>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="cat-reveal mt-12 flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/30" />
        <span className="text-gold/50 text-sm font-sans">✦</span>
        <span className="text-[10px] tracking-[0.4em] text-ink/30 uppercase font-sans">
          Handwoven in Banaras
        </span>
        <span className="text-gold/50 text-sm font-sans">✦</span>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/30" />
      </div>
    </section>
  );
}
