import { initialState, reducer } from '../reducers'
import { ActionTypes } from '../actionTypes'
import { factories } from '../factory'

describe('global/reducer', () => {
  test('initialState', () => {
    const state = undefined
    const action = {}
    const result = reducer(state, action as any)
    const expected = initialState
    expect(result).toEqual(expected)
  })

  test(`${ActionTypes.ADD_ERROR_MESSAGE}`, () => {
    const state = { ...initialState }
    const errorMessage = factories.errorMessageList[0]
    const action = {
      type: ActionTypes.ADD_ERROR_MESSAGE,
      payload: { errorMessage }
    }
    const result = reducer(state, action)
    const expected = { ...state, errorMessageList: [errorMessage] }
    expect(result).toEqual(expected)
  })

  test(`${ActionTypes.POP_ERROR_MESSAGE}`, () => {
    const errorMessageList = factories.errorMessageList
    const state = { ...initialState, errorMessageList }
    const action = {
      type: ActionTypes.POP_ERROR_MESSAGE,
      payload: {}
    }
    const result = reducer(state, action)

    errorMessageList.pop()
    const expected = { ...state, errorMessageList }
    expect(result).toEqual(expected)
  })
})
