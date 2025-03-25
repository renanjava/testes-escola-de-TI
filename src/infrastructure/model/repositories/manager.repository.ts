import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'
import { Manager, Prisma } from '@prisma/client'

@Injectable()
export class ManagerRepository {
  constructor(private prisma: PrismaService) {}

  async manager(
    managerWhereInput: Prisma.ManagerWhereInput,
  ): Promise<Manager | null> {
    return this.prisma.manager.findFirst({
      where: managerWhereInput,
    })
  }

  async managers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ManagerWhereUniqueInput
    where?: Prisma.ManagerWhereInput
    orderBy?: Prisma.ManagerOrderByWithRelationInput
  }): Promise<Manager[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.manager.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createManager(data: Prisma.ManagerCreateInput): Promise<Manager> {
    return this.prisma.manager.create({
      data,
    })
  }

  async updateManager(params: {
    where: Prisma.ManagerWhereUniqueInput
    data: Prisma.ManagerUpdateInput
  }): Promise<Manager> {
    const { where, data } = params
    return this.prisma.manager.update({
      data,
      where,
    })
  }

  async deleteManager(where: Prisma.ManagerWhereUniqueInput): Promise<Manager> {
    return this.prisma.manager.delete({
      where,
    })
  }
}
