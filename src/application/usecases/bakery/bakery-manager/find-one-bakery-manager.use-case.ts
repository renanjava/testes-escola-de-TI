import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import { GerenteNaoEncontradoException } from '@/shared/common/exceptions/user/gerente-nao-encontrado.exception'

export default class FindOneBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity> {
    const bakeryManager = await this.iBakeryManagerRepository.bakeryManager(id)

    if (!bakeryManager) {
      throw new GerenteNaoEncontradoException()
    }
    return bakeryManager
  }
}
