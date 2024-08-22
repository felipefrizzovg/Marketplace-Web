import { ChartArea, Package, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import logo from '@/assets/logo.svg'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-shape-shape bg-shape-background px-5 py-4">
      <img src={logo} alt="" className="h-10 w-14" />
      <nav className="flex items-center justify-center gap-2">
        <NavLink to="/">
          <ChartArea className="h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink to="/products">
          <Package className="h-5 w-5" />
          Produtos
        </NavLink>
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/new-product">
          <Button className="flex items-center justify-center gap-2 rounded-lg bg-orange-base px-4 text-shape-shape hover:bg-orange-dark">
            <Plus />
            Novo produto
          </Button>
        </Link>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shape-shape">
          <img src="" alt="" />
        </div>
      </div>
    </header>
  )
}
