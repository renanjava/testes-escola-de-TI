import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export type AuthLoginProps = {
  username: string
  password: string
}

export class AuthLoginDto implements AuthLoginProps {
  @ApiProperty({
    description: 'Username do usuário',
    type: String,
  })
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @MaxLength(20, {
    message: 'O nome de usuário deve ter no máximo 20 caracteres.',
  })
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
  })
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message: 'O nome de usuário deve conter letras, números, _ ou -',
  })
  username: string

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @Matches(/^[A-Za-z0-9*]+$/, {
    message: 'A senha deve conter letras, números ou o caractere *',
  })
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
