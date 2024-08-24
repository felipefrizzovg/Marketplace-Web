import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { getSellerProducts } from '@/api/get-seller-products'
import { ProductStatus } from '@/components/order-status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Products() {
  const { data: productsResponse } = useQuery({
    queryFn: getSellerProducts,
    queryKey: ['products'],
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
        <Card className="flex h-[300px] w-[330px] shrink-0 grow-0 flex-col items-start gap-6 p-6">
          <CardHeader className="space-y-0 p-0">
            <CardTitle className="font-sans text-lg font-bold text-grayScale-300">
              Filtrar
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full p-0">
            <form className="flex flex-col items-start gap-10 self-stretch">
              <div className="flex w-full flex-col items-start gap-5 self-start">
                <Input
                  className="py-4 placeholder:font-poppins placeholder:text-base placeholder:text-grayScale-200"
                  placeholder="Pesquisar"
                />

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anunciado">Anunciado</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="h-14 w-full bg-orange-base px-5 hover:bg-orange-dark"
              >
                Aplicar filtro
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <Link className="grid grid-cols-2 gap-4" to="/products-info">
            {productsResponse &&
              productsResponse.products.map((product) => {
                return (
                  <>
                    <Card className="relative rounded-t-3xl">
                      <div className="absolute right-2 top-2 z-10 flex gap-2">
                        <ProductStatus status="sold" />
                        <Badge
                          className="right-4 top-1 z-10 bg-grayScale-400"
                          variant="default"
                        >
                          {product.category.title}
                        </Badge>
                      </div>
                      <img
                        src={product.attachments[0].url}
                        className="h-[350px] w-full"
                        alt=""
                      />
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                            {product.title}
                          </h2>
                          <h3 className="font-sans text-lg font-bold text-grayScale-500">
                            {product.priceInCents.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </h3>
                        </div>
                        <p className="font-poppins text-sm font-normal text-grayScale-300">
                          {product.description}
                        </p>
                      </div>
                    </Card>
                  </>
                )
              })}
          </Link>
        </div>
      </div>
    </>
  )
}
