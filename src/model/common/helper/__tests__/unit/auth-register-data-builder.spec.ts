import { AuthRegisterDataBuilder } from '@/model/common/helper/auth-register-data-builder'

describe('AuthRegister Data Builder unit tests', () => {
  it('should return same values when all properties are provided', () => {
    const input = {
      realname: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
    }

    const result = AuthRegisterDataBuilder(input)

    expect(result).toEqual(input)
  })

  it('should generate fake data for missing properties while keeping provided ones', () => {
    const input = {
      realname: 'Jane Doe',
      username: '',
      email: '',
      password: '',
    }

    const result = AuthRegisterDataBuilder(input)

    expect(result.realname).toBe('Jane Doe')
    expect(result.username).not.toBe('')
    expect(result.email).not.toBe('')
    expect(result.password).not.toBe('')
  })

  it('should generate a valid email when email is not provided', () => {
    const input = {
      realname: 'Jane Doe',
      username: 'janedoe',
      email: '',
      password: 'securePassword123',
    }

    const result = AuthRegisterDataBuilder(input)

    // eslint-disable-next-line security/detect-unsafe-regex
    expect(result.email).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  })

  it('should generate a password matching the pattern when not provided', () => {
    const input = {
      realname: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: '',
    }

    const result = AuthRegisterDataBuilder(input)

    expect(result.password).toMatch(/^[A-Za-z0-9*]+$/)
  })

  it('should generate a valid username when username is not provided', () => {
    const input = {
      realname: 'Jane Doe',
      username: '',
      email: 'jane@example.com',
      password: 'securepassword123',
    }

    const result = AuthRegisterDataBuilder(input)

    expect(result).toStrictEqual({ ...input, username: result.username })
  })

  it('should generate a full name for realname when not provided', () => {
    const input = {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
    }

    const result = AuthRegisterDataBuilder(input as any)

    expect(result.realname).toBeTruthy()
    expect(result.username).toEqual(input.username)
    expect(result.email).toEqual(input.email)
    expect(result.password).toEqual(input.password)
  })
})
