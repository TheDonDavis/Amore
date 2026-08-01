"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/context/cart-store";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, getTotal } = useCartStore();
  const total = getTotal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden
      />

      <aside
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-sand/60 px-6 py-5">
          <h2 className="font-serif text-xl tracking-wide text-ink">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-sm text-muted">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-xs uppercase tracking-[0.15em] text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.size}`}
                item={item}
              />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand/60 px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.15em] text-muted">
                Subtotal
              </span>
              <span className="font-serif text-lg text-ink">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-ink py-3.5 text-center text-xs uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-90"
            >
              Request Order
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-3 block text-center text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
