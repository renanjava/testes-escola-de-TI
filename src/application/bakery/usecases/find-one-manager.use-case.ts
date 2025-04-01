import IUseCases from '@/application/interfaces/use-cases.interface'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class FindOneManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.iUserRepository.user({ id: id, role: 'MANAGER' })
  }
}
