import { Module } from '@nestjs/common'
import { AdminController } from '@/infrastructure/controllers/admin/admin.controller'
import { ManagerService } from '@/infrastructure/services/user/manager.service'
import { UserService } from '@/infrastructure/services/user/user.service'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'

@Module({
  controllers: [AdminController],
  providers: [ManagerService, UserService, UserRepositoryImpl, PrismaService],
})
export class AdminModule {}
