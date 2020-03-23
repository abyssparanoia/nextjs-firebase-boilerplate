import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { auth, firebase, FirebaseAuthenticationError } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import { HttpClient } from './httpClient'
import { NextPageContext } from 'next'

export const getCredentialFromCookie = (ctx?: NextPageContext): Credential | undefined => {
  const { accessToken, refreshToken, uid } = (parseCookies(ctx) as unknown) as Partial<Credential>
  if (accessToken && refreshToken && uid) {
    return { accessToken, refreshToken, uid }
  }
  return undefined
}

export const setCredentialToCookie = (cred: Credential, ctx?: NextPageContext) => {
  setCookie(ctx, 'accessToken', cred.accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  setCookie(ctx, 'refreshToken', cred.refreshToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  setCookie(ctx, 'uid', cred.uid, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

const destroyCredential = (ctx?: NextPageContext) => {
  destroyCookie(ctx, 'accessToken')
  destroyCookie(ctx, 'refreshToken')
  destroyCookie(ctx, 'uid')
}

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  const credential = await createSession()
  return credential
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () => {
  destroyCredential()
  return auth.signOut()
}

export const createSession = async () => {
  const firebaseUser = auth.currentUser
  if (!firebaseUser) {
    throw new Error('認証に失敗しました')
  }

  const idTokenResult = await firebaseUser.getIdTokenResult(true).catch((err) => {
    throw new FirebaseAuthenticationError(err)
  })

  const credential: Credential = {
    uid: firebaseUser.uid,
    accessToken: idTokenResult.token,
    refreshToken: firebaseUser.refreshToken,
  }

  setCredentialToCookie(credential)

  return credential
}

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

export const refreshIDToken = async ({ refreshToken }: Pick<IRefreshIDTokenRequest, 'refreshToken'>) => {
  const param: IRefreshIDTokenRequest = { refreshToken, grantType: 'refresh_token' }

  const res = await new HttpClient({
    url: `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_CLIENT_API_KEY}`,
    convert: true,
  }).post<IRefreshIDTokenResponse>(param)

  return res.data
}
