import React from 'react'
import { ExNextPageContext } from 'next'
import { Credential } from 'src/firebase/interface'
import { authenticate } from 'src/modules/services'
import { Layout } from 'src/components/Layout'

type InitialProps = {
  credential?: Credential
}

type Props = {} & InitialProps

const About = ({ credential }: Props) => {
  return (
    <Layout credential={credential}>
      <div>About page</div>
    </Layout>
  )
}

About.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, false)
  return { credential }
}

export default About
