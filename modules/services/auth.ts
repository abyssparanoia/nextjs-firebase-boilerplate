import { ExNextContext } from 'next'
import { auth } from 'firebase/client'
import Router from 'next/router'

export const authenticate = async (
  req: ExNextContext['req'],
  res: ExNextContext['res'],
  loginRequired: boolean
): Promise<{ userID?: string; token?: string }> => {
  let userID: string | undefined = undefined
  let token: string | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const user = req.session.firebaseUser
    token = req.session.firebaseToken
    // userがnullの場合は未認証なので、sign_inにredirectする
    if (!user && loginRequired) {
      res.writeHead(302, {
        Location: '/sign_in'
      })
      res.end()
    }
    userID = user ? user.uid : null
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      userID = user.uid
      token = await user.getIdTokenResult(true).then(result => result.token)
    } else if (loginRequired) {
      // redirect
      Router.push('/sign_in')
    }
  }

  return { userID, token }
}
