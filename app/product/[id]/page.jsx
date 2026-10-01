"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Heart, ShoppingBag, Check, ChevronDown, ArrowLeft, Gem, Scissors, Package } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/store";
import products from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

/* ── Shared image pool per product variant (Change Look) ── */
const LOOK_IMAGES = {
  1: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=85",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=85",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=85",
    "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=700&q=85",
  ],
  2: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=85",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=85",
    "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=700&q=85",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=85",
  ],
  3: [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=85",
    "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=700&q=85",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=85",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=85",
  ],
};

const RELATED = [
  { id: 2, name: "Ganga Ghat Georgette", price: 18500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { id: 3, name: "Vishwanath Brocade",   price: 28000, img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80" },
  { id: 4, name: "Tanchoi Jasmine",      price: 12000, img: "https://images.unsplash.com/photo-1591130901921-1e33a9d0b4f8?w=400&q=80" },
  { id: 5, name: "Assi Ghat Organza",    price: 22000, img: "https://images.unsplash.com/photo-1617080752699-af6e5f9f2b05?w=400&q=80" },
];

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

export default function ProductPage({ params }) {
  const id       = parseInt(params?.id ?? "1", 10);
  const product  = products.find((p) => p.id === id) ?? products[0];
  const images   = LOOK_IMAGES[id] ?? LOOK_IMAGES[1];

  const [activeImg,   setActiveImg]   = useState(0);
  const [size,        setSize]        = useState(product.defaultSize);
  const [colour,      setColour]      = useState(product.colors[0].hex);
  const [wished,      setWished]      = useState(false);
  const [added,       setAdded]       = useState(false);
  const [sizeOpen,    setSizeOpen]    = useState(false);

  const { addItem } = useCart();
  const pageRef     = useRef(null);
  const imgRef      = useRef(null);
  const detailRef   = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(detailRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, size, colour);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div ref={pageRef} style={{ background: "#FFFDF7", minHeight: "100vh" }}>
      {/* Navbar — dark on parchment page */}
      <div style={{ background: "#12050A" }}>
        <Navbar transparent={false} />
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-6 py-4 md:px-10">
        <nav className="flex items-center gap-2 text-[11px] font-sans"
          style={{ color: "rgba(12,5,10,0.4)" }}>
          <Link href="/" className="hover:text-crimson transition-colors" style={{ color: "inherit" }}>Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-crimson transition-colors" style={{ color: "inherit" }}>Collections</Link>
          <span>/</span>
          <span style={{ color: "#9B1C1C" }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Main product layout ──────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px]">

          {/* ── LEFT: Image panel ─────────────────────────── */}
          <div ref={imgRef} className="flex gap-4">

            {/* "Change Look" thumbnail strip — left side, vertical */}
            <div className="hidden md:flex flex-col gap-2.5 w-20 shrink-0">
              <p className="text-[9px] tracking-[0.25em] uppercase font-sans font-semibold mb-1"
                style={{ color: "rgba(12,5,10,0.4)" }}>
                Change look
              </p>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden rounded-xl transition-all"
                  style={{
                    aspectRatio: "3/4",
                    border: activeImg === i ? "2px solid #9B1C1C" : "2px solid transparent",
                    boxShadow: activeImg === i ? "0 0 0 1px rgba(155,28,28,0.2)" : "none",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover object-top" draggable={false} />
                </button>
              ))}
            </div>

            {/* Main large image */}
            <div className="flex-1 relative overflow-hidden rounded-3xl" style={{ aspectRatio: "3/4", background: "#F5EDD8" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeImg}
                src={images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover object-top transition-opacity duration-500"
                draggable={false}
              />

              {/* Wishlist floating */}
              <button
                onClick={() => setWished((w) => !w)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full transition-all"
                style={{
                  background: "rgba(255,253,247,0.92)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Heart
                  size={18}
                  style={{
                    fill: wished ? "#9B1C1C" : "transparent",
                    color: "#9B1C1C",
                  }}
                />
              </button>

              {/* Badge */}
              {product.badge && (
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
                  style={{ background: "#9B1C1C", color: "#FFFDF7" }}
                >
                  {product.badge}
                </span>
              )}

              {/* Mobile thumbnail strip — bottom */}
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: activeImg === i ? "20px" : "6px",
                      background: activeImg === i ? "#9B1C1C" : "rgba(255,253,247,0.5)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product details ─────────────────── */}
          <div ref={detailRef} className="flex flex-col gap-5 py-2">

            {/* Breadcrumb category */}
            <p className="text-[11px] font-sans tracking-wide" style={{ color: "rgba(12,5,10,0.4)" }}>
              Shop Sarees ›{" "}
              <span style={{ color: "#9B1C1C" }}>{product.category}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13}
                    style={{
                      fill: i < Math.floor(product.rating) ? "#C9973A" : "transparent",
                      color: "#C9973A",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-sans font-medium" style={{ color: "rgba(12,5,10,0.5)" }}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-serif font-semibold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "#12050A" }}
            >
              {product.name}
            </h1>

            {/* Zari divider */}
            <div className="w-full max-w-xs">
              <svg viewBox="0 0 300 8" className="w-full">
                <path
                  d="M0,4 Q25,0 50,4 Q75,8 100,4 Q125,0 150,4 Q175,8 200,4 Q225,0 250,4 Q275,8 300,4"
                  stroke="url(#zg)" strokeWidth="1.5" fill="none"
                />
                {[0,50,100,150,200,250,300].map((x) => (
                  <circle key={x} cx={x} cy="4" r="1.5" fill="#C9973A" opacity="0.5" />
                ))}
                <defs>
                  <linearGradient id="zg" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9A6F2A" stopOpacity="0" />
                    <stop offset="30%" stopColor="#C9973A" />
                    <stop offset="50%" stopColor="#E8B84B" />
                    <stop offset="70%" stopColor="#C9973A" />
                    <stop offset="100%" stopColor="#9A6F2A" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="font-serif font-semibold"
                style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#9B1C1C" }}
              >
                {fmt(product.price)}
              </span>
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(26,74,53,0.1)", color: "#1A4A35", border: "1px solid rgba(26,74,53,0.2)" }}>
                Incl. of all taxes
              </span>
            </div>

            {/* Craft pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Gem,      label: product.fabric },
                { icon: Scissors, label: product.weave  },
                { icon: Package,  label: "0.8m blouse incl." },
              ].map(({ icon: Icon, label }) => (
                <span key={label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-sans"
                  style={{ border: "1px solid rgba(12,5,10,0.12)", color: "rgba(12,5,10,0.55)" }}>
                  <Icon size={11} style={{ color: "#C9973A" }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm font-sans leading-relaxed max-w-md"
              style={{ color: "rgba(12,5,10,0.55)" }}>
              {product.description}
            </p>

            {/* Size selector */}
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[11px] tracking-[0.2em] uppercase font-sans font-semibold"
                  style={{ color: "rgba(12,5,10,0.45)" }}>
                  Select Blouse Size
                </p>
                <button className="text-[11px] font-sans underline underline-offset-2"
                  style={{ color: "#9B1C1C" }}>
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-sans font-medium transition-all"
                    style={{
                      border: size === s ? "2px solid #9B1C1C" : "1px solid rgba(12,5,10,0.15)",
                      background: size === s ? "rgba(155,28,28,0.06)" : "transparent",
                      color: size === s ? "#9B1C1C" : "rgba(12,5,10,0.55)",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour selector */}
            <div>
              <p className="mb-2.5 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold"
                style={{ color: "rgba(12,5,10,0.45)" }}>
                Select Colour
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.hex} aria-label={c.name} onClick={() => setColour(c.hex)}
                    className="relative h-9 w-9 rounded-full transition-all"
                    style={{
                      background: c.hex,
                      boxShadow: colour === c.hex ? `0 0 0 2px #FFFDF7, 0 0 0 4px ${c.hex}` : "none",
                    }}>
                    {colour === c.hex && (
                      <Check size={13} className="absolute inset-0 m-auto text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] font-sans"
                style={{ color: "rgba(12,5,10,0.4)" }}>
                {product.colors.find((c) => c.hex === colour)?.name}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mt-1">
              {/* Add to Cart — curved pill matching screenshot */}
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-between rounded-full px-6 py-4 font-sans text-sm font-bold tracking-[0.12em] uppercase transition-all"
                style={{
                  background: added ? "#1A4A35" : "#9B1C1C",
                  color: "#FFFDF7",
                }}
              >
                <span>{added ? "Added!" : "Add to Cart"}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  {added ? <Check size={15} /> : <ShoppingBag size={15} />}
                </span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWished((w) => !w)}
                aria-label="Wishlist"
                className="flex h-14 w-14 items-center justify-center rounded-full border transition-all hover:border-crimson"
                style={{
                  border: "1px solid rgba(12,5,10,0.15)",
                  background: wished ? "rgba(155,28,28,0.06)" : "transparent",
                }}
              >
                <Heart size={18}
                  style={{ fill: wished ? "#9B1C1C" : "transparent", color: "#9B1C1C" }}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2"
              style={{ borderTop: "1px solid rgba(12,5,10,0.07)" }}>
              {[
                "Free Shipping above ₹15,000",
                "7-Day Easy Returns",
                "Certificate of Authenticity",
                "GI Tag Certified",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] font-sans"
                  style={{ color: "rgba(12,5,10,0.45)" }}>
                  <Check size={11} style={{ color: "#C9973A" }} />
                  {t}
                </span>
              ))}
            </div>

            {/* Accordion: Care & Craft */}
            {[
              { label: "Craft & Fabric Details",   body: `${product.fabric} · ${product.weave} weave · Zari: ${product.zari} · Blouse: ${product.blouseLength}` },
              { label: "Care Instructions",         body: "Dry clean only. Store in the muslin bag provided. Avoid direct sunlight when storing. Do not wring or tumble dry." },
              { label: "Delivery & Returns",        body: "Free shipping on orders above ₹15,000. Dispatched within 5-7 business days. 7-day hassle-free return policy." },
            ].map((item) => (
              <details
                key={item.label}
                className="group"
                style={{ borderTop: "1px solid rgba(12,5,10,0.07)" }}
              >
                <summary className="flex items-center justify-between cursor-pointer py-3.5 font-sans text-sm font-semibold list-none"
                  style={{ color: "#12050A" }}>
                  {item.label}
                  <ChevronDown size={16} className="transition-transform group-open:rotate-180"
                    style={{ color: "rgba(12,5,10,0.4)" }} />
                </summary>
                <p className="pb-4 text-xs font-sans leading-relaxed"
                  style={{ color: "rgba(12,5,10,0.5)" }}>
                  {item.body}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* ── Related products ──────────────────────────── */}
        <div className="mt-20">
          <h2 className="mb-8 font-serif text-2xl font-semibold" style={{ color: "#12050A" }}>
            You Might Also Love
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {RELATED.map((r) => (
              <Link key={r.id} href={`/product/${r.id}`}
                className="group flex flex-col gap-2">
                <div className="relative overflow-hidden rounded-2xl img-zoom"
                  style={{ aspectRatio: "3/4", background: "#F5EDD8" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.name}
                    className="h-full w-full object-cover object-top"
                    draggable={false} />
                </div>
                <p className="font-serif text-sm font-semibold group-hover:text-crimson transition-colors"
                  style={{ color: "#12050A" }}>
                  {r.name}
                </p>
                <p className="font-serif text-sm font-semibold" style={{ color: "#9B1C1C" }}>
                  {fmt(r.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
