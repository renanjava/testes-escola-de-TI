import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import type IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'

export default class FindAllBakeriesUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(): Promise<BakeryEntity[]> {
    return await this.iBakeryRepository.bakeries({})
  }
}
