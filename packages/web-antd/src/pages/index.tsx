import React from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { authorize, useAuthCookie, useSignIn, useSignOut } from '@abyssparanoia/fixtures'
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
