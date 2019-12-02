import { ExNextPageContext } from 'next'
import { auth } from 'src/firebase/client'
import Router from 'next/router'
import { Credential } from 'src/firebase/interface'

export const authenticate = async (
  req: ExNextPageContext['req'],
  res: ExNextPageContext['res'],
  loginRequired: boolean
): Promise<Credential | undefined> => {
  let credential: Credential | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const credential = req.session.credential
    // userがnullの場合は未認証なので、sign_inにredirectする
    if (!credential && loginRequired) {
      res!.writeHead(302, {
        Location: '/sign_in'
      })
      res!.end()
    }
    return credential
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true)
      return {
        uid: user.uid,
        token: idTokenResult.token,
        displayName: user.displayName,
        avatarURL: user.photoURL
      }
    } else if (loginRequired) {
      // redirect
      Router.push('/sign_in')
    }
  }

  return credential
}
