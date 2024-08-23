import { Link } from 'react-router-dom'

import brinquedo from '@/assets/brinquedo.png'
import caderno from '@/assets/caderno.png'
import camiseta from '@/assets/camiseta.png'
import cremes from '@/assets/cremes.png'
import sofa from '@/assets/sofa.png'
import utensilios from '@/assets/utensilios.png'
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
  return (
    <>
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
            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-blue-dark"
                variant="default"
              >
                Anunciado
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={sofa} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Sofá
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 1200,90
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Sofá revestido em couro legítimo, com estrutura em madeira
                  maciça e pés em metal cromado.
                </p>
              </div>
            </Card>

            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-blue-dark"
                variant="default"
              >
                Anunciado
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={camiseta} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Camiseta masculina
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 35,89
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Camiseta básica cinza, confeccionada em algodão 100%, com
                  corte slim fit e gola redonda.
                </p>
              </div>
            </Card>

            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-blue-dark"
                variant="default"
              >
                Anunciado
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={utensilios} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Kit utensílios
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 86,79
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Conjunto com 10 de cozinha, feitos medeira de bambu.
                </p>
              </div>
            </Card>

            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-blue-dark"
                variant="default"
              >
                Anunciado
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={cremes} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Kit de cremes
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 159,90
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Conjunto de cuidados com a pele contendo 3 cremes: hidratante
                  facial, creme para as mãos e crememe anti-idade.
                </p>
              </div>
            </Card>

            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-semantic-success"
                variant="default"
              >
                Vendido
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={caderno} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Caderno de desenho
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 56,00
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Caderno tamanho A4 com 120 páginas, gramatura de 180g/m²,
                  ideal para técnicas variadas como lápis, carvão e tinta.
                </p>
              </div>
            </Card>

            <Card className="relative rounded-t-3xl">
              <Badge
                className="absolute right-20 top-1 z-10 bg-blue-dark"
                variant="default"
              >
                Anunciado
              </Badge>
              <Badge
                className="absolute right-4 top-1 z-10 bg-grayScale-400"
                variant="default"
              >
                Móvel
              </Badge>
              <img src={brinquedo} className="w-full" alt="" />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-base font-semibold text-grayScale-400">
                    Carro de brinquedo
                  </h2>
                  <h3 className="font-sans text-lg font-bold text-grayScale-500">
                    R$ 24,60
                  </h3>
                </div>
                <p className="font-poppins text-sm font-normal text-grayScale-300">
                  Carrinho de brinquedo na cor amarela, feito de metal, com
                  detalhes realistas.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  )
}
