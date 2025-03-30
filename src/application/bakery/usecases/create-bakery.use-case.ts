import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'

export default class CreateBakeryUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(bakeryEntity: BakeryEntity): Promise<BakeryEntity> {
    return await this.iBakeryRepository.createBakery(bakeryEntity)
  }
}
