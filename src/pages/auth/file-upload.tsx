import { ImageUp } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/png']

export const fileUploadForm = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'A imagem do produto é obrigatória')
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      'Tipo de arquivo precisa ser uma imagem PNG',
    ),
})

export type FileUploadForm = z.infer<typeof fileUploadForm>

export function FileUpload() {
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const { register } = useForm<FileUploadForm>()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      setFilePreview(URL.createObjectURL(files[0]))
    }
  }

  return (
    <label className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-shape-shape p-11">
      {filePreview ? (
        <img src={filePreview} alt="Preview" className="object-cover" />
      ) : (
        <ImageUp className="h-8 w-8 text-orange-base" />
      )}
      <input
        id="file"
        type="file"
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        {...register('file', { onChange: onFileChange })}
      />
    </label>
  )
}
