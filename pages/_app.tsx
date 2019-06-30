import * as React from 'react'
import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import { firebase } from '../firebase/client'
import { AuthContext, AuthInfo } from '../contexts'

interface State extends AuthInfo {}

export default class extends App<DefaultAppIProps, State> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  state = {
    token: '',
    userID: ''
  }

  componentDidMount() {
    firebase.auth().onIdTokenChanged(async user => {
      // 認証が有効だった場合、サーバーサイドのtokenとuser情報を更新する
      if (user) {
        const result = await user.getIdTokenResult()
        const { token } = result
        this.setState({ token, userID: user.uid })
        await fetch('/api/sign_in', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ token })
        })
        // 認証が無効だった場合は、サーバーサイドに保存してあるsessionを破棄する
      } else {
        await fetch('/api/sign_out', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <AuthContext.Provider
          value={{ userID: this.state.userID, token: this.state.token }}
        >
          <Component {...pageProps} />
        </AuthContext.Provider>
      </Container>
    )
  }
}
