import * as React from 'react'
import App, { AppProps as NextAppProps, AppContext } from 'next/app'
import { StylesProvider } from '@material-ui/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Head from 'next/head'
import theme from 'src/components/theme'
import withRedux from 'next-redux-wrapper'
import { makeStore } from 'src/store'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ReduxStore } from 'src/modules/reducer'
import { Global } from 'src/components/global'
import { ExNextPageContext } from 'next'
import { authenticate } from 'src/modules/services'
import { actions } from 'src/modules/auth'

interface AppProps extends NextAppProps {
  ua: string
  store: Store<ReduxStore>
}

class NextApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    const { store } = ctx as ExNextPageContext
    if (!store.getState().auth.credential) {
      const credential = await authenticate(ctx as ExNextPageContext)
      await store.dispatch(actions.setCredential(credential))
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps
    }
  }

  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <>
        <Head>
          <title>boiler</title>
        </Head>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StyledThemeProvider theme={theme}>
              <Provider store={store}>
                <Global>
                  <Component {...pageProps} />
                </Global>
              </Provider>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

export default withRedux(makeStore)(NextApp)
