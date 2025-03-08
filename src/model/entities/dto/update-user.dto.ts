import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from '@/model/entities/dto/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
