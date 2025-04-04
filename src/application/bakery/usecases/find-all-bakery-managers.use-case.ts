import type IUseCases from '@/application/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'

export default class FindAllBakeryManagersUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(): Promise<BakeryManagerEntity[]> {
    return await this.iBakeryManagerRepository.bakeryManagers({})
  }
}
