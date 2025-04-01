import { Module } from '@nestjs/common'
import { AdminController } from '@/infrastructure/controllers/admin/admin.controller'
import { ManagerService } from '@/infrastructure/services/user/manager.service'
import { UserService } from '@/infrastructure/services/user/user.service'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'

@Module({
  controllers: [AdminController],
  providers: [
    ManagerService,
    UserService,
    UserRepositoryImpl,
    PrismaService,
    BakeryManagerService,
    BakeryManagerRepositoryImpl,
    BakeryRepositoryImpl,
    BakeryService,
  ],
})
export class AdminModule {}
