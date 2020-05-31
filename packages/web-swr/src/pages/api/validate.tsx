import { adminAuth, FIREBASE_CLIENT_API_KEY } from '@abyssparanoia/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as convertKeys from 'convert-keys'

interface IRefreshIDTokenRequest {
  refreshToken: string
  grantType: 'refresh_token'
}

interface IRefreshIDTokenResponse {
  idToken: string
  refreshToken: string
  userId: string
  tokenType: string
  expiresIn: string
  projectId: string
}

const refreshIDToken = async ({ refreshToken }: Pick<IRefreshIDTokenRequest, 'refreshToken'>) => {
  const param: IRefreshIDTokenRequest = { refreshToken, grantType: 'refresh_token' }
  const res = await axios.post<IRefreshIDTokenResponse>(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_CLIENT_API_KEY}`,
    { ...convertKeys.toSnake(param) }
  )
  return res.data
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { idToken, refreshToken } = req.body as { idToken?: string; refreshToken?: string }
  if (!idToken || !refreshToken) {
    return res.status(403).send({
      message: 'Auth token missing.'
    })
  }
  const result = { refreshToken, idToken }
  try {
    await adminAuth.verifyIdToken(idToken).catch(async err => {
      if (err.code === 'auth/id-token-expired') {
        const { refreshToken: newRefreshToken, idToken: newIdToken } = await refreshIDToken({
          refreshToken: refreshToken!
        })
        result.idToken = newIdToken
        result.refreshToken = newRefreshToken
        return
      }
      throw err
    })
    return res.status(200).send(result)
  } catch (err) {
    console.error(err)
    return res.status(401).send({
      message: err.message
    })
  }
}
