export interface Login {
  email: string
  password: string
}

export type Authorization = string | null

export interface LoginState {
  login: Login[]
}
