import { auth, firebase } from 'firebase/client'

export const signInWithGoogle = async () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = () => auth.signOut()
