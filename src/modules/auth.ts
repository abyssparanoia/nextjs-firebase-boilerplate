import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Dispatch } from 'redux'
import { Credential } from 'src/firebase/interface'
import * as repository from './repositories'

const actionCreator = actionCreatorFactory('auth')

export const actions = {
  signInWithGoogle: actionCreator.async<void, { credential: Credential }, Error>('SIGN_IN_WITH_GOOGLE')
}

export interface State {
  credential?: Credential
  isLoading: boolean
  error?: Error
}

const initialState: State = {
  isLoading: false
}

export const signInWithGoogle = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.signInWithGoogle.started())
    const credential = await repository.signInWithGoogle()
    dispatch(actions.signInWithGoogle.done({ result: { credential } }))
  } catch (err) {
    dispatch(actions.signInWithGoogle.failed({ error: err }))
  }
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.signInWithGoogle.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(actions.signInWithGoogle.done, (state, payload) => ({
    ...state,
    isLoading: false,
    credential: payload.result.credential
  }))
  .case(actions.signInWithGoogle.failed, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
