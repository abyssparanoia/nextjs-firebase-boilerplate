import { actions } from '../actions'
import { ActionTypes } from '../actionTypes'

describe('user/actions', () => {
  test(`${actions.requestPostSignIn.name}`, () => {
    const result = actions.requestPostSignIn()
    const expected = {
      type: ActionTypes.REQUEST_POST_SIGN_IN,
      payload: {}
    }
    expect(result).toEqual(expected)
  })
  test(`${actions.successPostSignIn.name}`, () => {
    const result = actions.successPostSignIn()
    const expected = {
      type: ActionTypes.SUCCESS_POST_SIGN_IN,
      payload: {}
    }
    expect(result).toEqual(expected)
  })
  test(`${actions.failurePostSignIn.name}`, () => {
    const result = actions.failurePostSignIn()
    const expected = {
      type: ActionTypes.FAILURE_POST_SIGN_IN,
      payload: {}
    }
    expect(result).toEqual(expected)
  })
})
