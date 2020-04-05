import { useState } from 'react'
import { auth, firebase } from 'src/firebase/client'
import { setTokenToCookie } from './cookie'

export const useSignIn = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignInWithGoogle = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const userCredential = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(err => {
        throw err
      })
      const currentUser = userCredential.user
      if (!currentUser) {
        throw new Error(`authentication error`)
      }
      const idToken = await currentUser.getIdToken()
      const { refreshToken } = currentUser
      setTokenToCookie({ idToken, refreshToken })
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError(err)
    }
  }

  return { handleSignInWithGoogle, isLoading, error }
}
