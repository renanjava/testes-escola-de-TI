import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from '@/infrastructure/model/entities/dto/user/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
