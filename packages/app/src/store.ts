import { createStore, applyMiddleware, Store } from 'redux'
import { createRootReducer } from './modules/reducer'
import { History } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

// export const history = createBrowserHistory()

export const makeStore = (history: History): Store =>
  createStore(
    createRootReducer(history),
    undefined,
    process.env.NODE_ENV !== 'production' ? composeWithDevTools(applyMiddleware(thunk, logger)) : applyMiddleware(thunk)
  )
