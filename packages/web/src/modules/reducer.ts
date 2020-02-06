import { combineReducers } from 'redux'
import { State as ErrorState, reducer as errorReducer } from './error'
import { State as TableState, reducer as tableReducer } from './table'
import { State as AuthState, reducer as authReducer } from './auth'

export interface ReduxStore {
  error: ErrorState
  table: TableState
  auth: AuthState
}

export const createRootReducer = () =>
  combineReducers({
    error: errorReducer,
    table: tableReducer,
    auth: authReducer
  })
