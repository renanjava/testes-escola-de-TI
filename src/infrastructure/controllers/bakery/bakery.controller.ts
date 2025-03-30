import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { CreateBakeryDto } from '@/infrastructure/dtos/bakery/create-bakery.dto'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'
import { Roles } from '../../auth/rbac/roles.decorator'
import { UserRole } from '@prisma/client'
import { BakeryAdapter } from '@/infrastructure/adapters/bakery/bakery.adapter'
import { UpdateBakeryDto } from '@/infrastructure/dtos/bakery/update-bakery.dto'

@Controller('bakery')
export class BakeryController {
  constructor(private readonly bakeryService: BakeryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createBakeryDto: CreateBakeryDto) {
    return this.bakeryService.create(BakeryAdapter.toEntity(createBakeryDto))
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

  @Patch()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  update(@Param() id: string, @Body() updateBakeryDto: UpdateBakeryDto) {
    return this.bakeryService.update(
      id,
      BakeryAdapter.toUpdateEntity(updateBakeryDto),
    )
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bakeryService.remove(id)
  }
}
