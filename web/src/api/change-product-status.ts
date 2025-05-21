import { api } from '@/lib/axios'

export async function changeProductStatus(id: string, status: string) {
  const response = await api.patch(`/products/${id}/${status}`)
  return response.data
}
