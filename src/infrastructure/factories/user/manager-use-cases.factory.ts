import CreateManagerUseCase from '@/application/usecases/bakery/manager/create-manager.use-case'
import FindAllManagersUseCase from '@/application/usecases/bakery/manager/find-all-managers.use-case'
import FindOneManagerUseCase from '@/application/usecases/bakery/manager/find-one-manager.use-case'
import RemoveManagerUseCase from '@/application/usecases/bakery/manager/remove-manager.use-case'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ManagerUseCasesFactory {
  constructor(
    @Inject('UserRepository')
    private readonly iUserRepository: IUserRepository<UserEntity>,
  ) {}

  getCreateManagerUseCaseInstance() {
    return new CreateManagerUseCase(this.iUserRepository)
  }

  getFindAllManagersUseCaseInstance() {
    return new FindAllManagersUseCase(this.iUserRepository)
  }

  getFindOneManagerUseCaseInstance() {
    return new FindOneManagerUseCase(this.iUserRepository)
  }

  getRemoveManagerUseCaseInstance() {
    return new RemoveManagerUseCase(this.iUserRepository)
  }
}
