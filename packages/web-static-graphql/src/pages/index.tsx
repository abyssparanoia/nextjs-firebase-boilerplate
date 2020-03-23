import React from 'react'
import { ExNextPageContext } from 'next'
import { Button } from '@material-ui/core'

type InitialProps = {}

type Props = {} & InitialProps

const Index = (_: Props) => {
  return (
    <div>
      <Button>please click here!</Button>
    </div>
  )
}

Index.getInitialProps = async (_: ExNextPageContext): Promise<InitialProps> => {
  return {}
}

export default Index
