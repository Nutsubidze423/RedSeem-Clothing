import { ApiProductsResponse, Product, Filters } from "./types";
import { mockProducts } from "./mockData";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=").map((c) => c.trim());
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

function buildMockResponse(
  page: number,
  filters: Filters
): ApiProductsResponse {
  let items = [...mockProducts];

  if (filters.priceFrom !== null) {
    items = items.filter((p) => p.price >= (filters.priceFrom as number));
  }
  if (filters.priceTo !== null) {
    items = items.filter((p) => p.price <= (filters.priceTo as number));
  }
  if (filters.sort === "price_asc") {
    items.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price_desc") {
    items.sort((a, b) => b.price - a.price);
  }

  const perPage = 9;
  const total = items.length;
  const lastPage = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const data = items.slice(start, start + perPage);

  return {
    data,
    meta: { current_page: page, last_page: lastPage, per_page: perPage, total },
  };
}

export async function fetchProducts(
  page = 1,
  filters: Filters = { priceFrom: null, priceTo: null, sort: null }
): Promise<ApiProductsResponse> {
  const token = getCookie("authToken");

  if (!token) return buildMockResponse(page, filters);

  try {
    const params = new URLSearchParams({ page: page.toString() });
    if (filters.priceFrom !== null)
      params.append("filter[price_from]", filters.priceFrom.toString());
    if (filters.priceTo !== null)
      params.append("filter[price_to]", filters.priceTo.toString());
    if (filters.sort) params.append("sort", filters.sort);

    const res = await fetch(`${API_BASE}/products?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data;
  } catch {
    return buildMockResponse(page, filters);
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const token = getCookie("authToken");

  if (!token) {
    return mockProducts.find((p) => p.id === parseInt(id)) ?? null;
  }

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return {
      ...data,
      available_colors: data.available_colors || [],
      available_sizes: data.available_sizes || [],
    };
  } catch {
    return mockProducts.find((p) => p.id === parseInt(id)) ?? null;
  }
}
