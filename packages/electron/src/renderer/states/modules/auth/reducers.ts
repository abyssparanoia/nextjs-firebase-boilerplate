import { Reducer } from 'redux'
import { ActionsUnion } from '@renderer/states/interfaces'
import { actions } from './actions'
import { ActionTypes } from './actionTypes'
import { User } from '@abyssparanoia/interface'

export type Actions = ActionsUnion<typeof actions>

export interface State {
  user?: User
  isLoading: boolean
}

export const initialState: State = {
  isLoading: false
}

export const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case ActionTypes.REQUEST_POST_SIGN_IN:
      return { ...state, isLoading: true }
    case ActionTypes.SUCCESS_POST_SIGN_IN:
      return { ...state, isLoading: false }
    case ActionTypes.FAILURE_POST_SIGN_IN:
      return { ...state, isLoading: false }
    default:
      return { ...state }
  }
}
