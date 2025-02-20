import { IsString } from 'class-validator'

interface IAuthLoginDto {
  username: string
  password: string
}

export class AuthLoginDto implements IAuthLoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}
