import React from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { authorize } from 'src/fixtures/auth/middleware'
import { useAuthCookie, useSignIn, useSignOut } from 'src/fixtures/auth/hooks'

type InitialProps = {}
type Props = {} & InitialProps

const Index = (_: Props) => {
  const { idToken } = useAuthCookie()
  const { handleSignInWithGoogle } = useSignIn()
  const { handleSignOut } = useSignOut()

  return (
    <div>
      <button onClick={() => Router.push('/about')}>please click here!</button>
      {!idToken && <button onClick={() => handleSignInWithGoogle()}>sign in</button>}
      {idToken && <button onClick={() => handleSignOut()}>sign out</button>}
    </div>
  )
}

Index.getInitialProps = async (ctx: ExNextPageContext) => {
  await authorize(ctx)
  return {}
}

export default Index
