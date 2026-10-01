"use client";

import { useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, Check, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

const SIGNATURES = [
  {
    id: 1,
    name: "Aarangi Emerald Kanjivaram",
    fabric: "Pure Silk",
    price: 48400,
    img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=500&q=85",
    colors: [{ name: "Emerald", hex: "#1A4A35" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 2,
    name: "Halliani Temple Silk",
    fabric: "Katan Silk",
    price: 29800,
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=85",
    colors: [{ name: "Crimson", hex: "#8B1A1A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 3,
    name: "Sanajh Maroon Banarasi",
    fabric: "Brocade",
    price: 35200,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=85",
    colors: [{ name: "Maroon", hex: "#5C0A0A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 4,
    name: "Preena Festive Silk",
    fabric: "Georgette",
    price: 22400,
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=85",
    colors: [{ name: "Saffron", hex: "#D4622A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 5,
    name: "Laxia Courtyard Silk",
    fabric: "Tanchoi",
    price: 31000,
    img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=500&q=85",
    colors: [{ name: "Gold", hex: "#C9973A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
  {
    id: 6,
    name: "Tora Peacock Silk",
    fabric: "Pure Silk",
    price: 41000,
    img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=500&q=85",
    colors: [{ name: "Teal", hex: "#0D3D3A" }],
    sizes: ["S","M","L","XL","XXL"],
    defaultSize: "M",
  },
];

const EDITS = [
  {
    key: "wedding",
    title: "The Wedding Edit",
    sub: "Bridal · Trousseau · Reception",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=85",
    link: "/collections/wedding",
  },
  {
    key: "heritage",
    title: "Heritage Weaves",
    sub: "GI Certified · 2000 Year Craft",
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=85",
    link: "/collections/heritage",
  },
  {
    key: "drape",
    title: "The New Drape",
    sub: "Contemporary · Fusion styles",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=85",
    link: "/collections/drape",
  },
  {
    key: "atelier",
    title: "Private Atelier",
    sub: "Bespoke · Made-to-Order",
    img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=700&q=85",
    link: "/collections/atelier",
  },
];

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

const CARD_W   = 236; // 220px card + 16px gap
const INTERVAL = 2800;

/* ── Single signature card ────────────────────────────────── */
function SigCard({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(item, item.defaultSize, item.colors[0].hex);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${item.id}`}
      className="sig-card group relative flex w-[220px] shrink-0 snap-start flex-col">
      <div className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "2/3", background: "#F5EDD8" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name}
          className="h-full w-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.07]"
          draggable={false} />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(0deg,rgba(12,5,10,0.72) 0%,transparent 100%)" }} />

        {/* Static name + price */}
        <div className="absolute bottom-10 left-3 right-3">
          <p className="font-serif text-xs font-semibold text-ivory leading-tight">{item.name}</p>
          <p className="mt-0.5 font-serif text-xs font-semibold" style={{ color: "#E8B84B" }}>
            {fmt(item.price)}
          </p>
        </div>

        {/* Add to cart button — slides up on hover */}
        <button type="button" onClick={handleAdd}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 font-sans text-[11px] font-bold tracking-wide transition-all duration-300 translate-y-full group-hover:translate-y-0"
          style={{ background: added ? "#1A4A35" : "#9B1C1C", color: "#FFFDF7" }}>
          {added
            ? <><Check size={12} /> Added!</>
            : <><ShoppingBag size={12} /> Add to Cart</>}
        </button>
      </div>
    </Link>
  );
}

export default function EditorialGrid() {
  const secARef    = useRef(null);
  const secBRef    = useRef(null);
  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  /* Auto-slide */
  const advance = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      setActiveSlide(0);
    } else {
      el.scrollBy({ left: CARD_W, behavior: "smooth" });
      setActiveSlide((s) => Math.min(s + 1, SIGNATURES.length - 1));
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(advance, INTERVAL);
    return () => clearInterval(t);
  }, [paused, advance]);

  /* Scroll sync for dot indicator */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const fn = () => {
      const idx = Math.round(el.scrollLeft / CARD_W);
      setActiveSlide(idx);
    };
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, []);

  const scrollToSlide = (i) => {
    setPaused(true);
    scrollerRef.current?.scrollTo({ left: i * CARD_W, behavior: "smooth" });
    setActiveSlide(i);
    setTimeout(() => setPaused(false), 2500);
  };

  const scrollBy = (dir) => {
    setPaused(true);
    const next = Math.max(0, Math.min(SIGNATURES.length - 1, activeSlide + dir));
    scrollToSlide(next);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sig-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: secARef.current, start: "top 80%" } }
      );
      gsap.fromTo(".sig-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: secARef.current, start: "top 84%" } }
      );
      gsap.fromTo(".edit-card",
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: secBRef.current, start: "top 78%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          SECTION A — Auto-sliding "Woven to Be Remembered"
          ══════════════════════════════════════════════════ */}
      <section ref={secARef} className="w-full overflow-hidden py-20 md:py-28"
        style={{ background: "#FFFDF7" }}>
        <div className="mx-auto max-w-[1440px]">

          {/* Header */}
          <div className="sig-header mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-6 md:px-10">
            <div>
              <p className="mb-2 text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
                style={{ color: "#9B1C1C" }}>The Sudhom Signatures</p>
              <h2 className="font-serif font-semibold tracking-tight leading-none"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#12050A" }}>
                Woven to Be{" "}
                <span className="italic font-serif" style={{ color: "#9B1C1C" }}>Remembered</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Prev / Next */}
              <div className="flex gap-2">
                <button onClick={() => scrollBy(-1)} aria-label="Prev"
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-crimson"
                  style={{ borderColor: "rgba(12,5,10,0.12)", color: "rgba(12,5,10,0.5)" }}>
                  <ArrowLeft size={15} />
                </button>
                <button onClick={() => scrollBy(1)} aria-label="Next"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-105"
                  style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                  <ArrowRight size={15} />
                </button>
              </div>
              <Link href="/collections"
                className="hidden sm:block text-xs font-sans font-semibold tracking-[0.18em] uppercase underline underline-offset-4 transition-colors"
                style={{ color: "rgba(12,5,10,0.4)" }}>
                Explore the Edit →
              </Link>
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
            {SIGNATURES.map((item) => <SigCard key={item.id} item={item} />)}
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex justify-center gap-1.5 px-6">
            {SIGNATURES.map((_, i) => (
              <button key={i} onClick={() => scrollToSlide(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeSlide === i ? "28px" : "8px",
                  background: activeSlide === i ? "#9B1C1C" : "rgba(155,28,28,0.2)",
                }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION B — "EDITS FOR every occasion"
          ══════════════════════════════════════════════════ */}
      <section ref={secBRef} className="w-full py-20 md:py-28"
        style={{ background: "#FFFDF7" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          {/* Header */}
          <div className="sig-header mb-10">
            <p className="mb-2 text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
              style={{ color: "#9B1C1C" }}>Curated for you</p>
            <h2 className="font-serif font-semibold tracking-tight leading-none"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#12050A" }}>
              EDITS FOR{" "}
              <span className="font-serif italic" style={{ color: "#C9973A" }}>every occasion</span>
            </h2>
          </div>

          {/* 2×2 editorial tiles */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {EDITS.map((edit) => (
              <Link key={edit.key} href={edit.link}
                className="edit-card group relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "3/4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={edit.img} alt={edit.title}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]"
                  draggable={false} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 30%, rgba(12,5,10,0.82) 100%)" }} />
                <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "linear-gradient(90deg,#C9973A,#E8B84B)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] tracking-[0.2em] font-sans uppercase mb-1"
                    style={{ color: "rgba(255,253,247,0.5)" }}>{edit.sub}</p>
                  <p className="font-serif font-semibold text-ivory leading-tight"
                    style={{ fontSize: "clamp(1rem,1.8vw,1.25rem)" }}>{edit.title}</p>
                  <p className="mt-2 text-[10px] font-sans font-semibold tracking-[0.15em] uppercase transition-colors group-hover:text-gold"
                    style={{ color: "rgba(201,151,58,0.7)" }}>Explore Now →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
