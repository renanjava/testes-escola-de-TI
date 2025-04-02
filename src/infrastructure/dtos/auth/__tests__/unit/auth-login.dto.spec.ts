import { validate } from 'class-validator'
import {
  AuthLoginFactory,
  AuthLoginProps,
} from '@/infrastructure/dtos/auth/auth-login.dto'
import { AuthLoginDataBuilder } from '@/infrastructure/common/helper/auth/auth-login-data-builder'

let props: AuthLoginProps

describe('AuthLoginDto unit tests', () => {
  beforeEach(() => {
    props = AuthLoginDataBuilder({} as AuthLoginProps)
  })

  it('constructor method', () => {
    let sut = AuthLoginFactory.create('usuario teste', '83dskjwj222')

    expect(sut.username).toBe('usuario teste')
    expect(sut.password).toBe('83dskjwj222')

    sut = AuthLoginFactory.create(props.username, props.password)

    expect(sut.username).toBe(props.username)
    expect(sut.password).toBe(props.password)
  })

  it('should return error when username attribute is a number', async () => {
    const sut = AuthLoginFactory.create(123 as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      isString: 'O nome de usuário deve ser uma string.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    })
  })

  it('should return error when username attribute is a Object', async () => {
    const sut = AuthLoginFactory.create(Object as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      isString: 'O nome de usuário deve ser uma string.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return error when username attribute have more than 80 caracters', async () => {
    const sut = AuthLoginFactory.create('a'.repeat(81), props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
    })
  })

  it('should return error when username attribute is null', async () => {
    const sut = AuthLoginFactory.create(null as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      isString: 'O nome de usuário deve ser uma string.',
      isNotEmpty: 'O nome de usuário não pode estar vazio.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return error when username attribute is undefined', async () => {
    const sut = AuthLoginFactory.create(undefined as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      isString: 'O nome de usuário deve ser uma string.',
      isNotEmpty: 'O nome de usuário não pode estar vazio.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return error when username attribute is boolean', async () => {
    const sut = AuthLoginFactory.create(true as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'O nome de usuário deve ter no máximo 20 caracteres.',
      isString: 'O nome de usuário deve ser uma string.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return error when username attribute is empty', async () => {
    const sut = AuthLoginFactory.create('' as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'O nome de usuário não pode estar vazio.',
      minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      matches: 'O nome de usuário deve conter letras, números, _ ou -',
    })
  })

  it('should return success when username attribute is valid', async () => {
    const sut = AuthLoginFactory.create(props.username, props.password)
    const errors = await validate(sut)

    expect(errors.length).toBe(0)
  })

  it('should return error when password attribute is a number', async () => {
    const sut = AuthLoginFactory.create(props.username, 123 as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      isString: 'A senha deve ser uma string.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return error when password attribute is a Object', async () => {
    const sut = AuthLoginFactory.create(props.username, Object as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      isString: 'A senha deve ser uma string.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return error when password attribute have more than 20 caracters', async () => {
    const sut = AuthLoginFactory.create(props.username, 'a'.repeat(21))
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
    })
  })

  it('should return error when password attribute is null', async () => {
    const sut = AuthLoginFactory.create(props.username, null as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isString: 'A senha deve ser uma string.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      isNotEmpty: 'A senha não pode estar vazia.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
    })
  })

  it('should return error when password attribute is undefined', async () => {
    const sut = AuthLoginFactory.create(props.username, undefined as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      isString: 'A senha deve ser uma string.',
      isNotEmpty: 'A senha não pode estar vazia.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return error when password attribute is boolean', async () => {
    const sut = AuthLoginFactory.create(props.username, true as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'A senha deve ter no máximo 20 caracteres.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      isString: 'A senha deve ser uma string.',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return error when password attribute is empty', async () => {
    const sut = AuthLoginFactory.create(props.username, '' as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'A senha não pode estar vazia.',
      matches: 'A senha deve conter letras, números ou o caractere *',
      minLength: 'A senha deve ter pelo menos 6 caracteres.',
    })
  })

  it('should return success when password attribute is valid', async () => {
    const sut = AuthLoginFactory.create(props.username, props.password)
    const errors = await validate(sut)

    expect(errors.length).toBe(0)
  })
})
