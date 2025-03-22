import UserEntity from '@/application/model/entities/user.entity'

export interface ICreateUserDto extends UserEntity {
  realname: string
  username: string
  email: string
  password: string
}

export class CreateUserDto implements ICreateUserDto {
  realname: string
  username: string
  email: string
  password: string
}
