import { useState } from 'react'
import { auth, firebase } from 'src/firebase/client'
import { setTokenToCookie, removeTokenFromCookie, getTokenFromCookie } from './cookie'
import { NextPageContext } from 'next'
import useSWR from 'swr'
import { UnwrapFunc, isBrowser } from '../utility'

const getIdTokenAsync = async (ctx: NextPageContext) => {
  if (isBrowser()) {
    return getTokenFromCookie().idToken
  }

  return getTokenFromCookie(ctx).idToken
}

export const useAuthCookie = (ctx: NextPageContext) => {
  const { data: idToken } = useSWR<UnwrapFunc<typeof getIdTokenAsync>, Error>(
    '/cookie/auth',
    () => getIdTokenAsync(ctx),
    { refreshInterval: 100 }
  )

  console.log(idToken)

  return { idToken }
}

export const useSignIn = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignInWithGoogle = async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(undefined)
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

export const useSignOut = () => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignOut = () => {
    if (isLoading) return
    setError(undefined)
    setIsLoading(true)
    return auth
      .signOut()
      .then(() => {
        removeTokenFromCookie()
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { handleSignOut, isLoading, error }
}
