import CreateManagerUseCase from '@/application/usecases/manager/create-manager.use-case'
import FindAllManagersUseCase from '@/application/usecases/manager/find-all-managers.use-case'
import FindOneManagerUseCase from '@/application/usecases/manager/find-one-manager.use-case'
import RemoveManagerUseCase from '@/application/usecases/manager/remove-manager.use-case'
import UserEntity from '@/domain/entities/user.entity'
import IUserRepository from '@/domain/interfaces/user-repository.interface'
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
