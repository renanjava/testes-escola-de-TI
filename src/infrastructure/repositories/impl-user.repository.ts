import { Injectable } from '@nestjs/common'
import { DatabaseConnection } from '@/infrastructure/database/database.connection'
import { User, Prisma } from '@prisma/client'
import IUserRepository from '@/domain/interfaces/user-repository.interface'
import UserEntity from '@/domain/entities/user.entity'
import { UserResponseProps } from '@/application/dtos/interfaces/user-response.props'

@Injectable()
export class UserRepositoryImpl implements IUserRepository<UserEntity> {
  constructor(private prisma: DatabaseConnection) {}

  async user(
    userWhereInput: Prisma.UserWhereInput,
  ): Promise<UserResponseProps | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
      omit: { password: true },
    })
  }

  async userLogin(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
    })
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<UserResponseProps[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      omit: { password: true },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserResponseProps> {
    return this.prisma.user.create({
      data,
      omit: { password: true },
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<UserResponseProps> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
      omit: { password: true },
    })
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserResponseProps> {
    return this.prisma.user.delete({
      where,
      omit: { password: true },
    })
  }
}
