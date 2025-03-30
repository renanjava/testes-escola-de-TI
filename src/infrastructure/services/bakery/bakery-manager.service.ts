import { Injectable } from '@nestjs/common'
import { BakeryManagerRepository } from '@/infrastructure/repositories/bakery/bakery-manager.repository'
import { BakeryRepository } from '@/infrastructure/repositories/bakery/bakery.repository'
import { ManagerRepository } from '@/infrastructure/repositories/bakery/manager.repository'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import CreateBakeryManagerUseCase from '@/application/bakery/usecases/create-bakery-manager.use-case'
import FindAllBakeryManagersUseCase from '@/application/bakery/usecases/find-all-bakery-managers.use-case'
import FindOneBakeryManagerUseCase from '@/application/bakery/usecases/find-one-bakery-manager.use-case'
import RemoveBakeryManagerUseCase from '@/application/bakery/usecases/remove-bakery-manager.use-case'

@Injectable()
export class BakeryManagerService {
  constructor(
    private bakeryManagerRepository: BakeryManagerRepository,
    private bakeryRepository: BakeryRepository,
    private managerRepository: ManagerRepository,
  ) {}
  async create(inputBakeryManager: BakeryManagerEntity) {
    const createBakeryManagerUseCase = new CreateBakeryManagerUseCase(
      this.bakeryManagerRepository,
      this.bakeryRepository,
      this.managerRepository,
    )
    return await createBakeryManagerUseCase.execute(inputBakeryManager)
  }

  async findAll() {
    const findAllBakeryManagers = new FindAllBakeryManagersUseCase(
      this.bakeryManagerRepository,
    )
    return await findAllBakeryManagers.execute()
  }

  async findOne(id: string) {
    const findOneBakeryManager = new FindOneBakeryManagerUseCase(
      this.bakeryManagerRepository,
    )
    return await findOneBakeryManager.execute(id)
  }

  async remove(id: string) {
    const removeBakeryManagerUseCase = new RemoveBakeryManagerUseCase(
      this.bakeryManagerRepository,
    )
    return await removeBakeryManagerUseCase.execute(id)
  }
}
