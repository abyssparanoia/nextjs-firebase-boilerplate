import { ExNextPageContext } from 'next'
import { stringify } from 'query-string'
import { auth } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import Router from 'next/router'
import { refreshIDToken } from 'src/modules/repositories/auth'

export const authenticate = async (req: ExNextPageContext['req']): Promise<Credential | undefined> => {
  let credential: Credential | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const credential = req.session.credential

    if (credential && credential.accessToken) {
      await req.firebaseAuth.verifyIdToken(credential.accessToken).catch(async err => {
        if (err.code === 'auth/id-token-expired') {
          const { refreshToken, idToken } = await refreshIDToken({ refreshToken: credential.refreshToken })
          credential.accessToken = idToken
          credential.refreshToken = refreshToken
        }
      })
    }

    return credential
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true)
      return {
        uid: user.uid,
        accessToken: idTokenResult.token,
        refreshToken: user.refreshToken,
        displayName: user.displayName,
        avatarURL: user.photoURL
      }
    }
  }

  return credential
}

export const authorize = async (
  req: ExNextPageContext['req'],
  res: ExNextPageContext['res'],
  store: ExNextPageContext['store']
) => {
  const credential = store.getState().auth.credential

  // サーバー上での処理
  if (req && res && !credential) {
    const redirectTo = req.url

    res!.writeHead(302, {
      Location: `/sign_in?${stringify({ redirectTo })}`
    })
    res.end()
    return
  }

  // ブラウザ上
  if (!res && !credential) {
    const redirectTo = Router.pathname
    Router.push(`/sign_in?${stringify({ redirectTo })}`)
  }
}
