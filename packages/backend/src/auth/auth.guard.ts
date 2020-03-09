import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { auth } from '../firebase'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || authHeader.startsWith('Bearer ')) {
      return false
    }
    const idToken = authHeader.slice(7, authHeader.length)

    const decodedIdToken = await auth.verifyIdToken(idToken).catch(err => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    // @ts-ignore
    req.claims = { ...decodedIdToken }

    return true
  }
}
