import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { BakeryManagerService } from '../../model/services/bakery-manager.service'
import { CreateBakeryManagerDto } from '@/infrastructure/model/entities/dto/bakery-manager/create-bakery-manager.dto'
import { UpdateBakeryManagerDto } from '@/infrastructure/model/entities/dto/bakery-manager/update-bakery-manager.dto'
import { Roles } from '@/infrastructure/auth/rbac/roles.decorator'
import { UserRole } from '@prisma/client'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'

@Controller('bakery-manager')
export class BakeryManagerController {
  constructor(private readonly bakeryManagerService: BakeryManagerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createBakeryManagerDto: CreateBakeryManagerDto) {
    return this.bakeryManagerService.create(createBakeryManagerDto)
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateBakeryManagerDto: UpdateBakeryManagerDto,
  ) {
    return this.bakeryManagerService.update(id, updateBakeryManagerDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bakeryManagerService.remove(id)
  }
}
