import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/user.repository'
import { AuthLoginDto } from '../../dtos/user/auth-login.dto'
import { SenhaInvalidaException } from '@/shared/common/exceptions/user/senha-invalida.exception'
import { UsuarioNaoEncontradoException } from '@/shared/common/exceptions/user/usuario-nao-encontrado.exception'
import { Password } from '@/shared/common/utils/password'
import { IUserPayload } from '@/application/user/interfaces/user-payload.interface'
import { NodemailerService } from '../email/nodemailer.service'
import UserEntity from '@/domain/user/entities/user.entity'
import CreateUserUseCase from '@/application/user/usecases/create-user.use-case'

export type TokenProps = {
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepositoryImpl,
    private nodemailerService: NodemailerService,
  ) {}

  async loginUser(loggedUser: AuthLoginDto): Promise<TokenProps> {
    const userExists = await this.userRepository.user({
      username: loggedUser.username,
    })
    if (!userExists) {
      throw new UsuarioNaoEncontradoException()
    }

    const validPassword = await this.comparePasswords(
      loggedUser.password,
      userExists.password,
    )
    if (!validPassword) {
      throw new SenhaInvalidaException()
    }

    return this.generateToken({
      sub: userExists.id,
      username: userExists.username,
      role: userExists.role,
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
