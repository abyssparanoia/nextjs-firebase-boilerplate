import React from 'react'
import { useDispatch } from 'react-redux'
import { subscribeIdToken, unsubscribe } from '../../../modules/auth'
import { useEffect } from 'react'

export const Authentication: React.FunctionComponent = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(subscribeIdToken())

    return () => {
      dispatch(unsubscribe())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
