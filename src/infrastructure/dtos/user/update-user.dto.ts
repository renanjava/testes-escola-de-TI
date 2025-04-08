import { PartialType } from '@nestjs/mapped-types'
import { AuthRegisterDto } from '../auth/auth-register.dto'

export class UpdateUserDto extends PartialType(AuthRegisterDto) {}
