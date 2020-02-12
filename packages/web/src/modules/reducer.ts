import { combineReducers } from 'redux'
import { State as TableState, reducer as tableReducer } from './table'
import { State as AuthState, reducer as authReducer } from './auth'
import { State as FeedbackState, reducer as feedbackReducer } from './feedback'

export interface ReduxStore {
  table: TableState
  auth: AuthState
  feedback: FeedbackState
}

export const createRootReducer = () =>
  combineReducers({
    table: tableReducer,
    auth: authReducer,
    feedback: feedbackReducer
  })
