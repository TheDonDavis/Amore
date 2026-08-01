import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import ProductDetail from "./ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Élan Decants";

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brandName}`,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
