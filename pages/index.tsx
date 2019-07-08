import React from 'react'
import { ExNextContext } from 'next'
import { useSignOut, authenticate } from 'modules/services'
import Link from 'next/link'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const Index = (props: Props) => {
  // const authInfo = useContext(AuthContext)

  const { isLoading, error, handleSignOut } = useSignOut()

  return (
    <div>
      {isLoading && <div>loading....</div>}
      {error && <div>{error.message}</div>}
      {props.userID && (
        <>
          <div>認証時はこれが表示される</div>
          <div>firebase uid: {props.userID}</div>
          <div>
            <button onClick={handleSignOut}>SignOut</button>
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
