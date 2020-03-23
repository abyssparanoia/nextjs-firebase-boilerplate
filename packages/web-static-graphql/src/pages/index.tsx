import React from 'react'
import { Button } from '@material-ui/core'
import { useListUsersQuery } from '@abyssparanoia/graphql'

type InitialProps = {}

type Props = {} & InitialProps

const Index = (props: Props) => {
  console.log(props)

  const { data, loading } = useListUsersQuery()

  console.log(data)
  console.log(loading)

  return (
    <div>
      <Button>please click here!</Button>
    </div>
  )
}

export default Index
