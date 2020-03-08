import React, { useCallback } from 'react'
import { IonButton, IonContent } from '@ionic/react'
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from '../../../modules/auth'

export const SignInTemplate = () => {
  const dispatch = useDispatch()
  const handleGoogleSignIn = useCallback(() => {
    dispatch(signInWithGoogle())
  }, [dispatch])

  return (
    <IonContent>
      <IonButton expand="full" fill="outline" shape="round" onClick={handleGoogleSignIn}>
        SignIn with Google
      </IonButton>
    </IonContent>
  )
}
