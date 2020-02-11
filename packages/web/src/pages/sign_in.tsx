import React, { useCallback } from 'react'
import { ExNextPageContext } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from 'src/modules/auth'
import { SignInTemplate } from 'src/components/templates/sign_in'
import { ReduxStore } from 'src/modules/reducer'
import { redirect } from 'src/modules/services'

type Props = {}

const SignIn = (_: Props) => {
  const { isLoading } = useSelector(({ auth }: ReduxStore) => ({
    isLoading: auth.isLoading
  }))

  const dispatch = useDispatch()

  const handleSignIn = useCallback(() => dispatch(signInWithGoogle()), [dispatch])

  return <SignInTemplate isLoading={isLoading} handleSignInWithGoogle={handleSignIn} />
}

SignIn.getInitialProps = async (ctx: ExNextPageContext): Promise<void> => {
  const { req } = ctx
  // redirect when already authenticated
  if (req && req.session && req.session.credential) {
    redirect(ctx, '/')
  }
}

export default SignIn
