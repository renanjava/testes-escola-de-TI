import { AuthLoginFactory, AuthLoginProps } from '../auth-login.dto'
import { AuthLoginDataBuilder } from '../helper/auth-login-data-builder'

let props: AuthLoginProps

describe('AuthLoginDto unit tests', () => {
  beforeEach(() => {
    props = AuthLoginDataBuilder({} as AuthLoginProps)
  })

  it('constructor method', () => {
    let sut = AuthLoginFactory.create('usuario teste', '83dskjwj222')

    expect(sut.user).toBe('usuario teste')
    expect(sut.password).toBe('83dskjwj222')

    sut = AuthLoginFactory.create(props.user, props.password)

    expect(sut.user).toBe(props.user)
    expect(sut.password).toBe(props.password)
  })
})
