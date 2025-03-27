import IUseCases from '@/application/interfaces/use-cases.interface'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class UpdateUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(
    id: string,
    updateEntity: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.iUserRepository.updateUser({
      where: { id },
      data: updateEntity,
    })
  }
}
