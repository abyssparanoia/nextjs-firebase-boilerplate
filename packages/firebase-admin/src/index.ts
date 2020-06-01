import * as admin from 'firebase-admin'

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })

const adminAuth = app.auth()

const FIREBASE_CLIENT_API_KEY = process.env.FIREBASE_CLIENT_API_KEY

if (!FIREBASE_CLIENT_API_KEY) {
  throw new Error(`NO FIREBASE CLIENT API KEY`)
}

export { app, adminAuth, FIREBASE_CLIENT_API_KEY }

declare global {
  namespace Express {
    interface Request {
      firebaseAuth: admin.auth.Auth
      firebaseStore: admin.firestore.Firestore
    }
  }
}
