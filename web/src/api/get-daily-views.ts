import { api } from '@/lib/axios'

export interface GetDailyViewsQuery {
  from?: Date
  to?: Date
}

export interface GetDailyViewsResponse {
  viewsPerDay: [
    {
      date: null
      amount: number
    }
  ]
}

export async function getDailyViews({ from, to }:GetDailyViewsQuery): Promise<GetDailyViewsResponse> {
  const response = await api.get<GetDailyViewsResponse>(
    '/sellers/metrics/views/days',
    {
      params: { from, to },
    }
  )

  return response.data
}
