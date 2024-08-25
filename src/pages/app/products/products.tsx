import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'

import { getSellerProducts } from '@/api/get-seller-products'
import { ProductStatus } from '@/components/product-status'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

import { ProductsFilters } from './products-filter'

export function Products() {
  const [searchParams] = useSearchParams()

  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const { data: productsResponse } = useQuery({
    queryFn: () => getSellerProducts({ status, search }),
    queryKey: ['products', status, search],
  })

  return (
    <>
      <Helmet title="Products" />
      <h1 className="font-sans text-2xl font-bold text-grayScale-500">
        Seus produtos
      </h1>
      <p className="mb-10 font-poppins text-sm font-normal text-grayScale-300">
        Acesse e gerencie a lista de produtos à venda
      </p>
      <div className="flex gap-6">
        <ProductsFilters />

        <div className="grid grid-cols-2 gap-4">
          {productsResponse &&
            productsResponse.products.map((product) => {
              return (
                <Link to={`/products-info/${product.id}`} key={product.id}>
                  {/* Envolva cada Card em um Link individual */}
                  <Card className="relative rounded-t-3xl">
                    <div className="absolute right-2 top-2 z-10 flex gap-2">
                      <ProductStatus status={product.status} />
                      <Badge
                        className="right-4 top-1 z-10 bg-grayScale-400"
                        variant="default"
                      >
                        {product.category.title}
                      </Badge>
                    </div>
                    <img
                      src={product.attachments[0].url}
                      className="h-[350px] w-full rounded-md"
                      alt=""
                    />
                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                          {product.title}
                        </h2>
                        <h3 className="font-sans text-lg font-bold text-grayScale-500">
                          {(product.priceInCents / 100).toLocaleString(
                            'pt-BR',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            },
                          )}
                        </h3>
                      </div>
                      <p className="font-poppins text-sm font-normal text-grayScale-300">
                        {product.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              )
            })}
        </div>
      </div>
    </>
  )
}
