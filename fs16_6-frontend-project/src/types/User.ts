export type Role = 'Customer' | 'Admin'

export type UserId = string | undefined

export interface UserById {
  id?: UserId | undefined
}

export interface User {
  id?: UserId
  email: string
  password: string
  firstName: string
  lastName: string
  role?: string
  avatar?: Avatar
  phone: string
  addresses?: Address[]
}

export interface Avatar {
  id?: string
  userId?: string
  file?: File | null | undefined
  avatarUrl: string
}

export interface Address {
  id?: string
  userId?: string
  houseNumber: number
  street: string
  postCode: string
}

export interface CreateUser {
  email: string
  password: string
  firstName: string
  lastName: string
  avatar: Avatar
  phone: string
  addresses?: Address[]
}

export interface UserState {
  users: User[]
  currentUser?: User
  loading: boolean
  error?: string | null | undefined
}
export interface PaginationUsers {
  offset: number
  limit: number
}
