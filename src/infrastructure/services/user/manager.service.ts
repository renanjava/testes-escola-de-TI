import { Injectable } from '@nestjs/common'
import CreateManagerUseCase from '@/application/usecases/bakery/create-manager.use-case'
import FindAllManagersUseCase from '@/application/usecases/bakery/find-all-managers.use-case'
import FindOneManagerUseCase from '@/application/usecases/bakery/find-one-manager.use-case'
import RemoveManagerUseCase from '@/application/usecases/bakery/remove-manager.use-case'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { User } from '@prisma/client'

@Injectable()
export class ManagerService {
  constructor(private userRepository: UserRepositoryImpl) {}
  async create(id: string) {
    const createManagerUseCase = new CreateManagerUseCase(this.userRepository)
    return (await createManagerUseCase.execute(id)) as User
  }

  async findAll() {
    const findAllManagersUseCase = new FindAllManagersUseCase(
      this.userRepository,
    )
    return (await findAllManagersUseCase.execute()) as User[]
  }

  async findOne(id: string) {
    const findOneManagerUseCase = new FindOneManagerUseCase(this.userRepository)
    return await findOneManagerUseCase.execute(id)
  }

  async remove(id: string) {
    const removeManagerUseCase = new RemoveManagerUseCase(this.userRepository)
    return await removeManagerUseCase.execute(id)
  }
}
