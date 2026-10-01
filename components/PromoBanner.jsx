"use client";

/* Ticket-tape / marquee announcement strip — matches screenshot */
const items = [
  "Pure Zari, Tested & Certified",
  "New Factor Silk",
  "Made-to-Drape Blouse Stitching",
  "Easy 7-Day Returns",
  "Handloom Silk",
  "GI Tag Certified",
  "Ships Worldwide",
  "Pure Mulberry Silk",
];

const repeated = [...items, ...items, ...items];

export default function PromoBanner({ variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <div
      className="w-full overflow-hidden py-3 border-y"
      style={{
        background: isDark ? "rgba(155,28,28,0.12)" : "#9B1C1C",
        borderColor: isDark ? "rgba(201,151,58,0.15)" : "transparent",
      }}
    >
      <div className="flex w-max animate-marquee gap-0">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-[11px] font-sans font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: isDark ? "rgba(232,184,75,0.8)" : "rgba(255,253,247,0.9)" }}
          >
            <span style={{ color: isDark ? "#C9973A" : "rgba(255,253,247,0.45)" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
