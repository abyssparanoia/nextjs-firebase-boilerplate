import { combineReducers } from 'redux'
import { State as TableState, reducer as tableReducer } from './table'
import { State as AuthState, reducer as authReducer } from './auth'
import { State as FeedbackState, reducer as feedbackReducer } from './feedback'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

export interface ReduxStore {
  router: RouterState
  table: TableState
  auth: AuthState
  feedback: FeedbackState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    table: tableReducer,
    auth: authReducer,
    feedback: feedbackReducer
  })
