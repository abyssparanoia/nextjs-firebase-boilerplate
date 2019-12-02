import React, { useCallback } from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { auth } from 'src/firebase/client'
import { Layout } from 'src/components/Layout'
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from 'src/modules/auth'

type Props = {}

const SignIn = (_: Props) => {
  const dispatch = useDispatch()

  const handleSignIn = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => dispatch(signInWithGoogle()),
    [dispatch]
  )

  return (
    <Layout>
      <div>ログインページ</div>
      <button onClick={handleSignIn}>SignIn</button>
    </Layout>
  )
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
