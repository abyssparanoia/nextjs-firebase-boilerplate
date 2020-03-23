import * as React from 'react'
import App, { AppInitialProps } from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { WithApolloProps } from 'next-with-apollo'
import { StylesProvider } from '@material-ui/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Head from 'next/head'
import theme from 'src/components/thema'
import withApollo from 'src/fixtures/withApollo'

class NextApp extends App<AppInitialProps & WithApolloProps<{}>> {
  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Head>
          <title>boiler</title>
        </Head>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StyledThemeProvider theme={theme}>
              <Component {...pageProps} apollo={apollo} />
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    )
  }
}

export default withApollo(NextApp)
