import { Module } from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryController } from '../../../controllers/bakery/bakery.controller'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'

@Module({
  controllers: [BakeryController],
  providers: [BakeryService, BakeryRepositoryImpl, PrismaService],
  exports: [BakeryRepositoryImpl],
})
export class BakeryModule {}
