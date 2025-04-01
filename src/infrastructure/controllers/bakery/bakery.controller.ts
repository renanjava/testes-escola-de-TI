import { Controller, Get, UseGuards } from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'

@Controller('bakery')
export class BakeryController {
  constructor(private readonly bakeryService: BakeryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bakeryService.findAll()
  }
}
