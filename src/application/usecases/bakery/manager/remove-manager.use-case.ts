import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class RemoveManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<Omit<UserEntity, 'password'>> {
    return await this.iUserRepository.updateUser({
      id: id,
      role: 'USER',
    })
  }
}
