import { deepCopy } from '../../../test-utils'
import { initialState, reducer } from '../reducers'
import { ActionTypes } from '../actionTypes'

describe('user/reducer', () => {
  test('initialState', () => {
    const state = undefined
    const action = {}
    const result = reducer(state, action as any)
    const expected = { ...initialState }
    expect(result).toEqual(expected)
  })

  test(`${ActionTypes.REQUEST_POST_SIGN_IN}`, () => {
    const state = deepCopy(initialState)
    const action = {
      type: ActionTypes.REQUEST_POST_SIGN_IN,
      payload: {}
    }
    const result = reducer(state, action)
    const expected = { ...state, isLoading: true }
    expect(result).toEqual(expected)
  })
  test(`${ActionTypes.SUCCESS_POST_SIGN_IN}`, () => {
    const state = deepCopy(initialState)
    const action = {
      type: ActionTypes.SUCCESS_POST_SIGN_IN,
      payload: {}
    }
    const result = reducer(state, action)
    const expected = { ...state, isLoading: false }
    expect(result).toEqual(expected)
  })
  test(`${ActionTypes.FAILURE_POST_SIGN_IN}`, () => {
    const state = deepCopy(initialState)
    const action = {
      type: ActionTypes.FAILURE_POST_SIGN_IN,
      payload: {}
    }
    const result = reducer(state, action)
    const expected = { ...state, isLoading: false }
    expect(result).toEqual(expected)
  })
})
