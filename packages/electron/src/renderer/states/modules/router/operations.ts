import { Operation } from '../../interfaces'
import { routerActions, routerSelectors } from '.'

const pushLogin: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)
  if (pathName !== '/') {
    dispatch(routerActions.pushLogin())
  }
}

const pushSample: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)

  if (pathName !== '/sample') {
    dispatch(routerActions.pushSample())
  }
}

export const operations = {
  pushLogin,
  pushSample
}
