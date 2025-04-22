import type { AuthRegisterProps } from './auth-register.props'

export interface AuthLoginProps
  extends Pick<AuthRegisterProps, 'username' | 'password'> {
  username: string
  password: string
}
