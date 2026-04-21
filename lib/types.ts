export interface Product {
  id: number;
  name: string;
  price: number;
  cover_image: string;
  images: string[];
  description: string;
  available_colors: string[];
  available_sizes: string[];
  category?: string;
  meta?: {
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
  };
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export interface ApiProductsResponse {
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Filters {
  priceFrom: number | null;
  priceTo: number | null;
  sort: "newest" | "price_asc" | "price_desc" | null;
}
