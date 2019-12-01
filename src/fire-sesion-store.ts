import * as admin from 'firebase-admin'
import { Store } from 'express-session'

export interface StoreOption {
  db: ReturnType<typeof admin.firestore>
  kind?: string
}

export class FireSessionStore extends Store {
  db: ReturnType<typeof admin.firestore>
  kind: string

  constructor(option: StoreOption) {
    super(option || {})
    this.db = option.db
    if (!this.db) {
      throw new Error('No dataset provided to Firestore Session.')
    }
    this.kind = option.kind || 'sessions'
  }
  get = (sid: string, callback: (err?: Error | null, session?: Express.SessionData) => void) => {
    this.db
      .collection(this.kind)
      .doc(sid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          return callback()
        }

        try {
          const result = JSON.parse(doc.data()!.data)
          return callback(null, result)
        } catch (err) {
          return callback(err)
        }
      }, callback)
  }

  set = (sid: string, session: Express.SessionData, callback?: (err?: Error) => void) => {
    callback = callback || (() => {})
    let sessJson

    try {
      sessJson = JSON.stringify(session)
    } catch (err) {
      return callback(err)
    }

    this.db
      .collection(this.kind)
      .doc(sid)
      .set({ data: sessJson })
      .then(() => {
        callback!()
      })
  }

  destroy = (sid: string, callback?: (err?: Error) => void) => {
    callback = callback || (() => {})
    this.db
      .collection(this.kind)
      .doc(sid)
      .delete()
      .then(() => callback!(), callback)
  }
}
