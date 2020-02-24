import { CreateRequestType } from './base'

export type SignInRequest = CreateRequestType<
  null,
  null,
  {
    userID: string
    password: string
  },
  'body'
>
