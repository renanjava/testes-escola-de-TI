import { BakeryService } from '@/infrastructure/model/services/bakery.service'

describe('BakeryService', () => {
  // Successfully create a new bakery with valid CreateBakeryDto
  it('should create a new bakery when provided with valid CreateBakeryDto', async () => {
    // Arrange
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

    // Act
    const result = await bakeryService.create(createBakeryDto)

    // Assert
    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(
      createBakeryDto,
    )
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  // Handle case when creating bakery with invalid or incomplete DTO
  it('should throw an error when creating bakery with invalid DTO', async () => {
    // Arrange
    const errorMessage = 'Invalid bakery data'
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const invalidDto = {
      // Missing required fields
      phoneNumber: '555-1234',
    }

    // Act & Assert
    await expect(bakeryService.create(invalidDto as any)).rejects.toThrow(
      errorMessage,
    )
    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(invalidDto)
  })

  // Successfully delete a bakery by valid ID
  it('should delete a bakery when provided with a valid ID', async () => {
    // Arrange
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const bakeryId = '1'

    // Act
    const result = await bakeryService.remove(bakeryId)

    // Assert
    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: bakeryId,
    })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  // Successfully retrieve a bakery by valid ID
  it('should retrieve a bakery when provided with a valid ID', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const validId = '1'

    // Act
    const result = await bakeryService.findOne(validId)

    // Assert
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id: validId })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  // Successfully retrieve all bakeries
  it('should retrieve all bakeries when findAll is called', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    // Act
    const result = await bakeryService.findAll()

    // Assert
    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  // Handle case when findOne is called with non-existent ID
  it('should return null when findOne is called with a non-existent ID', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue(null),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const nonExistentId = '999'

    // Act
    const result = await bakeryService.findOne(nonExistentId)

    // Assert
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  // Methods correctly pass parameters to repository methods
  it('should call bakeryRepository.bakery with correct id when findOne is called', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const id = '1'

    // Act
    const result = await bakeryService.findOne(id)

    // Assert
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  // Handle case when remove is called with non-existent ID
  it('should return null when remove is called with non-existent ID', async () => {
    // Arrange
    const mockBakeryRepository = {
      deleteBakery: jest.fn().mockResolvedValue(null),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const nonExistentId = '999'

    // Act
    const result = await bakeryService.remove(nonExistentId)

    // Assert
    expect(mockBakeryRepository.deleteBakery).toHaveBeenCalledWith({
      id: nonExistentId,
    })
    expect(result).toBeNull()
  })

  // Handle repository errors during any operation
  it('should throw an error when the repository operation fails', async () => {
    // Arrange
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error('Repository error')),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    // Act & Assert
    await expect(bakeryService.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
  })

  // Handle empty result when findAll returns no bakeries
  it('should return an empty array when no bakeries are found', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    // Act
    const result = await bakeryService.findAll()

    // Assert
    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([])
  })

  // Check if methods properly propagate exceptions from repository
  it('should throw an error when repository throws an error during create', async () => {
    // Arrange
    const mockBakeryRepository = {
      createBakery: jest.fn().mockRejectedValue(new Error('Repository error')),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const createBakeryDto = {
      name: 'Test Bakery',
      address: '123 Baker St',
      phoneNumber: '555-1234',
    } as any

    // Act & Assert
    await expect(bakeryService.create(createBakeryDto)).rejects.toThrow(
      'Repository error',
    )
  })

  // Verify correct typing between service and repository layers
  it('should call bakeryRepository.bakery with correct id when findOne is called', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakery: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Bakery',
        address: '123 Baker St',
      }),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    const id = '1'

    // Act
    const result = await bakeryService.findOne(id)

    // Assert
    expect(mockBakeryRepository.bakery).toHaveBeenCalledWith({ id })
    expect(result).toEqual({
      id: '1',
      name: 'Test Bakery',
      address: '123 Baker St',
    })
  })

  // Verify service doesn't modify data before passing to repository
  it('should pass data unchanged to repository when creating a bakery', async () => {
    // Arrange
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

    // Act
    await bakeryService.create(createBakeryDto)

    // Assert
    expect(mockBakeryRepository.createBakery).toHaveBeenCalledWith(
      createBakeryDto,
    )
  })

  // Test interaction between service and repository using spies
  it('should find all bakeries when findAll is called', async () => {
    // Arrange
    const mockBakeryRepository = {
      bakeries: jest.fn().mockResolvedValue([
        { id: '1', name: 'Bakery One', address: '123 Main St' },
        { id: '2', name: 'Bakery Two', address: '456 Side St' },
      ]),
    }

    const bakeryService = new BakeryService(mockBakeryRepository as any)

    // Act
    const result = await bakeryService.findAll()

    // Assert
    expect(mockBakeryRepository.bakeries).toHaveBeenCalledWith({})
    expect(result).toEqual([
      { id: '1', name: 'Bakery One', address: '123 Main St' },
      { id: '2', name: 'Bakery Two', address: '456 Side St' },
    ])
  })

  // Verify async/await is properly implemented for all methods
  it('should call bakeryRepository methods with correct parameters and handle async/await properly', async () => {
    // Arrange
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

    // Act
    const createResult = await bakeryService.create(createBakeryDto)
    const findAllResult = await bakeryService.findAll()
    const findOneResult = await bakeryService.findOne('1')
    const removeResult = await bakeryService.remove('1')

    // Assert
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
