import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '@/user/user.service'
import { ICreateUserDto } from '@/user/dto/create-user.dto'
import { AuthLoginProps } from './dto/auth-login.dto'
import { EmailOuUsernameExistenteException } from './exceptions/email-ou-username-existente.exception'
import { SenhaInvalidaException } from './exceptions/senha-invalida.exception'
import { UsuarioNaoEncontradoException } from './exceptions/usuario-nao-encontrado.exception'

interface UserPayload {
  id: number
  username: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async loginUser(
    loggedUser: AuthLoginProps,
  ): Promise<{ access_token: string }> {
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

    const hashedPassword = await this.hashPassword(registeredUser.password)

    const userData: ICreateUserDto = {
      username: registeredUser.username,
      realname: registeredUser.realname,
      email: registeredUser.email,
      password: hashedPassword,
    }

    await this.userService.createUser(userData)
    return { ...registeredUser }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  generateToken(user: UserPayload): { access_token: string } {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
