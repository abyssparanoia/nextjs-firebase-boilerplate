import * as admin from 'firebase-admin'

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })

const adminAuth = app.auth()

export { app, adminAuth }

declare global {
  namespace Express {
    interface Request {
      firebaseAuth: admin.auth.Auth
      firebaseStore: admin.firestore.Firestore
    }
  }
}
