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

export interface GetSellerProductsParams {
  status: string | null
  search: string | null
}

export async function getSellerProducts({ status, search }: GetSellerProductsParams) {
  const response = await api.get<GetSellerProductsResponse>('/products/me', {
    params: {
      status,
      search
    }
  })
  return response.data
}