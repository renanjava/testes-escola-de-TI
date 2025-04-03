import type IUseCases from '@/application/interfaces/use-cases.interface'
import type BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import type IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'

export default class RemoveBakeryUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(id: string): Promise<BakeryEntity> {
    return await this.iBakeryRepository.deleteBakery({ id })
  }
}
