import { useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'

import { getProfile } from '@/api/get-profile'
import sofa from '@/assets/sofa.png'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-12 w-12 items-center justify-center rounded-xl bg-shape-shape">
        <img src={sofa} alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <img className="h-8 w-8 rounded-md" src={sofa} alt="" />
            <span>{profile?.seller.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between gap-2 text-orange-base">
          Sair
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
