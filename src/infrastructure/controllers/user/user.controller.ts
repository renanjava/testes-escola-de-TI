import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from '@/infrastructure/services/user/user.service'
import { UpdateUserDto } from '@/infrastructure/dtos/user/update-user.dto'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'
import { IUserRequest } from './interfaces/user-request.interface'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserAdapter } from '@/infrastructure/adapters/user/user.adapter'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuário loga através do token JWT' })
  @ApiResponse({ status: 200, description: 'Usuário buscado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Req() request: IUserRequest): Promise<User> {
    return await this.userService.findOne(request.user.sub)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuário atualiza seus dados através do token JWT' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.' })
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(
      request.user.sub,
      UserAdapter.toUpdateEntity(updateUserDto),
    )
  }
}
