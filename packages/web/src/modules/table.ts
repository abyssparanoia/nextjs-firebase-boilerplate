import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Dispatch } from 'redux'
import { samplePost } from 'src/modules/repositories'

const timeout = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

const actionCreator = actionCreatorFactory('table')

export const actions = {
  fetchTableList: actionCreator.async<void, { list: string[] }, Error>('list')
}

export interface State {
  list: string[]
  isLoading: boolean
  error?: Error
}

const initialState: State = {
  list: [],
  isLoading: false
}

export const fetchTableList = () => async (dispatch: Dispatch) => {
  dispatch(actions.fetchTableList.started())
  await timeout(1500)
  await samplePost()
  // mock data
  const list = ['users', 'posts', 'post_favorites']
  return dispatch(actions.fetchTableList.done({ result: { list } }))
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.fetchTableList.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(actions.fetchTableList.done, (state, payload) => ({ ...state, isLoading: false, list: payload.result.list }))
  .case(actions.fetchTableList.failed, (state, payload) => ({ ...state, isLoading: false, error: payload.error }))
  .build()
