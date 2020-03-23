import { ActionTypes } from './actionTypes'

export const actions = {
  requestPostSignIn: () => ({
    type: ActionTypes.REQUEST_POST_SIGN_IN,
    payload: {}
  }),
  successPostSignIn: () => ({
    type: ActionTypes.SUCCESS_POST_SIGN_IN,
    payload: {}
  }),
  failurePostSignIn: () => ({
    type: ActionTypes.FAILURE_POST_SIGN_IN,
    payload: {}
  })
}
