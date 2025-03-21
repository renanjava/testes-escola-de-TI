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
import { BakeryService } from '@/model/services/bakery.service'
import { CreateBakeryDto } from '@/model/entities/dto/bakery/create-bakery.dto'
import { UpdateBakeryDto } from '@/model/entities/dto/bakery/update-bakery.dto'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { Roles } from '../auth/rbac/roles.decorator'
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
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.bakeryService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bakeryService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateBakeryDto: UpdateBakeryDto) {
    return this.bakeryService.update(id, updateBakeryDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bakeryService.remove(id)
  }
}
