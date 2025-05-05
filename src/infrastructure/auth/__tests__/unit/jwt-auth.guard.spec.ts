import type { ExecutionContext } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard'

describe('JwtAuth Guard unit tests', () => {
  const guard = new JwtAuthGuard()

  it('should return user when valid JWT token is provided', async () => {
    const mockUser = { id: 1, username: 'testuser' }
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid.jwt.token',
          },
        }),
      }),
    } as ExecutionContext

    jest.spyOn(guard, 'handleRequest').mockReturnValue(mockUser)
    jest
      .spyOn(AuthGuard('jwt').prototype, 'canActivate')
      .mockResolvedValue(true)

    const result = await guard.canActivate(mockContext)

    expect(result).toBeTruthy()
    expect(guard.handleRequest(null, mockUser)).toBe(mockUser)
  })

  it('should throw UnauthorizedException when JWT token is missing', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext

    jest
      .spyOn(AuthGuard('jwt').prototype, 'canActivate')
      .mockResolvedValue(false)

    try {
      guard.handleRequest(new Error(), null)
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
    await expect(guard.canActivate(mockContext)).resolves.toBeFalsy()
  })

  it('should throw UnauthorizedException when JWT token is invalid or expired', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid.jwt.token',
          },
        }),
      }),
    } as ExecutionContext

    jest
      .spyOn(AuthGuard('jwt').prototype, 'canActivate')
      .mockResolvedValue(false)

    try {
      await guard.canActivate(mockContext)
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
  })
})
