"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  Collections: ["Banarasi Silk", "Bridal Edit", "Festive Wear", "New Arrivals", "Gifting Sets"],
  Craft:       ["Our Weavers", "Zari Process", "GI Certification", "Care Guide", "Authenticity"],
  Help:        ["Size Guide", "Track Order", "Returns", "Contact Us", "FAQs"],
};

export default function Footer() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".foot-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0D0308" }}
    >
      {/* ── Big brand watermark ───────────────────── */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center pointer-events-none overflow-hidden select-none"
        style={{ paddingTop: "1rem" }}
      >
        <h1
          className="font-serif font-bold tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(6rem,20vw,18rem)",
            lineHeight: 1,
            background: "linear-gradient(180deg, rgba(201,151,58,0.14) 0%, transparent 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SUDHOM
        </h1>
      </div>

      {/* ── Foreground content ───────────────────── */}
      <div className="relative z-10">
        {/* Top CTA band */}
        <div
          className="foot-reveal mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20 text-center"
        >
          <p className="mb-3 text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
            style={{ color: "#C9973A" }}>
            Step into your story
          </p>
          <h2
            className="font-serif font-semibold text-ivory leading-tight"
            style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
          >
            Drape yourself in<br />
            <span className="italic" style={{ color: "#C9973A" }}>living heritage.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/collections"
              className="rounded-full px-8 py-3.5 font-sans text-sm font-semibold text-ivory transition-all hover:scale-[1.02]"
              style={{ background: "#9B1C1C" }}
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="rounded-full border px-8 py-3.5 font-sans text-sm font-semibold transition-all hover:border-gold hover:text-gold"
              style={{ borderColor: "rgba(201,151,58,0.35)", color: "rgba(255,253,247,0.65)" }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(201,151,58,0.1)" }} />

        {/* Main footer grid */}
        <div className="foot-reveal mx-auto max-w-[1440px] px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

            {/* Brand column */}
            <div>
              <div className="mb-5">
                <p className="font-serif font-semibold text-xl tracking-[0.15em] uppercase text-ivory">
                  Sudhom
                </p>
                <p className="text-[9px] tracking-[0.4em] uppercase font-sans mt-0.5"
                  style={{ color: "#C9973A" }}>
                  Banaras · Est. 1947
                </p>
              </div>
              <p className="text-sm font-sans leading-relaxed max-w-[240px]"
                style={{ color: "rgba(255,253,247,0.42)" }}>
                Handwoven Banarasi silk sarees crafted by master weavers on the sacred banks of the Ganga.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                {[
                  { Icon: MapPin, text: "Vishwanath Gali, Varanasi — 221001" },
                  { Icon: Phone, text: "+91 80000 12345" },
                  { Icon: Mail,  text: "craft@sudhom.in" },
                ].map(({ Icon, text }) => (
                  <span key={text} className="flex items-start gap-2 text-xs font-sans"
                    style={{ color: "rgba(255,253,247,0.35)" }}>
                    <Icon size={12} className="mt-0.5 shrink-0" style={{ color: "#C9973A" }} />
                    {text}
                  </span>
                ))}
              </div>
              {/* Social */}
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Youtube,   label: "YouTube" },
                ].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold hover:text-gold"
                    style={{ borderColor: "rgba(201,151,58,0.2)", color: "rgba(255,253,247,0.4)" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <h4 className="mb-5 font-serif text-sm font-semibold tracking-wide text-ivory">{cat}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((l) => (
                    <li key={l}>
                      <Link href="#"
                        className="text-xs font-sans transition-colors hover:text-gold"
                        style={{ color: "rgba(255,253,247,0.38)" }}>
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="foot-reveal mx-auto max-w-[1440px] px-6 py-8 md:px-10"
          style={{ borderTop: "1px solid rgba(201,151,58,0.08)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="font-serif text-sm font-semibold text-ivory">
                Receive the Weaver's Notes
              </p>
              <p className="mt-0.5 text-xs font-sans" style={{ color: "rgba(255,253,247,0.38)" }}>
                New arrivals, craft stories, exclusive drops. No noise.
              </p>
            </div>
            <div className="flex gap-3 max-w-md w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full px-5 py-2.5 text-sm font-sans outline-none transition-all"
                style={{
                  background: "rgba(255,253,247,0.06)",
                  border: "1px solid rgba(201,151,58,0.2)",
                  color: "#FFFDF7",
                }}
              />
              <button
                className="rounded-full px-6 py-2.5 text-sm font-sans font-semibold text-ivory transition-all hover:scale-[1.02]"
                style={{ background: "#9B1C1C" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="foot-reveal mx-auto max-w-[1440px] px-6 py-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,253,247,0.05)" }}
        >
          <p className="text-[11px] font-sans" style={{ color: "rgba(255,253,247,0.25)" }}>
            © 2026 SUDHOM. All rights reserved · GI Tag Holder · Handloom Mark Certified
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Returns"].map((l) => (
              <Link key={l} href="#"
                className="text-[11px] font-sans transition-colors hover:text-gold"
                style={{ color: "rgba(255,253,247,0.25)" }}>
                {l}
              </Link>
            ))}
          </div>
          <p className="font-serif italic text-[11px]" style={{ color: "rgba(201,151,58,0.3)" }}>
            हर हर महादेव
          </p>
        </div>
      </div>
    </footer>
  );
}
