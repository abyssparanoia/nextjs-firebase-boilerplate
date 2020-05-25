import React from 'react'
import Router from 'next/router'

type InitialProps = {}

type Props = {} & InitialProps

const About = (_: Props) => {
  return (
    <div>
      <button onClick={() => Router.push('/')}>please click here!</button>
    </div>
  )
}

export default About
