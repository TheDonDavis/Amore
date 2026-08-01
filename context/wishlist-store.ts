"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: string[];
  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  removeItem: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (productId) => {
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items.filter((id) => id !== productId)
            : [...state.items, productId],
        }));
      },

      isWishlisted: (productId) => get().items.includes(productId),

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },
    }),
    {
      name: "elan-wishlist",
    }
  )
);
