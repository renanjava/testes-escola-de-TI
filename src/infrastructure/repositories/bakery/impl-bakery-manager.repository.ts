import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infrastructure/services/prisma/prisma.service'
import { BakeryManager, Prisma } from '@prisma/client'

@Injectable()
export class BakeryManagerRepositoryImpl {
  constructor(private prisma: PrismaService) {}

  async bakeryManager(
    bakeryManagerWhereInput: Prisma.BakeryManagerWhereInput,
  ): Promise<BakeryManager | null> {
    return this.prisma.bakeryManager.findFirst({
      where: bakeryManagerWhereInput,
      include: { manager: true, bakery: true },
    })
  }

  async bakeryManagers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.BakeryManagerWhereUniqueInput
    where?: Prisma.BakeryManagerWhereInput
    orderBy?: Prisma.BakeryManagerOrderByWithRelationInput
  }): Promise<BakeryManager[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.bakeryManager.findMany({
      skip,
      take,
      cursor,
      where,
      include: { manager: true, bakery: true },
      orderBy,
    })
  }

  async createBakeryManager(
    data: Prisma.BakeryManagerCreateInput,
  ): Promise<BakeryManager> {
    return this.prisma.bakeryManager.create({
      data,
    })
  }

  async updateBakeryManager(params: {
    where: Prisma.BakeryManagerWhereUniqueInput
    data: Prisma.BakeryManagerUpdateInput
  }): Promise<BakeryManager> {
    const { where, data } = params
    return this.prisma.bakeryManager.update({
      data,
      where,
    })
  }

  async deleteBakeryManager(
    where: Prisma.BakeryManagerWhereUniqueInput,
  ): Promise<BakeryManager> {
    return this.prisma.bakeryManager.delete({
      where,
    })
  }
}
