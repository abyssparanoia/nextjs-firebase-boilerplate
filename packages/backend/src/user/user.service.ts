import { Injectable } from '@nestjs/common'
import { firestore } from '../firebase'
import { newUserFromDsnp } from './user.entity'

@Injectable()
export class UserService {
  async get(userID: string) {
    const dsnp = await firestore
      .collection('users')
      .doc(userID)
      .get()
    if (!dsnp.exists || !dsnp.data()) {
      return undefined
    }
    return newUserFromDsnp(dsnp)
  }
}
