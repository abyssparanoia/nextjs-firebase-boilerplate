import { IsString } from 'class-validator'
import { SignInRequest, ExtractPropertyType } from '@abyssparanoia/interface'

export class SignInRequestDto implements ExtractPropertyType<SignInRequest, 'body'> {
  @IsString()
  userID!: string

  @IsString()
  password!: string
}
