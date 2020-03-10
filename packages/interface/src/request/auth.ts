import { CreateRequestType } from './base'
import { User } from '../entity'

export type SignInRequest = CreateRequestType<
  null,
  null,
  {
    userID: string
    password: string
  },
  'body'
>

export type SignInResponse = {
  user: User
  customToken: string
}
