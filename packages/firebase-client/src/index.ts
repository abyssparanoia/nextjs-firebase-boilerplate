import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDplQWqVixEDZGJccClbRQtYkZAcDlCrSU',
    authDomain: 'abyssparanoia-f6d72.firebaseapp.com',
    databaseURL: 'https://abyssparanoia-f6d72.firebaseio.com',
    projectId: 'abyssparanoia-f6d72',
    storageBucket: 'abyssparanoia-f6d72.appspot.com',
    messagingSenderId: '513639928872',
    appId: '1:513639928872:web:f4d66e9d0d21ca7fb3511d'
  })
}

const auth = firebase.auth()

class FirebaseAuthenticationError extends Error {
  constructor(error: firebase.auth.Error) {
    super(error.message)
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)

    // https://github.com/firebase/firebase-js-sdk/blob/master/packages/auth/src/error_auth.js
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.message = '入力されたメールアドレスはすでに使用されています。'
        break
      case 'auth/invalid-email':
        this.message = '不正なメールアドレスです'
        break
      case 'auth/user-not-found':
        this.message = 'ユーザーが見つかりませんでした'
        break
      case 'auth/wrong-password':
        this.message = 'パスワードが一致しません'
        break
      default:
        this.message = 'エラーが発生しました'
        break
    }
  }
}

export { firebase, auth, FirebaseAuthenticationError }
