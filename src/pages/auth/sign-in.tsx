import { ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Helmet title="Sign In" />
      <main className="flex h-full w-full flex-col rounded-3xl bg-shape-white p-20">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-12">
            <div>
              <h1 className="font-sans text-2xl font-bold text-grayScale-500">
                Acesse sua conta
              </h1>
              <p className="font-poppins font-normal text-grayScale-300">
                Informe seu email e senha para entrar
              </p>
            </div>
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                  className="mb-5 border-b-2 p-3"
                  {...register('email')}
                />

                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Sua senha de acesso"
                  className="border-b-2 p-3"
                  // {...register('password')}
                />
              </div>

              <Button
                type="submit"
                className="h-14 justify-between bg-orange-base p-5 hover:bg-orange-dark"
              >
                Acessar
                <ArrowRight />
              </Button>
            </form>
          </div>
          <div>
            <p className="mb-5 font-poppins text-base font-normal text-grayScale-300">
              Ainda não tem uma conta?
            </p>
            <Button
              disabled={isSubmitting}
              className="h-14 w-full justify-between bg-shape-white p-5 text-orange-base outline outline-orange-base hover:bg-shape-white hover:text-orange-dark hover:outline-orange-dark"
            >
              Cadastrar
              <ArrowRight />
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
