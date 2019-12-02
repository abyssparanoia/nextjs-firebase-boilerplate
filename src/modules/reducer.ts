import { combineReducers } from 'redux'
import { State as TableState, reducer as tableReducer } from './table'

export interface ReduxStore {
  table: TableState
}

export const createRootReducer = () =>
  combineReducers({
    table: tableReducer
  })
