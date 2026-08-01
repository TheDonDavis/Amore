"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/context/cart-store";
import { useToastStore } from "@/context/toast-store";
import ProductGallery from "@/components/ProductGallery";
import StockBadge from "@/components/StockBadge";
import WishlistButton from "@/components/WishlistButton";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const availableSizes = product.sizes ?? [
    { size: product.size, price: product.price, stockStatus: product.stockStatus },
  ];

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const showToast = useToastStore((s) => s.showToast);

  const isOutOfStock = selectedSize.stockStatus === "out_of_stock";

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem(
      {
        productId: product.id,
        name: product.name,
        size: selectedSize.size,
        price: selectedSize.price,
        image: product.images[0],
        concentration: product.concentration,
      },
      1
    );
    showToast(`${product.name} added to cart`);
    openCart();
  };

  return (
    <div className="px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#collection"
          className="mb-8 inline-block text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
        >
          ← Back to Collection
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {product.category}
                </p>
                <h1 className="mt-2 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
                  {product.name}
                </h1>
              </div>
              <WishlistButton productId={product.id} />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.1em] text-muted">
                {product.concentration}
              </span>
              <StockBadge status={selectedSize.stockStatus ?? product.stockStatus} />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            {product.notes && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
                  Notes
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="border border-sand px-3 py-1 text-xs text-ink"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {availableSizes.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
                  Size
                </h3>
                <div className="mt-3 flex gap-2">
                  {availableSizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`border px-4 py-2 text-xs uppercase tracking-[0.1em] transition-all duration-300 ${
                        selectedSize.size === sizeOption.size
                          ? "border-ink bg-ink text-ivory"
                          : "border-sand text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-10">
              <div className="flex items-center justify-between border-t border-sand/60 pt-6">
                <span className="font-serif text-2xl text-ink">
                  {formatPrice(selectedSize.price)}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-stone"
                >
                  {isOutOfStock ? "Unavailable" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
