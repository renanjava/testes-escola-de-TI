import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { Password } from '@/shared/common/utils/password'
import { IUserPayload } from '@/application/controllers/interfaces/user-payload.interface'
import { NodemailerService } from '../email/nodemailer.service'
import UserEntity from '@/domain/user/entities/user.entity'
import CreateUserUseCase from '@/application/user/usecases/create-user.use-case'
import FindByUsernameUseCase from '@/application/user/usecases/find-by-username.use-case'
import { SenhaInvalidaException } from '@/shared/common/exceptions/user/senha-invalida.exception'
import { TokenProps } from '@/application/controllers/interfaces/token-props.interface'
import UserLoginEntity from '@/domain/user/entities/user-login.entity'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepositoryImpl,
    private nodemailerService: NodemailerService,
  ) {}

  async loginUser(inputUser: UserLoginEntity): Promise<TokenProps> {
    const findByUsernameUseCase = new FindByUsernameUseCase(this.userRepository)
    const userFounded = (await findByUsernameUseCase.execute(inputUser)) as User
    const validPassword = await this.comparePasswords(
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

  async registerUser(inputUser: UserEntity): Promise<UserEntity> {
    const createUserUseCase = new CreateUserUseCase(this.userRepository)
    const registeredUser = await createUserUseCase.execute(inputUser)
    this.nodemailerService.sendEmail(registeredUser.email)
    return { ...registeredUser }
  }

  async hashPassword(password: string): Promise<string> {
    return await Password.generateEncrypted(password, 10)
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await Password.verify(password, hash)
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
