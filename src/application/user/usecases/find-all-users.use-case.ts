import IUseCases from '@/application/interfaces/use-cases.interface'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class FindAllUsersUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(): Promise<UserEntity[]> {
    return await this.iUserRepository.users({})
  }
}
