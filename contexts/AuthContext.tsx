import { createContext } from 'react'
import { User } from 'firebase'

export interface AuthInfo {
  token: string
  userID: string
}

export const AuthContext = createContext<AuthInfo | null>(null)
