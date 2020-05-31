import React from 'react'
import { useSignIn } from 'src/fixtures/auth/hooks'

type InitialProps = {}

type Props = {} & InitialProps

const SignIn = (_: Props) => {
  const { handleSignInWithGoogle } = useSignIn()

  return (
    <div>
      <button onClick={() => handleSignInWithGoogle()}>sign in</button>
    </div>
  )
}

export default SignIn
