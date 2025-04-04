import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { AuthRegisterDto } from '../auth/auth-register.dto'

export class UpdateUserDto extends PartialType(AuthRegisterDto) {
  @IsString()
  @IsOptional()
  role?: string
}
