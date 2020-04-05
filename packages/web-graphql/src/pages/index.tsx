import React from 'react'
import { ExNextPageContext } from 'next'
import { Button } from '@material-ui/core'
import { useListUsersQuery } from '@abyssparanoia/graphql'
import Router from 'next/router'
import { authorize } from 'src/fixtures/auth/middleware'
import { useAuthCookie, useSignIn, useSignOut } from 'src/fixtures/auth/hooks'

type InitialProps = {}
type Props = {} & InitialProps

const Index = (_: Props) => {
  const { data, loading } = useListUsersQuery({})
  const { idToken } = useAuthCookie()
  const { handleSignInWithGoogle } = useSignIn()
  const { handleSignOut } = useSignOut()

  return (
    <div>
      <Button onClick={() => Router.push('/about')}>please click here!</Button>
      {loading && <div>loading.......</div>}
      {data && (
        <div>
          {data.list.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </div>
      )}
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
