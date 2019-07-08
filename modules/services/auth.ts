import { useState } from 'react'
import { ExNextContext } from 'next'
import { auth } from '../../firebase/client'
import Router from 'next/router'
import * as repositoris from 'modules/repositories'

export const authenticate = async (
  req: ExNextContext['req'],
  res: ExNextContext['res'],
  loginRequired: boolean
): Promise<{ userID?: string; token?: string }> => {
  let userID: string | undefined = undefined
  let token: string | undefined = undefined
  // サーバー上での処理
  if (req && req.session) {
    const user = req.session.firebaseUser
    token = req.session.firebaseToken
    // userがnullの場合は未認証なので、sign_inにredirectする
    if (!user && loginRequired) {
      res.writeHead(302, {
        Location: '/sign_in'
      })
      res.end()
    }
    userID = user ? user.uid : null
    // ブラウザ上での処理
  } else {
    const user = auth.currentUser
    if (user) {
      userID = user.uid
      token = await user.getIdTokenResult(true).then(result => result.token)
    } else if (loginRequired) {
      // redirect
      Router.push('/sign_in')
    }
  }

  return { userID, token }
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
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { isLoading, error, handleSignOut }
}
