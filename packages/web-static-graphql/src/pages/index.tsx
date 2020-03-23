import React from 'react'
import { Button } from '@material-ui/core'
import { useListUsersQuery } from '@abyssparanoia/graphql'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import Router from 'next/router'
import { auth } from 'src/firebase/client'
import firebase from 'firebase'

type InitialProps = {
  apollo: ApolloClient<NormalizedCacheObject>
}

type Props = {} & InitialProps

const Index = (props: Props) => {
  const { data, loading } = useListUsersQuery({ client: props.apollo })

  console.log(loading)
  console.log(data)

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
      <Button
        onClick={async () => {
          await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }}
      >
        sign in
      </Button>

      <Button
        onClick={async () => {
          await auth.signOut()
        }}
      >
        sign out
      </Button>
    </div>
  )
}

export default Index
