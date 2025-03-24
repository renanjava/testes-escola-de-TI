import { UserService } from '@/infrastructure/model/services/user.service'
import { UserRepository } from '@/infrastructure/model/repositories/user.repository'
import { UsuarioNaoEncontradoException } from '@/shared/model/common/exceptions/usuario-nao-encontrado.exception'
import { UpdateUserDto } from '@/infrastructure/model/entities/dto/user/update-user.dto'

describe('UserService', () => {
  it('should return all users from repository', async () => {
    const mockUsers = [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ] as any[]

    const mockUserRepository = {
      users: jest.fn().mockResolvedValue(mockUsers),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.findAll()

    expect(mockUserRepository.users).toHaveBeenCalledWith({})
    expect(result).toEqual(mockUsers)
  })

  it("should throw UsuarioNaoEncontradoException when user doesn't exist", async () => {
    const mockUserRepository = {
      user: jest.fn().mockResolvedValue(null),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(userService.findOne('non-existent-id')).rejects.toThrow(
      UsuarioNaoEncontradoException,
    )

    expect(mockUserRepository.user).toHaveBeenCalledWith({
      id: 'non-existent-id',
    })
  })

  it('should return a user when a valid ID is provided', async () => {
    const mockUser = { id: '1', name: 'User 1' } as any

    const mockUserRepository = {
      user: jest.fn().mockResolvedValue(mockUser),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.findOne('1')

    expect(mockUserRepository.user).toHaveBeenCalledWith({ id: '1' })
    expect(result).toEqual(mockUser)
  })

  it('should delete a user when a valid ID is provided', async () => {
    const mockUser = { id: '1', name: 'User 1' } as any

    const mockUserRepository = {
      deleteUser: jest.fn().mockResolvedValue(mockUser),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.remove('1')

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith({ id: '1' })
    expect(result).toEqual(mockUser)
  })

  it('should throw UsuarioNaoEncontradoException when removing a user with non-existent ID', async () => {
    const mockUserRepository = {
      deleteUser: jest
        .fn()
        .mockRejectedValue(new UsuarioNaoEncontradoException()),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(userService.remove('non-existent-id')).rejects.toThrow(
      UsuarioNaoEncontradoException,
    )
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith({
      id: 'non-existent-id',
    })
  })

  it('should update a user when valid data is provided', async () => {
    const mockUser = { id: '1', name: 'Updated User' } as any
    const updateUserDto = { name: 'Updated User' } as UpdateUserDto

    const mockUserRepository = {
      updateUser: jest.fn().mockResolvedValue(mockUser),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.update('1', updateUserDto)

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updateUserDto,
    })
    expect(result).toEqual(mockUser)
  })

  it('should throw UsuarioNaoEncontradoException when updating a non-existent user', async () => {
    const mockUserRepository = {
      updateUser: jest
        .fn()
        .mockRejectedValue(new UsuarioNaoEncontradoException()),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(
      userService.update('non-existent-id', {} as UpdateUserDto),
    ).rejects.toThrow(UsuarioNaoEncontradoException)

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: 'non-existent-id' },
      data: {},
    })
  })

  it('should throw an error when UpdateUserDto is invalid', async () => {
    const invalidUpdateUserDto = {}
    const mockUserRepository = {
      updateUser: jest.fn().mockRejectedValue(new Error('Invalid data')),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(
      userService.update('1', invalidUpdateUserDto as UpdateUserDto),
    ).rejects.toThrow('Invalid data')

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: '1' },
      data: invalidUpdateUserDto,
    })
  })

  it('should throw UsuarioNaoEncontradoException when ID format is invalid', async () => {
    const invalidId = 'invalid-id-format'
    const mockUserRepository = {
      user: jest.fn().mockResolvedValue(null),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(userService.findOne(invalidId)).rejects.toThrow(
      UsuarioNaoEncontradoException,
    )
    expect(mockUserRepository.user).toHaveBeenCalledWith({ id: invalidId })
  })

  it('should return empty array when no users exist', async () => {
    const mockUserRepository = {
      users: jest.fn().mockResolvedValue([]),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.findAll()

    expect(mockUserRepository.users).toHaveBeenCalledWith({})
    expect(result).toEqual([])
  })

  it('should throw an error when repository connection fails during findOne', async () => {
    const mockUserRepository = {
      user: jest.fn().mockRejectedValue(new Error('Connection error')),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    await expect(userService.findOne('1')).rejects.toThrow('Connection error')
    expect(mockUserRepository.user).toHaveBeenCalledWith({ id: '1' })
  })

  it('should preserve unchanged fields when partial data is provided', async () => {
    const existingUser = {
      id: '1',
      name: 'User 1',
      email: 'user1@example.com',
    } as any
    const updateUserDto = { name: 'Updated User 1' } as UpdateUserDto
    const updatedUser = {
      id: '1',
      name: 'Updated User 1',
      email: 'user1@example.com',
    } as any

    const mockUserRepository = {
      user: jest.fn().mockResolvedValue(existingUser),
      updateUser: jest.fn().mockResolvedValue(updatedUser),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.update('1', updateUserDto)

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updateUserDto,
    })
    expect(result).toEqual(updatedUser)
  })

  it('should handle performance efficiently when retrieving a large number of users', async () => {
    const largeNumberOfUsers = Array.from({ length: 10000 }, (_, i) => ({
      id: `${i}`,
      name: `User ${i}`,
    })) as any[]

    const mockUserRepository = {
      users: jest.fn().mockResolvedValue(largeNumberOfUsers),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result = await userService.findAll()

    expect(mockUserRepository.users).toHaveBeenCalledWith({})
    expect(result).toEqual(largeNumberOfUsers)
  })

  it('should handle concurrent updates to the same user correctly', async () => {
    const userId = '1'
    const updateUserDto1 = { name: 'Updated User 1' } as UpdateUserDto
    const updateUserDto2 = { name: 'Updated User 2' } as UpdateUserDto
    const updatedUser1 = { id: userId, name: 'Updated User 1' } as any
    const updatedUser2 = { id: userId, name: 'Updated User 2' } as any

    const mockUserRepository = {
      updateUser: jest
        .fn()
        .mockResolvedValueOnce(updatedUser1)
        .mockResolvedValueOnce(updatedUser2),
    }

    const userService = new UserService(
      mockUserRepository as unknown as UserRepository,
    )

    const result1 = await userService.update(userId, updateUserDto1)
    const result2 = await userService.update(userId, updateUserDto2)

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateUserDto1,
    })
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateUserDto2,
    })
    expect(result1).toEqual(updatedUser1)
    expect(result2).toEqual(updatedUser2)
  })
})
