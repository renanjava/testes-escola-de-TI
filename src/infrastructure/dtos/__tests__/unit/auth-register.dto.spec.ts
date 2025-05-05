import { validate } from 'class-validator'
import type { AuthRegisterProps } from '@/application/dtos/interfaces/auth-register.props'
import { AuthRegisterFactory } from '@/infrastructure/dtos/auth-register.dto'
import { AuthRegisterDataBuilder } from '@/infrastructure/helper/databuilders/auth-register-data-builder'

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

  it('should return error when username is not a string', async () => {
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
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    })
  })

  it('should return error when username is empty', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      '',
      props.email,
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'O nome de usuário não pode estar vazio.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return error when username is too short', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      'ab',
      props.email,
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    })
  })

  it('should return error when username is too long', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      'um-nome-de-usuario-muito-longo',
      props.email,
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
    })
  })

  it('should return error when email is invalid', async () => {
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

  it('should return error when email is empty', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      '',
      props.password,
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isEmail: 'O email deve ser um endereço de email válido.',
      isNotEmpty: 'O email não pode estar vazio.',
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

  it('should return error when password is empty', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      props.email,
      '',
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'A senha não pode estar vazia.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
    })
  })

  it('should return error when password is too long', async () => {
    const sut = AuthRegisterFactory.create(
      props.realname,
      props.username,
      props.email,
      'uma-senha-muito-longa-que-excede-20-caracteres',
    )
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
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
