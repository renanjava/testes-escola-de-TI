/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '@/infrastructure/services/user/auth.service'
import { AuthLoginDto } from '@/infrastructure/dtos/user/auth-login.dto'
import { HashPasswordPipe } from '@/infrastructure/common/pipes/hash-password.pipe'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthRegisterDto } from '@/infrastructure/dtos/user/auth-register.dto'
import { AuthRegisterAdapter } from '@/infrastructure/adapters/user/auth-register.adapter'
import { AuthLoginAdapter } from '@/infrastructure/adapters/user/auth-login.adapter'

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
    return await this.authService.loginUser(AuthLoginAdapter.toEntity(body))
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
    return await this.authService.registerUser(
      AuthRegisterAdapter.toEntity({
        ...body,
        password: hashedPassword,
      }),
    )
  }
}
