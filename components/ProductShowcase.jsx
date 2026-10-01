"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ShoppingBag, Gem, Scissors } from "lucide-react";
import Navbar from "./Navbar";
import products from "@/data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

/* ── Decorative zari border SVG ───────────────────────────────── */
function ZariBorder({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,6 Q25,0 50,6 Q75,12 100,6 Q125,0 150,6 Q175,12 200,6 Q225,0 250,6 Q275,12 300,6 Q325,0 350,6 Q375,12 400,6"
        stroke="url(#zariGrad)"
        strokeWidth="1.5"
        fill="none"
      />
      {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x) => (
        <circle key={x} cx={x} cy="6" r="2" fill="#C9973A" opacity="0.6" />
      ))}
      <defs>
        <linearGradient id="zariGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9A6F2A" stopOpacity="0" />
          <stop offset="20%" stopColor="#C9973A" />
          <stop offset="50%" stopColor="#E8B84B" />
          <stop offset="80%" stopColor="#C9973A" />
          <stop offset="100%" stopColor="#9A6F2A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Badge chip ───────────────────────────────────────────────── */
function BadgeChip({ label }) {
  const colours = {
    Heirloom:  "bg-crimson/10 text-crimson border-crimson/20",
    Bestseller:"bg-gold/10 text-gold-deep border-gold/25",
    Limited:   "bg-mahogany/10 text-ink-soft border-mahogany/20",
    New:       "bg-emerald/10 text-emerald border-emerald/20",
    Trending:  "bg-saffron/10 text-saffron border-saffron/20",
    "Eco Craft":"bg-emerald/10 text-emerald border-emerald/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${colours[label] ?? "bg-silk/20 text-ink border-silk/40"}`}>
      {label}
    </span>
  );
}

