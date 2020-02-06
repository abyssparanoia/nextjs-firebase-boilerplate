import React, { useCallback } from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { auth } from 'src/firebase/client'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from 'src/modules/auth'
import { SignInTemplate } from 'src/components/templates/sign_in'
import { ReduxStore } from 'src/modules/reducer'

type Props = {}

const SignIn = (_: Props) => {
  const { isLoading } = useSelector(({ auth }: ReduxStore) => ({
    isLoading: auth.isLoading
  }))

  const dispatch = useDispatch()

  const handleSignIn = useCallback(() => dispatch(signInWithGoogle()), [dispatch])

  return <SignInTemplate isLoading={isLoading} handleSignInWithGoogle={handleSignIn} />
}

SignIn.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<void> => {
  // ログイン済みだった場合はredirectを行う
  // サーバー上での処理
  if (req && req.session && req.session.credential) {
    res!.writeHead(302, {
      Location: '/'
    })
    res!.end()
    // ブラウザ上での処理
  } else {
    if (auth.currentUser) {
      Router.push('/')
    }
  }
}

export default SignIn
