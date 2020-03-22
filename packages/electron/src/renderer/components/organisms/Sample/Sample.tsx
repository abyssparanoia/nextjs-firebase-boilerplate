import React from 'react'
import { useDispatch } from 'react-redux'
import { routerOperations } from '@renderer/states/modules/router'

export const Sample = () => {
  const dispatch = useDispatch()
  return <div onClick={() => dispatch(routerOperations.pushLogin())}>Link To Login</div>
}
