import React from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { useSignInWithGoogle } from 'modules/services'
import { auth } from '../firebase/client'
import { Layout } from 'components/Layout'

type Props = {}

const SignIn = (_: Props) => {
  const { handleSignIn } = useSignInWithGoogle()

  return (
    <Layout>
      <div>ログインページ</div>
      <button onClick={handleSignIn}>SignIn</button>
    </Layout>
  )
}

SignIn.getInitialProps = async ({ req, res }: ExNextPageContext) => {
  // ログイン済みだった場合はredirectを行う
  // サーバー上での処理
  if (req && req.session && req.session.firebaseUser) {
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
