import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import { uploadImages } from '@/api/upload-images'
import { Button } from '@/components/ui/button'

import { FileUpload, FileUploadForm, fileUploadForm } from './file-upload'

const signUpFormInputs = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  avatarId: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type SignUpFormInputs = z.infer<typeof signUpFormInputs>

const signUpForm = z.object({
  data: signUpFormInputs,
  fileData: fileUploadForm,
})

export type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const [registeredAvatarId, setRegisteredAvatarId] = useState({
    registeredAvatarId: '',
  })

  const methods = useForm<SignUpForm>()

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  const { mutateAsync: uploadImagesFn } = useMutation({
    mutationFn: uploadImages,
  })

  async function handleFileUpload(data: FileUploadForm) {
    try {
      if (data.file?.length && data.file.length > 0) {
        const files = new FormData()
        files.append('files', data.file[0])

        console.log(files, 'files')

        const uploadedFiles = await uploadImagesFn({
          files,
        })

        if (
          uploadedFiles &&
          uploadedFiles.attachments &&
          uploadedFiles.attachments[0]
        ) {
          setRegisteredAvatarId((prevState) => ({
            ...prevState,
            registeredAvatarId: uploadedFiles.attachments[0].id,
          }))
          methods.setValue('data.avatarId', uploadedFiles.attachments[0].id)
        } else {
          console.error('Error: Invalid uploadedFiles structure', uploadedFiles)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSignUpInputs(data: SignUpFormInputs) {
    try {
      await registerUserFn({
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatarId: data.avatarId,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })

      console.log(registeredAvatarId, 'data avatarId')

      toast.success('Usuário cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar usuário')
    }
  }

  async function handleSignUp({ data, fileData }: SignUpForm) {
    try {
      await handleFileUpload(fileData)

      await handleSignUpInputs(data)

      console.log(data, fileData)
      console.log(registeredAvatarId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <main className="flex h-full w-full flex-col rounded-3xl bg-shape-white p-20">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-12">
            <div>
              <h1 className="font-sans text-2xl font-bold text-grayScale-500">
                Crie sua conta
              </h1>
              <p className="font-poppins font-normal text-grayScale-300">
                Informe os seus dados pessoais e de acesso
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(handleSignUp)}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <h3 className="mb-5 font-sans text-lg font-bold">Perfil</h3>
                    <FileUpload />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="font-poppins text-xs font-medium uppercase text-grayScale-300"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      className="border-b-2 p-3"
                      {...methods.register('data.name')}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="font-poppins text-xs font-medium uppercase text-grayScale-300"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="(00) 00000-0000"
                      className="border-b-2 p-3"
                      {...methods.register('data.phone')}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <h3 className="mb-5 font-sans text-lg font-bold">Acesso</h3>
                    <label
                      htmlFor="email"
                      className="font-poppins text-xs font-medium uppercase text-grayScale-300"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Seu e-mail cadastrado"
                      className="border-b-2 p-3"
                      {...methods.register('data.email')}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="font-poppins text-xs font-medium uppercase text-grayScale-300"
                    >
                      Senha
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Sua senha de acesso"
                      className="border-b-2 p-3"
                      {...methods.register('data.password')}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordConfirmation"
                      className="font-poppins text-xs font-medium uppercase text-grayScale-300"
                    >
                      Confirmar senha
                    </label>
                    <input
                      id="passwordConfirmation"
                      type="password"
                      placeholder="Confirme a senha"
                      className="border-b-2 p-3"
                      {...methods.register('data.passwordConfirmation')}
                    />
                  </div>
                </div>

                <Button
                  disabled={methods.formState.isSubmitting}
                  type="submit"
                  className="mb-20 h-14 w-full justify-between bg-orange-base p-5 hover:bg-orange-dark"
                >
                  Cadastrar
                  <ArrowRight />
                </Button>
              </form>
            </FormProvider>
          </div>
          <div>
            <p className="mb-5 font-poppins text-base font-normal text-grayScale-300">
              Já tem uma conta?
            </p>
            <Button
              asChild
              disabled={methods.formState.isSubmitting}
              className="h-14 w-full justify-between bg-shape-white p-5 text-orange-base outline outline-orange-base hover:bg-shape-white hover:text-orange-dark hover:outline-orange-dark"
            >
              <Link to="/sign-in">
                Acessar
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
