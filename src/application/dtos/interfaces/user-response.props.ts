import type UserEntity from '@/domain/entities/user.entity'

export class UserResponseProps implements Omit<UserEntity, 'password'> {
  realname: string
  username: string
  email: string
  role: string
}
