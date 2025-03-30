import IUseCases from '@/application/interfaces/use-cases.interface'
import ManagerEntity from '@/domain/bakery/entities/manager.entity'
import IManagerRepository from '@/domain/bakery/interfaces/manager-repository.interface'

export default class FindOneManagerUseCase implements IUseCases {
  constructor(private iManagerRepository: IManagerRepository<ManagerEntity>) {}

  async execute(id: string): Promise<ManagerEntity | null> {
    return await this.iManagerRepository.manager(id)
  }
}
