import { Module } from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryController } from '../../../controllers/bakery/bakery.controller'
import { BakeryRepository } from '@/infrastructure/repositories/bakery/bakery.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'

@Module({
  controllers: [BakeryController],
  providers: [BakeryService, BakeryRepository, PrismaService],
  exports: [BakeryRepository],
})
export class BakeryModule {}
