import { auth, firebase } from '../../firebase/client'
import { HttpClient } from './httpClient'
import { SignInResponse, Claims } from '@abyssparanoia/interface'

export const getToken = () => {
  const currentUser = auth.currentUser
  if (!currentUser) {
    throw new Error('Unauthenticated')
  }
  return currentUser.getIdToken()
}

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  return signIn()
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

const signIn = async () => {
  const {
    data: { user, customToken },
  } = await new HttpClient({
    url: `${process.env.REACT_APP_API_HOST}/auth/sign_in`,
    token: await getToken(),
  }).post<SignInResponse>({})

  await auth.signInWithCustomToken(customToken)

  const { claims } = await auth.currentUser!.getIdTokenResult()
  return { user, claims: claims as Claims }
}

export const signOut = async () => {
  await auth.signOut()
}
