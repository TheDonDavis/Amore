"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/context/cart-store";
import { useToastStore } from "@/context/toast-store";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import StockBadge from "./StockBadge";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const showToast = useToastStore((s) => s.showToast);

  const isOutOfStock = product.stockStatus === "out_of_stock";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

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
  };

  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden">
        <div className="relative aspect-[3/4] bg-cream transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute right-3 top-3">
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif text-lg tracking-wide text-ink transition-colors group-hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <StockBadge status={product.stockStatus} />
        </div>

        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
          {product.size} · {product.concentration}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm tracking-wide text-ink">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:border-stone disabled:text-stone disabled:hover:bg-transparent"
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
