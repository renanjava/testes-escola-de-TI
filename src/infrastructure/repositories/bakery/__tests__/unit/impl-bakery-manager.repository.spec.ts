import type { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { BakeryManagerRepositoryImpl } from '../../impl-bakery-manager.repository'

describe('BakeryManagerRepositoryImpl', () => {
  it('should return bakery manager with included relations when valid criteria is provided', async () => {
    const mockPrismaService = {
      bakeryManager: {
        findFirst: jest.fn(),
      },
    }

    const repository = new BakeryManagerRepositoryImpl(
      mockPrismaService as unknown as PrismaService,
    )

    const mockBakeryManager = {
      id: 1,
      bakeryId: 101,
      managerId: 201,
      createdAt: new Date(),
      updatedAt: new Date(),
      manager: { id: 201, name: 'John Doe' },
      bakery: { id: 101, name: 'Sweet Bakery' },
    }

    mockPrismaService.bakeryManager.findFirst.mockResolvedValue(
      mockBakeryManager,
    )

    const whereInput = { id: '1' }

    const result = await repository.bakeryManager(whereInput)

    expect(mockPrismaService.bakeryManager.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { manager: true, bakery: true },
    })

    expect(result).toEqual(mockBakeryManager)
  })

  it('should return null when bakery manager with given criteria does not exist', async () => {
    const mockPrismaService = {
      bakeryManager: {
        findFirst: jest.fn(),
      },
    }

    const repository = new BakeryManagerRepositoryImpl(
      mockPrismaService as unknown as PrismaService,
    )

    mockPrismaService.bakeryManager.findFirst.mockResolvedValue(null)

    const whereInput = { id: '999' }

    const result = await repository.bakeryManager(whereInput)

    expect(mockPrismaService.bakeryManager.findFirst).toHaveBeenCalledWith({
      where: whereInput,
      include: { manager: true, bakery: true },
    })

    expect(result).toBeNull()
  })
})
