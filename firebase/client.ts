import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp(require('../firebaseClientKey.json'))
}

const auth = firebase.auth()
const db = firebase.firestore()

export { firebase, auth, db }
