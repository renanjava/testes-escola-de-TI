import { validate } from 'class-validator'
import { AuthLoginFactory, AuthLoginProps } from '../../auth-login.dto'
import { AuthLoginDataBuilder } from '../../helper/auth-login-data-builder'

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

  it('should return error when user attribute is a number', async () => {
    const sut = AuthLoginFactory.create(123 as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
      isString: 'user must be a string',
    })
  })

  it('should return error when user attribute is a Object', async () => {
    const sut = AuthLoginFactory.create(Object as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
      isString: 'user must be a string',
    })
  })

  it('should return error when user attribute have more than 80 caracters', async () => {
    const sut = AuthLoginFactory.create('a'.repeat(81), props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
    })
  })

  it('should return error when user attribute is null', async () => {
    const sut = AuthLoginFactory.create(null as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
      isString: 'user must be a string',
      isNotEmpty: 'user should not be empty',
    })
  })

  it('should return error when user attribute is undefined', async () => {
    const sut = AuthLoginFactory.create(undefined as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
      isString: 'user must be a string',
      isNotEmpty: 'user should not be empty',
    })
  })

  it('should return error when user attribute is boolean', async () => {
    const sut = AuthLoginFactory.create(true as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'user must be shorter than or equal to 80 characters',
      isString: 'user must be a string',
    })
  })

  it('should return error when user attribute is empty', async () => {
    const sut = AuthLoginFactory.create('' as any, props.password)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'user should not be empty',
    })
  })

  it('should return success when user attribute is valid', async () => {
    const sut = AuthLoginFactory.create(props.user, props.password)
    const errors = await validate(sut)

    expect(errors.length).toBe(0)
  })

  it('should return error when password attribute is a number', async () => {
    const sut = AuthLoginFactory.create(props.user, 123 as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
      isString: 'password must be a string',
    })
  })

  it('should return error when password attribute is a Object', async () => {
    const sut = AuthLoginFactory.create(props.user, Object as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
      isString: 'password must be a string',
    })
  })

  it('should return error when password attribute have more than 20 caracters', async () => {
    const sut = AuthLoginFactory.create(props.user, 'a'.repeat(21))
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
    })
  })

  it('should return error when password attribute is null', async () => {
    const sut = AuthLoginFactory.create(props.user, null as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
      isString: 'password must be a string',
      isNotEmpty: 'password should not be empty',
    })
  })

  it('should return error when password attribute is undefined', async () => {
    const sut = AuthLoginFactory.create(props.user, undefined as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
      isString: 'password must be a string',
      isNotEmpty: 'password should not be empty',
    })
  })

  it('should return error when password attribute is boolean', async () => {
    const sut = AuthLoginFactory.create(props.user, true as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      maxLength: 'password must be shorter than or equal to 20 characters',
      isString: 'password must be a string',
    })
  })

  it('should return error when password attribute is empty', async () => {
    const sut = AuthLoginFactory.create(props.user, '' as any)
    const errors = await validate(sut)

    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints).toStrictEqual({
      isNotEmpty: 'password should not be empty',
    })
  })

  it('should return success when password attribute is valid', async () => {
    const sut = AuthLoginFactory.create(props.user, props.password)
    const errors = await validate(sut)

    expect(errors.length).toBe(0)
  })
})
