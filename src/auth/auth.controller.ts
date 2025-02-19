import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

interface AuthLoginDto {
  username: string
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.generateToken({ id: 1, username: body.username })
  }

  @Post('register')
  async register(@Body() body: AuthLoginDto) {
    const hashedPassword = await this.authService.hashPassword(body.password)
    return { username: body.username, password: hashedPassword }
  }
}
