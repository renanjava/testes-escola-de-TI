import IUseCases from '@/application/interfaces/use-cases.interface'
import UserLoginEntity from '@/domain/user/entities/user-login.entity'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'
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
