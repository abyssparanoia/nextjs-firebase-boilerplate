import { SignInRequest, SignInResponse } from '@abyssparanoia/interface'
import { httpClient } from '../client'

export const postSignIn = async (postSignIn: SignInRequest): Promise<SignInResponse> => {
  const res = await httpClient('get', '/sign_in', postSignIn.body, {
    authorization: true
  }).catch(err => {
    throw err
  })
  return await res.json()
}
