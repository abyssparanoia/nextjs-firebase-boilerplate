import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Dispatch } from 'redux'

const actionCreator = actionCreatorFactory('feedback')

interface Feedback {
  id: string
  variant: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const actions = {
  pushFeedback: actionCreator<Feedback>('PUSH_FEEDBACK'),
  popFeedback: actionCreator<{ id: string }>('POP_FEEDBACK')
}

export interface State {
  list: Feedback[]
}

const initialState: State = {
  list: []
}

export const pushFeedback = ({ message, variant }: Pick<Feedback, 'message' | 'variant'>) => (dispatch: Dispatch) => {
  const id = Math.random()
    .toString(36)
    .substring(2, 15)

  dispatch(actions.pushFeedback({ id, message, variant }))
}

export const popFeedback = actions.popFeedback

export const reducer = reducerWithInitialState(initialState)
  .case(actions.pushFeedback, (state, payload) => ({
    ...state,
    list: [payload, ...state.list]
  }))
  .case(actions.popFeedback, (state, payload) => ({
    ...state,
    list: state.list.filter(feedback => feedback.id != payload.id)
  }))
  .build()
