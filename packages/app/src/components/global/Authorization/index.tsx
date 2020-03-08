import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReduxStore } from '../../../modules/reducer'
import { useHistory } from 'react-router'

export const Authorization: React.FunctionComponent = ({ children }) => {
  const { firebaseUser, isLoading } = useSelector(({ auth: { firebaseUser, isLoading } }: ReduxStore) => ({
    firebaseUser,
    isLoading
  }))
  const history = useHistory()

  useEffect(() => {
    if (firebaseUser === null) {
      history.push('/sign_in')
      return
    }
  }, [firebaseUser, history, isLoading])

  return <>{children}</>
}
