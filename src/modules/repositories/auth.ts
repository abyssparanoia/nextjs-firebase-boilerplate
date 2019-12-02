import { auth, firebase, FirebaseAuthenticationError } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'

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
  // await new AxiosClient({ url: `/api/session` }).delete().then(res => console.log(res))

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
    token: idTokenResult.token,
    displayName: firebaseUser.displayName,
    avatarURL: firebaseUser.photoURL
  }

  await fetch(`/api/session`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ ...credential })
  })

  return credential
}
