import { ArrowLeft, Ban, Check, ImageUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function NewProduct() {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex flex-col justify-end gap-2">
          <Link
            className="flex items-center gap-2 font-poppins text-sm font-medium text-orange-base"
            to="/products"
          >
            <ArrowLeft />
            Voltar
          </Link>

          <h1 className="font-sans text-2xl font-bold text-grayScale-500">
            Editar produto
          </h1>
          <p className="font-poppins text-sm font-normal text-grayScale-300">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="flex items-end gap-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-transparent p-0 font-poppins text-sm font-medium text-orange-base hover:bg-inherit hover:text-orange-dark"
          >
            <Check />
            Marcar como vendido
          </button>
          <button
            type="button"
            className="flex items-center gap-2 self-end bg-transparent p-0 font-poppins text-sm font-medium text-orange-base hover:bg-inherit hover:text-orange-dark"
          >
            <Ban />
            Desativar anúncio
          </button>
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <label className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px] bg-shape-shape">
          <ImageUp className="h-10 w-10 text-orange-base" />
          <span className="font-poppins text-sm text-grayScale-300">
            Selecione a imagem do produto
          </span>
          <input type="file" className="hidden" />
        </label>
        <Card className="flex grow flex-col gap-6 p-6">
          <CardHeader className="p-0">
            <CardTitle className="flex justify-between font-sans text-lg font-bold text-grayScale-300">
              Dados do produto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex-[2_2_0%]">
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Título
                    </Label>
                    <Input placeholder="Nome do produto" className="" />
                  </div>

                  <div className="flex-1">
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Valor
                    </Label>
                    <Input placeholder="R$ 0,00" />
                  </div>
                </div>

                <div>
                  <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                    Descrição
                  </Label>
                  <Textarea placeholder="Escreva detalhes sobre o produto, tamanho, características" />
                </div>

                <div>
                  <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                    Categoria
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Selecione"
                        className="placeholder:text-grayScale-200"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-grayScale-400"
                        value="Brinquedo"
                      >
                        Brinquedo
                      </SelectItem>
                      <SelectItem value="Móvel">Móvel</SelectItem>
                      <SelectItem value="Papelaria">Papelaria</SelectItem>
                      <SelectItem value="Saúde">Saúde & Beleza</SelectItem>
                      <SelectItem value="Utensílio">Utensílio</SelectItem>
                      <SelectItem value="Vestuário">Vestuário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 border-orange-base text-orange-base hover:border-orange-dark hover:bg-transparent hover:text-orange-dark"
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-orange-base text-white hover:bg-orange-dark">
                  Salvar e publicar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
