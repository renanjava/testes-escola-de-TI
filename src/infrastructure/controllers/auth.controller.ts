/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common'
import { AuthLoginDto } from '@/infrastructure/dtos/auth/auth-login.dto'
import { HashPasswordPipe } from '@/infrastructure/common/pipes/hash-password.pipe'
import { AuthRegisterDto } from '@/infrastructure/dtos/auth/auth-register.dto'
import { AuthRegisterAdapter } from '@/infrastructure/adapters/auth-register.adapter'
import { AuthLoginAdapter } from '@/infrastructure/adapters/auth-login.adapter'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth-use-cases.factory'
import { User } from '@prisma/client'

@Controller('auth')
export class AuthController {
  constructor(private authUseCasesFactory: AuthUseCasesFactory) {}

  @Post('login')
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
