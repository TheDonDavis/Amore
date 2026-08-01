import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "Azzaro-Mostwanted",
    name: "Azzaro Most Wanted EDP",
    description:
      "a bold, irresistible blend of spicy cardamom, rich caramel, and warm amber woods that exudes confidence and leaves an unforgettable impression. Long-lasting and effortlessly seductive.",
    price: 1500,
    size: "5ml",
    concentration: "EDP",
    category: "Summer Evening",
    stockStatus: "in_stock",
    images: ["/images/products/azzaro.png"],
    notes: ["Warm, Sweet, Spicy, Woody"],
    sizes: [
      { size: "5ml", price: 1500, stockStatus: "in_stock" },
      { size: "10ml", price: 2000, stockStatus: "low_stock" },
    ],
  },
  {
    id: "citrus-linen",
    name: "Citrus & Linen",
    description:
      "A crisp, sun-drenched composition of bergamot, white linen, and soft musk. Clean, luminous, and effortlessly refined for everyday wear.",
    price: 2800,
    size: "5ml",
    concentration: "EDP",
    category: "Fresh",
    stockStatus: "in_stock",
    images: ["/images/products/citrus-linen.svg"],
    notes: ["Bergamot", "White Linen", "Neroli", "Soft Musk"],
    sizes: [
      { size: "5ml", price: 2800, stockStatus: "in_stock" },
      { size: "10ml", price: 4900, stockStatus: "in_stock" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 2): Product[] {
  const current = getProductById(id);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== id && p.category === current.category)
    .slice(0, limit);
}
