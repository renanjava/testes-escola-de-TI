import { Injectable } from '@nestjs/common'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import CreateBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/create-bakery-manager.use-case'
import FindAllBakeryManagersUseCase from '@/application/usecases/bakery/bakery-manager/find-all-bakery-managers.use-case'
import FindOneBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/find-one-bakery-manager.use-case'
import RemoveBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/remove-bakery-manager.use-case'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { BakeryManager } from '@prisma/client'

@Injectable()
export class BakeryManagerService {
  constructor(
    private bakeryManagerRepository: BakeryManagerRepositoryImpl,
    private bakeryRepository: BakeryRepositoryImpl,
    private userRepository: UserRepositoryImpl,
  ) {}
  async create(inputBakeryManager: BakeryManagerEntity) {
    const createBakeryManagerUseCase = new CreateBakeryManagerUseCase(
      this.bakeryManagerRepository,
      this.bakeryRepository,
      this.userRepository,
    )
    return (await createBakeryManagerUseCase.execute(
      inputBakeryManager,
    )) as BakeryManager
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
      this.userRepository,
    )
    return await removeBakeryManagerUseCase.execute(id)
  }
}
