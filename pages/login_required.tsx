import React from 'react'
// import { AuthContext } from "../contexts";
import { authenticate } from 'modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'components/Layout'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const LoginRequired = ({ userID }: Props) => {
  // const authInfo = useContext(AuthContext);
  return (
    <Layout userID={userID}>
      <div>ログイン済みユーザーのみが見れる</div>
      <div>
        初期レンダリング後の認証情報に関して、AuthContextを使うかfirebase authのSDKのcurrentUserを使うかは要相談
      </div>
      <Link href={{ pathname: '/' }}>
        <a>トップページへ</a>
      </Link>
    </Layout>
  )
}

LoginRequired.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const { userID, token } = await authenticate(req, res, true)
  return { userID: userID!, token: token! }
}

export default LoginRequired
