import * as admin from 'firebase-admin'
require('dotenv').config()

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })

const auth = app.auth()
const firestore = app.firestore()

export { auth, firestore }
