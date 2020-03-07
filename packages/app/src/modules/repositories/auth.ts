import { auth, firebase } from '../../firebase/client'

export const signInWithGoogle = async () => {
  const userCreadential = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  return userCreadential
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () => {
  await auth.signOut()
}
