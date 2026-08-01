"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 overflow-hidden border transition-all duration-300",
                i === activeIndex
                  ? "border-ink"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
