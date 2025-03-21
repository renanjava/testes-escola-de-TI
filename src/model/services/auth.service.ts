import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/model/repositories/user.repository'
import { ICreateUserDto } from '@/model/entities/dto/user/create-user.dto'
import { AuthLoginDto } from '../entities/dto/auth/auth-login.dto'
import { EmailOuUsernameExistenteException } from '@/model/exceptions/email-ou-username-existente.exception'
import { SenhaInvalidaException } from '@/model/exceptions/senha-invalida.exception'
import { UsuarioNaoEncontradoException } from '@/model/exceptions/usuario-nao-encontrado.exception'
import { Password } from '@/model/common/utils/password'
import { IUserPayload } from '@/controller/payloads/user-payload.interface'
import { NodemailerService } from './nodemailer.service'

export type TokenProps = {
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
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

  async registerUser(registeredUser: ICreateUserDto): Promise<ICreateUserDto> {
    const userExists = await this.userRepository.user({
      OR: [
        { username: registeredUser.username },
        { email: registeredUser.email },
      ],
    })

    if (userExists) {
      throw new EmailOuUsernameExistenteException()
    }

    await this.userRepository.createUser(registeredUser)
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
