import type IUseCases from '@/application/interfaces/use-cases.interface'
import type UserLoginEntity from '@/domain/user/entities/user-login.entity'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { UsuarioNaoEncontradoException } from '@/shared/common/exceptions/user/usuario-nao-encontrado.exception'

export default class FindByUsernameUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserLoginEntity): Promise<UserEntity> {
    const userExists = await this.iUserRepository.user({
      username: userEntity.username,
    })
    if (!userExists) {
      throw new UsuarioNaoEncontradoException()
    }
    return userExists
  }
}
