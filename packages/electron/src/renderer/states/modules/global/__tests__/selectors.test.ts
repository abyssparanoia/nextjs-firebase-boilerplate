import { RootState } from '../../../index'
import createStore from '../../../store'
import { selectors } from '../selectors'
import { factories } from '../factory'

const baseState: RootState = createStore().getState()

describe('global/selectors', () => {
  test(`${selectors.getErrorMessageList.name}`, () => {
    const state: RootState = { ...baseState }
    const expected = factories.errorMessageList
    state.global.errorMessageList = expected
    const result = selectors.getErrorMessageList(state)
    expect(result).toEqual(expected)
  })
})
