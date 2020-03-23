import * as admin from 'firebase-admin'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Credential } from './interface'

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    })

const auth = app.auth()
const db = app.firestore()

export { auth, db }

export default app

declare global {
  namespace Express {
    interface Request {
      firebaseAuth: admin.auth.Auth
      firebaseStore: admin.firestore.Firestore
    }
  }
}
