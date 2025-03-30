import { Injectable } from '@nestjs/common'
import { ManagerRepository } from '@/infrastructure/repositories/bakery/manager.repository'
import ManagerEntity from '@/domain/bakery/entities/manager.entity'
import UpdateManagerUseCase from '@/application/bakery/usecases/update-manager.use-case'
import CreateManagerUseCase from '@/application/bakery/usecases/create-manager.use-case'
import FindAllManagersUseCase from '@/application/bakery/usecases/find-all-managers.use-case'
import FindOneManagerUseCase from '@/application/bakery/usecases/find-one-manager.use-case'
import RemoveManagerUseCase from '@/application/bakery/usecases/remove-manager.use-case'

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}
  async create(inputManager: ManagerEntity) {
    const createManagerUseCase = new CreateManagerUseCase(
      this.managerRepository,
    )
    return await createManagerUseCase.execute(inputManager)
  }

  async findAll() {
    const findAllManagersUseCase = new FindAllManagersUseCase(
      this.managerRepository,
    )
    return await findAllManagersUseCase.execute()
  }

  async findOne(id: string) {
    const findOneManagerUseCase = new FindOneManagerUseCase(
      this.managerRepository,
    )
    return await findOneManagerUseCase.execute(id)
  }

  async update(id: string, inputManager: Partial<ManagerEntity>) {
    const updateManagerUseCase = new UpdateManagerUseCase(
      this.managerRepository,
    )
    return await updateManagerUseCase.execute(id, inputManager)
  }

  async remove(id: string) {
    const removeManagerUseCase = new RemoveManagerUseCase(
      this.managerRepository,
    )
    return await removeManagerUseCase.execute(id)
  }
}
