import { Controller, Post, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { ICreateUserDto } from '@/user/dto/create-user.dto'
import { HashPasswordPipe } from '@/common/pipes/hash-password.pipe'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Body() body: AuthLoginDto) {
    return await this.authService.loginUser(body)
  }

  @Post('register')
  async register(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...body }: ICreateUserDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    return await this.authService.registerUser({
      ...body,
      password: hashedPassword,
    })
  }
}
