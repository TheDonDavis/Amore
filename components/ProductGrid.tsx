"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import type { ProductFilters } from "@/lib/types";
import {
  filterProducts,
  getProductCategories,
  getProductSizes,
} from "@/lib/utils";
import ProductCard from "./ProductCard";
import ProductFiltersBar from "./ProductFilters";
import SearchBar from "./SearchBar";

export default function ProductGrid() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    stockStatus: "",
    size: "",
  });

  const categories = useMemo(() => getProductCategories(products), []);
  const sizes = useMemo(() => getProductSizes(products), []);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );

  return (
    <section id="collection" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            The Collection
          </h2>
          <p className="mt-3 text-sm text-muted">
            Hand-selected fragrances, decanted with precision
          </p>
        </div>

        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <SearchBar
            value={filters.search}
            onChange={(search) => setFilters((f) => ({ ...f, search }))}
          />
          <ProductFiltersBar
            filters={filters}
            onChange={setFilters}
            categories={categories}
            sizes={sizes}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">
            No fragrances match your search. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
