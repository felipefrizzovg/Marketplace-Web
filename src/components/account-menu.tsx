import { useMutation, useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
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
  const navigate = useNavigate()

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-12 w-12 items-center justify-center rounded-xl bg-shape-shape">
        <img src={profile?.seller.avatar?.url || sofa} alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <img
              className="h-8 w-8 rounded-md"
              src={profile?.seller.avatar?.url || sofa}
              alt=""
            />
            <span>{profile?.seller.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="flex items-center justify-between gap-2 text-orange-base"
          disabled={isSigningOut}
        >
          <button className="w-full" onClick={() => signOutFn()}>
            <span>Sair</span>
            <LogOut />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
