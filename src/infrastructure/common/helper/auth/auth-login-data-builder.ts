import { faker } from '@faker-js/faker'
import type { AuthLoginProps } from '@/infrastructure/dtos/auth/auth-login.dto'

export function AuthLoginDataBuilder(props: AuthLoginProps): AuthLoginProps {
  return {
    username: props.username || faker.person.firstName(),
    password:
      props.password ||
      faker.internet.password({
        length: 20,
        memorable: true,
        pattern: /^[A-Za-z0-9*]+$/,
      }),
  }
}
