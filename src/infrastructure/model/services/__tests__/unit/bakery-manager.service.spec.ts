import { BadRequestException, NotFoundException } from '@nestjs/common'
import { BakeryManagerService } from '../../bakery-manager.service'

describe('BakeryManagerService', () => {
  // Successfully creates a bakery-manager relationship when valid IDs are provided
  it('should create a bakery-manager relationship when valid IDs are provided', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }
    const bakery = { id: '1', name: 'Test Bakery' }
    const manager = { id: '2', name: 'Test Manager' }
    const expectedResult = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn().mockResolvedValue(expectedResult),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakery),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue(manager),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act
    const result = await service.create(createBakeryManagerDto)

    // Assert
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({ id: '2' })
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      bakeryId: '1',
      managerId: '2',
    })
    expect(
      bakeryManagerRepositoryMock.createBakeryManager,
    ).toHaveBeenCalledWith({
      bakery: { connect: { id: '1' } },
      manager: { connect: { id: '2' } },
    })
    expect(result).toEqual(expectedResult)
  })

  // Throws NotFoundException when bakery ID doesn't exist
  it('should throw NotFoundException when bakery ID doesnt exist', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn(),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const managerRepositoryMock = {
      manager: jest.fn(),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      new NotFoundException('Padaria não encontrada'),
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).not.toHaveBeenCalled()
    expect(bakeryManagerRepositoryMock.bakeryManager).not.toHaveBeenCalled()
    expect(
      bakeryManagerRepositoryMock.createBakeryManager,
    ).not.toHaveBeenCalled()
  })

  // Successfully removes a bakery-manager relationship by ID
  it('should remove a bakery-manager relationship when a valid ID is provided', async () => {
    // Arrange
    const bakeryManagerId = '3'
    const expectedResult = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue([]),
      deleteBakeryManager: jest.fn().mockResolvedValue(expectedResult),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      {} as any,
      {} as any,
    )

    // Act
    const result = await service.remove(bakeryManagerId)

    // Assert
    expect(
      bakeryManagerRepositoryMock.deleteBakeryManager,
    ).toHaveBeenCalledWith({ id: '3' })
    expect(result).toEqual(expectedResult)
  })

  // Successfully retrieves all bakery-manager relationships
  it('should retrieve all bakery-manager relationships successfully', async () => {
    // Arrange
    const expectedBakeryManagers = [
      { id: '1', bakeryId: '1', managerId: '2' },
      { id: '2', bakeryId: '2', managerId: '3' },
    ]

    const bakeryManagerRepositoryMock = {
      bakeryManagers: jest.fn().mockResolvedValue(expectedBakeryManagers),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      {} as any,
      {} as any,
    )

    // Act
    const result = await service.findAll()

    // Assert
    expect(bakeryManagerRepositoryMock.bakeryManagers).toHaveBeenCalledWith({})
    expect(result).toEqual(expectedBakeryManagers)
  })

  // Successfully retrieves a specific bakery-manager relationship by ID
  it('should retrieve a bakery-manager relationship by ID when a valid ID is provided', async () => {
    // Arrange
    const bakeryManagerId = '3'
    const expectedBakeryManager = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(expectedBakeryManager),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      {} as any,
      {} as any,
    )

    // Act
    const result = await service.findOne(bakeryManagerId)

    // Assert
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      id: '3',
    })
    expect(result).toEqual(expectedBakeryManager)
  })

  // Handles empty result when finding a non-existent bakery-manager by ID
  it('should return null when a non-existent bakery-manager ID is provided', async () => {
    // Arrange
    const nonExistentId = '999'
    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
    }
    const bakeryRepositoryMock = {}
    const managerRepositoryMock = {}

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act
    const result = await service.findOne(nonExistentId)

    // Assert
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  // Throws NotFoundException when manager ID doesn't exist
  it('should throw NotFoundException when manager ID does not exist', async () => {
    // Arrange
    const createBakeryManagerDto = {
      bakeryId: '1',
      managerId: 'non-existent-id',
    }
    const bakery = { id: '1', name: 'Test Bakery' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakery),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue(null),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({
      id: 'non-existent-id',
    })
  })

  // Handles removal of non-existent bakery-manager relationship
  it('should throw NotFoundException when trying to remove a non-existent bakery-manager relationship', async () => {
    // Arrange
    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      deleteBakeryManager: jest.fn(),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      {} as any,
      {} as any,
    )

    // Act & Assert
    await expect(service.remove('non-existent-id')).rejects.toThrow(
      NotFoundException,
    )
    expect(
      bakeryManagerRepositoryMock.deleteBakeryManager,
    ).not.toHaveBeenCalled()
  })

  // Validates input data structure from CreateBakeryManagerDto
  it('should throw NotFoundException when bakeryId is invalid', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: 'invalid', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn(),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const managerRepositoryMock = {
      manager: jest.fn(),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: 'invalid' })
  })

  // Throws BadRequestException when attempting to create a duplicate bakery-manager relationship
  it('should throw BadRequestException when creating a duplicate bakery-manager relationship', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }
    const bakery = { id: '1', name: 'Test Bakery' }
    const manager = { id: '2', name: 'Test Manager' }
    const existingBakeryManager = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(existingBakeryManager),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakery),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue(manager),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      BadRequestException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({ id: '2' })
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      bakeryId: '1',
      managerId: '2',
    })
  })

  // Properly connects bakery and manager entities in the repository
  it('should throw NotFoundException when bakery does not exist', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue({ id: '2', name: 'Test Manager' }),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
  })

  // Returns the created bakery-manager entity with correct structure
  it('should return the created bakery-manager entity with correct structure when valid IDs are provided', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }
    const bakery = { id: '1', name: 'Test Bakery' }
    const manager = { id: '2', name: 'Test Manager' }
    const expectedResult = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn().mockResolvedValue(expectedResult),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakery),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue(manager),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act
    const result = await service.create(createBakeryManagerDto)

    // Assert
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({ id: '2' })
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      bakeryId: '1',
      managerId: '2',
    })
    expect(
      bakeryManagerRepositoryMock.createBakeryManager,
    ).toHaveBeenCalledWith({
      bakery: { connect: { id: '1' } },
      manager: { connect: { id: '2' } },
    })
    expect(result).toEqual(expectedResult)
  })

  // Maintains referential integrity between bakeries and managers
  it('should throw NotFoundException when bakery does not exist', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const managerRepositoryMock = {
      manager: jest.fn(),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
  })

  // Properly formats error messages in Portuguese
  it('should throw NotFoundException with Portuguese message when bakery is not found', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }
    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      createBakeryManager: jest.fn(),
    }
    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(null),
    }
    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue({ id: '2', name: 'Test Manager' }),
    }
    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrowError(
      new NotFoundException('Padaria não encontrada'),
    )
  })

  // Handles concurrent creation requests for the same bakery-manager relationship
  it('should throw BadRequestException when creating a duplicate bakery-manager relationship concurrently', async () => {
    // Arrange
    const createBakeryManagerDto = { bakeryId: '1', managerId: '2' }
    const bakery = { id: '1', name: 'Test Bakery' }
    const manager = { id: '2', name: 'Test Manager' }
    const existingBakeryManager = { id: '3', bakeryId: '1', managerId: '2' }

    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(existingBakeryManager),
      createBakeryManager: jest.fn(),
    }

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakery),
    }

    const managerRepositoryMock = {
      manager: jest.fn().mockResolvedValue(manager),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      bakeryRepositoryMock as any,
      managerRepositoryMock as any,
    )

    // Act & Assert
    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      BadRequestException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({ id: '2' })
    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith({
      bakeryId: '1',
      managerId: '2',
    })
    expect(
      bakeryManagerRepositoryMock.createBakeryManager,
    ).not.toHaveBeenCalled()
  })
})
