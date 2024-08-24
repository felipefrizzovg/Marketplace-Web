import { api } from "@/lib/axios";

export interface GetSellerProductsResponse {
  products: {
    id: string
    title: string
    description: string
    priceInCents: number
    owner: {
      id: string
      name: string
      phone: string
      email: string
      avatar: {
        id: string
        url: string
      }
    }
    category: {
      id: string
      title: string
      slug: string
    }
    attachments: {
      id: string
      url: string
    }[]
  }[]
}

export interface GetSellerProductsResponseParams {
  status: "available" | "sold" | "cancelled"
  search: string
}

export async function getSellerProducts() {
  const response = await api.get<GetSellerProductsResponse>('/products/me')
  return response.data
}