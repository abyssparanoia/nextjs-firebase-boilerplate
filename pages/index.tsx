import React from 'react'
import { ExNextPageContext } from 'next'
import { authenticate } from 'modules/services'
import Link from 'next/link'
import { Layout } from 'components/Layout'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const Index = ({ userID }: Props) => {
  // const authInfo = useContext(AuthContext)

  return (
    <Layout userID={userID}>
      {userID && (
        <>
          <div>認証時はこれが表示される</div>
          <div>firebase uid: {userID}</div>
        </>
      )}

      {!userID && (
        <>
          <div>未認証時はこれが表示される</div>
        </>
      )}
      <Link href={{ pathname: '/login_required' }}>
        <a>ログイン必要ページへ</a>
      </Link>
    </Layout>
  )
}

Index.getInitialProps = async ({ req, res }: ExNextPageContext) => {
  const { userID, token } = await authenticate(req, res, false)
  return { token, userID }
}

export default Index
