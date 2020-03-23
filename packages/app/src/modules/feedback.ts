import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const actionCreator = actionCreatorFactory('feedback')

export interface Feedback {
  id: string
  variant: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const actions = {
  pushFeedback: actionCreator<Pick<Feedback, 'message' | 'variant'>>('PUSH_FEEDBACK'),
  popFeedback: actionCreator<{ id: string }>('POP_FEEDBACK'),
}

export interface State {
  list: Feedback[]
}

const initialState: State = {
  list: [],
}

export const pushFeedback = actions.pushFeedback

export const popFeedback = actions.popFeedback

export const reducer = reducerWithInitialState(initialState)
  .case(actions.pushFeedback, (state, payload) => {
    const id = Math.random().toString(36).substring(2, 15)

    return {
      ...state,
      list: [{ id, ...payload }, ...state.list],
    }
  })
  .case(actions.popFeedback, (state, payload) => ({
    ...state,
    list: state.list.filter((feedback) => feedback.id !== payload.id),
  }))
  .build()
