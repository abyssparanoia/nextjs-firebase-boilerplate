import React, { useCallback } from 'react'
import { ExNextContext } from 'next'
import { auth } from '../firebase/client'
// import { AuthContext } from "../contexts";
import { authenticate } from '../modules/auth'
import Link from 'next/link'
import Router from 'next/router'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const Index = (props: Props) => {
  // const authInfo = useContext(AuthContext)

  const signOut = useCallback(() => {
    auth.signOut().then(() => Router.push('/sign_in'))
  }, [])

  return (
    <div>
      {props.userID && (
        <>
          <div>認証時はこれが表示される</div>
          <div>firebase uid: {props.userID}</div>
          <div>
            <button onClick={signOut}>Logout</button>
          </div>
        </>
      )}

      {!props.userID && (
        <>
          <div>未認証時はこれが表示される</div>
        </>
      )}
      <Link href={{ pathname: '/login_required' }}>
        <a>ログイン必要ページへ</a>
      </Link>
    </div>
  )
}

Index.getInitialProps = async ({ req, res }: ExNextContext) => {
  const { userID, token } = await authenticate(req, res, false)
  return { token, userID }
}

export default Index
