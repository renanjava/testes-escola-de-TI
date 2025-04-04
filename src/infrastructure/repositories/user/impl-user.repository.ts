import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { User, Prisma } from '@prisma/client'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import UserEntity from '@/domain/user/entities/user.entity'

@Injectable()
export class UserRepositoryImpl implements IUserRepository<UserEntity> {
  constructor(private prisma: PrismaService) {}

  async user(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
      include: { bakeries: true },
    })
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      include: { bakeries: true },
      orderBy,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }
}
