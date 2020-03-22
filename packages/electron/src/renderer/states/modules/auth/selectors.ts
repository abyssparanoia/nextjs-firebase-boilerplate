import { createSelector } from 'reselect'
import { RootState } from '@renderer/states/interfaces'
import { State } from './reducers'
import { User } from '@abyssparanoia/interface'

const authSelector = (state: RootState): State => state.auth

const getUser = createSelector(authSelector, (state: State): User | undefined => state.user)
const getIsLoading = createSelector(authSelector, (state: State): boolean => state.isLoading)

export const selectors = {
  getUser,
  getIsLoading
}
