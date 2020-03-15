import { ExNextPageContext } from 'next'
import { stringify } from 'query-string'
import { Credential } from 'src/firebase/interface'
import Router from 'next/router'
import { refreshIDToken, setCredentialToCookie, getCredentialFromCookie } from 'src/modules/repositories/auth'

export const authenticate = async (ctx: ExNextPageContext): Promise<Credential | undefined> => {
  const { req } = ctx

  const credential = getCredentialFromCookie(ctx)

  // on server
  if (req && credential) {
    await req.firebaseAuth.verifyIdToken(credential.accessToken).catch(async err => {
      if (err.code === 'auth/id-token-expired') {
        const { refreshToken, idToken: accessToken, userId: uid } = await refreshIDToken({
          refreshToken: credential.refreshToken!
        })
        setCredentialToCookie({ refreshToken, accessToken, uid }, ctx)
        credential.accessToken = accessToken
        credential.refreshToken = refreshToken
        return
      }
      throw err
    })
  }

  return credential
}

export const authorize = async ({ req, res, store }: ExNextPageContext) => {
  const credential = store.getState().auth.credential

  // on server
  if (req && res && !credential) {
    const redirectTo = req.url

    res!.writeHead(302, {
      Location: `/sign_in?${stringify({ redirectTo })}`
    })
    res.end()
    return
  }

  // on browser
  if (!res && !credential) {
    const redirectTo = Router.pathname
    Router.push(`/sign_in?${stringify({ redirectTo })}`)
  }
}
