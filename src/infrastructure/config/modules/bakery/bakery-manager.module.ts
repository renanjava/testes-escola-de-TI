import { Module } from '@nestjs/common'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerController } from '../../../presentation/controllers/bakery/bakery-manager.controller'
import { BakeryManagerRepository } from '@/infrastructure/repositories/bakery/bakery-manager.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { BakeryRepository } from '@/infrastructure/repositories/bakery/bakery.repository'
import { ManagerRepository } from '@/infrastructure/repositories/bakery/manager.repository'

@Module({
  controllers: [BakeryManagerController],
  providers: [
    BakeryManagerService,
    BakeryManagerRepository,
    PrismaService,
    BakeryRepository,
    ManagerRepository,
  ],
})
export class BakeryManagerModule {}
