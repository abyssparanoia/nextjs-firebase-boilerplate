import { auth, firebase, FirebaseAuthenticationError } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import { HttpClient } from './httpClient'

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  const credential = await createSession(auth.currentUser)
  return credential
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () => {
  await fetch(`/api/session`, {
    method: 'DELETE',
    credentials: 'same-origin'
  })

  await auth.signOut()
}

export const createSession = async (firebaseUser: firebase.User | null) => {
  if (!firebaseUser) {
    throw new Error('認証に失敗しました')
  }

  const idTokenResult = await firebaseUser.getIdTokenResult(true).catch(err => {
    throw new FirebaseAuthenticationError(err)
  })

  const credential: Credential = {
    uid: firebaseUser.uid,
    accessToken: idTokenResult.token,
    refreshToken: firebaseUser.refreshToken
  }

  await fetch(`/api/session`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ ...credential })
  })

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
    convert: true
  }).post<IRefreshIDTokenResponse>(param)

  return res.data
}
