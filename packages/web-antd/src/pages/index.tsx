import React from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { authorize } from 'src/fixtures/auth/middleware'
import { useAuthCookie, useSignIn, useSignOut } from 'src/fixtures/auth/hooks'
import { Button } from 'antd'

type InitialProps = {}
type Props = {} & InitialProps

const Index = (_: Props) => {
  const { idToken } = useAuthCookie()
  const { handleSignInWithGoogle } = useSignIn()
  const { handleSignOut } = useSignOut()

  return (
    <div>
      <Button onClick={() => Router.push('/about')}>please click here!</Button>
      {!idToken && <Button onClick={() => handleSignInWithGoogle()}>sign in</Button>}
      {idToken && <Button onClick={() => handleSignOut()}>sign out</Button>}
    </div>
  )
}

Index.getInitialProps = async (ctx: ExNextPageContext) => {
  await authorize(ctx)
  return {}
}

export default Index
