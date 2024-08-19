import { Store } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AnnouncedProductsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-0 py-3 pl-3 pr-7">
        <CardTitle className="h-20 w-20 rounded-xl bg-blue-light px-5 py-6">
          <Store className="h-10 w-10 text-blue-dark" />
        </CardTitle>
        <CardContent className="flex flex-col gap-1 p-2 font-sans text-3xl font-bold text-grayScale-400">
          56{' '}
          <span className="flex flex-col font-poppins text-xs font-normal text-grayScale-300">
            produtos <span>anunciados</span>
          </span>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
