import { firestore } from 'firebase-admin'
import { User } from '@abyssparanoia/interface'

export const newUserFromDsnp = (dsnp: firestore.DocumentSnapshot): User => {
  const data = dsnp.data() as Omit<User, 'id'>

  return { id: dsnp.id, ...data }
}
