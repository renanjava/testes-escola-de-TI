import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { BakeryUseCasesFactory } from '@/infrastructure/factories/bakery-use-cases.factory'
import { Bakery } from '@prisma/client'

@Controller('bakery')
export class BakeryController {
  constructor(private readonly bakeryUseCasesFactory: BakeryUseCasesFactory) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Bakery[]> {
    const bakeryFindAllUseCase =
      this.bakeryUseCasesFactory.getFindAllBakeriesUseCaseInstance()
    return (await bakeryFindAllUseCase.execute()) as Bakery[]
  }
}
