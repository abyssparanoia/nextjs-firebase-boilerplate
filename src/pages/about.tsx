import React from 'react'
import { ExNextPageContext } from 'next'

type InitialProps = undefined

type Props = {} & InitialProps

const About = (_: Props) => {
  return <div>About page</div>
}

About.getInitialProps = async (_: ExNextPageContext): Promise<InitialProps> => {
  return undefined
}

export default About
