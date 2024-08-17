import { Outlet } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import backgroundImg from '@/assets/sign-in-bg.png'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-3 bg-shape-background">
      <div className="col-span-2 flex h-full flex-col gap-12 border-foreground/5 p-10 text-muted-foreground">
        <div className="flex items-center gap-5">
          <img src={logo} alt="" />
          <div className="">
            <h1 className="font-sans text-2xl font-bold text-grayScale-500">
              Marketplace
            </h1>
            <p className="font-poppins text-base font-normal text-grayScale-400">
              Painel do Vendedor
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center text-lg font-medium text-foreground">
          <img src={backgroundImg} alt="" width="1100px" />
        </div>
      </div>
      <section className="col-start-3 flex flex-col justify-center p-7">
        <Outlet />
      </section>
    </div>
  )
}
