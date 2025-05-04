import { AuthRegisterProps } from '@/application/props/auth/auth-register.props'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class AuthRegisterDto implements AuthRegisterProps {
  @ApiProperty({
    description: 'Nome real do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'O nome real não pode estar vazio.' })
  @IsString({ message: 'O nome real deve ser uma string.' })
  @MaxLength(80, { message: 'O nome real deve ter no máximo 80 caracteres.' })
  @MinLength(3, { message: 'O nome real deve ter pelo menos 3 caracteres.' })
  realname: string

  @ApiProperty({
    description: 'Username do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
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
    description: 'Email do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @Matches(/^[A-Za-z0-9*]+$/, {
    message: 'A senha deve conter letras, números ou o caractere *',
  })
  password: string

  constructor(
    realname: string,
    username: string,
    email: string,
    password: string,
  ) {
    this.realname = realname
    this.username = username
    this.email = email
    this.password = password
  }
}

export class AuthRegisterFactory {
  static create(
    realname: string,
    username: string,
    email: string,
    password: string,
  ): AuthRegisterDto {
    return new AuthRegisterDto(realname, username, email, password)
  }
}
