import IUseCases from '@/application/interfaces/use-cases.interface'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class CreateManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserEntity> {
    return await this.iUserRepository.updateUser({
      where: { id: id },
      data: { role: 'MANAGER' },
    })
  }
}
