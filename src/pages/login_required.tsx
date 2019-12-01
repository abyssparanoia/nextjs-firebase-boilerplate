import React from 'react'
import { authenticate } from 'src/modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'src/components/Layout'
import { Credential } from 'src/firebase/interface'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const LoginRequired = ({ userID }: Props) => {
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
  const { uid: userID, token } = (await authenticate(req, res, true)) as Credential
  return { userID, token }
}

export default LoginRequired
