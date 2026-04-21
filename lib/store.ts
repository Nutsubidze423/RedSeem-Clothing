"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, color: string, size: string) => void;
  updateQuantity: (id: number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (newItem) => {
        set((s) => {
          const existing = s.items.find(
            (i) =>
              i.id === newItem.id &&
              i.color === newItem.color &&
              i.size === newItem.size
          );
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === newItem.id &&
                i.color === newItem.color &&
                i.size === newItem.size
                  ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, 10) }
                  : i
              ),
            };
          }
          return { items: [...s.items, newItem] };
        });
        set({ isOpen: true });
      },

      removeItem: (id, color, size) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
          ),
        })),

      updateQuantity: (id, color, size, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter(
                  (i) => !(i.id === id && i.color === color && i.size === size)
                )
              : s.items.map((i) =>
                  i.id === id && i.color === color && i.size === size
                    ? { ...i, quantity: Math.min(quantity, 10) }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "redseem-cart" }
  )
);
