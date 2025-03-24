import { BakeryDataBuilder } from '@/infrastructure/common/helper/bakery/bakery-data-builder'
import { CreateBakeryProps } from '@/infrastructure/model/entities/dto/bakery/create-bakery.dto'
import { BakeryService } from '@/infrastructure/model/services/bakery.service'

describe('BakeryService Unit Tests', () => {
  let bakeryProps: CreateBakeryProps
  it('should create a new bakery when valid data is provided', async () => {
    bakeryProps = BakeryDataBuilder({} as CreateBakeryProps)

    const bakeryRepositoryMock = {
      bakery: jest.fn().mockResolvedValue(bakeryProps),
    }

    const bakeryService = new BakeryService(bakeryRepositoryMock as any)

    const result = await bakeryService.create(bakeryProps)

    expect(bakeryRepositoryMock.bakery).toHaveBeenCalledWith(bakeryProps)
    expect(result).toEqual(bakeryProps)
  })

  it('should throw an error when creating a bakery with invalid data', async () => {
    const errorMessage = 'Invalid bakery data'
    const mockBakeryRepository = {
      bakery: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const invalidBakeryDto = {
      address: '123 Baker St',
    }

    await expect(service.create(invalidBakeryDto as any)).rejects.toThrow(
      errorMessage,
    )
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith(invalidBakeryDto)
  })

  it('should remove a bakery when a valid ID is provided', async () => {
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const bakeryId = '1'

    const result = await service.remove(bakeryId)

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: bakeryId,
    })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should return all bakeries when findAll is called', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const result = await service.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  it('should return a bakery when a valid ID is provided', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const validId = '1'

    const result = await service.findOne(validId)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id: validId })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should update a bakery when valid ID and data are provided', async () => {
    const mockBakeryRepository = {
      updateBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Updated Bakery',
        address: '456 New St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const updateBakeryDto = {
      name: 'Updated Bakery',
      address: '456 New St',
      phone: '555-5678',
    }

    const id = '1'

    const result = await service.update(id, updateBakeryDto)

    expect(mockBakeryRepository.updateBakery).toHaveBeenCalledWith({
      where: { id },
      data: updateBakeryDto,
    })
    expect(result).toEqual({
      id: '1',
      name: 'Updated Bakery',
      address: '456 New St',
    })
  })

  it('should pass the createBakeryDto to the repository when creating a bakery', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phone: '555-1234',
    } as any

    await service.create(createBakeryDto)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith(createBakeryDto)
  })

  it('should propagate error from repository when creating a bakery', async () => {
    const mockError = new Error('Repository error')
    const mockBakeryRepository = {
      bakery: jest.fn().mockRejectedValue(mockError),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phone: '555-1234',
    } as any

    await expect(service.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith(createBakeryDto)
  })

  it('should return all bakeries when findAll is called', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const result = await service.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  it('should structure where and data parameters correctly when updating a bakery', async () => {
    const mockBakeryRepository = {
      updateBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Updated Bakery',
        address: '456 Baker St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const id = '1'
    const updateBakeryDto = {
      name: 'Updated Bakery',
      address: '456 Baker St',
    }

    const result = await service.update(id, updateBakeryDto)

    expect(mockBakeryRepository.updateBakery).toHaveBeenCalledWith({
      where: { id },
      data: updateBakeryDto,
    })
    expect(result).toEqual({
      id: '1',
      name: 'Updated Bakery',
      address: '456 Baker St',
    })
  })

  it('should return null when bakery with non-existent ID is searched', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const nonExistentId = '999'

    const result = await service.findOne(nonExistentId)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  it('should return null when trying to remove a bakery with a non-existent ID', async () => {
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue(null),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const nonExistentId = '999'

    const result = await service.remove(nonExistentId)

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  it('should return an empty array when no bakeries are found', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([]),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const result = await service.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([])
  })

  it('should return null when updating a bakery with a non-existent ID', async () => {
    const mockBakeryRepository = {
      updateBakery: jest.fn().mockResolvedValue(null),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const updateBakeryDto = {
      name: 'Updated Bakery',
      address: '456 New St',
      phone: '555-5678',
    }

    const nonExistentId = '999'

    const result = await service.update(nonExistentId, updateBakeryDto)

    expect(mockBakeryRepository.updateBakery).toHaveBeenCalledWith({
      where: { id: nonExistentId },
      data: updateBakeryDto,
    })
    expect(result).toBeNull()
  })

  it('should throw an error when the repository throws an exception', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockRejectedValue(new Error('Repository error')),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phone: '555-1234',
    } as any

    await expect(service.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
  })

  it('should await repository responses for all methods', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
      bakeries: jest
        .fn()
        .mockResolvedValue([
          { id: '1', name: 'Test Bakery', address: '123 Baker St' },
        ]),
      updateBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Updated Bakery',
        address: '123 Baker St',
      }),
      deleteBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Deleted Bakery',
        address: '123 Baker St',
      }),
    }

    const service = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phone: '555-1234',
    } as any
    const updateBakeryDto = { name: 'Updated Bakery', address: '123 Baker St' }
    const id = '1'

    const createResult = await service.create(createBakeryDto)
    const findAllResult = await service.findAll()
    const findOneResult = await service.findOne(id)
    const updateResult = await service.update(id, updateBakeryDto)
    const removeResult = await service.remove(id)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith(createBakeryDto)
    expect(createResult).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(findAllResult).toEqual([
      { id: '1', name: 'Test Bakery', address: '123 Baker St' },
    ])

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id })
    expect(findOneResult).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })

    expect(mockBakeryRepository.updateBakery).toHaveBeenCalledWith({
      where: { id },
      data: updateBakeryDto,
    })
    expect(updateResult).toEqual({
      id: '1',
      name: 'Updated Bakery',
      address: '123 Baker St',
    })

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({ id })
    expect(removeResult).toEqual({
      id: '1',
      name: 'Deleted Bakery',
      address: '123 Baker St',
    })
  })
})
