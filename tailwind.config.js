/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── SUDHOM Core Palette ──────────────────────
        crimson:       "#9B1C1C",   // deep Banarasi red — primary
        "crimson-mid": "#B91C1C",
        "crimson-light":"#DC2626",
        maroon:        "#4C0519",   // darkest maroon bg
        "maroon-mid":  "#6B0F1A",
        gold:          "#C9973A",   // Banarasi zari gold
        "gold-light":  "#E8B84B",
        "gold-pale":   "#F5DFA0",   // very pale gold for text
        "gold-deep":   "#9A6F2A",
        parchment:     "#FAF3E7",   // warm ivory bg
        cream:         "#FEF8EE",
        silk:          "#EAD5B0",
        "silk-dark":   "#C4A882",
        ivory:         "#FFFDF7",
        ink:           "#12050A",   // warm near-black
        "ink-warm":    "#2D1010",
        charcoal:      "#1C0A0A",
        offwhite:      "#F5F0E8",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        serif:   ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        warm:      "0 2px 8px rgba(155,28,28,0.08), 0 16px 40px -8px rgba(155,28,28,0.14)",
        "warm-lg": "0 4px 12px rgba(155,28,28,0.10), 0 32px 64px -12px rgba(155,28,28,0.20)",
        gold:      "0 4px 24px rgba(201,151,58,0.35)",
        "gold-sm": "0 2px 10px rgba(201,151,58,0.22)",
        card:      "0 1px 3px rgba(12,5,10,0.06), 0 20px 50px -10px rgba(12,5,10,0.18)",
        "card-hover":"0 4px 8px rgba(12,5,10,0.08), 0 32px 64px -12px rgba(12,5,10,0.24)",
        neu:       "0 1px 2px rgba(155,28,28,0.04), 0 12px 32px -8px rgba(155,28,28,0.10)",
        "neu-lg":  "0 2px 4px rgba(155,28,28,0.05), 0 24px 48px -12px rgba(155,28,28,0.14)",
      },
      backgroundImage: {
        "gold-shimmer":  "linear-gradient(90deg, #9A6F2A 0%, #E8B84B 40%, #C9973A 60%, #E8B84B 80%, #9A6F2A 100%)",
        "crimson-grad":  "linear-gradient(135deg, #9B1C1C 0%, #4C0519 100%)",
        "dark-grad":     "linear-gradient(180deg, #12050A 0%, #1C0A0A 100%)",
        "hero-overlay":  "linear-gradient(90deg, rgba(12,5,10,0.82) 0%, rgba(12,5,10,0.5) 55%, rgba(12,5,10,0.1) 100%)",
        "card-overlay":  "linear-gradient(180deg, transparent 35%, rgba(12,5,10,0.85) 100%)",
      },
      animation: {
        "spin-slow":   "spin 22s linear infinite",
        marquee:       "marquee 32s linear infinite",
        "marquee-rev": "marquee-rev 32s linear infinite",
        shimmer:       "shimmer 3s ease-in-out infinite",
        "fade-up":     "fadeUp 0.7s ease both",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% center" },
          "50%":      { backgroundPosition: "0% center" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      letterSpacing: {
        widest:      "0.4em",
        "very-wide": "0.3em",
        "extra":     "0.25em",
      },
    },
  },
  plugins: [],
};
