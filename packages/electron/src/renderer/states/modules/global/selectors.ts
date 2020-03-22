import { createSelector } from 'reselect'
import { RootState } from '@renderer/states'
import { State } from './reducers'

const globalSelector = (state: RootState): State => state.global

const getErrorMessageList = createSelector(globalSelector, (state: State): string[] => state.errorMessageList)

export const selectors = {
  getErrorMessageList
}
