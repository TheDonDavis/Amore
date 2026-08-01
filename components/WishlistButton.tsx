"use client";

import { useWishlistStore } from "@/context/wishlist-store";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({
  productId,
  className,
}: WishlistButtonProps) {
  const { isWishlisted, toggleItem } = useWishlistStore();
  const active = isWishlisted(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(productId);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
        active
          ? "bg-ink text-ivory"
          : "bg-cream/80 text-muted hover:bg-sand hover:text-ink",
        className
      )}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
