import React from 'react'
import { useSignIn } from 'src/fixtures/auth/hooks'
import { Button } from 'antd'

type InitialProps = {}

type Props = {} & InitialProps

const SignIn = (_: Props) => {
  const { handleSignInWithGoogle } = useSignIn()

  return (
    <div>
      <Button onClick={() => handleSignInWithGoogle()}>sign in</Button>
    </div>
  )
}

export default SignIn
