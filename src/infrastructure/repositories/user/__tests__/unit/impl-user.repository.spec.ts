import type { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { UserRepositoryImpl } from '../../impl-user.repository'

describe('UserRepositoryImpl', () => {
  it('should return a user without password when valid criteria is provided', async () => {
    const mockUser = {
      id: 1,
      realname: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'hashedpassword',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const mockPrismaService = {
      user: {
        findFirst: jest.fn().mockResolvedValue({
          id: mockUser.id,
          realname: mockUser.realname,
          username: mockUser.username,
          email: mockUser.email,
          role: mockUser.role,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        }),
      },
    }

    const userRepository = new UserRepositoryImpl(
      mockPrismaService as unknown as PrismaService,
    )

    const userWhereInput = { email: 'john@example.com' }

    const result = await userRepository.user(userWhereInput)

    expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
      where: userWhereInput,
      omit: { password: true },
    })

    expect(result).toBeDefined()
    expect(result).not.toHaveProperty('password')
    expect(result?.email).toBe(mockUser.email)
  })

  it('should return null when no user matches the provided criteria', async () => {
    const mockPrismaService = {
      user: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    }

    const userRepository = new UserRepositoryImpl(
      mockPrismaService as unknown as PrismaService,
    )

    const userWhereInput = { email: 'nonexistent@example.com' }

    const result = await userRepository.user(userWhereInput)

    expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
      where: userWhereInput,
      omit: { password: true },
    })

    expect(result).toBeNull()
  })
})
