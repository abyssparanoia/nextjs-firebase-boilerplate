import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSignOut } from 'modules/services'

type Props = {
  title?: string
  userID?: string
}

export const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title', userID }) => {
  const { isLoading, error, handleSignOut } = useSignOut()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/login_required">
            <a>Login Required</a>
          </Link>{' '}
          | {userID && <button onClick={handleSignOut}>SignOut</button>}
          {!userID && (
            <Link href="/sign_in">
              <a>SignIn</a>
            </Link>
          )}
        </nav>
      </header>
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
