import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from '@/model/entities/dto/user/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
