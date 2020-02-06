import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(require('../../firebase.client.key.json'))
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
