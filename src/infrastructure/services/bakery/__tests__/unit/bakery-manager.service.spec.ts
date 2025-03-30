import { BadRequestException, NotFoundException } from '@nestjs/common'
import { BakeryManagerService } from '../../bakery-manager.service'

describe('BakeryManagerService', () => {
  it('should create a bakery-manager relationship when valid IDs are provided', async () => {
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

    const result = await service.create(createBakeryManagerDto)

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

  it('should throw NotFoundException when bakery ID doesnt exist', async () => {
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

  it('should remove a bakery-manager relationship when a valid ID is provided', async () => {
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

    const result = await service.remove(bakeryManagerId)

    expect(
      bakeryManagerRepositoryMock.deleteBakeryManager,
    ).toHaveBeenCalledWith({ id: '3' })
    expect(result).toEqual(expectedResult)
  })

  it('should retrieve all bakery-manager relationships successfully', async () => {
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

    const result = await service.findAll()

    expect(bakeryManagerRepositoryMock.bakeryManagers).toHaveBeenCalledWith({})
    expect(result).toEqual(expectedBakeryManagers)
  })

  it('should retrieve a bakery-manager relationship by ID when a valid ID is provided', async () => {
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

    const result = await service.findOne(bakeryManagerId)

    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith('3')
    expect(result).toEqual(expectedBakeryManager)
  })

  it('should return null when a non-existent bakery-manager ID is provided', async () => {
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

    const result = await service.findOne(nonExistentId)

    expect(bakeryManagerRepositoryMock.bakeryManager).toHaveBeenCalledWith(
      nonExistentId,
    )
    expect(result).toBeNull()
  })

  it('should throw NotFoundException when manager ID does not exist', async () => {
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

    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(managerRepositoryMock.manager).toHaveBeenCalledWith({
      id: 'non-existent-id',
    })
  })

  it('should throw NotFoundException when trying to remove a non-existent bakery-manager relationship', async () => {
    const bakeryManagerRepositoryMock = {
      bakeryManager: jest.fn().mockResolvedValue(null),
      deleteBakeryManager: jest.fn(),
    }

    const service = new BakeryManagerService(
      bakeryManagerRepositoryMock as any,
      {} as any,
      {} as any,
    )

    await expect(service.remove('non-existent-id')).rejects.toThrow(
      NotFoundException,
    )
    expect(
      bakeryManagerRepositoryMock.deleteBakeryManager,
    ).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException when bakeryId is invalid', async () => {
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

    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: 'invalid' })
  })

  it('should throw BadRequestException when creating a duplicate bakery-manager relationship', async () => {
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

  it('should throw NotFoundException when bakery does not exist', async () => {
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

    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
  })

  it('should return the created bakery-manager entity with correct structure when valid IDs are provided', async () => {
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

    const result = await service.create(createBakeryManagerDto)

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

  it('should throw NotFoundException when bakery does not exist', async () => {
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

    await expect(service.create(createBakeryManagerDto)).rejects.toThrow(
      NotFoundException,
    )
    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith({ id: '1' })
  })

  it('should throw NotFoundException with Portuguese message when bakery is not found', async () => {
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

    await expect(service.create(createBakeryManagerDto)).rejects.toThrowError(
      new NotFoundException('Padaria não encontrada'),
    )
  })

  it('should throw BadRequestException when creating a duplicate bakery-manager relationship concurrently', async () => {
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
