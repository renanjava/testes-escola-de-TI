import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'

export default class UpdateBakeryUseCase implements IUseCases {
  constructor(private iBakeryRepository: IBakeryRepository<BakeryEntity>) {}

  async execute(
    id: string,
    inputBakery: Partial<BakeryEntity>,
  ): Promise<BakeryEntity> {
    return await this.iBakeryRepository.updateBakery({
      where: { id },
      data: inputBakery,
    })
  }
}
