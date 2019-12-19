import { ExNextPageContext } from 'next'
import { stringify } from 'query-string'
import { auth } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import Router from 'next/router'

export const authenticate = async (req: ExNextPageContext['req']): Promise<Credential | undefined> => {
  let credential: Credential | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const credential = req.session.credential

    if (credential && credential.token) {
      await req.firebaseAuth
        .verifyIdToken(
          'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ1OThkYjVjZjE1ZWNhOTI0OWJhZTUzMDYzOWVkYzUzNmMzYzViYjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGlzY3VzcGluIiwiYXVkIjoiZGlzY3VzcGluIiwiYXV0aF90aW1lIjoxNTc2NDg1NTkyLCJ1c2VyX2lkIjoiU05QckI5bG5sYWFVYTluWWVueGFjUkF4VUJ2MiIsInN1YiI6IlNOUHJCOWxubGFhVWE5blllbnhhY1JBeFVCdjIiLCJpYXQiOjE1NzY0ODU1OTIsImV4cCI6MTU3NjQ4OTE5MiwiZW1haWwiOiJ5LnN1Z2ltb3RvLnBhcmFub2lhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1MjE0NTA0ODQ1OTAzMjUyMDcyIl0sImVtYWlsIjpbInkuc3VnaW1vdG8ucGFyYW5vaWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Rm-LFLWbaGSIXdC2lN2vhoNjpgWX22PzIPnnKZ89YKLXc2pNz1CD72HRRkPQVWehrv5Jsw7pLBLlewDLTy_3s2qCiQGFmXDtqos8lz1b0j4fMIAi2iE1J1Mzu_MdyrcL8se3oL5hf6HrPgmnm0srC38CwmWm1aUs3_uLSTnHD4b6A6td4q7ZJNjOc5qD8b_gSRWmCWBCs6rivdGasih5W018Swiow6INxLFu1P_g2OHI1zKZzDXZvnU5XOAE1vE3q47V_e8ZzKF7fFZo0fiet7WzTmscDiTcJ64dj_xxHwac6BzP26-A_zxxFui-yXtphMuBVrKmVaLhq8MY1WLYSw'
        )
        .catch(err => {
          if (err.code === 'auth/id-token-expired') {
            console.error('期限切れ')
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
        token: idTokenResult.token,
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
