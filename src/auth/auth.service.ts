import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@/user/user.service'
import { ICreateUserDto } from '@/user/dto/create-user.dto'
import { AuthLoginProps } from './dto/auth-login.dto'
import { EmailOuUsernameExistenteException } from './exceptions/email-ou-username-existente.exception'
import { SenhaInvalidaException } from './exceptions/senha-invalida.exception'
import { UsuarioNaoEncontradoException } from './exceptions/usuario-nao-encontrado.exception'
import { Password } from '@/common/utils/password'

interface UserPayload {
  id: number
  username: string
}

export type TokenProps = {
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async loginUser(loggedUser: AuthLoginProps): Promise<TokenProps> {
    const userExists = await this.userService.user({
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
      id: userExists.id,
      username: userExists.username,
    })
  }

  async registerUser(registeredUser: ICreateUserDto): Promise<ICreateUserDto> {
    const userExists = await this.userService.user({
      OR: [
        { username: registeredUser.username },
        { email: registeredUser.email },
      ],
    })

    if (userExists) {
      throw new EmailOuUsernameExistenteException()
    }

    await this.userService.createUser(registeredUser)
    return { ...registeredUser }
  }

  async hashPassword(password: string): Promise<string> {
    return await Password.generateEncrypted(password, 10)
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await Password.verify(password, hash)
  }

  generateToken(user: UserPayload): TokenProps {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
