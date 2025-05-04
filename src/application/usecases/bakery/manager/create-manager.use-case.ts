import type { UserResponseProps } from '@/application/props/user/user-response.props'
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'

export default class CreateManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    return await this.iUserRepository.updateUser({
      where: { id: id },
      data: { role: 'MANAGER' },
    })
  }
}
