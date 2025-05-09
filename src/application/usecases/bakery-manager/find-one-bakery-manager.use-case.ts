import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import { GerenteNaoEncontradoError } from '@/application/errors/gerente-nao-encontrado.error'

export default class FindOneBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity> {
    const bakeryManager = await this.iBakeryManagerRepository.bakeryManager(id)

    if (!bakeryManager) {
      throw new GerenteNaoEncontradoError()
    }
    return bakeryManager
  }
}
