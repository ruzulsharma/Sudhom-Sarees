"use client";

import { useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Star, ShoppingBag, Check, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

const BEST_SELLERS = [
  {
    id: 1,
    name: "Maha Kaasi Vastra Silk",
    fabric: "Katan Silk",
    price: 22740,
    rating: 4.5,
    reviews: 128,
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    colors: [{ name: "Crimson", hex: "#8B1A1A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 2,
    name: "Koha Jewel Silk",
    fabric: "Banarasi Brocade",
    price: 17300,
    rating: 4.4,
    reviews: 94,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    colors: [{ name: "Saffron", hex: "#D4622A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 3,
    name: "Zeynna Temple Weave",
    fabric: "Velvet Brocade",
    price: 26000,
    rating: 4.7,
    reviews: 73,
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    colors: [{ name: "Emerald", hex: "#1A4A35" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 4,
    name: "Nalini Amazing Silk",
    fabric: "Pure Georgette",
    price: 8500,
    rating: 4.3,
    reviews: 211,
    img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=600&q=80",
    colors: [{ name: "Rose", hex: "#C47A7A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 5,
    name: "Graceful Royal Silk",
    fabric: "Tanchoi",
    price: 33470,
    rating: 4.8,
    reviews: 57,
    img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=600&q=80",
    colors: [{ name: "Gold", hex: "#C9973A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
];

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

const CARD_W   = 280;
const INTERVAL = 3500;

function PickCard({ item }) {
  const { addItem } = useCart();
  const [added,  setAdded]  = useState(false);
  const [wished, setWished] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(item, item.defaultSize, item.colors[0].hex);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pick-card group relative flex w-[260px] shrink-0 snap-start flex-col">
      <Link href={`/product/${item.id}`}>
        <div className="relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "3/4", background: "#F5EDD8" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.img} alt={item.name}
            className="h-full w-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.06]"
            draggable={false} />

          {/* Wishlist */}
          <button type="button" aria-label="Wishlist"
            onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
            style={{ background: "rgba(255,253,247,0.92)" }}>
            <Heart size={13} style={{ fill: wished ? "#9B1C1C" : "transparent", color: "#9B1C1C" }} />
          </button>

          {/* Add to cart — slides up from bottom on hover */}
          <button type="button" onClick={handleAdd}
            className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3.5 font-sans text-xs font-bold tracking-wide transition-all duration-300 translate-y-full group-hover:translate-y-0"
            style={{ background: added ? "#1A4A35" : "#9B1C1C", color: "#FFFDF7" }}>
            {added
              ? <><Check size={13} /> Added to Cart!</>
              : <><ShoppingBag size={13} /> Add to Cart</>}
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <div className="mb-1.5 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11}
                style={{ fill: i < Math.floor(item.rating) ? "#C9973A" : "transparent", color: "#C9973A" }} />
            ))}
            <span className="ml-1 text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
              ({item.reviews})
            </span>
          </div>
          <p className="font-serif text-sm font-semibold leading-snug" style={{ color: "#12050A" }}>
            {item.name}
          </p>
          <p className="mt-0.5 text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.4)" }}>
            {item.fabric}
          </p>
          <p className="mt-1.5 font-serif text-base font-semibold" style={{ color: "#9B1C1C" }}>
            {fmt(item.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function PopularPicks() {
  const sectionRef  = useRef(null);
  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: CARD_W, behavior: "smooth" });
    }
  }, []);

  const scrollBy = (dir) => {
    setPaused(true);
    scrollerRef.current?.scrollBy({ left: dir * CARD_W, behavior: "smooth" });
    setTimeout(() => setPaused(false), 2500);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(advance, INTERVAL);
    return () => clearInterval(t);
  }, [paused, advance]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".picks-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } }
      );
      gsap.fromTo(".pick-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24" style={{ background: "#FFFDF7" }}>
      {/* Wave top */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" className="w-full" preserveAspectRatio="none" style={{ height: "48px", display: "block" }}>
          <path d="M0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,0 L0,0 Z" fill="#12050A" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="picks-header mb-8 flex items-end justify-between px-6 md:px-10">
          <div>
            <p className="mb-1.5 text-[10px] tracking-[0.35em] uppercase font-sans font-semibold"
              style={{ color: "#9B1C1C" }}>Curated & loved</p>
            <h2 className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#12050A" }}>
              Best Sellers
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Prev"
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-crimson hover:text-crimson"
              style={{ borderColor: "rgba(12,5,10,0.15)", color: "rgba(12,5,10,0.5)" }}>
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105"
              style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 1500)}
        >
          {BEST_SELLERS.map((item) => <PickCard key={item.id} item={item} />)}
        </div>

        {/* Progress dots */}
        <div className="mt-5 flex justify-center gap-1.5 px-6">
          {BEST_SELLERS.map((_, i) => (
            <button key={i}
              onClick={() => { setPaused(true); scrollerRef.current?.scrollTo({ left: i * CARD_W, behavior: "smooth" }); setTimeout(() => setPaused(false), 2500); }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: "24px", background: "rgba(155,28,28,0.2)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
