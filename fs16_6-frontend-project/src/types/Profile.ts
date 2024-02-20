import { Address, Avatar, UserId } from './User'

export interface Profile {
  id?: UserId | undefined
  email: string
  password: string
  firstName: string
  lastName: string
  role?: string
  avatar?: Avatar
  phone: string
  addresses?: Address[]
}

export interface ProfileState {
  profiles: Profile[]
  currentProfile?: Profile
  loading: boolean
  error: string | null | undefined
}
