import CreateUserUseCase from '@/application/usecases/user/create-user.use-case'
import FindAllUsersUseCase from '@/application/usecases/user/find-all-users.use-case'
import FindOneUserUseCase from '@/application/usecases/user/find-one-user.use-case'
import RemoveUserUseCase from '@/application/usecases/user/remove-user.use-case'
import UpdateUserUseCase from '@/application/usecases/user/update-user.use-case'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UserUseCasesFactory {
  constructor(
    @Inject('UserRepository')
    private readonly iUserRepository: IUserRepository<UserEntity>,
  ) {}

  getCreateUserUseCaseInstance() {
    return new CreateUserUseCase(this.iUserRepository)
  }

  getFindAllUsersUseCaseInstance() {
    return new FindAllUsersUseCase(this.iUserRepository)
  }

  getFindOneUserUseCaseInstance() {
    return new FindOneUserUseCase(this.iUserRepository)
  }

  getUpdateUserUseCaseInstance() {
    return new UpdateUserUseCase(this.iUserRepository)
  }

  getRemoveUserUseCaseInstance() {
    return new RemoveUserUseCase(this.iUserRepository)
  }
}
