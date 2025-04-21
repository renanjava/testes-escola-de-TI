import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type UserLoginEntity from '@/domain/user/entities/user-login.entity'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { UsuarioNaoEncontradoException } from '@/infrastructure/exceptions/user/usuario-nao-encontrado.exception'

export default class UserLoginUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserLoginEntity): Promise<UserEntity> {
    const userExists = await this.iUserRepository.userLogin({
      username: userEntity.username,
    })
    if (!userExists) {
      throw new UsuarioNaoEncontradoException()
    }
    return userExists
  }
}
