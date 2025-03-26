import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { CreateBakeryDto } from '@/infrastructure/dtos/bakery/create-bakery.dto'
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard'
import { Roles } from '../../../auth/rbac/roles.decorator'
import { UserRole } from '@prisma/client'

@Controller('bakery')
export class BakeryController {
  constructor(private readonly bakeryService: BakeryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createBakeryDto: CreateBakeryDto) {
    return this.bakeryService.create(createBakeryDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bakeryService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bakeryService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bakeryService.remove(id)
  }
}
