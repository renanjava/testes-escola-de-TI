import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ManagerService } from '@/infrastructure/services/bakery/manager.service'
import { CreateManagerDto } from '@/infrastructure/dtos/bakery/create-manager.dto'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'
import { Roles } from '@/infrastructure/auth/rbac/roles.decorator'
import { UserRole } from '@prisma/client'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.managerService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.managerService.remove(id)
  }
}
