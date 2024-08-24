import { api } from '@/lib/axios'

export interface GetMonthlyViewsResponse {
  amount: number
}

export async function getMonthlyViews() {
  const response = await api.get<GetMonthlyViewsResponse>('/sellers/metrics/views')

  return response.data
}