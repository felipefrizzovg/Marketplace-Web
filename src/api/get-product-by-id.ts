import { api } from '@/lib/axios'

export interface GetProductByIdBody {
  product: {
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
  }
}

export async function getProductById(id: string) {
  const response = await api.get<GetProductByIdBody>(`/products/${id}`)
  return response.data.product
}
