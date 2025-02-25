import { faker } from '@faker-js/faker'
import { AuthRegisterProps } from '../auth-register.dto'

export function AuthRegisterDataBuilder(
  props: AuthRegisterProps,
): AuthRegisterProps {
  return {
    realname: props.realname || faker.person.fullName(),
    username: props.username || faker.person.firstName(),
    email: props.email || faker.internet.email(),
    password:
      props.password ||
      faker.internet.password({
        length: 20,
        memorable: true,
        pattern: /[A-Z]/,
      }),
  }
}
