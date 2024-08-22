import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      authenticate({ email: data.email, password: data.password })
      toast.success('Login realizado com sucesso')
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <>
      <Helmet title="Login" />
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

              <Button
                disabled={isSubmitting}
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
              asChild
              disabled={isSubmitting}
              className="h-14 w-full justify-between bg-shape-white p-5 text-orange-base outline outline-orange-base hover:bg-shape-white hover:text-orange-dark hover:outline-orange-dark"
            >
              <Link to="/sign-up">
                Cadastrar
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
