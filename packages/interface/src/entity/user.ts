import { Role } from './claims'

export interface User {
  id: string
  role: Role
  disabled: boolean
  createdAt: number
  updatedAt: number
}
