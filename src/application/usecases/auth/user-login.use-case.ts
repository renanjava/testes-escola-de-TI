import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserLoginInput from '@/application/dtos/user-login.input'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { SenhaInvalidaError } from '@/application/errors/senha-invalida.error'
import { UsuarioNaoEncontradoError } from '@/application/errors/usuario-nao-encontrado.error'
import { Password } from '@/infrastructure/common/utils/password'

export default class UserLoginUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserLoginInput): Promise<UserEntity> {
    const userExists = await this.iUserRepository.userLogin({
      username: userEntity.username,
    })
    if (!userExists) {
      throw new UsuarioNaoEncontradoError()
    }

    const validPassword = await Password.verify(
      userEntity.password,
      userExists.password,
    )
    if (!validPassword) {
      throw new SenhaInvalidaError()
    }

    return userExists
  }
}
