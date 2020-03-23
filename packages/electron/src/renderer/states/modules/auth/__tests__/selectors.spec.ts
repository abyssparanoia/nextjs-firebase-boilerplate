import { deepCopy } from '../../../test-utils'
import { RootState } from '../../..'
import createStore from '../../../store'
import { selectors } from '../selectors'

const baseState: RootState = createStore().getState()

describe('auth/selectors', () => {
  test(`${selectors.getIsLoading.name}`, () => {
    const state: RootState = deepCopy(baseState)
    const expected = true
    state.auth.isLoading = expected
    const result = selectors.getIsLoading(state)
    expect(result).toEqual(expected)
  })
})
