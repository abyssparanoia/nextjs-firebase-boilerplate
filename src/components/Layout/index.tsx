import * as React from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { useSignOut } from 'src/modules/services'
import { Credential } from 'src/firebase/interface'

type Props = {
  title?: string
  credential?: Credential
}

export const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
  credential
}) => {
  const { isLoading, error, handleSignOut } = useSignOut()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar credential={credential} handleSignOut={handleSignOut} />
      {isLoading && <div>{'loadign....'}</div>}
      {error && <div>{error.message}</div>}
      {children}
      <footer>
        <hr />
        <span> {"I'm here to stay (Footer)"}</span>
      </footer>
    </div>
  )
}
