import api from "@/lib/axios";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>("/products/categories");
  return data;
}
