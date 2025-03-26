import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'

describe('BakeryService', () => {
  it('should create a new bakery when provided with valid CreateBakeryDto', async () => {
    const mockBakeryRepository = {
      createBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    const result = await bakeryService.create(createBakeryDto)

    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(
      createBakeryDto,
    )
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should throw an error when creating bakery with invalid DTO', async () => {
    const errorMessage = 'Invalid bakery data'
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const invalidDto = {
      phoneNumber: '555-1234',
    }

    await expect(bakeryService.create(invalidDto as any)).rejects.toThrow(
      errorMessage,
    )
    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(invalidDto)
  })

  it('should delete a bakery when provided with a valid ID', async () => {
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const bakeryId = '1'

    const result = await bakeryService.remove(bakeryId)

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: bakeryId,
    })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should retrieve a bakery when provided with a valid ID', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const validId = '1'

    const result = await bakeryService.findOne(validId)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id: validId })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should retrieve all bakeries when findAll is called', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const result = await bakeryService.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  it('should return null when findOne is called with a non-existent ID', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const nonExistentId = '999'

    const result = await bakeryService.findOne(nonExistentId)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  it('should call bakeryRepository.bakery with correct id when findOne is called', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)
    const id = '1'
    const result = await bakeryService.findOne(id)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should return null when remove is called with non-existent ID', async () => {
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue(null),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)
    const nonExistentId = '999'
    const result = await bakeryService.remove(nonExistentId)

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  it('should throw an error when the repository operation fails', async () => {
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error('Repository error')),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    await expect(bakeryService.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
  })

  it('should return an empty array when no bakeries are found', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const result = await bakeryService.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([])
  })

  it('should throw an error when repository throws an error during create', async () => {
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error('Repository error')),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    await expect(bakeryService.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
  })

  it('should call bakeryRepository.bakery with correct id when findOne is called', async () => {
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const id = '1'

    const result = await bakeryService.findOne(id)

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  it('should pass data unchanged to repository when creating a bakery', async () => {
    const mockBakeryRepository = {
      createBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    await bakeryService.create(createBakeryDto)

    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(
      createBakeryDto,
    )
  })

  it('should find all bakeries when findAll is called', async () => {
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const result = await bakeryService.findAll()

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  it('should call bakeryRepository methods with correct parameters and handle async/await properly', async () => {
    const mockBakeryRepository = {
      createBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
      bakeries: jest
        .fn()
        .mockResolvedValue([
          { id: '1', name: 'Test Bakery', address: '123 Baker St' },
        ]),
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
      deleteBakery: jest.fn().mockResolvedValue({ id: '1' }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    const createResult = await bakeryService.create(createBakeryDto)
    const findAllResult = await bakeryService.findAll()
    const findOneResult = await bakeryService.findOne('1')
    const removeResult = await bakeryService.remove('1')

    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(
      createBakeryDto,
    )
    expect(createResult).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })

    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(findAllResult).toEqual([
      { id: '1', name: 'Test Bakery', address: '123 Baker St' },
    ])

    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id: '1' })
    expect(findOneResult).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })

    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({ id: '1' })
    expect(removeResult).toEqual({ id: '1' })
  })
})
