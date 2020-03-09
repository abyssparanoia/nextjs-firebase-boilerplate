import { createParamDecorator } from '@nestjs/common'
import { Claims } from '@abyssparanoia/interface'

export type IAuthUser = Claims & { uid: string }

export const AuthUser = createParamDecorator(
  (_, req): IAuthUser => {
    return { ...req }
  }
)
