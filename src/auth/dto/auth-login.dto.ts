import { IsString, MaxLength } from 'class-validator'

export type AuthLoginProps = {
  user: string
  password: string
}

export class AuthLoginDto implements AuthLoginProps {
  @IsString()
  @MaxLength(80)
  user: string

  @IsString()
  @MaxLength(20)
  password: string

  constructor(user: string, password: string) {
    this.user = user
    this.password = password
  }
}

export class AuthLoginFactory {
  static create(user: string, password: string): AuthLoginDto {
    return new AuthLoginDto(user, password)
  }
}
