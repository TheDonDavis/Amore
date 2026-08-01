"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";
import { calculateCartTotal } from "@/lib/utils";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

function itemKey(productId: string, size: string) {
  return `${productId}-${size}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.size) === itemKey(item.productId, item.size)
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.size) === itemKey(item.productId, item.size)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.size) !== itemKey(productId, size)
          ),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.productId, i.size) === itemKey(productId, size)
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getTotal: () => calculateCartTotal(get().items),
      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "elan-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
