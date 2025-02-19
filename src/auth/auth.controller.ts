import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = { id: 1, username: body.username }
    return this.authService.generateToken(user)
  }

  @Post('register')
  async register(@Body() body) {
    const hashedPassword = await this.authService.hashPassword(body.password)
    return { username: body.username, password: hashedPassword }
  }
}
