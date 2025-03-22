import { UserRole } from '@prisma/client'
import { ROLES_KEY } from '../../roles.decorator'
import { RolesGuard } from '../../roles.guard'

describe('RolesGuard unit tests', () => {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue([UserRole.ADMIN]),
  }
  const jwtService = {
    decode: jest.fn(),
  }
  const guard = new RolesGuard(reflector as any, jwtService as any)

  it('should allow access when user has required role', () => {
    jwtService.decode.mockReturnValue({ role: [UserRole.ADMIN, UserRole.USER] })
    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer token',
          },
        }),
      }),
    }
    const result = guard.canActivate(mockContext as any)

    expect(result).toBe(true)
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockContext.getHandler(),
      mockContext.getClass(),
    ])
    expect(jwtService.decode).toHaveBeenCalledWith('token')
  })

  it('should throw error when authorization header is missing', () => {
    jwtService.decode.mockReturnValue({})

    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }),
    }

    expect(() => guard.canActivate(mockContext as any)).toThrow()
  })
  it('should throw error when authorization header is malformed', () => {
    jwtService.decode.mockReturnValue({})

    const mockContextWithMalformedHeader = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'InvalidFormat',
          },
        }),
      }),
    }

    expect(() =>
      guard.canActivate(mockContextWithMalformedHeader as any),
    ).toThrow()
  })

  it('should throw error when user role is empty', () => {
    jwtService.decode.mockReturnValue({ role: [] })

    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer token',
          },
        }),
      }),
    }

    expect(() => guard.canActivate(mockContext as any)).toThrow()
  })

  it('should deny access when user does not have required role', () => {
    jwtService.decode.mockReturnValue({ role: [UserRole.USER] })
    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer token',
          },
        }),
      }),
    }

    const result = guard.canActivate(mockContext as any)

    expect(result).toBe(false)
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockContext.getHandler(),
      mockContext.getClass(),
    ])
    expect(jwtService.decode).toHaveBeenCalledWith('token')
  })
})
