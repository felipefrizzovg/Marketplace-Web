import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

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

const orderFiltersSchema = z.object({
  status: z.string(),
  search: z.string(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function ProductsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const { register, handleSubmit, control } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      search: search ?? '',
      status: status ?? '',
    },
  })

  function handleFilter({ search, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      return state
    })
  }

  return (
    <Card className="flex h-[300px] w-[330px] shrink-0 grow-0 flex-col items-start gap-6 p-6">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="font-sans text-lg font-bold text-grayScale-300">
          Filtrar
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full p-0">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex flex-col items-start gap-10 self-stretch"
        >
          <div className="flex w-full flex-col items-start gap-5 self-start">
            <Input
              className="py-4 placeholder:font-poppins placeholder:text-base placeholder:text-grayScale-200"
              placeholder="Pesquisar"
              {...register('search')}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Anunciado</SelectItem>
                      <SelectItem value="sold">Vendido</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />
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
  )
}
