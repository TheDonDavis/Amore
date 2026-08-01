export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductSize {
  size: string;
  price: number;
  stockStatus?: StockStatus;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  concentration: string;
  images: string[];
  stockStatus?: StockStatus;
  category: string;
  notes?: string[];
  sizes?: ProductSize[];
  isBundle?: boolean;
  bundleItems?: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  concentration: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  parish: string;
  notes?: string;
}

export interface OrderPayload {
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
}

export interface ProductFilters {
  search: string;
  category: string;
  stockStatus: string;
  size: string;
}
