import { IsString } from 'class-validator'
import { SignInRequest } from '@abyssparanoia/interface'

export class SignInRequestDto implements SignInRequest {
  @IsString()
  userID!: string

  @IsString()
  password!: string
}
