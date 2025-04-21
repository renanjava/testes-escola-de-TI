import type { DatabaseConnection } from '@/infrastructure/database/database.connection'
import { ProductRepositoryImpl } from '../../impl-product.repository'

describe('ProductRepositoryImpl', () => {
  it('should return a product with bakery included when valid criteria is provided', async () => {
    const mockProduct = {
      id: '1',
      name: 'Croissant',
      price: 2.5,
      bakeryId: '1',
      bakery: {
        id: '1',
        name: 'Paris Bakery',
      },
    }

    const mockPrismaService = {
      product: {
        findFirst: jest.fn().mockResolvedValue(mockProduct),
      },
    }

    const productRepository = new ProductRepositoryImpl(
      mockPrismaService as unknown as DatabaseConnection,
    )

    const whereInput = { id: '1' }

    const result = await productRepository.product(whereInput)

    expect(mockPrismaService.product.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { bakery: true },
    })
    expect(result).toEqual(mockProduct)
    expect(result!.bakeryId).toBeDefined()
  })

  it('should return null when product with given criteria does not exist', async () => {
    const mockPrismaService = {
      product: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    }

    const productRepository = new ProductRepositoryImpl(
      mockPrismaService as unknown as DatabaseConnection,
    )

    const whereInput = { id: '999' }

    const result = await productRepository.product(whereInput)

    expect(mockPrismaService.product.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { bakery: true },
    })
    expect(result).toBeNull()
  })
})
