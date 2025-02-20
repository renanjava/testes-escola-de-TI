import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.generateToken({ id: 1, username: body.username })
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return await this.authService.registerUser(body)
  }
}
