"use client";

import Link from "next/link";
import { useCartStore } from "@/context/cart-store";
import { useWishlistStore } from "@/context/wishlist-store";

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Élan Decants";

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/60 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.12em] text-ink transition-opacity hover:opacity-70"
        >
          {brandName}
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/#collection"
            className="hidden text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink sm:block"
          >
            Collection
          </Link>

          <Link
            href="/wishlist"
            className="relative text-muted transition-colors hover:text-ink"
            aria-label="Wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-ivory">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative text-muted transition-colors hover:text-ink"
            aria-label="Open cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-ivory">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
