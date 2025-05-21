import { api } from "@/lib/axios"; 

export interface EditProductData {
  title: string; 
  categoryId: string;  
  description: string; 
  priceInCents: number; 
  attachmentsIds: string[];
}

export async function editProduct(id: string, updatedData: EditProductData) {
  const response = await api.put(`/products/${id}`, updatedData);
  return response.data
}