import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/model/services/prisma.service'
import { Bakery, Prisma } from '@prisma/client'

@Injectable()
export class BakeryRepository {
  constructor(private prisma: PrismaService) {}

  async bakery(
    bakeryWhereInput: Prisma.BakeryWhereInput,
  ): Promise<Bakery | null> {
    return this.prisma.bakery.findFirst({
      where: bakeryWhereInput,
    })
  }

  async bakeries(params: {
    skip?: number
    take?: number
    cursor?: Prisma.BakeryWhereUniqueInput
    where?: Prisma.BakeryWhereInput
    orderBy?: Prisma.BakeryOrderByWithRelationInput
  }): Promise<Bakery[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.bakery.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createBakery(data: Prisma.BakeryCreateInput): Promise<Bakery> {
    return this.prisma.bakery.create({
      data,
    })
  }

  async updateBakery(params: {
    where: Prisma.BakeryWhereUniqueInput
    data: Prisma.BakeryUpdateInput
  }): Promise<Bakery> {
    const { where, data } = params
    return this.prisma.bakery.update({
      data,
      where,
    })
  }

  async deleteBakery(where: Prisma.BakeryWhereUniqueInput): Promise<Bakery> {
    return this.prisma.bakery.delete({
      where,
    })
  }
}
