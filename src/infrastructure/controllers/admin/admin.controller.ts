import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'
import { UserService } from '@/infrastructure/services/user/user.service'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'
import { Roles } from '../../auth/rbac/roles.decorator'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ManagerService } from '@/infrastructure/services/user/manager.service'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly managerService: ManagerService,
  ) {}

  @Patch('manager/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createManager(@Param('id') id: string): Promise<User> {
    return await this.managerService.create(id)
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin busca todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários listados.' })
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Delete('user/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Admin delete um usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário deletado.' })
  async removeUsers(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
