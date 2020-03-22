import { push } from 'connected-react-router'

export const actions = {
  pushLogin: () => push('/'),
  pushSample: () => push('/sample')
}
