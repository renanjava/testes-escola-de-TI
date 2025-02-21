import { faker } from '@faker-js/faker'
import { AuthLoginProps } from '../auth-login.dto'

export function AuthLoginDataBuilder(props: AuthLoginProps): AuthLoginProps {
  return {
    user: props.user ?? faker.person.fullName(),
    password:
      props.password ??
      faker.internet.password({
        length: 20,
        memorable: true,
        pattern: /[A-Z]/,
      }),
  }
}
