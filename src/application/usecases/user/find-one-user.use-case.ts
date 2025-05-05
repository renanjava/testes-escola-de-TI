import type { UserResponseProps } from '@/application/props/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { UsuarioNaoEncontradoException } from '@/infrastructure/exceptions/user/usuario-nao-encontrado.exception'

export default class FindOneUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    const user = await this.iUserRepository.user({ id: id })
    if (!user) {
      throw new UsuarioNaoEncontradoException()
    }
    return user
  }
}
