import { createStore, applyMiddleware } from 'redux'
import { createRootReducer, ReduxStore } from './modules/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { MakeStore, MakeStoreOptions } from 'next-redux-wrapper'

export const makeStore: MakeStore = (initialState: ReduxStore, _options: MakeStoreOptions) =>
  createStore(createRootReducer(), initialState, composeWithDevTools(applyMiddleware(thunk, logger)))
