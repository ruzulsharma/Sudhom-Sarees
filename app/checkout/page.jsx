"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock, ArrowLeft, CreditCard, Smartphone, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/store";

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

const STEPS = ["Address", "Delivery", "Payment"];

const PAYMENT_METHODS = [
  { id: "card",  icon: CreditCard,  label: "Credit / Debit Card" },
  { id: "upi",   icon: Smartphone,  label: "UPI (PhonePe, GPay, Paytm)" },
  { id: "netbanking", icon: Building2, label: "Net Banking" },
];

function Field({ label, placeholder, type = "text", half = false, required = true }) {
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block mb-1.5 text-[11px] font-sans font-semibold tracking-[0.12em] uppercase"
        style={{ color: "rgba(12,5,10,0.5)" }}>
        {label}{required && <span style={{ color: "#9B1C1C" }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all"
        style={{
          background: "#FAF3E7",
          border: "1px solid rgba(12,5,10,0.12)",
          color: "#12050A",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#9B1C1C")}
        onBlur={(e)  => (e.target.style.borderColor = "rgba(12,5,10,0.12)")}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step,       setStep]       = useState(0); // 0=address, 1=delivery, 2=payment
  const [payMethod,  setPayMethod]  = useState("card");
  const [placed,     setPlaced]     = useState(false);
  const [upiId,      setUpiId]      = useState("");

  const shipping    = total >= 15000 ? 0 : 350;
  const finalTotal  = total + shipping;

  const placeOrder = (e) => {
    e.preventDefault();
    // In production, integrate Razorpay / Stripe here
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
        style={{ background: "#FFFDF7" }}>
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(26,74,53,0.12)" }}>
          <Check size={36} style={{ color: "#1A4A35" }} />
        </div>
        <div>
          <h1 className="font-serif font-semibold text-3xl" style={{ color: "#12050A" }}>
            Order Confirmed!
          </h1>
          <p className="mt-2 font-sans text-sm" style={{ color: "rgba(12,5,10,0.55)" }}>
            Your Banarasi saree will be dispatched within 5–7 business days.<br />
            A confirmation email has been sent to you.
          </p>
        </div>
        <p className="font-serif italic text-sm" style={{ color: "#C9973A" }}>
          "हर हर महादेव" — crafted with devotion from Kashi.
        </p>
        <Link href="/"
          className="rounded-full px-8 py-3.5 font-sans text-sm font-semibold text-ivory transition-all hover:scale-[1.02]"
          style={{ background: "#9B1C1C" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFDF7", minHeight: "100vh" }}>
      <div style={{ background: "#12050A" }}>
        <Navbar transparent={false} />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-16">

        {/* Header + back */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/cart"
            className="flex items-center gap-1.5 text-xs font-sans font-semibold transition-colors hover:text-crimson"
            style={{ color: "rgba(12,5,10,0.45)" }}>
            <ArrowLeft size={14} /> Back to Cart
          </Link>
        </div>

        <h1 className="mb-8 font-serif font-semibold leading-none tracking-tight"
          style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#12050A" }}>
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="mb-10 flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-0">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2"
                disabled={i > step}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-sans font-bold transition-all"
                  style={{
                    background: i <= step ? "#9B1C1C" : "rgba(12,5,10,0.1)",
                    color: i <= step ? "#FFFDF7" : "rgba(12,5,10,0.4)",
                  }}>
                  {i < step ? <Check size={13} /> : i + 1}
                </span>
                <span className="text-xs font-sans font-medium hidden sm:block"
                  style={{ color: i === step ? "#9B1C1C" : "rgba(12,5,10,0.45)" }}>
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="mx-3 h-px w-12 sm:w-20"
                  style={{ background: i < step ? "#9B1C1C" : "rgba(12,5,10,0.12)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">

          {/* ── Left: Form ─────────────────────────── */}
          <form onSubmit={placeOrder}>

            {/* STEP 0 — Address */}
            {step === 0 && (
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
                <h2 className="mb-6 font-serif text-xl font-semibold" style={{ color: "#12050A" }}>
                  Delivery Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name"   placeholder="Priya" half />
                  <Field label="Last Name"    placeholder="Sharma" half />
                  <Field label="Email"        placeholder="priya@example.com" type="email" />
                  <Field label="Phone"        placeholder="+91 98765 43210" type="tel" />
                  <Field label="Address Line 1" placeholder="Flat / House No., Street" />
                  <Field label="Address Line 2" placeholder="Landmark (optional)" required={false} />
                  <Field label="City"         placeholder="Mumbai" half />
                  <Field label="State"        placeholder="Maharashtra" half />
                  <Field label="PIN Code"     placeholder="400001" half />
                  <Field label="Country"      placeholder="India" half />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-6 flex w-full items-center justify-between rounded-full px-6 py-4 font-sans text-sm font-bold tracking-wide transition-all hover:scale-[1.01]"
                  style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                  <span>Continue to Delivery</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">→</span>
                </button>
              </div>
            )}

            {/* STEP 1 — Delivery */}
            {step === 1 && (
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
                <h2 className="mb-6 font-serif text-xl font-semibold" style={{ color: "#12050A" }}>
                  Delivery Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "standard", label: "Standard Delivery",  sub: "5–7 business days",    price: shipping },
                    { id: "express",  label: "Express Delivery",   sub: "2–3 business days",    price: 599 },
                    { id: "premium",  label: "White Glove Delivery",sub: "1 business day · Signature required", price: 1299 },
                  ].map((opt) => (
                    <label key={opt.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl p-4 transition-all"
                      style={{
                        border: "1px solid rgba(12,5,10,0.12)",
                        background: "rgba(255,255,255,0.5)",
                      }}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" value={opt.id} defaultChecked={opt.id === "standard"}
                          className="h-4 w-4 accent-crimson" />
                        <div>
                          <p className="font-sans text-sm font-semibold" style={{ color: "#12050A" }}>{opt.label}</p>
                          <p className="text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>{opt.sub}</p>
                        </div>
                      </div>
                      <p className="font-sans text-sm font-semibold" style={{ color: opt.price === 0 ? "#1A4A35" : "#12050A" }}>
                        {opt.price === 0 ? "FREE" : fmt(opt.price)}
                      </p>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setStep(0)}
                    className="flex-1 rounded-full border py-3.5 text-sm font-sans font-semibold transition-colors hover:border-crimson"
                    style={{ borderColor: "rgba(12,5,10,0.15)", color: "#12050A" }}>
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(2)}
                    className="flex-[2] rounded-full py-3.5 text-sm font-sans font-bold tracking-wide transition-all hover:scale-[1.01]"
                    style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Payment */}
            {step === 2 && (
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
                <h2 className="mb-6 font-serif text-xl font-semibold" style={{ color: "#12050A" }}>
                  Payment
                </h2>

                {/* Payment method tabs */}
                <div className="flex flex-col gap-2 mb-6">
                  {PAYMENT_METHODS.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPayMethod(id)}
                      className="flex items-center gap-3 rounded-xl p-4 text-left transition-all"
                      style={{
                        border: payMethod === id ? "2px solid #9B1C1C" : "1px solid rgba(12,5,10,0.12)",
                        background: payMethod === id ? "rgba(155,28,28,0.04)" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ background: payMethod === id ? "rgba(155,28,28,0.12)" : "rgba(12,5,10,0.06)" }}>
                        <Icon size={16} style={{ color: payMethod === id ? "#9B1C1C" : "rgba(12,5,10,0.5)" }} />
                      </span>
                      <span className="font-sans text-sm font-semibold" style={{ color: "#12050A" }}>
                        {label}
                      </span>
                      {payMethod === id && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full"
                          style={{ background: "#9B1C1C" }}>
                          <Check size={11} style={{ color: "#FFFDF7" }} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {payMethod === "card" && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Field label="Card Number"   placeholder="4242 4242 4242 4242" />
                    <Field label="Name on Card"  placeholder="Priya Sharma" />
                    <Field label="Expiry"        placeholder="MM / YY" half />
                    <Field label="CVV"           placeholder="•••" type="password" half />
                  </div>
                )}

                {/* UPI field */}
                {payMethod === "upi" && (
                  <div className="mb-6">
                    <label className="block mb-1.5 text-[11px] font-sans font-semibold tracking-[0.12em] uppercase"
                      style={{ color: "rgba(12,5,10,0.5)" }}>
                      UPI ID <span style={{ color: "#9B1C1C" }}>*</span>
                    </label>
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full rounded-xl px-4 py-3 text-sm font-sans outline-none"
                      style={{
                        background: "#FAF3E7",
                        border: "1px solid rgba(12,5,10,0.12)",
                        color: "#12050A",
                      }}
                    />
                    <p className="mt-2 text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                      You'll receive a payment request on your UPI app.
                    </p>
                  </div>
                )}

                {/* Net banking placeholder */}
                {payMethod === "netbanking" && (
                  <div className="mb-6">
                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-xl px-4 py-3 text-sm font-sans outline-none"
                        style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.12)", color: "#12050A" }}>
                        <option>Select your bank</option>
                        {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Yes Bank"].map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(12,5,10,0.4)" }} />
                    </div>
                  </div>
                )}

                {/* Secure note */}
                <div className="flex items-center gap-2 mb-6 px-1">
                  <Lock size={13} style={{ color: "#C9973A" }} />
                  <p className="text-[11px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                    Your payment is 256-bit SSL encrypted. We never store card details.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 rounded-full border py-3.5 text-sm font-sans font-semibold"
                    style={{ borderColor: "rgba(12,5,10,0.15)", color: "#12050A" }}>
                    Back
                  </button>
                  <button type="submit"
                    className="flex-[2] flex items-center justify-between rounded-full px-6 py-3.5 font-sans text-sm font-bold tracking-wide transition-all hover:scale-[1.01]"
                    style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                    <span>Place Order · {fmt(finalTotal)}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                      <Lock size={12} />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* ── Right: Order summary ──────────────── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-5"
              style={{ background: "#FAF3E7", border: "1px solid rgba(12,5,10,0.07)" }}>
              <h2 className="mb-4 font-serif text-base font-semibold" style={{ color: "#12050A" }}>
                Order ({items.length} {items.length === 1 ? "item" : "items"})
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl"
                      style={{ background: "#EAD5B0" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=70"
                        alt={item.product.name}
                        className="h-full w-full object-cover object-top"
                        draggable={false}
                      />
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ background: "#9B1C1C", color: "#FFFDF7" }}>
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans font-semibold truncate" style={{ color: "#12050A" }}>
                        {item.product.name}
                      </p>
                      <p className="text-[10px] font-sans" style={{ color: "rgba(12,5,10,0.45)" }}>
                        {item.size} · {item.product.colors.find((c) => c.hex === item.colour)?.name}
                      </p>
                    </div>
                    <p className="text-xs font-sans font-semibold shrink-0" style={{ color: "#12050A" }}>
                      {fmt(item.product.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2 text-sm font-sans pt-4"
                style={{ borderTop: "1px solid rgba(12,5,10,0.08)" }}>
                <div className="flex justify-between" style={{ color: "rgba(12,5,10,0.55)" }}>
                  <span>Subtotal</span><span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "rgba(12,5,10,0.55)" }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#1A4A35" : undefined }}>
                    {shipping === 0 ? "FREE" : fmt(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 font-serif text-base font-semibold"
                  style={{ borderTop: "1px solid rgba(12,5,10,0.08)", color: "#12050A" }}>
                  <span>Total</span>
                  <span style={{ color: "#9B1C1C" }}>{fmt(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Brand assurance */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(155,28,28,0.05)", border: "1px solid rgba(155,28,28,0.1)" }}>
              <p className="font-serif italic text-sm text-center" style={{ color: "rgba(155,28,28,0.7)" }}>
                "Every SUDHOM saree carries the soul of Banaras — woven thread by thread, blessed by centuries of craft."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
