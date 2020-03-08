import React from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { GlobalFeedback } from './Feedback'

type Props = {
  title?: string
}

export const Global: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar />
      <GlobalFeedback />
      {children}
      <footer>
        <hr />
        <span> {"I'm here to stay (Footer)"}</span>
      </footer>
    </div>
  )
}
