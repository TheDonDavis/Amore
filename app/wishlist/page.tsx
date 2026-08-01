"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useWishlistStore } from "@/context/wishlist-store";
import { useCartStore } from "@/context/cart-store";
import { useToastStore } from "@/context/toast-store";
import { formatPrice } from "@/lib/utils";
import StockBadge from "@/components/StockBadge";

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const showToast = useToastStore((s) => s.showToast);

  const wishlistedProducts = products.filter((p) =>
    wishlistItems.includes(p.id)
  );

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-serif text-3xl font-light tracking-wide text-ink">
          Wishlist
        </h1>
        <p className="mt-4 text-sm text-muted">Your wishlist is empty.</p>
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
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-light tracking-wide text-ink">
          Wishlist
        </h1>
        <p className="mt-2 text-sm text-muted">
          {wishlistedProducts.length}{" "}
          {wishlistedProducts.length === 1 ? "item" : "items"} saved
        </p>

        <div className="mt-10 space-y-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-6 border-b border-sand/60 pb-6"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative h-28 w-20 flex-shrink-0 overflow-hidden bg-cream"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>

              <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-lg tracking-wide text-ink hover:text-accent">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
                    {product.size} · {product.concentration}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-sm text-ink">
                      {formatPrice(product.price)}
                    </span>
                    <StockBadge status={product.stockStatus} />
                  </div>
                </div>

                <div className="mt-4 flex gap-3 sm:mt-0">
                  <button
                    onClick={() => {
                      if (product.stockStatus !== "out_of_stock") {
                        addItem({
                          productId: product.id,
                          name: product.name,
                          size: product.size,
                          price: product.price,
                          image: product.images[0],
                          concentration: product.concentration,
                        });
                        showToast(`${product.name} added to cart`);
                        openCart();
                      }
                    }}
                    disabled={product.stockStatus === "out_of_stock"}
                    className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-ink transition-all hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:border-stone disabled:text-stone"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
