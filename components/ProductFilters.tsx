"use client";

import type { ProductFilters } from "@/lib/types";

interface ProductFiltersBarProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  categories: string[];
  sizes: string[];
}

export default function ProductFiltersBar({
  filters,
  onChange,
  categories,
  sizes,
}: ProductFiltersBarProps) {
  const update = (key: keyof ProductFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const selectClass =
    "border border-sand bg-ivory px-4 py-3 text-sm text-ink transition-colors focus:border-accent focus:outline-none";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className={selectClass}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={filters.size}
        onChange={(e) => update("size", e.target.value)}
        className={selectClass}
        aria-label="Filter by size"
      >
        <option value="">All Sizes</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <select
        value={filters.stockStatus}
        onChange={(e) => update("stockStatus", e.target.value)}
        className={selectClass}
        aria-label="Filter by availability"
      >
        <option value="">All Availability</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>
  );
}
