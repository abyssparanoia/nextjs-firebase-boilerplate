import { CALL_HISTORY_METHOD, connectRouter, RouterAction, routerMiddleware, RouterState } from 'connected-react-router'
import { createHashHistory } from 'history'
import { actions } from './actions'
import { operations } from './operations'
import { selectors } from './selectors'

export const history = createHashHistory()
const reducer = connectRouter(history)

export const connectedReactRouter = routerMiddleware(history)

export const methods = {
  PUSH: 'push' as 'push'
}

const ActionTypes = {
  CALL_HISTORY_METHOD
}

export type Actions = RouterAction
export type State = RouterState

export {
  ActionTypes as RouterActionTypes,
  actions as routerActions,
  operations as routerOperations,
  selectors as routerSelectors
}

export default reducer
