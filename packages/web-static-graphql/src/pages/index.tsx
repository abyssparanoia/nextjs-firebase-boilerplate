import React from 'react'
import { Button } from '@material-ui/core'
import { useListUsersQuery } from '@abyssparanoia/graphql'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

type InitialProps = {
  apollo: ApolloClient<NormalizedCacheObject>
}

type Props = {} & InitialProps

const Index = (props: Props) => {
  const { data, loading } = useListUsersQuery({ client: props.apollo })

  return (
    <div>
      <Button>please click here!</Button>
      {loading && <div>loading.......</div>}
      {data && (
        <div>
          {data.list.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default Index
