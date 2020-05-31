import React from 'react'
import Router from 'next/router'
import { Button } from 'antd'

type InitialProps = {}

type Props = {} & InitialProps

const About = (_: Props) => {
  return (
    <div>
      <Button onClick={() => Router.push('/')}>please click here!</Button>
    </div>
  )
}

export default About
