import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpdateUserDto } from '@/infrastructure/dtos/user/update-user.dto'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'
import { IUserRequest } from './interfaces/user-request.interface'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserAdapter } from '@/infrastructure/adapters/user/user.adapter'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'

@Controller('user')
export class UserController {
  constructor(private readonly userUseCasesFactory: UserUseCasesFactory) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuário loga através do token JWT' })
  @ApiResponse({ status: 200, description: 'Usuário buscado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Req() request: IUserRequest): Promise<User> {
    const findOneUserUseCase =
      this.userUseCasesFactory.getFindOneUserUseCaseInstance()
    return (await findOneUserUseCase.execute(request.user.sub)) as User
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuário atualiza seus dados através do token JWT' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.' })
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updateUserUseCase =
      this.userUseCasesFactory.getUpdateUserUseCaseInstance()
    return (await updateUserUseCase.execute(
      request.user.sub,
      UserAdapter.toUpdateEntity(updateUserDto),
    )) as User
  }
}
