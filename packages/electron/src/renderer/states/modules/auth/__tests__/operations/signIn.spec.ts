import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { api } from '../../../../../lib/http'
import { authOperations } from '../..'
import { AuthActionTypes } from '../..'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.mock('../../../../../lib/http')

describe(`${authOperations.signIn.name}`, () => {
  beforeAll(() => {})
  test('success', async () => {
    const store = mockStore()
    api.postSignIn = jest.fn().mockResolvedValue({ id: 1 })
    const expectedActions = [
      {
        type: AuthActionTypes.REQUEST_POST_SIGN_IN,
        payload: {}
      },
      {
        type: AuthActionTypes.SUCCESS_POST_SIGN_IN,
        payload: {}
      }
    ]
    await store.dispatch(authOperations.signIn() as any)
    expect(store.getActions()).toEqual(expectedActions)
  })
  test('failure', async () => {
    const store = mockStore()
    api.postSignIn = jest.fn().mockRejectedValue({})
    const expectedActions = [
      {
        type: AuthActionTypes.REQUEST_POST_SIGN_IN,
        payload: {}
      },
      {
        type: AuthActionTypes.FAILURE_POST_SIGN_IN,
        payload: {}
      }
    ]
    await store.dispatch(authOperations.signIn() as any)
    expect(store.getActions()).toEqual(expectedActions)
  })
})
