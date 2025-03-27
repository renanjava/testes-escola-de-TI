import { Injectable } from '@nestjs/common'
import { UserRepositoryImpl } from '../../repositories/user/user.repository'
import { User } from '@prisma/client'
import { UpdateUserDto } from '../../dtos/user/update-user.dto'
import FindOneUserUseCase from '@/application/user/usecases/find-one-user.use-case'
import FindAllUsersUseCase from '@/application/user/usecases/find-all-users.use-case'
import RemoveUserUseCase from '@/application/user/usecases/remove-user.use-case'

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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: string): Promise<User> {
    const removeUserUseCase = new RemoveUserUseCase(this.userRepository)
    return (await removeUserUseCase.execute(id)) as User
  }
}
