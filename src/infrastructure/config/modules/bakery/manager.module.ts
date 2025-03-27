import { Module } from '@nestjs/common'
import { ManagerService } from '@/infrastructure/services/bakery/manager.service'
import { ManagerController } from '../../../controllers/bakery/manager.controller'
import { ManagerRepository } from '@/infrastructure/repositories/bakery/manager.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository, PrismaService],
  exports: [ManagerRepository],
})
export class ManagerModule {}
