import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import { NenhumGerenteEncontradoError } from '@/application/errors/nenhum-gerente-encontrado.error'

export default class FindAllBakeryManagersUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(): Promise<BakeryManagerEntity[]> {
    const bakeryManagers = await this.iBakeryManagerRepository.bakeryManagers(
      {},
    )

    if (!bakeryManagers) {
      throw new NenhumGerenteEncontradoError()
    }
    return bakeryManagers
  }
}
