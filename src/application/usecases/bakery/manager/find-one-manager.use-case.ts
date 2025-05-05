import type { UserResponseProps } from '@/application/props/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { GerenteNaoEncontradoException } from '@/infrastructure/exceptions/user/gerente-nao-encontrado.exception'

export default class FindOneManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    const managerFounded = await this.iUserRepository.user({
      id: id,
      role: 'MANAGER',
    })

    if (!managerFounded) {
      throw new GerenteNaoEncontradoException()
    }
    return managerFounded
  }
}
