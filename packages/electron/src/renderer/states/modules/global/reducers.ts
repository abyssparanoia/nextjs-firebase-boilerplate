import { Reducer } from 'redux'
import { ActionsUnion } from '@renderer/states'
import { actions } from './actions'
import { ActionTypes } from './actionTypes'

export type Actions = ActionsUnion<typeof actions>

export interface State {
  errorMessageList: string[]
}

export const initialState: State = {
  errorMessageList: []
}

export const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case ActionTypes.ADD_ERROR_MESSAGE:
      return { ...state, errorMessageList: [...state.errorMessageList, action.payload.errorMessage] }

    case ActionTypes.POP_ERROR_MESSAGE:
      state.errorMessageList.pop()
      return { ...state, errorMessageList: state.errorMessageList }

    default:
      return { ...state }
  }
}
