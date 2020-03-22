import { actions } from '../actions'
import { ActionTypes } from '../actionTypes'
import { factories } from '../factory'

describe('global/actions', () => {
  test(`${actions.addErrorMessage.name}`, () => {
    const errorMessage = factories.errorMessageList[0]
    const result = actions.addErrorMessage(errorMessage)
    const expected = {
      type: ActionTypes.ADD_ERROR_MESSAGE,
      payload: { errorMessage }
    }
    expect(result).toEqual(expected)
  })

  test(`${actions.popErrorMessage.name}`, () => {
    const result = actions.popErrorMessage()
    const expected = {
      type: ActionTypes.POP_ERROR_MESSAGE,
      payload: {}
    }
    expect(result).toEqual(expected)
  })
})
