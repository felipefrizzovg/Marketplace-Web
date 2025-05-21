import { api } from "@/lib/axios";

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export async function getCategories(): Promise<GetCategoriesResponse> {
  try {
    const response = await api.get<GetCategoriesResponse>('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
}
