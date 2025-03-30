import IUseCases from '@/application/interfaces/use-cases.interface'
import ManagerEntity from '@/domain/bakery/entities/manager.entity'
import IManagerRepository from '@/domain/bakery/interfaces/manager-repository.interface'

export default class UpdateManagerUseCase implements IUseCases {
  constructor(private iManagerRepository: IManagerRepository<ManagerEntity>) {}

  async execute(
    id: string,
    inputManager: Partial<ManagerEntity>,
  ): Promise<ManagerEntity> {
    return await this.iManagerRepository.updateManager({
      where: { id },
      data: inputManager,
    })
  }
}
