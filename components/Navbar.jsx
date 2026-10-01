"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "Sarees",      href: "/collections/sarees", sub: ["Banarasi Silk", "Katan", "Georgette", "Organza", "Tussar"] },
  { label: "Collections", href: "/collections", sub: ["Bridal Edit", "Festive", "Everyday", "New Arrivals"] },
  { label: "Occasion",    href: "/occasion", sub: ["Wedding", "Puja & Festivals", "Office Wear", "Gifting"] },
  { label: "About",       href: "/about" },
];

export default function Navbar({ transparent = true, cartCount = 0 }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isDark = transparent && !scrolled;

  return (
    <>
      {/* ── Announcement bar ────────────────────────────── */}
      <div
        className="w-full py-2 text-center text-[11px] font-sans font-medium tracking-[0.25em] uppercase"
        style={{ background: "#9B1C1C", color: "#FFFDF7" }}
      >
        ✦ NEW DROP · FREE SHIPPING ALL OVER INDIA ✦ PURE ZARI CERTIFIED ✦ EASY 7-DAY RETURNS ✦
      </div>

      {/* ── Main nav ────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(18,5,10,0.97)"
            : "linear-gradient(180deg, rgba(18,5,10,0.72) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
          borderBottom: scrolled ? "1px solid rgba(201,151,58,0.15)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="font-serif font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "#FFFDF7" }}
            >
              Sudhom
            </span>
            <span
              className="text-[8px] tracking-[0.4em] font-sans font-medium uppercase"
              style={{ color: "#C9973A" }}
            >
              Banaras · Est. 1947
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}
                className="relative"
                onMouseEnter={() => setActiveHover(link.label)}
                onMouseLeave={() => setActiveHover(null)}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-sans font-medium tracking-wide transition-colors"
                  style={{ color: "rgba(255,253,247,0.78)" }}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={12} className="opacity-50" />}
                </Link>
                {/* Hover underline */}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: activeHover === link.label ? "100%" : "0%",
                    background: "linear-gradient(90deg,#C9973A,#E8B84B)",
                  }}
                />
                {/* Dropdown */}
                {link.sub && activeHover === link.label && (
                  <div
                    className="absolute top-full left-0 mt-3 w-44 rounded-xl overflow-hidden shadow-warm-lg"
                    style={{ background: "rgba(18,5,10,0.97)", border: "1px solid rgba(201,151,58,0.18)" }}
                  >
                    {link.sub.map((s) => (
                      <Link
                        key={s}
                        href="#"
                        className="block px-4 py-2.5 text-xs font-sans tracking-wide transition-colors hover:text-gold"
                        style={{ color: "rgba(255,253,247,0.65)", borderBottom: "1px solid rgba(255,253,247,0.04)" }}
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/8"
              style={{ color: "rgba(255,253,247,0.7)" }}
            >
              <Search size={16} strokeWidth={1.6} />
            </button>

            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/8"
              style={{ color: "rgba(255,253,247,0.7)" }}
            >
              <Heart size={16} strokeWidth={1.6} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/8"
              style={{ color: "rgba(255,253,247,0.7)" }}
            >
              <ShoppingBag size={16} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: "#9B1C1C", color: "#FFFDF7" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/8 lg:hidden"
              style={{ color: "rgba(255,253,247,0.7)" }}
            >
              <Menu size={18} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[300] flex">
          <div className="flex-1 bg-ink/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="flex w-80 flex-col" style={{ background: "#1C0A0A" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(201,151,58,0.15)" }}>
              <span className="font-serif text-xl font-semibold tracking-widest text-ivory uppercase">Sudhom</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/50 hover:text-gold">
                <X size={18} />
              </button>
            </div>
            {/* Links */}
            <ul className="flex flex-col px-6 py-2 gap-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-lg font-medium text-ivory/80 hover:text-gold transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,253,247,0.05)" }}>
                    {link.label}
                    <span className="text-gold/40 text-sm">›</span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* Bottom */}
            <div className="mt-auto p-6">
              <p className="text-center text-[10px] tracking-[0.5em] text-ivory/20 font-sans uppercase">हर हर महादेव</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
