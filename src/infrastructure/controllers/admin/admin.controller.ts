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
import { CreateBakeryManagerDto } from '@/infrastructure/dtos/bakery/create-bakery-manager.dto'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryManagerAdapter } from '@/infrastructure/adapters/bakery/bakery-manager.adapter'
import { CreateBakeryDto } from '@/infrastructure/dtos/bakery/create-bakery.dto'
import { BakeryAdapter } from '@/infrastructure/adapters/bakery/bakery.adapter'
import { UpdateBakeryDto } from '@/infrastructure/dtos/bakery/update-bakery.dto'
import { AdminUpdateUserDto } from '@/infrastructure/dtos/admin/admin-update-user.dto'
import { UserAdapter } from '@/infrastructure/adapters/user/user.adapter'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'
import { ManagerUseCasesFactory } from '@/infrastructure/factories/user/manager-use-cases.factory'
import { BakeryManagerUseCasesFactory } from '@/infrastructure/factories/bakery/bakery-manager/bakery-manager-use-cases.factory'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userUseCasesFactory: UserUseCasesFactory,
    private readonly managerUseCasesFactory: ManagerUseCasesFactory,
    private readonly bakeryManagerUseCasesFactory: BakeryManagerUseCasesFactory,
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
    const createBakeryManagerUseCase =
      this.bakeryManagerUseCasesFactory.getCreateBakeryManagerUseCaseInstance()
    return (await createBakeryManagerUseCase.execute(
      BakeryManagerAdapter.toEntity(createBakeryManagerDto),
    )) as BakeryManager
  }

  @Get('bakery-manager')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async findAllBakeryManagers() {
    const findAllBakeryManagersUseCase =
      this.bakeryManagerUseCasesFactory.getFindAllBakeryManagersUseCaseInstance()
    return (await findAllBakeryManagersUseCase.execute()) as BakeryManager[]
  }

  @Delete('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async removeBakeryManager(@Param('id') id: string) {
    const removeBakeryManagerUseCase =
      this.bakeryManagerUseCasesFactory.getRemoveBakeryManagerUseCaseInstance()
    return (await removeBakeryManagerUseCase.execute(id)) as BakeryManager
  }

  @Get('bakery-manager/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async findOneBakeryManager(@Param('id') id: string) {
    const findOneBakeryManagerUseCase =
      this.bakeryManagerUseCasesFactory.getFindOneBakeryManagerUseCaseInstance()
    return (await findOneBakeryManagerUseCase.execute(id)) as BakeryManager
  }

  @Get('manager')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getManagers(): Promise<User[]> {
    const findAllManagersUseCase =
      this.managerUseCasesFactory.getFindAllManagersUseCaseInstance()
    return (await findAllManagersUseCase.execute()) as User[]
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
