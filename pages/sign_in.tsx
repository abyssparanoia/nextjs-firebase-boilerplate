import React, { useCallback } from "react";
import { ExNextContext } from "next";
import { auth, firebase } from "../firebase/client";
import Router from "next/router";

type Props = {};

const SignIn = (_: Props) => {
  const signIn = useCallback(() => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      Router.push("/");
    });
  }, []);

  return (
    <div>
      <div>ログインページ</div>
      <button onClick={signIn}>Login</button>
    </div>
  );
};

SignIn.getInitialProps = async ({ req, res }: ExNextContext) => {
  // ログイン済みだった場合はredirectを行う
  // サーバー上での処理
  if (req && req.session && req.session.firebaseUser) {
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
    // ブラウザ上での処理
  } else {
    if (auth.currentUser) {
      Router.push("/");
    }
  }
};

export default SignIn;
