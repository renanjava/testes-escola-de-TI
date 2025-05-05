import type { UserResponseProps } from '@/application/dtos/interfaces/user-response.props'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { UsuarioNaoEncontradoError } from '@/application/errors/usuario-nao-encontrado.error'

export default class FindOneUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserResponseProps> {
    const user = await this.iUserRepository.user({ id: id })
    if (!user) {
      throw new UsuarioNaoEncontradoError()
    }
    return user
  }
}
