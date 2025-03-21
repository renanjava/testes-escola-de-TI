/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '@/model/services/auth.service'
import { AuthLoginDto } from '@/model/entities/dto/auth/auth-login.dto'
import { HashPasswordPipe } from '@/model/common/pipes/hash-password.pipe'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthRegisterDto } from '@/model/entities/dto/auth/auth-register.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Logar-se na aplicação' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 201, description: 'Usuário logado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 401, description: 'Senha inválida.' })
  async login(@Body() body: AuthLoginDto) {
    return await this.authService.loginUser(body)
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar-se na aplicação' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({ status: 201, description: 'Usuário criado.' })
  @ApiResponse({ status: 400, description: 'Username ou Email já existente.' })
  async register(
    @Body() { password, ...body }: AuthRegisterDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    return await this.authService.registerUser({
      ...body,
      password: hashedPassword,
    })
  }
}
