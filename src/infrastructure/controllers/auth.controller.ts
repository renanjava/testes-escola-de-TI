/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common'
import { AuthLoginDto } from '@/infrastructure/dtos/auth/auth-login.dto'
import { HashPasswordPipe } from '@/infrastructure/common/pipes/hash-password.pipe'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthRegisterDto } from '@/infrastructure/dtos/auth/auth-register.dto'
import { AuthRegisterAdapter } from '@/infrastructure/adapters/auth-register.adapter'
import { AuthLoginAdapter } from '@/infrastructure/adapters/auth-login.adapter'
import { UserRegisterUseCase } from '@/application/usecases/auth/user-register.use-case'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth-use-cases.factory'
import { User } from '@prisma/client'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authUseCasesFactory: AuthUseCasesFactory) {}

  @Post('login')
  @ApiOperation({ summary: 'Logar-se na aplicação' })
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 201, description: 'Usuário logado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 401, description: 'Senha inválida.' })
  async login(@Body() body: AuthLoginDto) {
    const userLoginUseCase =
      this.authUseCasesFactory.getUserLoginUseCaseInstance()
    const userLogged = (await userLoginUseCase.execute(
      AuthLoginAdapter.toEntity(body),
    )) as User

    const gerarTokenUseCase =
      this.authUseCasesFactory.getGerarTokenUseCaseInstance()
    return gerarTokenUseCase.execute({
      sub: userLogged.id,
      username: userLogged.username,
      role: userLogged.role,
    })
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
    const userRegisterUseCase =
      this.authUseCasesFactory.getUserRegisterUseCaseInstance()
    return AuthRegisterAdapter.toResponse(
      await userRegisterUseCase.execute(
        AuthRegisterAdapter.toEntity({
          ...body,
          password: hashedPassword,
        }),
      ),
    )
  }
}
