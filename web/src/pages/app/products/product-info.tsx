import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, Ban, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { changeProductStatus } from '@/api/change-product-status'
import { editProduct, EditProductData } from '@/api/edit-product'
import { Category, getCategories } from '@/api/get-categories'
import { getProductById } from '@/api/get-product-by-id'
import { ProductStatus, ProductStatusTypes } from '@/components/product-status'
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

export function ProductInfo() {
  const { id } = useParams<{ id: string }>() // Captura o 'id' da URL
  const navigate = useNavigate()
  const [status, setStatus] = useState<ProductStatusTypes>('available') // Estado para controlar o status do produto

  // Estados para os campos editáveis
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [priceInCents, setPriceInCents] = useState(0)

  // Faz a requisição para buscar os dados do produto pelo ID
  const { data: product, isLoading: productLoading } = useQuery({
    queryFn: () => getProductById(id!),
    queryKey: ['product', id],
  })

  // Sincroniza os estados locais com os dados do produto assim que eles são carregados
  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setCategoryId(product.category.id)
      setDescription(product.description)
      setPriceInCents(product.priceInCents)
      setStatus(product.status as ProductStatusTypes)
    }
  }, [product])

  // Faz a requisição para buscar as categorias
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
  })

  // Mutations para mudar o status do produto
  const mutationStatus = useMutation({
    mutationFn: (newStatus: ProductStatusTypes) =>
      changeProductStatus(id!, newStatus),
    onSuccess: (data) => {
      setStatus(data.status as ProductStatusTypes) // Atualiza o estado com o novo status retornado pela API
    },
  })

  // Mutation para editar o produto
  const mutationEdit = useMutation({
    mutationFn: (updatedData: EditProductData) => editProduct(id!, updatedData),
    onSuccess: () => {
      navigate('/products') // Redireciona após a atualização bem-sucedida
    },
  })

  if (productLoading || categoriesLoading) {
    return <div>Carregando...</div>
  }

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  const handleMarkAsSold = () => {
    // Alterna entre 'sold' e 'available'
    const newStatus = status === 'sold' ? 'available' : 'sold'
    mutationStatus.mutate(newStatus)
  }

  const handleDeactivate = () => {
    // Alterna entre 'cancelled' e 'available'
    const newStatus = status === 'cancelled' ? 'available' : 'cancelled'
    mutationStatus.mutate(newStatus)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const updatedData = {
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds: product.attachments.map(
        (attachment: any) => attachment.id,
      ),
    }

    mutationEdit.mutate(updatedData)
  }

  // Condição para desabilitar os campos de edição
  const isEditable = status !== 'sold' && status !== 'cancelled'

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
            onClick={handleMarkAsSold}
          >
            <Check />
            {status === 'sold'
              ? 'Desmarcar como vendido'
              : 'Marcar como vendido'}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 self-end bg-transparent p-0 font-poppins text-sm font-medium text-orange-base hover:bg-inherit hover:text-orange-dark"
            onClick={handleDeactivate}
          >
            <Ban />
            {status === 'cancelled' ? 'Reativar anúncio' : 'Desativar anúncio'}
          </button>
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <img
          className="h-[300px] w-[500px]"
          src={product.attachments[0].url}
          alt={product.title}
        />
        <Card className="flex grow flex-col gap-6 p-6">
          <CardHeader className="p-0">
            <CardTitle className="flex justify-between font-sans text-lg font-bold text-grayScale-300">
              Dados do produto
              <ProductStatus status={status} />{' '}
              {/* Usando o componente ProductStatus */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex-[2_2_0%]">
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Título
                    </Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className=""
                      disabled={!isEditable} // Desabilita o campo se não for editável
                    />
                  </div>

                  <div className="flex-1">
                    <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                      Valor
                    </Label>
                    <Input
                      value={priceInCents}
                      onChange={(e) => setPriceInCents(Number(e.target.value))}
                      disabled={!isEditable} // Desabilita o campo se não for editável
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                    Descrição
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={!isEditable} // Desabilita o campo se não for editável
                  />
                </div>

                <div>
                  <Label className="font-poppins text-xs font-medium uppercase text-grayScale-300">
                    Categoria
                  </Label>
                  <Select
                    value={categoryId}
                    onValueChange={setCategoryId}
                    disabled={!isEditable} // Desabilita o campo se não for editável
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Selecione uma categoria"
                        className="placeholder:text-grayScale-200"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 border-orange-base text-orange-base hover:border-orange-dark hover:bg-transparent hover:text-orange-dark"
                  variant="outline"
                  type="button"
                  onClick={() => navigate('/products')}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-orange-base text-white hover:bg-orange-dark"
                  type="submit"
                  disabled={!isEditable} // Desabilita o botão se não for editável
                >
                  Salvar e atualizar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
