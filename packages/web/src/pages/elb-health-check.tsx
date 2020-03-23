import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

const HealthCheck = () => {
  return <Fragment>ok</Fragment>
}

export default dynamic(() => Promise.resolve(HealthCheck), {
  ssr: false,
})
