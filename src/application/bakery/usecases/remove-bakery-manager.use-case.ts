import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import { NotFoundException } from '@nestjs/common'

export default class RemoveBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity> {
    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({ id: id })

    if (!bakeryManagerFinded) {
      throw new NotFoundException(
        'Relação entre gerente e padaria não encontrada',
      )
    }
    return await this.iBakeryManagerRepository.deleteBakeryManager({ id })
  }
}
