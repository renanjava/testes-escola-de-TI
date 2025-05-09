import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryEntity from '@/domain/entities/bakery.entity'
import type IBakeryRepository from '@/domain/interfaces/bakery-repository.interface'

export default class CreateBakeryUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(inputBakery: BakeryEntity): Promise<BakeryEntity> {
    return await this.iBakeryRepository.createBakery(inputBakery)
  }
}
