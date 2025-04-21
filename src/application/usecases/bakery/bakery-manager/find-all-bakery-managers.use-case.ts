import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import { NenhumGerenteEncontradoException } from '@/shared/common/exceptions/user/nenhum-gerente-encontrado.exception'

export default class FindAllBakeryManagersUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(): Promise<BakeryManagerEntity[]> {
    const bakeryManagers = await this.iBakeryManagerRepository.bakeryManagers(
      {},
    )

    if (!bakeryManagers) {
      throw new NenhumGerenteEncontradoException()
    }
    return bakeryManagers
  }
}
