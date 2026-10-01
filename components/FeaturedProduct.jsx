"use client";

import Image from "next/image";
import { Star, Heart, Gem, Scissors, Package, CheckCircle } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Decorative zari wave ──────────────────────────────────── */
function ZariWave() {
  return (
    <svg viewBox="0 0 300 8" className="w-full" aria-hidden="true">
      <path
        d="M0,4 Q18,0 36,4 Q54,8 72,4 Q90,0 108,4 Q126,8 144,4 Q162,0 180,4 Q198,8 216,4 Q234,0 252,4 Q270,8 288,4 Q294,2 300,4"
        stroke="url(#waveGold)" strokeWidth="1.5" fill="none"
      />
      {[0,36,72,108,144,180,216,252,300].map((x) => (
        <circle key={x} cx={x} cy="4" r="1.5" fill="#C9973A" opacity="0.5" />
      ))}
      <defs>
        <linearGradient id="waveGold" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#9A6F2A" stopOpacity="0" />
          <stop offset="25%"  stopColor="#C9973A" />
          <stop offset="50%"  stopColor="#E8B84B" />
          <stop offset="75%"  stopColor="#C9973A" />
          <stop offset="100%" stopColor="#9A6F2A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Feature pill ─────────────────────────────────────────── */
function FeaturePill({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-ivory px-3 py-1.5 text-xs text-ink/60 font-sans">
      <Icon size={12} className="text-gold shrink-0" />
      {label}
    </span>
  );
}

const featuredImages = [
  "/others/14411b388e42a556faf51faa50522971.jpg",
  "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
  "/others/669c6ab97e3cd98666f855a198ec26d1.jpg",
  "/others/517ffdbc33620528524824c768da0933.jpg",
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"];
const colourOptions = [
  { name: "Crimson", hex: "#8B1A1A" },
  { name: "Gold",    hex: "#C9973A" },
  { name: "Emerald", hex: "#1A4A35" },
  { name: "Saffron", hex: "#D4622A" },
];

export default function FeaturedProduct() {
  const sectionRef   = useRef(null);
  const [active, setActive]     = useState(featuredImages[0]);
  const [size, setSize]         = useState("M");
  const [colour, setColour]     = useState(colourOptions[0].hex);
  const [wished, setWished]     = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".feat-reveal",
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="w-full py-16 px-4 md:px-8 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F7F0E3 0%, #FEF8EE 100%)" }}>

      {/* Section header */}
      <div className="feat-reveal max-w-[1400px] mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-gold/40" />
          <span className="text-[10px] tracking-[0.4em] text-gold-deep uppercase font-sans font-semibold">
            Masterpiece of the Season
          </span>
          <div className="h-px w-10 bg-gold/40" />
        </div>
        <h2 className="font-serif text-3xl font-semibold text-ink md:text-4xl">
          The Kashi Bridal Katan
        </h2>
        <p className="mt-2 text-sm text-ink/45 font-sans">
          45 days. 1,200,000 threads. One saree.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

        {/* ── Left: Image gallery ────────────────────────── */}
        <div className="feat-reveal w-full lg:w-1/2 flex flex-col gap-4">
          {/* Main image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-gold/15"
            style={{ background: "linear-gradient(160deg, #F0E6D0 0%, #EAD5B0 100%)" }}>
            <Image src={active} alt="Kashi Bridal Katan" fill className="object-cover object-top" />

            {/* GI Tag badge */}
            <div className="absolute top-4 left-4 rounded-xl border border-gold/30 bg-ivory/90 px-3 py-2 shadow-gold-sm backdrop-blur-sm">
              <p className="text-[9px] tracking-[0.3em] text-gold-deep uppercase font-sans font-semibold">GI Certified</p>
              <p className="text-[8px] text-ink/40 font-sans">Govt. of India</p>
            </div>

            {/* Wishlist */}
            <button type="button"
              onClick={() => setWished((w) => !w)}
              aria-label="Wishlist"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-ivory/90 shadow-gold-sm backdrop-blur-sm transition-all hover:bg-crimson hover:border-crimson group">
              <Heart size={16}
                className={`transition-colors ${wished ? "fill-crimson text-crimson" : "text-ink/50 group-hover:text-ivory"}`} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {featuredImages.map((img, i) => (
              <div key={i} onClick={() => setActive(img)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                  active === img
                    ? "border-gold shadow-gold-sm"
                    : "border-gold/10 hover:border-gold/35"
                }`}
                style={{ background: "#F0E6D0" }}>
                <Image src={img} alt="" fill className="object-cover object-top" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Product details ─────────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 py-2 lg:py-4">

          {/* Name + rating */}
          <div className="feat-reveal">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink leading-tight tracking-tight">
              Kashi Bridal<br />
              <span className="italic text-crimson">Katan Saree</span>
            </h2>
            <div className="mt-3">
              <ZariWave />
            </div>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15}
                    className={i < 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"} />
                ))}
                <span className="ml-2 font-semibold text-ink font-serif">4.9</span>
                <span className="text-ink/40 text-sm font-sans">(84 reviews)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="feat-reveal text-ink/60 text-base leading-relaxed font-sans max-w-lg">
            Pure Katan silk woven on the pit looms of Banaras. Adorned with
            kadwa buti motifs and real gold zari borders — each flower individually
            shuttled to achieve three-dimensional texture. A testament to 2,000 years
            of unbroken craft tradition.
          </p>

          {/* Feature pills */}
          <div className="feat-reveal flex flex-wrap gap-2">
            <FeaturePill icon={Gem}         label="Pure Katan Silk" />
            <FeaturePill icon={Scissors}    label="Kadwa Weave" />
            <FeaturePill icon={Package}     label="0.8m Blouse Included" />
            <FeaturePill icon={CheckCircle} label="GI Certified" />
          </div>

          {/* Price */}
          <div className="feat-reveal flex items-baseline gap-4">
            <span className="font-serif text-4xl font-semibold text-crimson">₹42,000</span>
            <span className="text-ink/35 line-through text-lg font-sans">₹52,000</span>
            <span className="rounded-full bg-emerald/10 border border-emerald/20 px-2.5 py-0.5 text-xs font-semibold text-emerald font-sans">
              Save ₹10,000
            </span>
          </div>

          {/* Size selector */}
          <div className="feat-reveal">
            <p className="text-xs tracking-[0.2em] text-ink/45 uppercase font-sans font-semibold mb-3">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`h-11 w-11 rounded-full text-sm font-medium transition-all ${
                    size === s
                      ? "border-2 border-gold bg-gold/15 text-gold shadow-gold-sm"
                      : "border border-gold/20 text-ink/55 hover:border-gold/50 hover:text-gold"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour selector */}
          <div className="feat-reveal">
            <p className="text-xs tracking-[0.2em] text-ink/45 uppercase font-sans font-semibold mb-3">
              Select Colour
            </p>
            <div className="flex gap-3">
              {colourOptions.map((c) => (
                <button key={c.hex} aria-label={c.name} onClick={() => setColour(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`h-9 w-9 rounded-full transition-all ${
                    colour === c.hex
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-parchment"
                      : "opacity-55 hover:opacity-90"
                  }`} />
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="feat-reveal flex gap-3 flex-col sm:flex-row">
            <button
              className="flex-1 h-14 rounded-2xl bg-crimson font-serif text-base font-semibold text-ivory transition-all hover:bg-crimson-light hover:shadow-warm-lg">
              Add to Collection
            </button>
            <button
              className="flex-1 h-14 rounded-2xl border border-gold/40 bg-transparent font-serif text-base font-semibold text-gold-deep transition-all hover:bg-gold/10 hover:border-gold">
              Request Customisation
            </button>
          </div>

          {/* Trust strip */}
          <div className="feat-reveal flex flex-wrap gap-4 pt-2 border-t border-gold/10">
            {["Free Shipping above ₹15,000", "7-Day Easy Returns", "Certificate of Authenticity"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-ink/45 font-sans">
                <CheckCircle size={11} className="text-gold" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
