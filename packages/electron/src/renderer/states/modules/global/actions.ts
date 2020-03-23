import { ActionTypes } from './actionTypes'

export const actions = {
  addErrorMessage: (errorMessage: string) => ({
    type: ActionTypes.ADD_ERROR_MESSAGE,
    payload: { errorMessage }
  }),

  popErrorMessage: () => ({
    type: ActionTypes.POP_ERROR_MESSAGE,
    payload: {}
  }),

  resetAll: () => ({
    type: ActionTypes.RESET_ALL,
    payload: {}
  })
}
