import { PartialType } from '@nestjs/mapped-types'
import { AuthRegisterDto } from './auth-register.dto'

export class UpdateUserDto extends PartialType(AuthRegisterDto) {}
