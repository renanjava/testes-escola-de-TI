import type IUseCases from '@/application/interfaces/use-cases.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { UsuarioNaoEncontradoException } from '@/shared/common/exceptions/user/usuario-nao-encontrado.exception'

export default class FindOneUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.iUserRepository.user({ id: id })
    if (!user) {
      throw new UsuarioNaoEncontradoException()
    }
    return user
  }
}
