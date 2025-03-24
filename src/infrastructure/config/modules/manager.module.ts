import { Module } from '@nestjs/common'
import { ManagerService } from '../../model/services/manager.service'
import { ManagerController } from '../../presentation/controllers/manager.controller'
import { ManagerRepository } from '@/infrastructure/model/repositories/manager.repository'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository, PrismaService],
})
export class ManagerModule {}
