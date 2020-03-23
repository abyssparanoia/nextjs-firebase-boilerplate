import { createSelector } from 'reselect'
import { RootState } from '@renderer/states/interfaces'
import { State } from '.'

const routerSelector = (state: RootState): State => state.router

const getLocation = createSelector(routerSelector, (state: State) => state.location)

const getPathname = createSelector(getLocation, (state): string => state.pathname)

export const selectors = {
  getPathname
}
