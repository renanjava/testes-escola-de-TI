import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export type AuthLoginProps = {
  username: string
  password: string
}

export class AuthLoginDto implements AuthLoginProps {
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @MaxLength(20, {
    message: 'O nome de usuário deve ter no máximo 20 caracteres.',
  })
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
  })
  username: string

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export class AuthLoginFactory {
  static create(username: string, password: string): AuthLoginDto {
    return new AuthLoginDto(username, password)
  }
}
