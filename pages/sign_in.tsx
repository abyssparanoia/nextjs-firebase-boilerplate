import React from 'react'
import { ExNextContext } from 'next'
import Router from 'next/router'
import { useSignInWithGoogle } from 'modules/services'
import { auth } from '../firebase/client'

type Props = {}

const SignIn = (_: Props) => {
  const { handleSignIn } = useSignInWithGoogle()

  return (
    <div>
      <div>ログインページ</div>
      <button onClick={handleSignIn}>SignIn</button>
    </div>
  )
}

SignIn.getInitialProps = async ({ req, res }: ExNextContext) => {
  // ログイン済みだった場合はredirectを行う
  // サーバー上での処理
  if (req && req.session && req.session.firebaseUser) {
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
    // ブラウザ上での処理
  } else {
    if (auth.currentUser) {
      Router.push('/')
    }
  }
}

export default SignIn
