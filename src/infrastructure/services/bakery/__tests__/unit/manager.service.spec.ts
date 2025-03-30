import { ManagerService } from '../../manager.service'

describe('ManagerService', () => {
  it('should create a manager when valid data is provided', async () => {
    const mockManagerRepository = {
      createManager: jest.fn().mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const createManagerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'asfjsoa',
    }

    const result = await managerService.create(createManagerDto)

    expect(mockManagerRepository.createManager).toHaveBeenCalledWith(
      createManagerDto,
    )
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })

  it('should throw an error when creating a manager with invalid data', async () => {
    const errorMessage = 'Invalid manager data'
    const mockManagerRepository = {
      createManager: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const invalidManagerDto = {
      name: '',
    } as any

    await expect(managerService.create(invalidManagerDto)).rejects.toThrow(
      errorMessage,
    )

    expect(mockManagerRepository.createManager).toHaveBeenCalledWith(
      invalidManagerDto,
    )
  })

  it('should retrieve a manager by ID when a valid ID is provided', async () => {
    const mockManagerRepository = {
      manager: jest.fn().mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const managerId = '1'

    const result = await managerService.findOne(managerId)

    expect(mockManagerRepository.manager).toHaveBeenCalledWith(managerId)
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })

  it('should retrieve all managers when findAll is called', async () => {
    const mockManagerRepository = {
      managers: jest.fn().mockResolvedValue([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ]),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const result = await managerService.findAll()
    expect(mockManagerRepository.managers).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ])
  })

  it('should delete a manager when a valid ID is provided', async () => {
    const mockManagerRepository = {
      deleteManager: jest.fn().mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const managerId = '1'

    const result = await managerService.remove(managerId)

    expect(mockManagerRepository.deleteManager).toHaveBeenCalledWith(managerId)
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })

  it('should return null when trying to remove a manager with a non-existent ID', async () => {
    const mockManagerRepository = {
      deleteManager: jest.fn().mockResolvedValue(null),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const nonExistentId = '999'

    const result = await managerService.remove(nonExistentId)

    expect(mockManagerRepository.deleteManager).toHaveBeenCalledWith(
      nonExistentId,
    )
    expect(result).toBeNull()
  })

  it('should return null when manager with non-existent ID is searched', async () => {
    const mockManagerRepository = {
      manager: jest.fn().mockResolvedValue(null),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const nonExistentId = '999'

    const result = await managerService.findOne(nonExistentId)

    expect(mockManagerRepository.manager).toHaveBeenCalledWith(nonExistentId)
    expect(result).toBeNull()
  })

  it('should return an empty array when no managers exist', async () => {
    const mockManagerRepository = {
      managers: jest.fn().mockResolvedValue([]),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const result = await managerService.findAll()

    expect(mockManagerRepository.managers).toHaveBeenCalledWith({})
    expect(result).toEqual([])
  })

  it('should return null when repository returns null for findOne', async () => {
    const mockManagerRepository = {
      manager: jest.fn().mockResolvedValue(null),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const id = 'non-existent-id'

    const result = await managerService.findOne(id)

    expect(mockManagerRepository.manager).toHaveBeenCalledWith(id)
    expect(result).toBeNull()
  })

  it('should handle unexpected exceptions from repository methods', async () => {
    const mockManagerRepository = {
      createManager: jest.fn().mockRejectedValue(new Error('Unexpected error')),
      managers: jest.fn().mockRejectedValue(new Error('Unexpected error')),
      manager: jest.fn().mockRejectedValue(new Error('Unexpected error')),
      deleteManager: jest.fn().mockRejectedValue(new Error('Unexpected error')),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    await expect(
      managerService.create({
        name: 'Jane Doe',
        password: 'asfjsoa',
        email: 'jane@example.com',
      }),
    ).rejects.toThrow('Unexpected error')
    await expect(managerService.findAll()).rejects.toThrow('Unexpected error')
    await expect(managerService.findOne('1')).rejects.toThrow(
      'Unexpected error',
    )
    await expect(managerService.remove('1')).rejects.toThrow('Unexpected error')
  })

  it('should return all managers when findAll is called', async () => {
    const mockManagerRepository = {
      managers: jest.fn().mockResolvedValue([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ]),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const result = await managerService.findAll()

    expect(mockManagerRepository.managers).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ])
  })

  it('should return all managers when a large number of managers exist', async () => {
    const mockManagers = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      name: `Manager ${i}`,
    }))
    const mockManagerRepository = {
      managers: jest.fn().mockResolvedValue(mockManagers),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const result = await managerService.findAll()

    expect(mockManagerRepository.managers).toHaveBeenCalledWith({})
    expect(result).toEqual(mockManagers)
  })

  it('should handle slow repository response when finding all managers', async () => {
    const mockManagerRepository = {
      managers: jest
        .fn()
        .mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(() => resolve([{ id: '1', name: 'John Doe' }]), 3000),
            ),
        ),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const result = await managerService.findAll()

    expect(mockManagerRepository.managers).toHaveBeenCalledWith({})
    expect(result).toEqual([{ id: '1', name: 'John Doe' }])
  })

  it('should throw an error when unauthorized access is attempted', async () => {
    const mockManagerRepository = {
      managers: jest.fn().mockRejectedValue(new Error('Unauthorized')),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    await expect(managerService.findAll()).rejects.toThrow('Unauthorized')
  })

  it('should handle concurrent calls to findAll method correctly', async () => {
    const mockManagerRepository = {
      managers: jest.fn().mockResolvedValue([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Doe' },
      ]),
    }

    const managerService = new ManagerService(mockManagerRepository as any)

    const [result1, result2] = await Promise.all([
      managerService.findAll(),
      managerService.findAll(),
    ])

    expect(mockManagerRepository.managers).toHaveBeenCalledTimes(2)
    expect(result1).toEqual([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ])
    expect(result2).toEqual([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ])
  })
})
