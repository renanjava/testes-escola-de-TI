import { AuthLoginDataBuilder } from '../../auth-login-data-builder'

describe('AuthLogin Data Builder unit tests', () => {
  it('should return object with provided username and password when both values are given', () => {
    const props = {
      username: 'testUser',
      password: 'testPass123',
    }

    const result = AuthLoginDataBuilder(props)

    expect(result.username).toBe('testUser')
    expect(result.password).toBe('testPass123')
  })

  it('should generate random values when empty strings are provided', () => {
    const props = {
      username: '',
      password: '',
    }

    const result = AuthLoginDataBuilder(props)

    expect(result.username).not.toBe('')
    expect(result.username).toBeTruthy()
    expect(result.password).not.toBe('')
    expect(result.password).toBeTruthy()
  })

  it('should generate random username when username is not provided', () => {
    const props = {
      password: 'testPass123',
    }

    const result = AuthLoginDataBuilder(props as any)

    expect(result.username).toBeDefined()
    expect(result.password).toBe('testPass123')
  })

  it('should generate a random password when password is not provided', () => {
    const props = {
      username: 'testUser',
      password: undefined,
    }

    const result = AuthLoginDataBuilder(props as any)

    expect(result.username).toBe('testUser')
    expect(result.password.length).toBeDefined()
  })

  it('should generate random username and password when neither is provided', () => {
    const props = {}

    const result = AuthLoginDataBuilder(props as any)

    expect(result.username).toBeDefined()
    expect(result.password).toBeDefined()
    expect(result.password.length).toBe(20)
  })

  it('should generate a password with specific pattern when password is not provided', () => {
    const props = {
      username: 'testUser',
      password: undefined,
    }

    const result = AuthLoginDataBuilder(props as any)

    expect(result.password).toMatch(/^[A-Za-z0-9*]+$/)
  })
})
