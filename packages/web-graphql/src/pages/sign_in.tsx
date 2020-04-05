import React from 'react'
import { NextPageContext } from 'next'
import { Button } from '@material-ui/core'
import { useSignIn } from 'src/fixtures/auth/hooks'

type InitialProps = { pageContext: NextPageContext }

type Props = {} & InitialProps

const SignIn = ({ pageContext }: Props) => {
  const { handleSignInWithGoogle } = useSignIn()
  console.log(pageContext)

  return (
    <div>
      <Button onClick={() => handleSignInWithGoogle()}>sign in</Button>
    </div>
  )
}

export default SignIn
