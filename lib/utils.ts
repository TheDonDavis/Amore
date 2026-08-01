import type { Product, ProductFilters } from "./types";

export function formatPrice(amount: number): string {
  return `JMD ${amount.toLocaleString("en-JM")}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getStockLabel(status?: string): string {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "low_stock":
      return "Low Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Available";
  }
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    const searchMatch =
      !filters.search ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.search.toLowerCase());

    const categoryMatch =
      !filters.category || product.category === filters.category;

    const stockMatch =
      !filters.stockStatus || product.stockStatus === filters.stockStatus;

    const sizeMatch =
      !filters.size ||
      product.size === filters.size ||
      product.sizes?.some((s) => s.size === filters.size);

    return searchMatch && categoryMatch && stockMatch && sizeMatch;
  });
}

export function getProductCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function getProductSizes(products: Product[]): string[] {
  const sizes = new Set<string>();
  products.forEach((p) => {
    sizes.add(p.size);
    p.sizes?.forEach((s) => sizes.add(s.size));
  });
  return [...sizes];
}

export function calculateCartTotal(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function buildWhatsAppMessage(
  items: { name: string; size: string; quantity: number; price: number }[],
  total: number,
  brandName: string
): string {
  const lines = items.map(
    (item) =>
      `• ${item.name} (${item.size}) x${item.quantity} — JMD ${(item.price * item.quantity).toLocaleString("en-JM")}`
  );

  return [
    `Hello! I'd like to place an order with ${brandName}.`,
    "",
    ...lines,
    "",
    `Total: JMD ${total.toLocaleString("en-JM")}`,
  ].join("\n");
}
