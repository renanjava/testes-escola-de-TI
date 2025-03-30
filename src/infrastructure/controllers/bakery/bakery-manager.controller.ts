import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { CreateBakeryManagerDto } from '@/infrastructure/dtos/bakery/create-bakery-manager.dto'
import { Roles } from '@/infrastructure/auth/rbac/roles.decorator'
import { UserRole } from '@prisma/client'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'
import { BakeryManagerAdapter } from '@/infrastructure/adapters/bakery/bakery-manager.adapter'

@Controller('bakery-manager')
export class BakeryManagerController {
  constructor(private readonly bakeryManagerService: BakeryManagerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createBakeryManagerDto: CreateBakeryManagerDto) {
    return this.bakeryManagerService.create(
      BakeryManagerAdapter.toEntity(createBakeryManagerDto),
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.bakeryManagerService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bakeryManagerService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bakeryManagerService.remove(id)
  }
}
