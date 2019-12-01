import { auth, firebase, FirebaseAuthenticationError } from 'src/firebase/client'
import { AxiosClient } from './httpClient'
import { Credential } from 'src/firebase/interface'

export const signInWithGoogle = async () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () => {
  await new AxiosClient({ url: `/api/session` }).delete()
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
    token: idTokenResult.token,
    displayName: firebaseUser.displayName,
    avatarURL: firebaseUser.photoURL
  }

  await new AxiosClient({ url: `/api/session`, token: idTokenResult.token }).post({ ...credential })

  return credential
}
