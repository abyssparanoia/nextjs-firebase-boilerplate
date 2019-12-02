import { combineReducers } from 'redux'
import { State as TableState, reducer as tableReducer } from './table'
import { State as AuthState, reducer as authReducer } from './auth'

export interface ReduxStore {
  table: TableState
  auth: AuthState
}

export const createRootReducer = () =>
  combineReducers({
    table: tableReducer,
    auth: authReducer
  })
