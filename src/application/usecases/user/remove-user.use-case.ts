import type { UserResponseProps } from '@/application/props/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'

export default class RemoveUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    return await this.iUserRepository.deleteUser({ id: id })
  }
}
