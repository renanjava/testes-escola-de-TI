import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { ICreateUserDto } from '@/user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return await this.authService.loginUser(body)
  }

  @Post('register')
  async register(@Body() body: ICreateUserDto) {
    return await this.authService.registerUser(body)
  }
}
