import { createContext } from 'react'

export interface AuthInfo {
  token: string
  userID: string
}

export const AuthContext = createContext<AuthInfo | null>(null)
