import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryEntity from '@/domain/entities/bakery.entity'
import type IBakeryRepository from '@/domain/interfaces/bakery-repository.interface'

export default class FindOneBakeryUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(id: string): Promise<BakeryEntity | null> {
    return await this.iBakeryRepository.bakery({ id })
  }
}
