import { useState } from 'react'
import { auth, firebase } from 'src/firebase/client'
import { setTokenToCookie, removeTokenFromCookie, getTokenFromCookie } from './cookie'
import { SWRCachePath } from './swr-cache-path'
import useSWR, { mutate } from 'swr'
import { UnwrapFunc } from '../utility'
import Router from 'next/router'

const getIdTokenAsync = async () => {
  return getTokenFromCookie().idToken
}

export const useAuthCookie = () => {
  const { data: idToken } = useSWR<UnwrapFunc<typeof getIdTokenAsync>, Error>(SWRCachePath.AUTH_COOKIE, () =>
    getIdTokenAsync()
  )

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
      mutate(SWRCachePath.AUTH_COOKIE)
      Router.push('/')
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
        mutate(SWRCachePath.AUTH_COOKIE)
        Router.push('/sign_in')
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { handleSignOut, isLoading, error }
}
