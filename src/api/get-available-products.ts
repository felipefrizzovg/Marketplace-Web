import { api } from '@/lib/axios'

export interface GetAvailableProductsResponse {
  amount: number
}

export async function getAvailableProducts() {
  const response = await api.get<GetAvailableProductsResponse>('/sellers/metrics/products/available')

  return response.data
}