import { httpClient } from '../client'
import { postSignIn } from './postSignIn'
import { SignInRequest, SignInResponse } from '@abyssparanoia/interface'

jest.mock('../client')

describe(`${postSignIn.name}`, () => {
  const postSignInRequest: SignInRequest = {
    body: {
      userID: 'user-id',
      password: 'password'
    }
  }
  test('success', async () => {
    const expected: SignInResponse = {
      user: {
        id: 'id',
        role: 'admin',
        disabled: false,
        createdAt: 123,
        updatedAt: 456
      },
      customToken: 'custom-token'
    }
    ;(httpClient as jest.Mock).mockResolvedValue({ json: () => expected })
    const result = await postSignIn(postSignInRequest)
    expect(result).toEqual(expected)
  })

  test('failure', async () => {
    const error = 'error'
    ;(httpClient as jest.Mock).mockRejectedValue(error)
    try {
      await postSignIn(postSignInRequest)
    } catch (error) {
      expect(error).toEqual(error)
    }
  })
})
