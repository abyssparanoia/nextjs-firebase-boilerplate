import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const actionCreator = actionCreatorFactory('error')

const actions = {
  addError: actionCreator<Error>('ADD_ERROR'),
  popError: actionCreator<void>('POP_ERROR')
}

export interface State {
  list: Error[]
}

export const initialState: State = {
  list: []
}

export const addError = actions.addError

export const popError = actions.popError

export const reducer = reducerWithInitialState(initialState)
  .case(actions.addError, (state, payload) => ({
    ...state,
    list: [...state.list, payload]
  }))
  .case(actions.popError, state => {
    const list = [...state.list]
    list.pop()
    return { ...state, list }
  })
