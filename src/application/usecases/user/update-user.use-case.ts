import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class UpdateUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(
    id: string,
    updateEntity: Partial<UserEntity>,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.iUserRepository.updateUser({
      where: { id },
      data: updateEntity,
    })
  }
}
