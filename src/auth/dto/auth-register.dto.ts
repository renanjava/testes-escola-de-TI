import { ICreateUserDto } from '@/user/dto/create-user.dto'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthRegisterDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  user: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
