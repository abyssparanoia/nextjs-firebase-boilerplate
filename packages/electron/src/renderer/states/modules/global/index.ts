import { actions } from './actions'
import { operations } from './operations'
import { Actions, initialState, reducer, State } from './reducers'
import { selectors } from './selectors'
import { ActionTypes } from './actionTypes'

export {
  Actions,
  initialState,
  State,
  ActionTypes as GlobalActionTypes,
  actions as globalActions,
  operations as globalOperations,
  selectors as globalSelectors
}
export default reducer
