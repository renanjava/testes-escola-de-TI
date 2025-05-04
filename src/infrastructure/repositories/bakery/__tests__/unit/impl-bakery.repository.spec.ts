/* eslint-disable @typescript-eslint/unbound-method */
import type { DatabaseConnection } from '@/infrastructure/database/database.connection'
import { BakeryRepositoryImpl } from '../../impl-bakery.repository'
import type { Prisma } from '@prisma/client'

describe('BakeryRepositoryImpl', () => {
  it('should return bakery with managers and products when valid criteria is provided', async () => {
    const mockBakery = {
      id: 1,
      name: 'Test Bakery',
      managers: [{ id: 1, name: 'Manager 1' }],
      products: [{ id: 1, name: 'Product 1' }],
    }

    const prismaServiceMock = {
      bakery: {
        findFirst: jest.fn().mockResolvedValue(mockBakery),
      },
    } as unknown as DatabaseConnection

    const repository = new BakeryRepositoryImpl(prismaServiceMock)

    await prismaServiceMock.bakery.findFirst()

    const whereInput: Prisma.BakeryWhereInput = { id: '1' }

    const result = await repository.bakery(whereInput)

    expect(prismaServiceMock.bakery.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { managers: true, products: true },
    })

    expect(result).toEqual(mockBakery)
  })

  it('should return null when bakery with provided criteria does not exist', async () => {
    const prismaServiceMock = {
      bakery: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    } as unknown as DatabaseConnection

    const repository = new BakeryRepositoryImpl(prismaServiceMock)

    await prismaServiceMock.bakery.findFirst()

    const whereInput: Prisma.BakeryWhereInput = { id: '999' }

    const result = await repository.bakery(whereInput)

    expect(prismaServiceMock.bakery.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { managers: true, products: true },
    })

    expect(result).toBeNull()
  })
})
