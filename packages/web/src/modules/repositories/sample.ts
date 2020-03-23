import { HttpClient } from './httpClient'
import { SignInRequest } from '@abyssparanoia/interface'

export const samplePost = async () => {
  const req: SignInRequest['body'] = {
    userID: 'userID',
    password: 'password',
  }
  const res = await new HttpClient({ url: `http://localhost:3001` }).post(req)
  console.log(res.data)
}
