import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserLoginEntity from '@/domain/entities/user-login.entity'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { SenhaInvalidaException } from '@/infrastructure/exceptions/user/senha-invalida.exception'
import { UsuarioNaoEncontradoException } from '@/infrastructure/exceptions/user/usuario-nao-encontrado.exception'
import { Password } from '@/infrastructure/common/utils/password'

export default class UserLoginUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserLoginEntity): Promise<UserEntity> {
    const userExists = await this.iUserRepository.userLogin({
      username: userEntity.username,
    })
    if (!userExists) {
      throw new UsuarioNaoEncontradoException()
    }

    const validPassword = await Password.verify(
      userEntity.password,
      userExists.password,
    )
    if (!validPassword) {
      throw new SenhaInvalidaException()
    }

    return userExists
  }
}
