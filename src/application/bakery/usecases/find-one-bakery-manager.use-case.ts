import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'

export default class FindOneBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity | null> {
    return await this.iBakeryManagerRepository.bakeryManager(id)
  }
}
