import React, { useCallback } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab1.css'
import { useDispatch } from 'react-redux'
import { signOut } from '../modules/auth'

const Tab1: React.FC = () => {
  const dispatch = useDispatch()

  const handleSignOut = useCallback(() => {
    dispatch(signOut())
  }, [dispatch])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <IonButton onClick={handleSignOut}>Sign Out</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
