import { IsString } from 'class-validator'

export interface IAuthLoginDto {
  user: string
  password: string
}

export class AuthLoginDto implements IAuthLoginDto {
  @IsString()
  user: string

  @IsString()
  password: string
}
