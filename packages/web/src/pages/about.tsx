import React from 'react'
import { ExNextPageContext } from 'next'
import { authorize } from 'src/modules/services'

type Props = {}

const About = (_: Props) => {
  return <div>About page</div>
}

About.getInitialProps = async (ctx: ExNextPageContext): Promise<void> => {
  await authorize(ctx)
}

export default About
