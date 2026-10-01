"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/store";

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

const TRUST = [
  { icon: "🔒", label: "Secure Payment",      sub: "SSL encrypted checkout" },
  { icon: "🚚", label: "Free Shipping",         sub: "On orders above ₹15,000" },
  { icon: "↩️", label: "7-Day Returns",          sub: "Hassle-free returns" },
  { icon: "🏅", label: "GI Tag Certified",      sub: "Authentic Banarasi" },
];

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const [coupon, setCoupon]   = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const shipping = total >= 15000 ? 0 : 350;
  const finalTotal = total - discount + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "KASHI10") {
      const d = Math.round(total * 0.1);
      setDiscount(d);
      setCouponMsg(`✓ 10% discount applied — saving ${fmt(d)}`);
    } else {
      setDiscount(0);
      setCouponMsg("✗ Invalid coupon code");
    }
  };

  return (
    <div style={{ background: "#FFFDF7", minHeight: "100vh" }}>
      <div style={{ background: "#12050A" }}>
        <Navbar transparent={false} />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-16">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="font-serif font-semibold leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#12050A" }}>
              Your Collection
            </h1>
            <p className="mt-1.5 text-sm font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
              {count} {count === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link href="/collections"
            className="text-xs font-sans font-semibold tracking-[0.15em] uppercase underline underline-offset-4 transition-colors hover:text-crimson"
            style={{ color: "rgba(12,5,10,0.4)" }}>
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* ── Empty state ─────────────────────────── */
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <ShoppingBag size={56} style={{ color: "rgba(12,5,10,0.15)" }} strokeWidth={1} />
            <div>
              <p className="font-serif text-2xl font-semibold" style={{ color: "#12050A" }}>
                Your cart is empty
              </p>
              <p className="mt-2 text-sm font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                Discover our Banarasi collections and add your favourites.
              </p>
            </div>
            <Link href="/collections"
              className="rounded-full px-8 py-3.5 font-sans text-sm font-semibold text-ivory transition-all hover:scale-[1.02]"
              style={{ background: "#9B1C1C" }}>
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

            {/* ── Cart items ───────────────────────── */}
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.key}
                  className="flex gap-4 rounded-2xl p-4"
                  style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>

                  {/* Thumb */}
                  <Link href={`/product/${item.product.id}`}
                    className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-28">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80`}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-top"
                      draggable={false}
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                    <div>
                      <Link href={`/product/${item.product.id}`}>
                        <p className="font-serif font-semibold leading-snug hover:text-crimson transition-colors"
                          style={{ color: "#12050A", fontSize: "clamp(0.9rem,1.5vw,1.05rem)" }}>
                          {item.product.name}
                        </p>
                      </Link>
                      <p className="mt-0.5 text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                        {item.product.fabric}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-3 text-[11px] font-sans"
                        style={{ color: "rgba(12,5,10,0.5)" }}>
                        <span>Size: <strong>{item.size}</strong></span>
                        <span className="flex items-center gap-1">
                          Colour:
                          <span className="ml-1 inline-block h-3.5 w-3.5 rounded-full border"
                            style={{ background: item.colour, borderColor: "rgba(12,5,10,0.15)" }} />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-0 rounded-full border overflow-hidden"
                        style={{ borderColor: "rgba(12,5,10,0.12)" }}>
                        <button onClick={() => updateQty(item.key, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-black/5"
                          style={{ color: "#12050A" }}>
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-sans font-medium"
                          style={{ color: "#12050A" }}>
                          {item.qty}
                        </span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-black/5"
                          style={{ color: "#12050A" }}>
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-serif font-semibold text-base" style={{ color: "#9B1C1C" }}>
                        {fmt(item.product.price * item.qty)}
                      </p>

                      {/* Remove */}
                      <button onClick={() => removeItem(item.key)} aria-label="Remove"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-crimson/10"
                        style={{ color: "rgba(12,5,10,0.35)" }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order summary ────────────────────── */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-6"
                style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
                <h2 className="font-serif text-xl font-semibold mb-5" style={{ color: "#12050A" }}>
                  Order Summary
                </h2>

                {/* Line items */}
                <div className="flex flex-col gap-3 text-sm font-sans">
                  <div className="flex justify-between" style={{ color: "rgba(12,5,10,0.6)" }}>
                    <span>Subtotal ({count} items)</span>
                    <span>{fmt(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between" style={{ color: "#1A4A35" }}>
                      <span>Coupon discount</span>
                      <span>−{fmt(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ color: "rgba(12,5,10,0.6)" }}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px]" style={{ color: "#9B1C1C" }}>
                      Add {fmt(15000 - total)} more for free shipping
                    </p>
                  )}
                  <div
                    className="flex justify-between pt-3 font-serif text-lg font-semibold"
                    style={{ borderTop: "1px solid rgba(12,5,10,0.1)", color: "#12050A" }}>
                    <span>Total</span>
                    <span style={{ color: "#9B1C1C" }}>{fmt(finalTotal)}</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-5">
                  <div className="flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code (try KASHI10)"
                      className="flex-1 rounded-full px-4 py-2.5 text-xs font-sans outline-none"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(12,5,10,0.12)",
                        color: "#12050A",
                      }}
                    />
                    <button onClick={applyCoupon}
                      className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-sans font-semibold transition-all hover:scale-[1.02]"
                      style={{ background: "#12050A", color: "#FFFDF7" }}>
                      <Tag size={12} /> Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className="mt-2 text-[11px] font-sans"
                      style={{ color: couponMsg.startsWith("✓") ? "#1A4A35" : "#9B1C1C" }}>
                      {couponMsg}
                    </p>
                  )}
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="mt-5 flex w-full items-center justify-between rounded-full px-6 py-4 font-sans text-sm font-bold tracking-wide transition-all hover:scale-[1.01]"
                  style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                  <span>Proceed to Checkout</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2">
                {TRUST.map((t) => (
                  <div key={t.label}
                    className="flex items-start gap-2.5 rounded-xl p-3"
                    style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
                    <span className="text-base">{t.icon}</span>
                    <div>
                      <p className="text-[11px] font-sans font-semibold" style={{ color: "#12050A" }}>
                        {t.label}
                      </p>
                      <p className="text-[10px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                        {t.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
