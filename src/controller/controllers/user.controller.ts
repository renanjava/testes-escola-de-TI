import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'
import { UserService } from '@/model/services/user.service'
import { UpdateUserDto } from '@/model/entities/dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { Roles } from '../auth/rbac/roles.decorator'
import { IUserRequest } from '../payloads/user-request.interface'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin busca todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários listados.' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

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
    return this.userService.update(request.user.sub, updateUserDto)
  }

  @Delete('admin/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Admin delete um usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário deletado.' })
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
