import React from 'react'
import { ExNextPageContext } from 'next'

type InitialProps = undefined

type Props = {} & InitialProps

const Index = (_: Props) => {
  return <div>Hello world</div>
}

Index.getInitialProps = async (_: ExNextPageContext): Promise<InitialProps> => {
  return undefined
}

export default Index
