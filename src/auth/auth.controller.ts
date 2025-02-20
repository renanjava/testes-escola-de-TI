import { IsEmail } from 'class-validator'
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'
import { UserService } from '@/user/user.service'
import { Prisma } from '@prisma/client'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.generateToken({ id: 1, username: body.username })
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    const hashedPassword = await this.authService.hashPassword(body.password)

    const userData = {
      user: body.username,
      name: body.name,
      email: body.email,
      password: hashedPassword,
    }

    await this.userService.createUser(userData)
    return { ...AuthRegisterDto }
  }
}
