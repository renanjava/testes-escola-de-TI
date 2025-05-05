import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { EmailOuUsernameExistenteException } from '@/infrastructure/exceptions/user/email-ou-username-existente.exception'

export default class CreateUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const userExists = await this.iUserRepository.user({
      OR: [{ username: userEntity.username }, { email: userEntity.email }],
    })

    if (userExists) {
      throw new EmailOuUsernameExistenteException()
    }

    await this.iUserRepository.createUser(userEntity)
    return { ...userEntity }
  }
}
