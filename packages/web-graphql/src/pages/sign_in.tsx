import React from 'react'
import { Button } from '@material-ui/core'
import { useSignIn } from 'src/fixtures/auth/hooks'

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
