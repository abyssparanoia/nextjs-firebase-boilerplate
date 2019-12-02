import React from 'react'
import { ExNextPageContext } from 'next'
import { Credential } from 'src/firebase/interface'
import { authenticate } from 'src/modules/services'

type InitialProps = {
  credential?: Credential
}

type Props = {} & InitialProps

const About = (_: Props) => {
  return <div>About page</div>
}

About.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, false)
  return { credential }
}

export default About
