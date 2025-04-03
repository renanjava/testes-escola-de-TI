import type IUseCases from '@/application/interfaces/use-cases.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { EmailOuUsernameExistenteException } from '@/shared/common/exceptions/user/email-ou-username-existente.exception'

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
