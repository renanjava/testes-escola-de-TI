import CreateBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/create-bakery-manager.use-case'
import FindAllBakeryManagersUseCase from '@/application/usecases/bakery/bakery-manager/find-all-bakery-managers.use-case'
import FindOneBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/find-one-bakery-manager.use-case'
import RemoveBakeryManagerUseCase from '@/application/usecases/bakery/bakery-manager/remove-bakery-manager.use-case'
import BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import BakeryEntity from '@/domain/entities/bakery.entity'
import IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import IBakeryRepository from '@/domain/interfaces/bakery-repository.interface'
import UserEntity from '@/domain/entities/user.entity'
import IUserRepository from '@/domain/interfaces/user-repository.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class BakeryManagerUseCasesFactory {
  constructor(
    @Inject('BakeryManagerRepository')
    private readonly iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
    @Inject('BakeryRepository')
    private readonly iBakeryRepository: IBakeryRepository<BakeryEntity>,
    @Inject('UserRepository')
    private readonly iUserRepository: IUserRepository<UserEntity>,
  ) {}

  getCreateBakeryManagerUseCaseInstance() {
    return new CreateBakeryManagerUseCase(
      this.iBakeryManagerRepository,
      this.iBakeryRepository,
      this.iUserRepository,
    )
  }

  getFindAllBakeryManagersUseCaseInstance() {
    return new FindAllBakeryManagersUseCase(this.iBakeryManagerRepository)
  }

  getFindOneBakeryManagerUseCaseInstance() {
    return new FindOneBakeryManagerUseCase(this.iBakeryManagerRepository)
  }

  getRemoveBakeryManagerUseCaseInstance() {
    return new RemoveBakeryManagerUseCase(
      this.iBakeryManagerRepository,
      this.iUserRepository,
    )
  }
}
