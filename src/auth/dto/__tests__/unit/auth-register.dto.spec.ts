import { validate } from 'class-validator'
import { AuthRegisterFactory, AuthRegisterProps } from '../../auth-register.dto'
import { AuthRegisterDataBuilder } from '../../helper/auth-register-data-builder'

let props: AuthRegisterProps

describe('AuthRegisterDto unit tests', () => {
  beforeEach(() => {
    props = AuthRegisterDataBuilder({} as AuthRegisterProps)
  })

  it('constructor method', () => {
    let sut = AuthRegisterFactory.create(
      'nome do usuario',
      'usuario teste',
      'email@teste.com',
      '83dskjwj222',
    )

    expect(sut.realname).toBe('nome do usuario')
    expect(sut.username).toBe('usuario teste')
    expect(sut.email).toBe('email@teste.com')
    expect(sut.password).toBe('83dskjwj222')

    sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      props.email,
      props.password,
    )

    expect(sut.username).toBe(props.username)
    expect(sut.email).toBe(props.email)
    expect(sut.password).toBe(props.password)
  })

  it('should return error when username is invalid', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      123 as any,
      props.email,
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isString: 'O nome de usuário deve ser uma string.',
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    })
  })

  it('should return error when email is not valid', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      'invalid-email',
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isEmail: 'O email deve ser um endereço de email válido.',
    })
  })

  it('should return error when password is too short', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      props.email,
      '123',
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return success when all attributes are valid', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      props.email,
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).toBe(0)
  })
})
