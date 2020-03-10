import { Controller, Post, UseGuards, NotFoundException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthUser, IAuthUser } from './auth.decorator'
import { AuthGuard } from './auth.guard'
import { SignInResponse } from '@abyssparanoia/interface'
import { UserService } from '../user/user.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('/sign_in')
  @UseGuards(AuthGuard)
  async signIn(@AuthUser() { uid }: IAuthUser): Promise<SignInResponse> {
    const user = await this.userService.get(uid)
    if (!user) {
      throw new NotFoundException(`user not found`)
    }
    const customToken = await this.authService.createCustomToken(uid, { role: user.role })

    return { user, customToken }
  }
}
