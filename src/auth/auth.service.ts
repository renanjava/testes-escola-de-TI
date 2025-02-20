import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '@/user/user.service'
import { ICreateUserDto } from '@/user/dto/create-user.dto'

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

  async registerUser(registeredUser: ICreateUserDto): Promise<ICreateUserDto> {
    const userExists = await this.userService.user({
      OR: [{ user: registeredUser.user }, { email: registeredUser.email }],
    })

    if (userExists)
      throw new HttpException(
        'Email ou Username já registrado',
        HttpStatus.BAD_REQUEST,
      )

    const hashedPassword = await this.hashPassword(registeredUser.password)

    const userData: ICreateUserDto = {
      user: registeredUser.user,
      name: registeredUser.name,
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
