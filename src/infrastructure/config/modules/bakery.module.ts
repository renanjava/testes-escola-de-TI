import { Module } from '@nestjs/common'
import { BakeryService } from '../../model/services/bakery.service'
import { BakeryController } from '../../presentation/controllers/bakery.controller'
import { BakeryRepository } from '@/infrastructure/model/repositories/bakery.repository'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'

@Module({
  controllers: [BakeryController],
  providers: [BakeryService, BakeryRepository, PrismaService],
})
export class BakeryModule {}
