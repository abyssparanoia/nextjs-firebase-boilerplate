import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { history } from './states/modules/router'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './states'

import { LoginForm, Sample } from './components/organisms'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact={true} path={'/'} component={LoginForm} />
        <Route exact={true} path={'/sample'} component={Sample} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
