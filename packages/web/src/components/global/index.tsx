import React, { useCallback } from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'src/modules/auth'
import { ReduxStore } from 'src/modules/reducer'
import { popFeedback } from 'src/modules/feedback'
import { GlobalFeedback } from './Feedback'

type Props = {
  title?: string
}

export const Global: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  const { feedbackList, credential } = useSelector(({ auth, feedback: { list } }: ReduxStore) => ({
    credential: auth.credential,
    feedbackList: list
  }))

  const dispatch = useDispatch()
  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch])
  const handlePopFeedback = useCallback((id: string) => dispatch(popFeedback({ id })), [dispatch])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar credential={credential} handleSignOut={handleSignOut} />
      <GlobalFeedback feedbackList={feedbackList} popFeedback={handlePopFeedback} />
      {children}
      <footer>
        <hr />
        <span> {"I'm here to stay (Footer)"}</span>
      </footer>
    </div>
  )
}
