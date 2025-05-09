import type { UserResponseProps } from '@/application/dtos/interfaces/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { GerenteNaoEncontradoError } from '@/application/errors/gerente-nao-encontrado.error'

export default class FindOneManagerUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    const managerFounded = await this.iUserRepository.user({
      id: id,
      role: 'MANAGER',
    })

    if (!managerFounded) {
      throw new GerenteNaoEncontradoError()
    }
    return managerFounded
  }
}
