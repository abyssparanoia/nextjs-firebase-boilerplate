import React, { useCallback } from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { GlobalErrorSnackBar } from './ErrorSnackBar'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'src/modules/auth'
import { ReduxStore } from 'src/modules/reducer'
import { popError } from 'src/modules/error'

type Props = {
  title?: string
}

export const Global: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  const { errorList, credential } = useSelector(({ error, auth }: ReduxStore) => ({
    errorList: error.list,
    credential: auth.credential
  }))

  const dispatch = useDispatch()
  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch])
  const handlePopError = useCallback(() => dispatch(popError), [dispatch])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar credential={credential} handleSignOut={handleSignOut} />
      <GlobalErrorSnackBar errorList={errorList} popError={handlePopError} />
      {children}
      <footer>
        <hr />
        <span> {"I'm here to stay (Footer)"}</span>
      </footer>
    </div>
  )
}
