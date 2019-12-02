import React from 'react'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { authorize } from 'src/modules/services'

type Props = {}

const LoginRequired = (_: Props) => {
  return (
    <>
      <div>ログイン済みユーザーのみが見れる</div>
      <div>
        初期レンダリング後の認証情報に関して、AuthContextを使うかfirebase authのSDKのcurrentUserを使うかは要相談
      </div>
      <Link href={{ pathname: '/' }}>
        <a>トップページへ</a>
      </Link>
    </>
  )
}

LoginRequired.getInitialProps = async ({ res, store }: ExNextPageContext): Promise<void> => {
  await authorize(res, store)
}

export default LoginRequired