export default function ProductShowcase() {
  const N = products.length;
  const [mounted, setMounted]         = useState(false);
  const [order, setOrder]             = useState(products.map((_, i) => i));
  const [selectedSize, setSelectedSize]   = useState(products[0].defaultSize);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0].hex);

  const detailsRef      = useRef(null);
  const isAnimatingRef  = useRef(false);
  const directionRef    = useRef(1);
  const flipState       = useRef(null);
  const mainImgRef      = useRef(null);

  const activeProduct = products[order[0]];
  const q1Product     = products[order[1]];
  const q2Product     = products[order[2]];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setSelectedSize(activeProduct.defaultSize);
    setSelectedColor(activeProduct.colors[0].hex);
  }, [activeProduct]);

  const createCloneAndAnimateOut = (dir) => {
    const mainImg = mainImgRef.current;
    if (!mainImg) return;
    const clone          = mainImg.cloneNode(true);
    const rect           = mainImg.getBoundingClientRect();
    const container      = mainImg.closest(".main-img-container");
    const containerRect  = container.getBoundingClientRect();

    Object.assign(clone.style, {
      position:      "absolute",
      top:           rect.top  - containerRect.top  + "px",
      left:          rect.left - containerRect.left + "px",
      right:         "auto",
      bottom:        "auto",
      width:         rect.width  + "px",
      height:        rect.height + "px",
      zIndex:        50,
      margin:        "0",
      pointerEvents: "none",
      opacity:       "1",
      filter:        "none",
    });
    container.appendChild(clone);

    gsap.to(clone, {
      scale: 1.12,
      x: dir === 1 ? containerRect.width * 0.8 : -containerRect.width * 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => clone.remove(),
    });
  };

  const next = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    directionRef.current   = 1;
    createCloneAndAnimateOut(1);
    flipState.current = Flip.getState(".flip-item");
    setOrder((prev) => { const n = [...prev]; n.push(n.shift()); return n; });
  };

  const prev = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    directionRef.current   = -1;
    createCloneAndAnimateOut(-1);
    flipState.current = Flip.getState(".flip-item");
    setOrder((prev) => { const n = [...prev]; n.unshift(n.pop()); return n; });
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    const outgoingId = directionRef.current === 1
      ? products[order[order.length - 1]].id
      : products[order[1]].id;

    const targets = gsap.utils.toArray(".flip-item")
      .filter((el) => el.dataset.flipId !== String(outgoingId));

    gsap.fromTo(detailsRef.current,
      { y: directionRef.current === 1 ? 20 : -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );

    Flip.from(flipState.current, {
      targets,
      duration: 1,
      ease: "power3.inOut",
      absolute: true,
      props: "opacity",
      onEnter: (elements) => {
        elements.forEach((el) => {
          if (el.dataset.index === "main") {
            gsap.fromTo(el,
              directionRef.current === -1
                ? { opacity: 0, x: 200 }
                : { opacity: 0, scale: 0.8 },
              { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.inOut" }
            );
          } else if (el.dataset.index === "q2") {
            gsap.fromTo(el, { opacity: 0 }, { opacity: 0.28, duration: 1, ease: "power3.inOut" });
          }
        });
      },
      onComplete: () => { isAnimatingRef.current = false; },
    });

    const outgoingEl = document.querySelector(`[data-flip-id='${outgoingId}']`);
    if (outgoingEl) {
      gsap.fromTo(outgoingEl, { opacity: 0 }, {
        opacity: outgoingEl.dataset.index === "q1" ? 0.5 : 0.28,
        duration: 0.6,
        delay: 0.4,
      });
    }
    flipState.current = null;
  }, [order]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimatingRef.current) next();
    }, 3200);
    return () => clearInterval(timer);
  }, [order]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-wrapper", {
        y: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: ".showcase-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Format price in INR ── */
  const formatPrice = (p) =>
    "₹" + p.toLocaleString("en-IN");

  return (
    <section
      id="shop"
      className="showcase-section relative h-screen w-full"
      style={{ background: "linear-gradient(160deg, #F7F0E3 0%, #FEF8EE 100%)" }}
    >
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[60%_40%]">

        {/* ── LEFT: Image stage ─────────────────────────────── */}
        <div className="relative flex min-h-0 flex-col" style={{ background: "#FAF3E7" }}>
          <Navbar variant="shop" />

          {/* Subtle mandala pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C9973A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden px-6 py-6 main-img-container">
            {/* Prev button */}
            <button type="button" onClick={prev}
              className="absolute left-4 top-1/2 z-40 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ivory/80 text-gold shadow-gold-sm transition-all hover:bg-gold hover:text-ivory md:left-8">
              ‹
            </button>

            {/* Q2 ghost */}
            <div className="pointer-events-none absolute bottom-6 left-6 z-10 h-[40%] w-[110px]">
              <img src={q2Product.image} alt=""
                className="flip-item h-full w-full object-contain object-bottom"
                style={{ opacity: 0.28, filter: "blur(5px)" }}
                draggable={false}
                data-flip-id={q2Product.id} data-index="q2"
              />
            </div>

            {/* Q1 ghost */}
            <div className="pointer-events-none absolute bottom-6 left-[88px] z-20 h-[56%] w-[150px]">
              <img src={q1Product.image} alt=""
                className="flip-item h-full w-full object-contain object-bottom"
                style={{ opacity: 0.5, filter: "blur(2.5px)" }}
                draggable={false}
                data-flip-id={q1Product.id} data-index="q1"
              />
            </div>

            {/* Warm glow beneath active product */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,151,58,0.2) 0%, transparent 70%)" }} />

            {/* Main stage */}
            <div className="relative z-30 flex h-full w-full max-w-[460px] items-end justify-center">
              <div className="parallax-wrapper pointer-events-none absolute -top-[5%] left-0 w-full h-[110%]">
                <img
                  ref={mainImgRef}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="flip-item absolute inset-0 h-full w-full object-contain object-bottom"
                  style={{ opacity: 1, filter: "none" }}
                  draggable={false}
                  data-flip-id={activeProduct.id} data-index="main"
                />
              </div>
            </div>

            {/* Next button */}
            <button type="button" onClick={next}
              className="absolute right-4 top-1/2 z-40 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ivory/80 text-gold shadow-gold-sm transition-all hover:bg-gold hover:text-ivory md:right-8">
              ›
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
              {products.map((_, i) => (
                <span key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: order[0] === i ? "20px" : "6px",
                    background: order[0] === i ? "#C9973A" : "rgba(201,151,58,0.3)",
                  }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product details ────────────────────────── */}
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-10 md:px-12"
          style={{ background: "linear-gradient(160deg, #1A0A00 0%, #2C0F0F 60%, #3D1F0A 100%)" }}>

          {/* Video bg with multiply blend */}
          {mounted && (
            <video src="/videos/product.mp4" autoPlay loop muted playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ mixBlendMode: "luminosity", opacity: 0.08 }} />
          )}

          {/* Mandala dot pattern overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #E8B84B 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          {/* Gold radial glow top-right */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)" }} />

          {/* Details content */}
          <div className="relative z-10">
            <div ref={detailsRef}>

              {/* Breadcrumb */}
              <p className="text-xs font-medium tracking-wide text-ivory/30 font-sans">
                HOME <span className="mx-1 text-gold/50">›</span>
                <span className="text-gold/60">{activeProduct.category.toUpperCase()}</span>
              </p>

              {/* Badge + Rating */}
              <div className="mt-4 flex items-center gap-3">
                <BadgeChip label={activeProduct.badge} />
                <div className="flex items-center gap-1 text-sm">
                  <Star size={13} className="fill-gold text-gold" />
                  <span className="font-semibold text-ivory">{activeProduct.rating}</span>
                  <span className="text-ivory/35">({activeProduct.reviews})</span>
                </div>
              </div>

              {/* Name */}
              <h2 className="mt-4 font-serif font-semibold leading-[1.05] tracking-tight text-ivory"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}>
                {activeProduct.name}
              </h2>

              {/* Zari border decoration */}
              <div className="mt-3 w-48">
                <ZariBorder />
              </div>

              {/* Price */}
              <p className="mt-4 font-serif text-2xl font-semibold text-gold-light">
                {formatPrice(activeProduct.price)}
              </p>

              {/* Craft details strip */}
              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { icon: Gem,      label: activeProduct.fabric },
                  { icon: Scissors, label: activeProduct.weave },
                ].map(({ icon: Icon, label }) => (
                  <span key={label}
                    className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/8 px-3 py-1 text-xs text-gold/70 font-sans">
                    <Icon size={11} className="text-gold" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Size */}
              <div className="mt-7">
                <p className="text-xs font-semibold tracking-[0.2em] text-ivory/40 font-sans">SELECT SIZE</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size) => (
                    <button key={size} type="button" onClick={() => setSelectedSize(size)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium transition-all ${
                        selectedSize === size
                          ? "border border-gold bg-gold/20 text-gold shadow-gold-sm"
                          : "border border-ivory/15 text-ivory/50 hover:border-gold/40 hover:text-gold/70"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-ivory/40 font-sans">COLOUR</p>
                <div className="mt-3 flex gap-3">
                  {activeProduct.colors.map((color) => (
                    <button key={color.hex} type="button" aria-label={color.name}
                      onClick={() => setSelectedColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-8 w-8 rounded-full transition-all ${
                        selectedColor === color.hex
                          ? "ring-2 ring-gold ring-offset-2 ring-offset-mahogany"
                          : "opacity-60 hover:opacity-90"
                      }`} />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/45 font-sans">
                {activeProduct.description}
              </p>
            </div>

            {/* Add to bag CTA */}
            <button type="button"
              className="mt-8 flex w-full items-center justify-between rounded-2xl border border-gold/30 bg-gold px-7 py-4 text-sm font-semibold tracking-wide text-ink transition-all hover:bg-gold-light hover:shadow-gold">
              <span className="font-serif text-base">Add to Collection</span>
              <span className="flex items-center gap-3">
                {formatPrice(activeProduct.price)}
                <ShoppingBag size={17} strokeWidth={1.75} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
