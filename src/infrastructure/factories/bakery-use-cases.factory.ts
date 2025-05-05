import CreateBakeryUseCase from '@/application/usecases/bakery/create-bakery.use-case'
import FindAllBakeriesUseCase from '@/application/usecases/bakery/find-all-bakeries.use-case'
import FindOneBakeryUseCase from '@/application/usecases/bakery/find-one-bakery.use-case'
import RemoveBakeryUseCase from '@/application/usecases/bakery/remove-bakery.use-case'
import UpdateBakeryUseCase from '@/application/usecases/bakery/update-bakery.use-case'
import BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import BakeryEntity from '@/domain/entities/bakery.entity'
import IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import IBakeryRepository from '@/domain/interfaces/bakery-repository.interface'
import { Inject } from '@nestjs/common'

export class BakeryUseCasesFactory {
  constructor(
    @Inject('BakeryRepository')
    private readonly iBakeryRepository: IBakeryRepository<BakeryEntity>,
    @Inject('BakeryManagerRepository')
    private readonly iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  getCreateBakeryUseCaseInstance() {
    return new CreateBakeryUseCase(this.iBakeryRepository)
  }

  getFindAllBakeriesUseCaseInstance() {
    return new FindAllBakeriesUseCase(this.iBakeryRepository)
  }

  getFindOneBakeryUseCaseInstance() {
    return new FindOneBakeryUseCase(this.iBakeryRepository)
  }

  getUpdateBakeryUseCaseInstance() {
    return new UpdateBakeryUseCase(this.iBakeryRepository)
  }

  getRemoveBakeryUseCaseInstance() {
    return new RemoveBakeryUseCase(this.iBakeryRepository)
  }
}
