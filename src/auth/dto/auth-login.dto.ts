import { IsString, MaxLength } from 'class-validator'

export type AuthLoginProps = {
  user: string | undefined
  password: string | undefined
}

export class AuthLoginDto implements AuthLoginProps {
  @IsString()
  @MaxLength(80)
  user: string

  @IsString()
  @MaxLength(20)
  password: string

  constructor(user: string, password: string) {
    this.user = user.trim()
    this.password = password
  }
}

export class AuthLoginFactory {
  static create(user: string, password: string): AuthLoginDto {
    return new AuthLoginDto(user, password)
  }
}
