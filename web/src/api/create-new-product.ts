import { api } from '@/lib/axios'

export interface CreateNewProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export async function createNewProduct({ title, categoryId, description, priceInCents, attachmentsIds }: CreateNewProductBody) {
  await api.post('/products', { title, categoryId, description, priceInCents, attachmentsIds })
}
