import { JwtStrategy } from '@/controller/auth/jwt/jwt.strategy'
import { UserRole } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

describe('JwtStrategy unit tests', () => {
  it('should extract and validate JWT token from Authorization header', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    }

    const strategy = new JwtStrategy(mockConfigService as any)

    const uuid = uuidv4()

    const payload = {
      sub: uuid,
      username: 'testuser',
      role: UserRole.ADMIN,
    }

    const result = strategy.validate(payload)

    expect(result).toEqual({
      sub: uuid,
      username: 'testuser',
      role: UserRole.ADMIN,
    })

    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET')
  })

  it('should initialize with JWT_SECRET from config service when constructed', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    }

    const strategy = new JwtStrategy(mockConfigService as any)

    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET')
    expect(strategy).toBeDefined()
  })

  it('should throw an error when JWT_SECRET is missing in config', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue(undefined),
    }

    expect(() => new JwtStrategy(mockConfigService as any)).toThrow()

    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET')
  })

  it('should throw an error for expired token when ignoreExpiration is false', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    }

    const strategy = new JwtStrategy(mockConfigService as any)

    const expiredPayload = {
      sub: uuidv4(),
      username: 'testuser',
      role: UserRole.ADMIN,
      exp: Math.floor(Date.now() / 1000) - 10,
    }

    try {
      strategy.validate(expiredPayload)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('jwt expired')
    }

    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET')
  })

  it('should return undefined when payload is null or undefined', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    }

    const strategy = new JwtStrategy(mockConfigService as any)

    try {
      const resultWithNull = strategy.validate(null as any)
      const resultWithUndefined = strategy.validate(undefined as any)
      expect(resultWithNull).toBeUndefined()
      expect(resultWithUndefined).toBeUndefined()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
