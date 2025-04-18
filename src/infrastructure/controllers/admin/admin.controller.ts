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
import { AdminUpdateUserDto } from '@/infrastructure/dtos/admin/admin-update-user.dto'
import { UserAdapter } from '@/infrastructure/adapters/user/user.adapter'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userUseCasesFactory: UserUseCasesFactory,
    private readonly managerService: ManagerService,
    private readonly bakeryManagerService: BakeryManagerService,
    private readonly bakeryService: BakeryService,
  ) {}

  @Post('bakery')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async createBakery(@Body() createBakeryDto: CreateBakeryDto) {
    return await this.bakeryService.create(
      BakeryAdapter.toEntity(createBakeryDto),
    )
  }

  @Patch('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async updateBakery(
    @Param() id: string,
    @Body() updateBakeryDto: UpdateBakeryDto,
  ) {
    return await this.bakeryService.update(
      id,
      BakeryAdapter.toUpdateEntity(updateBakeryDto),
    )
  }

  @Delete('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async removeBakery(@Param('id') id: string) {
    return await this.bakeryService.remove(id)
  }

  @Get('bakery/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async findOneBakery(@Param('id') id: string) {
    return await this.bakeryService.findOne(id)
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
  async findAllBakeryManagers() {
    return await this.bakeryManagerService.findAll()
  }

  @Delete('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async removeBakeryManager(@Param('id') id: string) {
    return await this.bakeryManagerService.remove(id)
  }

  @Get('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async findOneBakeryManager(@Param('id') id: string) {
    return await this.bakeryManagerService.findOne(id)
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
    const findAllUsersUseCase =
      this.userUseCasesFactory.getFindAllUsersUseCaseInstance()
    return (await findAllUsersUseCase.execute()) as User[]
  }

  @Delete('user/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Admin delete um usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário deletado.' })
  async removeUser(@Param('id') id: string): Promise<User> {
    const removeUserUseCase =
      this.userUseCasesFactory.getRemoveUserUseCaseInstance()
    return (await removeUserUseCase.execute(id)) as User
  }

  @Patch('user/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Admin atualiza usuário por id',
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.' })
  async update(
    @Param('id') id: string,
    @Body() adminUpdateUserDto: AdminUpdateUserDto,
  ): Promise<User> {
    const updateUserUseCase =
      this.userUseCasesFactory.getUpdateUserUseCaseInstance()
    return (await updateUserUseCase.execute(
      id,
      UserAdapter.toAdminUpdateEntity(adminUpdateUserDto),
    )) as User
  }
}
