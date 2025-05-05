import type { UserResponseProps } from '@/application/props/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'

export default class FindAllManagersUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(): Promise<UserResponseProps[]> {
    return await this.iUserRepository.users({
      where: { role: 'MANAGER' },
    })
  }
}
