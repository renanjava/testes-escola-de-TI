import { Injectable } from '@nestjs/common'
import { UserRepositoryImpl } from '../../repositories/user/user.repository'
import { User } from '@prisma/client'
import FindOneUserUseCase from '@/application/user/usecases/find-one-user.use-case'
import FindAllUsersUseCase from '@/application/user/usecases/find-all-users.use-case'
import RemoveUserUseCase from '@/application/user/usecases/remove-user.use-case'
import UpdateUserUseCase from '@/application/user/usecases/update-user.use-case'
import UserEntity from '@/domain/user/entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async findAll(): Promise<User[]> {
    const findAllUsersUseCase = new FindAllUsersUseCase(this.userRepository)
    return (await findAllUsersUseCase.execute()) as User[]
  }

  async findOne(id: string): Promise<User> {
    const findOneUserUseCase = new FindOneUserUseCase(this.userRepository)
    return (await findOneUserUseCase.execute(id)) as User
  }

  async update(id: string, updateEntity: Partial<UserEntity>): Promise<User> {
    const updateUserUseCase = new UpdateUserUseCase(this.userRepository)
    return (await updateUserUseCase.execute(id, updateEntity)) as User
  }

  async remove(id: string): Promise<User> {
    const removeUserUseCase = new RemoveUserUseCase(this.userRepository)
    return (await removeUserUseCase.execute(id)) as User
  }
}
