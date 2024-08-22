import { api } from "@/lib/axios";

export interface RegisterUserBody {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export async function registerUser({ name, phone, email, avatarId, password, passwordConfirmation }: RegisterUserBody){
  await api.post('/sellers', { name, phone, email, avatarId, password, passwordConfirmation })
}