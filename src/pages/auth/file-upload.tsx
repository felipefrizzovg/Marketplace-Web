import { ImageUp } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { SignUpForm } from './sign-up'

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
  const { register } = useFormContext<SignUpForm>()

  const [filePreview, setFilePreview] = useState<string | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    console.log(event.target.files)
    if (!files || files.length === 0) {
      console.error('No files selected')
      return
    }

    const file = files[0]
    if (!file) {
      console.error('File is undefined')
      return
    }

    setFilePreview(URL.createObjectURL(file))

    console.log('File selected:', file)
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
        {...register('fileData.file', { onChange: onFileChange })}
      />
    </label>
  )
}
