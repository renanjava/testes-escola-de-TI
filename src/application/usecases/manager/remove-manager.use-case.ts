import type { UserResponseProps } from '@/application/dtos/interfaces/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'

export default class RemoveManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    return await this.iUserRepository.updateUser({
      id: id,
      role: 'USER',
    })
  }
}
