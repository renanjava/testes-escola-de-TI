import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { Password } from '@/shared/common/utils/password'
import { IUserPayload } from '@/application/controllers/interfaces/user-payload.interface'
import { NodemailerService } from '../email/nodemailer.service'
import UserEntity from '@/domain/user/entities/user.entity'
import CreateUserUseCase from '@/application/usecases/user/create-user.use-case'
import { SenhaInvalidaException } from '@/infrastructure/exceptions/user/senha-invalida.exception'
import { TokenProps } from '@/application/controllers/interfaces/token-props.interface'
import UserLoginEntity from '@/domain/user/entities/user-login.entity'
import { User } from '@prisma/client'
import { AuthRegisterAdapter } from '@/infrastructure/adapters/auth/auth-register.adapter'
import { AuthRegisterProps } from '@/infrastructure/dtos/auth/auth-register.dto'
import UserLoginUseCase from '@/application/usecases/auth/user-login.use-case'
import { SendEmailUseCase } from '@/application/usecases/email/send-email.use-case'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepositoryImpl,
    private nodemailerService: NodemailerService,
  ) {}

  async loginUser(inputUser: UserLoginEntity): Promise<TokenProps> {
    const userLoginUseCase = new UserLoginUseCase(this.userRepository)
    const userFounded = (await userLoginUseCase.execute(inputUser)) as User
    const validPassword = await Password.verify(
      inputUser.password,
      userFounded.password,
    )
    if (!validPassword) {
      throw new SenhaInvalidaException()
    }

    return this.generateToken({
      sub: userFounded.id,
      username: userFounded.username,
      role: userFounded.role,
    })
  }

  async registerUser(inputUser: UserEntity): Promise<AuthRegisterProps> {
    const createUserUseCase = new CreateUserUseCase(this.userRepository)
    const registeredUser = await createUserUseCase.execute(inputUser)
    const sendEmailUseCase = new SendEmailUseCase(this.nodemailerService)
    sendEmailUseCase.execute(registeredUser.email)
    return AuthRegisterAdapter.toResponse(registeredUser)
  }

  generateToken(user: IUserPayload): TokenProps {
    const payload = {
      username: user.username,
      sub: user.sub,
      role: user.role,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
