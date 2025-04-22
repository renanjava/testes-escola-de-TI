import type UserEntity from '@/domain/user/entities/user.entity'
import type IUseCases from '../interfaces/use-cases.interface'
import type CreateUserUseCase from '../user/create-user.use-case'
import type { SendEmailUseCase } from '../email/send-email.use-case'

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
