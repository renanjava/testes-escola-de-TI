import type IUseCases from '@/application/usecases/use-cases.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { EmailOuUsernameExistenteError } from '@/application/errors/email-ou-username-existente.error'

export default class CreateUserUseCase implements IUseCases {
  constructor(private iUserRepository: IUserRepository<UserEntity>) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const userExists = await this.iUserRepository.user({
      OR: [{ username: userEntity.username }, { email: userEntity.email }],
    })

    if (userExists) {
      throw new EmailOuUsernameExistenteError()
    }

    await this.iUserRepository.createUser(userEntity)
    return { ...userEntity }
  }
}
