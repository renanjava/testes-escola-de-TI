import type UserEntity from '@/domain/user/entities/user.entity'

export interface AuthRegisterProps extends Omit<UserEntity, 'role'> {
  realname: string
  username: string
  email: string
  password: string
}
