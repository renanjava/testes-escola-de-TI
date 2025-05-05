import type { UserResponseProps } from '@/application/props/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'

export default class UpdateUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(
    id: string,
    updateEntity: Partial<UserEntity>,
  ): Promise<UserResponseProps> {
    return this.iUserRepository.updateUser({
      where: { id },
      data: updateEntity,
    })
  }
}
