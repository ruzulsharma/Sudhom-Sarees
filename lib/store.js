/**
 * SUDHOM — minimal cart store using localStorage + React context.
 * No external state library needed.
 */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sudhom_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem("sudhom_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, size, colour, qty = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size}-${colour}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { key, product, size, colour, qty }];
    });
  };

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) { removeItem(key); return; }
    setItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total    = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count    = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
