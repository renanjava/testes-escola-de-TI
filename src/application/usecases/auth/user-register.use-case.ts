import type UserEntity from '@/domain/user/entities/user.entity'
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type CreateUserUseCase from '@/application/usecases/user/create-user.use-case'
import type { SendEmailUseCase } from '@/application/usecases/email/send-email.use-case'

export class UserRegisterUseCase implements IUseCases {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}
  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const registeredUser = await this.createUserUseCase.execute(userEntity)
    this.sendEmailUseCase.execute(registeredUser.email)
    return registeredUser
  }
}
