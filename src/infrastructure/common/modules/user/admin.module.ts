import { Module } from '@nestjs/common'
import { AdminController } from '@/infrastructure/controllers/admin/admin.controller'
import { ManagerService } from '@/infrastructure/services/user/manager.service'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { PrismaModule } from '../orm/prisma.module'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [
    ManagerService,
    BakeryManagerService,
    BakeryManagerRepositoryImpl,
    BakeryRepositoryImpl,
    BakeryService,
    UserRepositoryImpl,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    UserUseCasesFactory,
  ],
})
export class AdminModule {}
