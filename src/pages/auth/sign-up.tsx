import { ArrowRight, ImageUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const signUpForm = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  avatarId: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Login realizado com sucesso')
    } catch (e) {
      toast.error('Credenciais inválidas')
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
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <h3 className="mb-5 font-sans text-lg font-bold">Perfil</h3>
                  <label className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-shape-shape p-11">
                    <ImageUp className="h-8 w-8 text-orange-base" />
                    <input
                      id="avatarId"
                      type="file"
                      placeholder="Seu nome completo"
                      className="hidden"
                      {...register('avatarId')}
                    />
                  </label>
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
                    {...register('name')}
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
                    {...register('phone')}
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
                    {...register('email')}
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
                    {...register('password')}
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
                    {...register('passwordConfirmation')}
                  />
                </div>
              </div>

              <Button
                disabled={isSubmitting}
                type="submit"
                className="mb-20 h-14 w-full justify-between bg-orange-base p-5 hover:bg-orange-dark"
              >
                Cadastrar
                <ArrowRight />
              </Button>
            </form>
          </div>
          <div>
            <p className="mb-5 font-poppins text-base font-normal text-grayScale-300">
              Já tem uma conta?
            </p>
            <Button
              asChild
              disabled={isSubmitting}
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
