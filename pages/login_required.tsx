import React from "react";
// import { AuthContext } from "../contexts";
import { authenticate } from "../modules/auth";
import { ExNextContext } from "next";
import Link from "next/link";

type InitialProps = {
  token: string;
  userID: string;
};

type Props = {} & InitialProps;

const LoginRequired = (_: Props) => {
  // const authInfo = useContext(AuthContext);
  return (
    <div>
      <div>ログイン済みユーザーのみが見れる</div>
      <div>
        初期レンダリング後の認証情報に関して、AuthContextを使うかfirebase
        authのSDKのcurrentUserを使うかは要相談
      </div>
      <Link href={{ pathname: "/" }}>
        <a>トップページへ</a>
      </Link>
    </div>
  );
};

LoginRequired.getInitialProps = async ({ req, res }: ExNextContext) => {
  const { userID, token } = await authenticate(req, res, true);
  return { userID, token };
};

export default LoginRequired;
