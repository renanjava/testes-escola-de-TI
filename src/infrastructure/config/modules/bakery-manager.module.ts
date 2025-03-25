import { Module } from '@nestjs/common'
import { BakeryManagerService } from '../../model/services/bakery-manager.service'
import { BakeryManagerController } from '../../presentation/controllers/bakery-manager.controller'
import { BakeryManagerRepository } from '@/infrastructure/model/repositories/bakery-manager.repository'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'
import { BakeryRepository } from '@/infrastructure/model/repositories/bakery.repository'
import { ManagerRepository } from '@/infrastructure/model/repositories/manager.repository'

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
