import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Dispatch } from 'redux'
import * as repository from './repositories'
import { pushFeedback } from './feedback'
import { push } from 'connected-react-router'
import { auth } from '../firebase/client'
import { User as FirebaseUser, Unsubscribe } from 'firebase'
import { ReduxStore } from './reducer'
import { Claims } from '@abyssparanoia/interface'

const actionCreator = actionCreatorFactory('auth')

export const actions = {
  subscribeIdToken: actionCreator.async<void, { firebaseUser?: FirebaseUser | null; claims?: Claims }, Error>(
    'SUBSCRIBE_ID_TOKEN'
  ),
  setUnsubscriber: actionCreator<{ unsubscriber: Unsubscribe }>('SET_UNSUBSCRIBE'),
  unsubscribe: actionCreator<void>('UNSUBSCRIBE'),
  signInWithGoogle: actionCreator.async<void, { firebaseUser: FirebaseUser; claims: Claims }, Error>(
    'SIGN_IN_WITH_GOOGLE'
  ),
  signOut: actionCreator.async<void, void, Error>('SIGN_OUT')
}

export interface State {
  firebaseUser?: FirebaseUser | null
  claims?: Claims
  unsubscriber?: Unsubscribe
  isLoading: boolean
  error?: Error
}

const initialState: State = {
  isLoading: false
}

// const redirectAfterSignIn = () => {
//   const redirectTo = Router.query.redirectTo as string | undefined

//   if (!redirectTo) {
//     Router.push('/')
//   } else {
//     Router.push(redirectTo)
//   }
// }

export const subscribeIdToken = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.subscribeIdToken.started)
    const unsubscriber = auth.onIdTokenChanged(async firebaseUser => {
      let claims: Claims | undefined
      if (firebaseUser) {
        const result = await firebaseUser.getIdTokenResult()
        claims = result.claims as Claims
      }
      dispatch(actions.subscribeIdToken.done({ result: { firebaseUser, claims } }))
    })
    dispatch(actions.setUnsubscriber({ unsubscriber }))
  } catch (error) {
    dispatch(actions.subscribeIdToken.failed({ error }))
    dispatch(pushFeedback({ variant: 'error', message: error.message }))
  }
}

export const unsubscribe = () => async (dispatch: Dispatch, getState: () => ReduxStore) => {
  const {
    auth: { unsubscriber }
  } = getState()
  unsubscriber && unsubscriber()
  dispatch(actions.unsubscribe())
}

export const signInWithGoogle = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.signInWithGoogle.started())
    const { claims } = await repository.signInWithGoogle()
    // redirectAfterSignIn()
    dispatch(push('/tab1'))
    dispatch(actions.signInWithGoogle.done({ result: { firebaseUser: auth.currentUser!, claims } }))
  } catch (error) {
    dispatch(actions.signInWithGoogle.failed({ error: error }))
    dispatch(pushFeedback({ variant: 'error', message: error.message }))
  }
}

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.signOut.started())
    await repository.signOut()
    dispatch(push('/sign_in'))
    dispatch(actions.signOut.done({}))
  } catch (error) {
    dispatch(actions.signOut.failed({ error }))
    dispatch(pushFeedback({ variant: 'error', message: error.message }))
  }
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.subscribeIdToken.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(actions.subscribeIdToken.done, (state, { result: { firebaseUser, claims } }) => ({
    ...state,
    isLoading: false,
    firebaseUser,
    claims
  }))
  .case(actions.subscribeIdToken.failed, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
  .case(actions.setUnsubscriber, (state, { unsubscriber }) => ({
    ...state,
    unsubscriber
  }))
  .case(actions.unsubscribe, state => ({
    ...state,
    unsubscriber: undefined
  }))
  .case(actions.signInWithGoogle.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(actions.signInWithGoogle.done, (state, { result: { firebaseUser, claims } }) => ({
    ...state,
    isLoading: false,
    firebaseUser,
    claims
  }))
  .case(actions.signInWithGoogle.failed, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
  .case(actions.signOut.started, state => ({
    ...state,
    isLoading: true,
    error: undefined
  }))
  .case(actions.signOut.done, state => ({
    ...state,
    isLoading: false,
    credential: undefined
  }))
  .case(actions.signOut.failed, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
