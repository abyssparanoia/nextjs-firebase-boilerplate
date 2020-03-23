import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { auth } from '../firebase'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false
    }
    const idToken = authorization.slice(7, authorization.length)

    const decodedIdToken = await auth.verifyIdToken(idToken).catch((err) => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    // @ts-ignore
    req.claims = { ...decodedIdToken }

    return true
  }
}
