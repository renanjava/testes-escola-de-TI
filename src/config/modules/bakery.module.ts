import { Module } from '@nestjs/common'
import { BakeryService } from '../../model/services/bakery.service'
import { BakeryController } from '../../controller/controllers/bakery.controller'
import { BakeryRepository } from '@/model/repositories/bakery.repository'
import { PrismaService } from '@/model/services/prisma.service'

@Module({
  controllers: [BakeryController],
  providers: [BakeryService, BakeryRepository, PrismaService],
})
export class BakeryModule {}
