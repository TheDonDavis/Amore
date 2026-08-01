"use client";

import Link from "next/link";
import CartItemRow from "@/components/CartItem";
import { useCartStore } from "@/context/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-serif text-3xl font-light tracking-wide text-ink">
          Your Cart
        </h1>
        <p className="mt-4 text-sm text-muted">Your cart is currently empty.</p>
        <Link
          href="/#collection"
          className="mt-8 border border-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-ink hover:text-ivory"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-light tracking-wide text-ink">
          Your Cart
        </h1>
        <p className="mt-2 text-sm text-muted">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>

        <div className="mt-8">
          {items.map((item) => (
            <CartItemRow
              key={`${item.productId}-${item.size}`}
              item={item}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-sand/60 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.15em] text-muted">
              Total
            </span>
            <span className="font-serif text-2xl text-ink">
              {formatPrice(total)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full bg-ink py-4 text-center text-xs uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-90"
          >
            Request Order
          </Link>
        </div>
      </div>
    </div>
  );
}
