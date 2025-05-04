import { GerarTokenUseCase } from '@/application/usecases/auth/gerar-token.use-case'
import UserLoginUseCase from '@/application/usecases/auth/user-login.use-case'
import { UserRegisterUseCase } from '@/application/usecases/auth/user-register.use-case'
import { SendEmailUseCase } from '@/application/usecases/email/send-email.use-case'
import CreateUserUseCase from '@/application/usecases/user/create-user.use-case'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import type { EmailMessageImpl } from '@/infrastructure/email/email-message.impl'
import { Inject, Injectable } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthUseCasesFactory {
  constructor(
    @Inject('UserRepository')
    private readonly iUserRepository: IUserRepository<UserEntity>,
    @Inject('IAccessToken')
    private readonly jwtService: JwtService,
    @Inject('IEmailMessage')
    private readonly emailMessageImpl: EmailMessageImpl,
  ) {}

  getUserLoginUseCaseInstance() {
    return new UserLoginUseCase(this.iUserRepository)
  }

  getUserRegisterUseCaseInstance() {
    return new UserRegisterUseCase(
      new CreateUserUseCase(this.iUserRepository),
      new SendEmailUseCase(this.emailMessageImpl),
    )
  }

  getGerarTokenUseCaseInstance() {
    return new GerarTokenUseCase(this.jwtService)
  }
}
