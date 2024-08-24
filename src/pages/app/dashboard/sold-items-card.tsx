import { useQuery } from '@tanstack/react-query'
import { Tag } from 'lucide-react'

import { getProductsSold } from '@/api/get-products-sold'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SoldItemsCard() {
  const { data: productsSold } = useQuery({
    queryFn: getProductsSold,
    queryKey: ['metrics', 'products-sold'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 py-3 pl-3">
        <CardTitle className="h-20 w-20 rounded-xl bg-blue-light px-5 py-6">
          <Tag className="h-10 w-10 text-blue-dark" />
        </CardTitle>
        <CardContent className="flex flex-col gap-1 p-2 font-sans text-3xl font-bold text-grayScale-400">
          {productsSold && (
            <>
              <span>{productsSold.amount}</span>
              <p className="flex flex-col font-poppins text-xs font-normal text-grayScale-300">
                produtos <span>vendidos</span>
              </p>
            </>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  )
}
