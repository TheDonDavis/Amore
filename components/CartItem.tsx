"use client";

import Image from "next/image";
import { useCartStore } from "@/context/cart-store";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 border-b border-sand/60 py-5">
      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-cream">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-serif text-sm tracking-wide text-ink">
              {item.name}
            </h4>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-muted">
              {item.size} · {item.concentration}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            className="text-xs text-stone transition-colors hover:text-ink"
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center border border-sand">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              className="px-2.5 py-1 text-sm text-muted transition-colors hover:text-ink"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-xs text-ink">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              className="px-2.5 py-1 text-sm text-muted transition-colors hover:text-ink"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-sm text-ink">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
