import React from 'react'
import { authenticate } from 'src/modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'src/components/Layout'
import { Credential } from 'src/firebase/interface'

type InitialProps = {
  credential: Credential
}

type Props = {} & InitialProps

const LoginRequired = ({ credential }: Props) => {
  return (
    <Layout credential={credential}>
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
  const credential = (await authenticate(req, res, true)) as Credential
  return { credential }
}

export default LoginRequired
