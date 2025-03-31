import { Injectable } from '@nestjs/common'
import CreateManagerUseCase from '@/application/bakery/usecases/create-manager.use-case'
import FindAllManagersUseCase from '@/application/bakery/usecases/find-all-managers.use-case'
import FindOneManagerUseCase from '@/application/bakery/usecases/find-one-manager.use-case'
import RemoveManagerUseCase from '@/application/bakery/usecases/remove-manager.use-case'
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
