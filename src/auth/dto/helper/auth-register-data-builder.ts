import { faker } from '@faker-js/faker'
import { AuthRegisterProps } from '../auth-register.dto'

export function AuthRegisterDataBuilder(
  props: AuthRegisterProps,
): AuthRegisterProps {
  return {
    realname: props.realname ?? faker.person.firstName(),
    username: props.username ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password:
      props.password ??
      faker.internet.password({
        length: 20,
        memorable: true,
        pattern: /[A-Z]/,
      }),
  }
}
