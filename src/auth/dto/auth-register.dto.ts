import { ICreateUserDto } from '@/user/dto/create-user.dto'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthRegisterDto implements ICreateUserDto {
  @IsString()
  name: string

  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
