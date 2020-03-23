import * as React from 'react'
import App, { AppProps as NextAppProps, AppContext } from 'next/app'
import { StylesProvider } from '@material-ui/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Head from 'next/head'
import theme from 'src/components/thema'

interface AppProps extends NextAppProps {
  ua: string
}

class NextApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

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
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>boiler</title>
        </Head>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StyledThemeProvider theme={theme}>
              <Component {...pageProps} />
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

export default NextApp
