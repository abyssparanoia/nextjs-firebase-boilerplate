import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import { default as auth } from './modules/auth'
import { connectedReactRouter, default as router } from './modules/router'
import { default as global } from './modules/global'

import { RootAction, RootState, Store } from './interfaces'

export default (preloadedState?: RootState): Store => {
  const appReducer = combineReducers<RootState>({
    router,
    auth,
    global
  })

  const rootReducer: typeof appReducer = (state: RootState | undefined, action: AnyAction): RootState => {
    return appReducer(state, action)
  }

  const middleware = [connectedReactRouter, thunk as ThunkMiddleware<RootState, RootAction>]
  const enhancer = composeWithDevTools(applyMiddleware(...middleware))

  return createStore<RootState, RootAction, {}, {}>(rootReducer, preloadedState, enhancer)
}
