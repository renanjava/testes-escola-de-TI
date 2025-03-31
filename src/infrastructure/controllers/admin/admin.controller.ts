import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { BakeryManager, User, UserRole } from '@prisma/client'
import { UserService } from '@/infrastructure/services/user/user.service'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'
import { Roles } from '../../auth/rbac/roles.decorator'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ManagerService } from '@/infrastructure/services/user/manager.service'
import { CreateBakeryManagerDto } from '@/infrastructure/dtos/bakery/create-bakery-manager.dto'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryManagerAdapter } from '@/infrastructure/adapters/bakery/bakery-manager.adapter'
import { CreateBakeryDto } from '@/infrastructure/dtos/bakery/create-bakery.dto'
import { BakeryAdapter } from '@/infrastructure/adapters/bakery/bakery.adapter'
import { UpdateBakeryDto } from '@/infrastructure/dtos/bakery/update-bakery.dto'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly managerService: ManagerService,
    private readonly bakeryManagerService: BakeryManagerService,
    private readonly bakeryService: BakeryService,
  ) {}

  @Post('bakery')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  createBakery(@Body() createBakeryDto: CreateBakeryDto) {
    return this.bakeryService.create(BakeryAdapter.toEntity(createBakeryDto))
  }

  @Patch('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  updateBakery(@Param() id: string, @Body() updateBakeryDto: UpdateBakeryDto) {
    return this.bakeryService.update(
      id,
      BakeryAdapter.toUpdateEntity(updateBakeryDto),
    )
  }

  @Delete('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  removeBakery(@Param('id') id: string) {
    return this.bakeryService.remove(id)
  }

  @Get('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOneBakery(@Param('id') id: string) {
    return this.bakeryService.findOne(id)
  }

  @Post('bakery-manager')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createManager(
    @Body() createBakeryManagerDto: CreateBakeryManagerDto,
  ): Promise<BakeryManager> {
    return await this.bakeryManagerService.create(
      BakeryManagerAdapter.toEntity(createBakeryManagerDto),
    )
  }

  @Get('bakery-manager')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findAllBakeryManagers() {
    return this.bakeryManagerService.findAll()
  }

  @Delete('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  removeBakeryManager(@Param('id') id: string) {
    return this.bakeryManagerService.remove(id)
  }

  @Get('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOneBakeryManager(@Param('id') id: string) {
    return this.bakeryManagerService.findOne(id)
  }

  @Get('manager')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getManagers(): Promise<User[]> {
    return await this.managerService.findAll()
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
  async removeUser(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
