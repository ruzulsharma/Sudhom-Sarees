"use client";

import { useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Star, ArrowRight, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

const NEW_ARRIVALS = [
  {
    id: 1,
    name: "Kashi Temple Red Silk",
    fabric: "Pure Katan Silk",
    price: 21000,
    originalPrice: null,
    rating: 4.8,
    badge: "New",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80",
    colors: [{ name: "Crimson", hex: "#8B1A1A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 2,
    name: "Prerna Festive Silk",
    fabric: "Banarasi Brocade",
    price: 12800,
    originalPrice: 16000,
    rating: 4.7,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    colors: [{ name: "Saffron", hex: "#D4622A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 3,
    name: "Aryeka Cutwork Georgette",
    fabric: "Pure Georgette",
    price: 25400,
    originalPrice: null,
    rating: 4.9,
    badge: "New",
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80",
    colors: [{ name: "Deep Teal", hex: "#0D3D3A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 4,
    name: "Sultana Ceremony Silk",
    fabric: "Tanchoi Silk",
    price: 19500,
    originalPrice: 24000,
    rating: 4.6,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=500&q=80",
    colors: [{ name: "Rose", hex: "#C47A7A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 5,
    name: "Devotion Wedding Silk",
    fabric: "Velvet Brocade",
    price: 32000,
    originalPrice: null,
    rating: 5.0,
    badge: "Limited",
    img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=500&q=80",
    colors: [{ name: "Maroon", hex: "#5C0A0A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 6,
    name: "Ganga Dawn Organza",
    fabric: "Pure Silk Organza",
    price: 18200,
    originalPrice: null,
    rating: 4.8,
    badge: "New",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80",
    colors: [{ name: "Ivory", hex: "#FEF8EE" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
];

const BADGE_STYLE = {
  New:     { bg: "#9B1C1C", color: "#FFFDF7" },
  Sale:    { bg: "#C9973A", color: "#12050A" },
  Limited: { bg: "#4C0519", color: "#E8B84B" },
};

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

/* Individual card with its own Add-to-Cart state */
function ArrivalCard({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const bs = BADGE_STYLE[item.badge] ?? BADGE_STYLE.New;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(item, item.defaultSize, item.colors[0].hex);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${item.id}`}
      className="arrival-item group flex w-[220px] shrink-0 snap-start flex-col sm:w-[240px]">

      {/* Image box */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "3/4", background: "#F5EDD8" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name}
          className="h-full w-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.07]"
          draggable={false} />

        {/* Badge */}
        <span className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
          style={{ background: bs.bg, color: bs.color }}>
          {item.badge}
        </span>

        {/* Wishlist */}
        <button type="button" aria-label="Wishlist"
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
          style={{ background: "rgba(255,253,247,0.92)" }}>
          <Heart size={14} style={{ fill: wished ? "#9B1C1C" : "transparent", color: "#9B1C1C" }} />
        </button>

        {/* Add to cart — slides up on hover */}
        <button type="button" onClick={handleAdd}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 font-sans text-xs font-bold tracking-wide transition-all duration-300 translate-y-full group-hover:translate-y-0"
          style={{ background: added ? "#1A4A35" : "#9B1C1C", color: "#FFFDF7" }}>
          {added
            ? <><Check size={13} /> Added!</>
            : <><ShoppingBag size={13} /> Add to Cart</>}
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <p className="font-serif text-sm font-semibold leading-snug" style={{ color: "#12050A" }}>
          {item.name}
        </p>
        <p className="mt-0.5 text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
          {item.fabric}
        </p>
        <div className="mt-1 flex items-center gap-1">
          <Star size={11} style={{ fill: "#C9973A", color: "#C9973A" }} />
          <span className="text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.5)" }}>{item.rating}</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-serif text-base font-semibold" style={{ color: "#9B1C1C" }}>
            {fmt(item.price)}
          </span>
          {item.originalPrice && (
            <span className="text-xs font-sans line-through" style={{ color: "rgba(12,5,10,0.3)" }}>
              {fmt(item.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ── Auto-sliding carousel wrapper ───────────────────────── */
const CARD_W   = 248; // card width + gap
const INTERVAL = 3000;

export default function NewArrivals() {
  const sectionRef  = useRef(null);
  const scrollerRef = useRef(null);
  const timerRef    = useRef(null);
  const [paused, setPaused] = useState(false);

  /* Infinite auto-scroll by 1 card */
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

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".arrival-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".arrivals-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24" style={{ background: "#FFFDF7" }}>
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="arrivals-header mb-8 flex items-end justify-between px-6 md:px-10">
          <div>
            <p className="mb-1.5 text-[10px] tracking-[0.35em] uppercase font-sans font-semibold"
              style={{ color: "#9B1C1C" }}>Fresh from the Loom</p>
            <h2 className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#12050A" }}>
              New Arrivals
            </h2>
          </div>
          <Link href="/collections/new"
            className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.15em] uppercase transition-colors hover:text-crimson"
            style={{ color: "rgba(12,5,10,0.45)" }}>
            View all <ArrowRight size={13} />
          </Link>
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
          {NEW_ARRIVALS.map((item) => <ArrivalCard key={item.id} item={item} />)}
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex justify-center gap-1.5 px-6">
          {NEW_ARRIVALS.map((_, i) => (
            <button key={i}
              onClick={() => scrollerRef.current?.scrollTo({ left: i * CARD_W, behavior: "smooth" })}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: "24px", background: "rgba(155,28,28,0.2)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
