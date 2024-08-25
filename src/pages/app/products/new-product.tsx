import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, ImageUp } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { createNewProduct } from '@/api/create-new-product'
import { Category, getCategories } from '@/api/get-categories'
import { uploadImages } from '@/api/upload-images'
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

const ACCEPTED_IMAGE_TYPES = ['image/png']

const createNewProductBody = z.object({
  title: z.string(),
  categoryId: z.string().uuid(),
  description: z.string(),
  priceInCents: z.number(),
  attachmentsIds: z.string().array(),
})

type CreateNewProductBody = z.infer<typeof createNewProductBody>

export function NewProduct() {
  const { mutateAsync: createNewProductFn } = useMutation({
    mutationFn: createNewProduct,
  })
  const { mutateAsync: uploadImagesFn } = useMutation({
    mutationFn: uploadImages,
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<CreateNewProductBody>()

  const onSubmit = async (data: CreateNewProductBody) => {
    const files = watch('attachmentsIds') as FileList

    if (files && files.length > 0) {
      const formData = new FormData()

      const invalidFiles = Array.from(files).filter(
        (file) => !ACCEPTED_IMAGE_TYPES.includes(file.type),
      )

      if (invalidFiles.length > 0) {
        setError('attachmentsIds', {
          type: 'manual',
          message: 'Apenas imagens PNG são permitidas.',
        })
        return
      }

      Array.from(files).forEach((file) => formData.append('files', file))

      const uploadResponse = await uploadImagesFn({ files: formData })

      const attachmentsIds = uploadResponse.attachments.map(
        (attachment) => attachment.id,
      )

      const productData = {
        ...data,
        attachmentsIds,
      }

      await createNewProductFn(productData)
    } else {
      console.error('Nenhuma imagem foi selecionada.')
    }
  }

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
            Novo produto
          </h1>
          <p className="font-poppins text-sm font-normal text-grayScale-300">
            Cadastre um produto para venda no marketplace
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex gap-6">
        <div>
          <label className="flex h-[350px] w-[420px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px] bg-shape-shape">
            <ImageUp className="h-10 w-10 text-orange-base" />
            <span className="font-poppins text-sm text-grayScale-300">
              Selecione a imagem do produto
            </span>
            <input
              type="file"
              className="hidden"
              {...register('attachmentsIds')}
              multiple
            />
          </label>
          {errors.attachmentsIds && (
            <p className="mt-2 text-sm text-red-500">
              {errors.attachmentsIds.message}
            </p>
          )}
        </div>
        <div className="flex grow flex-col gap-6">
          <Card className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="flex justify-between font-sans text-lg font-bold text-grayScale-300">
                Dados do produto
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <div className="flex-[2_2_0%]">
                      <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                        Título
                      </Label>
                      <Input
                        placeholder="Nome do produto"
                        {...register('title')}
                      />
                    </div>

                    <div className="flex-1">
                      <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                        Valor
                      </Label>
                      <Input
                        placeholder="R$ 0,00"
                        {...register('priceInCents', {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Descrição
                    </Label>
                    <Textarea
                      placeholder="Escreva detalhes sobre o produto, tamanho, características"
                      {...register('description')}
                    />
                  </div>

                  <div>
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Categoria
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue('categoryId', value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Selecione"
                          className="placeholder:text-grayScale-200"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading ? (
                          <SelectItem disabled value="loading">
                            Carregando...
                          </SelectItem>
                        ) : (
                          categoriesData?.categories.map(
                            (category: Category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id} // Valor deve ser um UUID válido
                              >
                                {category.title}
                              </SelectItem>
                            ),
                          )
                        )}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 border-orange-base text-orange-base hover:border-orange-dark hover:bg-transparent hover:text-orange-dark"
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-orange-base text-white hover:bg-orange-dark"
                  >
                    Salvar e publicar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  )
}
