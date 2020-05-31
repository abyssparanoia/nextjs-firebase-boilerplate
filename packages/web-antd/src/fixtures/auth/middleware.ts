import { ExNextPageContext } from 'next'
import { stringify } from 'query-string'
import { getTokenFromCookie, setTokenToCookie } from './cookie'
import { auth } from 'src/firebase/client'
import { HttpClient } from 'src/fixtures/utility'
import Router from 'next/router'

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

  const res = await new HttpClient({
    url: `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_CLIENT_API_KEY}`,
    convert: true
  }).post<IRefreshIDTokenResponse>(param)

  return res.data
}

export const authorize = async (ctx: ExNextPageContext) => {
  const { req, res } = ctx

  try {
    const { idToken, refreshToken } = getTokenFromCookie(ctx)

    // check id token on server
    if (req && idToken && refreshToken) {
      await req.firebaseAuth.verifyIdToken(idToken).catch(async err => {
        if (err.code === 'auth/id-token-expired') {
          const { refreshToken: newRefreshToken, idToken: newIdToken } = await refreshIDToken({
            refreshToken
          })
          setTokenToCookie({ idToken: newIdToken, refreshToken: newRefreshToken }, ctx)
          return
        }
        throw err
      })
      return
    }

    // check on browser
    if (!req && idToken && refreshToken) {
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error(`UNAUTHNETICATED`)
      }
      return
    }

    throw new Error(`UNAUTHNETICATED`)
  } catch (err) {
    if (req && res) {
      const redirectTo = req.url

      res!.writeHead(302, {
        Location: `/sign_in?${stringify({ redirectTo })}`
      })
      res.end()
      return
    } else {
      const redirectTo = Router.pathname
      Router.push(`/sign_in?${stringify({ redirectTo })}`)
    }
  }
}
