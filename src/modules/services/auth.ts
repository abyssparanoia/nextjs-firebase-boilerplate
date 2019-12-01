import { useState } from 'react'
import { ExNextPageContext } from 'next'
import { auth } from 'src/firebase/client'
import Router from 'next/router'
import * as repositoris from 'src/modules/repositories'
import { Credential } from 'src/firebase/interface'

export const authenticate = async (
  req: ExNextPageContext['req'],
  res: ExNextPageContext['res'],
  loginRequired: boolean
): Promise<Credential | undefined> => {
  let credential: Credential | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const credential = req.session.credential
    // userがnullの場合は未認証なので、sign_inにredirectする
    if (!credential && loginRequired) {
      res!.writeHead(302, {
        Location: '/sign_in'
      })
      res!.end()
    }
    return credential
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true)
      return {
        uid: user.uid,
        token: idTokenResult.token,
        displayName: user.displayName,
        avatarURL: user.photoURL
      }
    } else if (loginRequired) {
      // redirect
      Router.push('/sign_in')
    }
  }

  return credential
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const useSignInWithEmailAndPassword = () => {
  const [values, setValues] = useState<ISignInWithEmailAndPassword>({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleChange = (name: keyof ISignInWithEmailAndPassword) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSignIn = () => {
    setIsLoading(true)
    repositoris
      .signInWithEmailAndPassword({ ...values })
      .then(() => {
        Router.push('/')
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { values, isLoading, error, handleChange, handleSignIn }
}

export const useSignInWithGoogle = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleSignIn = () => {
    setIsLoading(true)
    repositoris
      .signInWithGoogle()
      .then(() => {
        Router.push('/')
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { isLoading, error, handleSignIn }
}

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleSignOut = () => {
    setIsLoading(true)
    repositoris
      .signOut()
      .then(() => {
        Router.push('/sign_in')
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { isLoading, error, handleSignOut }
}
