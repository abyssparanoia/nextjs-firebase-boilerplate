import { Operation } from '@renderer/states/interfaces'
import { api } from '@renderer/lib/http'
import { authActions } from '.'

const signIn: Operation = (userID: string, password: string) => async dispatch => {
  dispatch(authActions.requestPostSignIn())
  await api
    .postSignIn({ body: { userID, password } })
    .then(() => {
      dispatch(authActions.successPostSignIn())
    })
    .catch(() => {
      dispatch(authActions.failurePostSignIn())
    })
}

export const operations = {
  signIn
}
