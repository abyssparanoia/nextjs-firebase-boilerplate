import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { SignInRequestDto } from './app.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    // eslint-disable-next-line no-console
    console.log(signInRequestDto)
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }
  }
}
